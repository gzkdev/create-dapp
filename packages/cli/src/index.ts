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
} from './utils/scaffold.js';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

async function main() {
  const { projectName, network, template, installDependencies: shouldInstall } = await runCli();

  const targetDir = path.resolve(process.cwd(), projectName);
  const templateDir = path.resolve(__dirname, '../templates', network, template);

  const s = p.spinner();

  s.start('Copying template files…');
  await copyTemplate(templateDir, targetDir);
  s.stop('Template files copied');

  s.start('Updating package.json…');
  const projectBaseName = projectName === '.' ? path.basename(process.cwd()) : projectName;
  await modifyPackageJson(targetDir, projectBaseName);
  s.stop('package.json updated');

  s.start('Initialising git repository…');
  await initializeGit(targetDir);
  s.stop('Git repository initialised');

  let installSuccess = false;
  if (shouldInstall) {
    s.start('Installing dependencies…');
    installSuccess = await installDependencies(targetDir);
    if (installSuccess) {
      s.stop('Dependencies installed');
    } else {
      s.stop('Dependency installation failed');
    }
  }

  const pkgManager = getPackageManager();

  console.log('');
  console.log(symbols.success + ' ' + pc.bold(`${projectBaseName} is ready!`));
  console.log('');
  console.log('  Get started:');
  if (projectName !== '.') {
    console.log(pc.dim('  $ ') + pc.cyan(`cd ${projectName}`));
  }
  if (!shouldInstall || !installSuccess) {
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
