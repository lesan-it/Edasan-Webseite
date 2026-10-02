import test from 'node:test';
import assert from 'node:assert/strict';
import { mkdtempSync, mkdirSync, readFileSync, writeFileSync, existsSync, readlinkSync, readdirSync, rmSync, statSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { execFileSync, spawnSync } from 'node:child_process';
import { createHash } from 'node:crypto';
import { fileURLToPath } from 'node:url';

const pullScript = fileURLToPath(new URL('../deploy/hostpoint-pull.sh', import.meta.url));
const publishScript = fileURLToPath(new URL('../scripts/publish-production.sh', import.meta.url));
const git = (cwd, ...args) => execFileSync('git', args, { cwd, encoding: 'utf8', stdio: ['ignore', 'pipe', 'pipe'] }).trim();
function fixture() {
  const dir = mkdtempSync(join(tmpdir(), 'edasan-deploy-test-'));
  const remote = join(dir, 'remote.git');
  const work = join(dir, 'work');
  mkdirSync(work);
  git(dir, 'init', '--bare', remote);
  git(work, 'init', '-b', 'main');
  git(work, 'config', 'user.name', 'Deployment Test');
  git(work, 'config', 'user.email', 'test@example.invalid');
  git(work, 'remote', 'add', 'origin', remote);
  writeFileSync(join(work, 'README.md'), 'Source code only\n');
  git(work, 'add', '.'); git(work, 'commit', '-m', 'Source'); git(work, 'push', '-u', 'origin', 'main');
  git(work, 'fetch', 'origin');
  return { dir, remote, work, source: git(work, 'rev-parse', 'HEAD') };
}
function exportFiles(dir, source, label, corrupt = false) {
  const files = {
    'index.html': `<h1>${label}</h1>`, '.htaccess': 'DirectoryIndex index.html\n',
    'robots.txt': 'User-agent: *\nAllow: /\n', 'sitemap.xml': '<urlset/>',
    'api/contact.php': '<?php echo "ok";', '.build-info.json': JSON.stringify({ sourceCommit: source }),
    [`_next/static/${label}.js`]: `console.log('${label}')`,
  };
  const sums = [];
  for (const [path, contents] of Object.entries(files)) {
    mkdirSync(join(dir, path, '..'), { recursive: true });
    writeFileSync(join(dir, path), contents);
    sums.push(`${createHash('sha256').update(contents).digest('hex')}  ${path}`);
  }
  writeFileSync(join(dir, 'SHA256SUMS'), sums.join('\n') + '\n');
  if (corrupt) writeFileSync(join(dir, 'index.html'), 'Corrupted content');
}
test('Publisher creates production and retains history without publishing source', () => {
  const f = fixture();
  try {
    const output = join(f.dir, 'export'); mkdirSync(output);
    exportFiles(output, f.source, 'first');
    const run = () => execFileSync('sh', [publishScript, output], { cwd: f.work, env: { ...process.env, RELEASE_SOURCE_SHA: f.source }, stdio: 'pipe' });
    run();
    const first = git(f.work, 'rev-parse', 'origin/production');
    assert.equal(git(f.work, 'show', `${first}:index.html`), '<h1>first</h1>');
    assert.ok(!git(f.work, 'ls-tree', '-r', '--name-only', first).includes('README.md'));
    exportFiles(output, f.source, 'second'); run();
    const second = git(f.work, 'rev-parse', 'origin/production');
    assert.notEqual(second, first);
    assert.equal(git(f.work, 'rev-parse', `${second}^`), first);
  } finally { rmSync(f.dir, { recursive: true, force: true }); }
});
test('Hostpoint pull protects existing files, validates releases, swaps atomically and rolls back', () => {
  const f = fixture();
  try {
    git(f.work, 'checkout', '--orphan', 'production'); git(f.work, 'rm', '-rf', '.');
    const publish = (label, corrupt = false) => {
      for (const name of readdirSync(f.work)) if (name !== '.git') rmSync(join(f.work, name), { recursive: true, force: true });
      exportFiles(f.work, f.source, label, corrupt);
      git(f.work, 'add', '.'); git(f.work, 'commit', '-m', label); git(f.work, 'push', 'origin', 'production');
      return git(f.work, 'rev-parse', 'HEAD');
    };
    const first = publish('first');
    const root = join(f.dir, 'deploy');
    const parent = join(f.dir, 'www'); mkdirSync(parent);
    const web = join(parent, 'edasan.ch'); mkdirSync(web); writeFileSync(join(web, 'old.txt'), 'Existing website');
    const conf = join(f.dir, 'hostpoint.conf');
    const writeConf = allowed => writeFileSync(conf, `EDASAN_REPOSITORY='${f.remote}'\nEDASAN_DEPLOY_ROOT='${root}'\nEDASAN_WEB_ROOT='${web}'\nEDASAN_ALLOW_INITIAL_MIGRATION='${allowed}'\n`);
    const run = mode => spawnSync('sh', ['-c', 'umask 077; exec sh "$@"', 'deployment', pullScript, conf, ...(mode ? [mode] : [])], { encoding: 'utf8' });
    writeConf('no'); assert.notEqual(run().status, 0); assert.equal(readFileSync(join(web, 'old.txt'), 'utf8'), 'Existing website');
    writeConf('yes'); const initial = run(); assert.equal(initial.status, 0, initial.stderr);
    assert.equal(readlinkSync(web), join(root, 'releases', first));
    assert.equal(statSync(root).mode & 0o005, 0o001, 'Web server can traverse the private deployment root');
    assert.equal(statSync(join(root, 'releases')).mode & 0o005, 0o001);
    assert.equal(statSync(web).mode & 0o005, 0o005, 'Web server can read the active release');
    assert.equal(statSync(join(web, 'index.html')).mode & 0o004, 0o004);
    assert.equal(statSync(join(root, 'backups')).mode & 0o007, 0);
    assert.equal(statSync(join(root, 'repository.git')).mode & 0o007, 0);
    assert.equal(readdirSync(join(root, 'backups')).length, 1);
    assert.equal(run().status, 0);
    publish('broken', true); const broken = run(); assert.notEqual(broken.status, 0); assert.match(broken.stderr, /Checksum failed/);
    assert.equal(readlinkSync(web), join(root, 'releases', first));
    assert.ok(!existsSync(join(root, 'deploy.lock')));
    const second = publish('second'); const next = run(); assert.equal(next.status, 0, next.stderr);
    assert.equal(readlinkSync(web), join(root, 'releases', second));
    assert.ok(existsSync(join(web, '_next/static/first.js')));
    assert.ok(existsSync(join(web, '_next/static/second.js')));
    assert.ok(!existsSync(join(web, '.git')));
    assert.equal(run('--rollback').status, 0);
    assert.equal(readlinkSync(web), join(root, 'releases', first));
    mkdirSync(join(root, 'deploy.lock')); assert.equal(run().status, 0); assert.equal(readlinkSync(web), join(root, 'releases', first));
  } finally { rmSync(f.dir, { recursive: true, force: true }); }
});
