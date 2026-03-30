import path from 'node:path';

import { execa } from 'execa';
import fs from 'fs-extra';

const { copy, pathExists, readJSON, writeJSON, remove } = fs;

export async function copyTemplate(srcDir: string, destDir: string) {
  if (!(await pathExists(srcDir))) {
    throw new Error(`Template directory not found: ${srcDir}`);
  }

  // Copy all files except node_modules, .next, and .git
  await copy(srcDir, destDir, {
    filter: (src) => {
      const name = path.basename(src);
      return name !== 'node_modules' && name !== '.next' && name !== '.git';
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
    return false;
  }
}

export async function initializeGit(destDir: string) {
  try {
    // Check if git is installed
    await execa('git', ['--version']);

    await execa('git', ['init', '--initial-branch=main'], { cwd: destDir });
    await execa('git', ['add', '.'], { cwd: destDir });
    await execa('git', ['commit', '-m', 'feat: initial commit from create-dapp'], {
      cwd: destDir,
    });
    return { success: true };
  } catch (err) {
    return {
      success: false,
      error: err instanceof Error ? err.message : 'Unknown error',
    };
  }
}

export async function removeDirectory(dir: string) {
  if (await pathExists(dir)) {
    await remove(dir);
  }
}
