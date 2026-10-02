#!/bin/sh
# Pull a validated static release. Compatible with Hostpoint FreeBSD and GNU/Linux.
set -eu
PATH=/usr/local/bin:/usr/bin:/bin:/usr/local/sbin:/usr/sbin:/sbin
export PATH
# Public releases must remain readable even when the SSH session uses umask 077.
umask 022
config=${1:?Usage: sh hostpoint-pull.sh /absolute/path/hostpoint.conf [--rollback]}
mode=${2:-deploy}
case "$config" in /*) ;; *) echo 'Configuration path must be absolute.' >&2; exit 1;; esac
test -f "$config" || { echo 'Configuration file missing.' >&2; exit 1; }
. "$config"
: "${EDASAN_REPOSITORY:?}" "${EDASAN_DEPLOY_ROOT:?}" "${EDASAN_WEB_ROOT:?}"
branch=${EDASAN_BRANCH:-production}
git_bin=${EDASAN_GIT_BIN:-git}
case "$EDASAN_DEPLOY_ROOT:$EDASAN_WEB_ROOT" in *DEIN_HOSTING_BENUTZER*) echo 'Replace the example paths first.' >&2; exit 1;; esac
for path in "$EDASAN_DEPLOY_ROOT" "$EDASAN_WEB_ROOT"; do
  case "$path" in /*) ;; *) echo 'Deployment paths must be absolute.' >&2; exit 1;; esac
  case "$path" in /|/home|/home/*/..|*/../*|*/./*|*/.|*/..|*/) echo 'Unsafe deployment path.' >&2; exit 1;; esac
done
command -v "$git_bin" >/dev/null || { echo 'Git is unavailable; ask Hostpoint to confirm/install it.' >&2; exit 1; }
command -v tar >/dev/null
if command -v sha256 >/dev/null; then hash_cmd=bsd; elif command -v sha256sum >/dev/null; then hash_cmd=gnu; else echo 'SHA-256 tool missing.' >&2; exit 1; fi
mkdir -p "$EDASAN_DEPLOY_ROOT"
root=$(cd "$EDASAN_DEPLOY_ROOT" && pwd -P)
parent=$(cd "$(dirname "$EDASAN_WEB_ROOT")" && pwd -P)
web="$parent/$(basename "$EDASAN_WEB_ROOT")"
case "$root/" in "$web/"*) echo 'Git storage must be outside the public document root.' >&2; exit 1;; esac
case "$web/" in "$root/"*) echo 'Document root must be outside Git storage.' >&2; exit 1;; esac
test "$root" != "$parent" || { echo 'Deployment root must be a separate directory.' >&2; exit 1; }
chmod 711 "$root"
if ! mkdir "$root/deploy.lock" 2>/dev/null; then echo 'Another deployment is running (or a stale lock requires inspection).'; exit 0; fi
stage=''; archive=''; link_tmp=''; migration_backup=''
cleanup() {
  test -z "$stage" || rm -rf "$stage"
  test -z "$archive" || rm -f "$archive"
  test -z "$link_tmp" || rm -f "$link_tmp"
  if test -n "$migration_backup" && ! test -e "$web" && ! test -L "$web"; then mv "$migration_backup" "$web"; fi
  rmdir "$root/deploy.lock"
}
trap cleanup 0
trap 'exit 130' 2
trap 'exit 143' 15
mkdir -p "$root/releases" "$root/backups"
chmod 711 "$root/releases"
chmod 700 "$root/backups"
releases=$(cd "$root/releases" && pwd -P)
old=''
if test -L "$web"; then
  old=$(readlink "$web")
  case "$old" in "$releases/"*) ;; *) echo 'Existing symlink is not owned by this deployment.' >&2; exit 1;; esac
  old_commit=${old#"$releases/"}
  case "$old_commit" in *[!a-f0-9]*|'') echo 'Invalid active release path.' >&2; exit 1;; esac
  test "${#old_commit}" -eq 40
elif test -e "$web" && test "${EDASAN_ALLOW_INITIAL_MIGRATION:-no}" != yes; then
  echo 'Document root already exists. Confirm its contents and allow initial migration in the private config.' >&2
  exit 1
