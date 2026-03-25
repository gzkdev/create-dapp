#!/usr/bin/env node
import path from 'node:path';
import { fileURLToPath } from 'node:url';

import * as p from '@clack/prompts';
import pc from 'picocolors';

import { runCli } from './cli.js';
import {
  copyTemplate,
  initializeGit,
  installDependencies,
  modifyPackageJson,
} from './utils/scaffold.js';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

async function main() {
  const { projectName, network, template } = await runCli();

  const targetDir = path.resolve(process.cwd(), projectName);
  const templateDir = path.resolve(__dirname, '../templates', network, template);

  const s = p.spinner();

  s.start('Copying template files…');
  await copyTemplate(templateDir, targetDir);
  s.stop('Template files copied');

  s.start('Updating package.json…');
  await modifyPackageJson(targetDir, projectName);
  s.stop('package.json updated');

  s.start('Installing dependencies…');
  await installDependencies(targetDir);
  s.stop('Dependencies installed');

  s.start('Initialising git repository…');
  await initializeGit(targetDir);
  s.stop('Git repository initialised');

  console.log('');
  console.log(pc.green('✔') + ' ' + pc.bold(`${projectName} is ready!`));
  console.log('');
  console.log('  Get started:');
  console.log(pc.dim('  $ ') + pc.cyan(`cd ${projectName}`));
  console.log(pc.dim('  $ ') + pc.cyan('npm run dev'));
  console.log('');
}

main().catch((err) => {
  console.error(pc.red('Aborting installation.'));
  if (err instanceof Error) {
    console.error(err.message);
  }
  process.exit(1);
});
