#!/bin/sh
# Runs in the GitHub checkout; its authenticated Git remote is reused by worktrees.
set -eu
export_dir=${1:?Path to validated static export is required}
test -f "$export_dir/SHA256SUMS"
test -f "$export_dir/.build-info.json"
source_sha=${RELEASE_SOURCE_SHA:-$(git rev-parse HEAD)}
test "$(git rev-parse origin/main)" = "$source_sha" || {
  echo "A newer main commit exists; this older build will not be published."
  exit 0
}
git config user.name 'github-actions[bot]'
git config user.email '41898282+github-actions[bot]@users.noreply.github.com'
publish_dir=$(mktemp -d)
# Reuse production history when present. On the first run create an orphan branch.
if git show-ref --verify --quiet refs/remotes/origin/production; then
  git worktree add --detach "$publish_dir" origin/production
else
  git worktree add --detach "$publish_dir" HEAD
  git -C "$publish_dir" checkout --orphan edasan-production-initial
fi
cleanup() { git worktree remove --force "$publish_dir"; }
trap cleanup 0
git -C "$publish_dir" rm -rf --ignore-unmatch . >/dev/null
cp -R "$export_dir/." "$publish_dir/"
git -C "$publish_dir" add --all
if git -C "$publish_dir" diff --cached --quiet; then
  echo 'The published export is unchanged.'
  exit 0
fi
git -C "$publish_dir" commit -m "Publish website from $source_sha"
# Push from the original checkout so checkout's scoped credentials are available.
production_sha=$(git -C "$publish_dir" rev-parse HEAD)
git push origin "$production_sha":refs/heads/production
