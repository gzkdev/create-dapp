#!/usr/bin/env node
import path from 'node:path';
import { fileURLToPath } from 'node:url';

import * as p from '@clack/prompts';
import symbols from 'log-symbols';
import pc from 'picocolors';

import { runCli } from './cli.js';
import {
  copyTemplate,
  getPackageManager,
  initializeGit,
  installDependencies,
  modifyPackageJson,
  removeDirectory,
} from './utils/scaffold.js';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

async function main() {
  const { projectPath, network, template, installDeps } = await runCli();

  const pkgManager = getPackageManager();
  const templateDir = path.resolve(__dirname, '../templates', network, template);

  const s = p.spinner();

  const cwd = process.cwd();
  const projectBaseName = path.basename(projectPath === cwd ? cwd : projectPath);

  try {
    s.start('Copying template files…');
    await copyTemplate(templateDir, projectPath);
    s.stop('Copied template files');

    s.start('Updating package.json…');
    await modifyPackageJson(projectPath, projectBaseName);
    s.stop('Updated package.json');

    s.start('Initializing a git repository…');
    const gitResult = await initializeGit(projectPath);
    if (!gitResult.success) {
      s.stop(pc.yellow('Git repository initialized partially or failed'));
      console.log(pc.yellow(`  Warning: Could not complete initial git commit.`));
      console.log(pc.dim(`  Reason: ${gitResult.error}`));
      console.log('');
    } else {
      s.stop('Initialized a git repository');
    }
  } catch (err) {
    s.stop(pc.red('Scaffolding failed'));
    console.log('');
    console.error(pc.red(err instanceof Error ? err.message : 'Unknown error'));
    console.log('');
    await removeDirectory(projectPath);
    process.exit(1);
  }

  let installSuccess = false;
  if (installDeps) {
    s.start('Installing dependencies…');
    installSuccess = await installDependencies(projectPath);
    if (installSuccess) {
      s.stop('Dependencies installed');
    } else {
      s.stop(pc.yellow('Dependency installation failed'));
    }
  }

  console.log('');
  console.log(symbols.success + ' ' + pc.bold(`${projectBaseName} is ready!`));
  console.log('');
  console.log('  Get started:');

  const relativePath = path.relative(process.cwd(), projectPath);
  if (relativePath) {
    console.log(pc.dim('  $ ') + pc.cyan(`cd ${relativePath}`));
  }

  if (!installDeps || !installSuccess) {
    console.log(pc.dim('  $ ') + pc.cyan(`${pkgManager} install`));
  }
  console.log(pc.dim('  $ ') + pc.cyan(`${pkgManager} run dev`));
  console.log('');
}

main().catch((err) => {
  console.error(pc.red('Aborting installation.'));
  if (err instanceof Error) {
    console.error(err.message);
  }
  process.exit(1);
});
