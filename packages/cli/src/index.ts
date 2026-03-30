#!/usr/bin/env node
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import ora from 'ora';
import pc from 'picocolors';
import { runCli } from './cli.js';
import { PromptsManager } from './utils/prompts.js';
import {
  copyTemplate,
  getPackageManager,
  initializeGit,
  installDependencies,
  modifyPackageJson,
} from './utils/scaffold.js';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

async function main() {
  const { projectPath, network, template, installDeps, includeAgents } = await runCli();

  const pkgManager = getPackageManager();
  const cwd = process.cwd();
  const projectBaseName = path.basename(projectPath === cwd ? cwd : projectPath);
  const templatePath = path.resolve(__dirname, '../templates', network, template);

  let s = ora(`Initializing ${pc.cyan(network)} app with ${pc.cyan(template)}`).start();

  const prompts = new PromptsManager(s, projectPath);

  await prompts.run({
    fn: copyTemplate,
    args: { templatePath, projectPath, includeAgents },
    silent: true,
  });

  await prompts.run({
    fn: modifyPackageJson,
    args: { projectPath, baseName: projectBaseName },
    silent: true,
  });

  await prompts.run({
    fn: initializeGit,
    args: { projectPath },
    silent: true,
  });

  s.stop();

  console.log(`\n${pc.bold(`Using ${pkgManager}`)}`);

  if (installDeps) {
    s = ora(`\nInstalling dependencies`).start();

    const installStep = new PromptsManager(s, projectPath);

    await installStep.run({
      successMsg: 'Dependencies installed',
      fn: installDependencies,
      args: { projectPath },
      silent: false,
    });

    s.stop();
  }

  console.log(`\nCreated app in ${pc.dim(projectPath)}\n`);

  console.log('Next steps:');

  const relativePath = path.relative(cwd, projectPath);

  if (relativePath !== '') {
    console.log(pc.dim('  $ ') + pc.cyan(`cd ${relativePath}`));
  }

  if (!installDeps) {
    console.log(pc.dim('  $ ') + pc.cyan(`${pkgManager} install`));
  }
  console.log(pc.dim('  $ ') + pc.cyan(`${pkgManager} run dev`));
  console.log('');
}

main().catch((err) => {
  console.error(pc.red('Aborting installation.'));
  if (err instanceof Error) console.error(err.message);
  process.exit(1);
});
