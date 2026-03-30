import path from 'node:path';
import { execa } from 'execa';
import fs from 'fs-extra';
import { rimraf } from 'rimraf';

const { copy, pathExists, readJSON, writeJSON } = fs;

export async function copyTemplate(options: {
  templatePath: string;
  projectPath: string;
  includeAgents?: boolean;
}) {
  const { templatePath, projectPath, includeAgents = false } = options;

  if (!(await pathExists(templatePath))) {
    throw new Error(`Template directory not found: ${templatePath}`);
  }

  await copy(templatePath, projectPath, {
    filter: (src) => {
      const name = path.basename(src);
      const isHidden = ['node_modules', '.next', '.git'].includes(name);
      const isAgentFile = ['AGENTS.md', 'CLAUDE.md'].includes(name);

      if (isHidden) return false;
      if (isAgentFile && !includeAgents) return false;

      return true;
    },
  });

  // Rename gitignore to .gitignore
  const gitignorePath = path.join(projectPath, 'gitignore');
  const dotGitignorePath = path.join(projectPath, '.gitignore');

  if (await pathExists(gitignorePath)) {
    await fs.move(gitignorePath, dotGitignorePath, { overwrite: true });
  }

  // Handle env.local -> .env.local if needed
  const envPath = path.join(projectPath, 'env.local');
  const dotEnvPath = path.join(projectPath, '.env.local');
  if (await pathExists(envPath)) {
    await fs.move(envPath, dotEnvPath, { overwrite: true });
  }
}

export async function modifyPackageJson(options: { projectPath: string; baseName: string }) {
  const { projectPath, baseName } = options;
  const pkgPath = path.join(projectPath, 'package.json');
  if (!(await pathExists(pkgPath))) {
    throw new Error(`package.json not found in ${projectPath}`);
  }
  const pkg = await readJSON(pkgPath);
  pkg.name = baseName;
  pkg.version = '0.1.0';
  await writeJSON(pkgPath, pkg, { spaces: 2 });
}

export function getPackageManager() {
  const userAgent = process.env.npm_config_user_agent || '';
  if (userAgent.includes('yarn')) return 'yarn';
  if (userAgent.includes('pnpm')) return 'pnpm';
  return 'npm';
}

export async function installDependencies(options: { projectPath: string }) {
  const { projectPath } = options;
  const pkgManager = getPackageManager();
  await execa(pkgManager, ['install'], {
    cwd: projectPath,
    stdio: 'inherit',
    shell: true,
  });
}

export async function initializeGit(options: { projectPath: string }) {
  const { projectPath } = options;

  await execa('git', ['--version']);

  await execa('git', ['init', '--initial-branch=main'], { cwd: projectPath });
  await execa('git', ['add', '.'], { cwd: projectPath });
  await execa('git', ['commit', '-m', 'feat: initial commit from create-dapp'], {
    cwd: projectPath,
  });
}

export async function removeDirectory(dir: string) {
  await rimraf(dir);
}
