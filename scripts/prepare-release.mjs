import { createHash } from 'node:crypto';
import { readFile, writeFile, readdir, lstat } from 'node:fs/promises';
import { join } from 'node:path';
import { execFileSync } from 'node:child_process';

const root = new URL('../out/', import.meta.url);
const source = process.env.GITHUB_SHA || execFileSync('git', ['rev-parse', 'HEAD'], { encoding: 'utf8' }).trim();
if (!/^[a-f0-9]{40}$/.test(source)) throw new Error('Invalid source commit');
await writeFile(new URL('.build-info.json', root), JSON.stringify({ schema: 1, sourceCommit: source }, null, 2) + '\n');
const sums = [];
async function walk(relative = '') {
  for (const name of (await readdir(new URL(relative, root))).sort()) {
    const file = join(relative, name);
    if (file === 'SHA256SUMS') continue;
    // Next.js encodes route-group names in its exported navigation payloads.
    if (!/^[A-Za-z0-9_.@/+~!$\[\]-]+$/.test(file)) throw new Error(`Unsupported release path: ${file}`);
    const info = await lstat(new URL(file, root));
    if (info.isSymbolicLink()) throw new Error(`Symlink in export: ${file}`);
    if (info.isDirectory()) await walk(file + '/');
    else {
      const digest = createHash('sha256').update(await readFile(new URL(file, root))).digest('hex');
      sums.push(`${digest}  ${file}`);
    }
  }
}
await walk();
await writeFile(new URL('SHA256SUMS', root), sums.join('\n') + '\n');
console.log(`Release prepared: ${sums.length} files, source ${source.slice(0, 7)}`);
