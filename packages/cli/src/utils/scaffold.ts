import path from 'node:path';

import { execa } from 'execa';
import fs from 'fs-extra';
import pc from 'picocolors';

const { copy, pathExists, readJSON, writeJSON } = fs;

export async function copyTemplate(srcDir: string, destDir: string) {
  // Copy all files except node_modules, .next, and .git
  await copy(srcDir, destDir, {
    filter: (src) => {
      const isNodeModules = src.includes('node_modules');
      const isNextCache = src.includes('.next');
      const isGit = src.includes('.git');
      return !isNodeModules && !isNextCache && !isGit;
    },
  });

  // Rename gitignore to .gitignore
  const gitignorePath = path.join(destDir, 'gitignore');
  const dotGitignorePath = path.join(destDir, '.gitignore');

  if (await pathExists(gitignorePath)) {
    await fs.move(gitignorePath, dotGitignorePath, { overwrite: true });
  }

  // Handle env.local -> .env.local if needed
  const envPath = path.join(destDir, 'env.local');
  const dotEnvPath = path.join(destDir, '.env.local');
  if (await pathExists(envPath)) {
    await fs.move(envPath, dotEnvPath, { overwrite: true });
  }
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

export function getPackageManager() {
  const userAgent = process.env.npm_config_user_agent || '';
  if (userAgent.includes('yarn')) return 'yarn';
  if (userAgent.includes('pnpm')) return 'pnpm';
  return 'npm';
}

export async function installDependencies(destDir: string) {
  const pkgManager = getPackageManager();
  try {
    await execa(pkgManager, ['install'], {
      cwd: destDir,
      stdio: 'inherit',
      shell: true,
    });
    return true;
  } catch {
    console.log('');
    console.log(
      pc.yellow(
        `Warning: Failed to install dependencies. You may need to run '${pkgManager} install' manually.`
      )
    );
    return false;
  }
}

export async function initializeGit(destDir: string) {
  try {
    await execa('git', ['init'], { cwd: destDir, shell: true });
    await execa('git', ['add', '.'], { cwd: destDir, shell: true });
    await execa('git', ['commit', '-m', 'feat: initial commit from create-dapp'], {
      cwd: destDir,
      shell: true,
    });
  } catch {
    console.log(pc.yellow('Warning: Failed to initialize git repository.'));
  }
}
