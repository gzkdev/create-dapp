import path from 'node:path';

import { execa } from 'execa';
import { copy, pathExists, readJSON, writeJSON } from 'fs-extra';
import pc from 'picocolors';

export async function copyTemplate(srcDir: string, destDir: string) {
  await copy(srcDir, destDir, {
    filter: (src) => {
      const isNodeModules = src.includes('node_modules');
      const isNextCache = src.includes('.next');
      return !isNodeModules && !isNextCache;
    },
  });
}

export async function modifyPackageJson(destDir: string, projectName: string) {
  const pkgPath = path.join(destDir, 'package.json');
  if (await pathExists(pkgPath)) {
    const pkg = await readJSON(pkgPath);
    pkg.name = projectName;
    pkg.version = '0.1.0';
    await writeJSON(pkgPath, pkg, { spaces: 2 });
  }
}

export async function installDependencies(destDir: string) {
  await execa('npm', ['install'], {
    cwd: destDir,
    stdio: 'inherit',
  });
}

export async function initializeGit(destDir: string) {
  try {
    await execa('git', ['init'], { cwd: destDir });
    await execa('git', ['add', '.'], { cwd: destDir });
    await execa('git', ['commit', '-m', 'Initial commit from create-dapp'], {
      cwd: destDir,
    });
  } catch {
    console.log(pc.yellow('Warning: Failed to initialize git repository.'));
  }
}
