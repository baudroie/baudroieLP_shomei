import { copyFile, mkdir, writeFile } from 'node:fs/promises';
import { execFileSync } from 'node:child_process';
// Real entry files let GitHub Pages serve nested role URLs and reloads with HTTP 200.
for (const role of ['sales', 'hr', 'engineer']) {
  await mkdir(`dist/${role}`, { recursive: true });
  await copyFile('dist/index.html', `dist/${role}/index.html`);
}
await copyFile('dist/index.html', 'dist/404.html');
await writeFile('dist/.nojekyll', '');
await writeFile('dist/deployment.json', JSON.stringify({
  source_commit: execFileSync('git', ['rev-parse', 'HEAD'], { encoding: 'utf8' }).trim(),
  base: '/baudroieLP_shomei/',
  built_at: new Date().toISOString(),
}, null, 2) + '\n');