fi
if test "$mode" = --rollback; then
  test -f "$root/previous-release" || { echo 'No previous release is recorded.' >&2; exit 1; }
  commit=$(cat "$root/previous-release")
elif test "$mode" = deploy; then
  repo="$root/repository.git"
  if ! test -d "$repo"; then "$git_bin" init --bare "$repo" >/dev/null; fi
  chmod 700 "$repo"
  "$git_bin" --git-dir="$repo" config remote.origin.url "$EDASAN_REPOSITORY"
  GIT_TERMINAL_PROMPT=0 "$git_bin" --git-dir="$repo" fetch --quiet --no-tags --depth=1 origin "$branch"
  commit=$("$git_bin" --git-dir="$repo" rev-parse FETCH_HEAD)
else echo 'Unknown mode.' >&2; exit 1; fi
case "$commit" in *[!a-f0-9]*|'') echo 'Invalid release commit.' >&2; exit 1;; esac
test "${#commit}" -eq 40
release="$releases/$commit"
if test "$old" = "$release"; then exit 0; fi
if ! test -f "$release/.edasan-complete"; then
  test "$mode" = deploy || { echo 'Rollback release is unavailable.' >&2; exit 1; }
  test ! -e "$release" || { echo 'Incomplete release needs inspection.' >&2; exit 1; }
  stage=$(mktemp -d "$releases/.staging.XXXXXX")
  archive="$root/release-$commit.tar"
  "$git_bin" --git-dir="$repo" archive --format=tar --output="$archive" "$commit"
  tar -xf "$archive" -C "$stage"
  chmod 755 "$stage"
  test -z "$(find "$stage" -type l -print)" || { echo 'Symlinks are not permitted in a release.' >&2; exit 1; }
  for file in index.html .htaccess robots.txt sitemap.xml api/contact.php .build-info.json SHA256SUMS; do
    test -s "$stage/$file" || { echo "Release file missing: $file" >&2; exit 1; }
  done
  while read -r expected file; do
    case "$file" in ''|/*|../*|*/../*|*/..|.git|.git/*) echo 'Invalid checksum path.' >&2; exit 1;; esac
    test -f "$stage/$file"
    if test "$hash_cmd" = bsd; then actual=$(sha256 -q "$stage/$file"); else actual=$(sha256sum "$stage/$file"); actual=${actual%% *}; fi
    test "$actual" = "$expected" || { echo "Checksum failed: $file" >&2; exit 1; }
  done < "$stage/SHA256SUMS"
  # Keep the immediately previous build's immutable assets for already-open pages.
  if test -n "$old" && test -f "$old/SHA256SUMS"; then
    while read -r ignored file; do
      case "$file" in _next/static/*)
        case "$file" in */../*) exit 1;; esac
        if ! test -e "$stage/$file" && test -f "$old/$file"; then mkdir -p "$(dirname "$stage/$file")"; cp "$old/$file" "$stage/$file"; fi
      ;; esac
    done < "$old/SHA256SUMS"
  fi
  printf '%s\n' "$commit" > "$stage/.edasan-complete"
  mv "$stage" "$release"
  stage=''
fi
# Prepare a link on the same filesystem, then atomically replace the active link.
link_tmp="$parent/.edasan-next-$$"
ln -s "$release" "$link_tmp"
if ! test -L "$web" && test -e "$web"; then
  migration_backup="$root/backups/pre-git-$(date +%Y%m%d-%H%M%S)-$$"
  mv "$web" "$migration_backup"
fi
case "$(uname -s)" in
  FreeBSD|Darwin) mv -fh "$link_tmp" "$web" ;;
  Linux) mv -Tf "$link_tmp" "$web" ;;
  *) echo 'Unsupported OS for atomic link switch.' >&2; exit 1 ;;
esac
link_tmp=''
migration_backup=''
if test -n "$old"; then printf '%s\n' "$(basename "$old")" > "$root/previous-release.tmp"; mv "$root/previous-release.tmp" "$root/previous-release"; fi
echo "Website activated: $commit"
