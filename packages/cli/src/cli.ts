import path from 'node:path';

import * as p from '@clack/prompts';
import { Command } from 'commander';
import pc from 'picocolors';

import { isEmptyDirectory } from './utils/fs.js';

export interface CliFlags {
  template?: string;
  network?: string;
  default?: boolean;
}

export interface CliResults {
  network: string;
  projectPath: string;
  template: string;
  installDeps: boolean;
}

const templateOptions: Record<string, { value: string; label: string }[]> = {
  evm: [
    { value: 'next', label: 'Next.js' },
    { value: 'vite', label: 'Vite (React)' },
  ],
  solana: [
    { value: 'next', label: 'Next.js' },
    { value: 'vite', label: 'Vite (React)' },
  ],
  sui: [
    { value: 'next', label: 'Next.js' },
    { value: 'vite', label: 'Vite (React)' },
  ],
};

export async function runCli(): Promise<CliResults> {
  const program = new Command()
    .name('create-dapp')
    .description('A CLI tool to scaffold minimal and slightly opinionated DApps.')
    .argument('[project-path]', 'Project path')
    .option('-t, --template <string>', 'Template to use')
    .option('-n, --network <string>', 'Network to use (evm, solana, sui)')
    .option('-y, --default', 'Use default options without prompting')
    .parse(process.argv);

  const args = program.args;
  let projectPath = args[0];

  p.intro(pc.bgCyan(pc.black(' create-dapp ')));

  if (!projectPath) {
    const inputPath = await p.text({
      message: 'What is your project name?',
      placeholder: 'my-dapp',
      defaultValue: 'my-dapp',
      validate: (value) => {
        if (value.length === 0) return 'Please enter a path.';
      },
    });

    if (p.isCancel(inputPath)) {
      p.cancel('Operation cancelled.');
      process.exit(0);
    }

    projectPath = inputPath;
  }

  projectPath = path.resolve(process.cwd(), projectPath);

  if (!(await isEmptyDirectory(projectPath))) {
    p.cancel(`The directory ${pc.cyan(projectPath)} is not empty.`);
    process.exit(0);
  }

  const network = await p.select({
    message: 'Which network are you building for?',
    options: [
      { value: 'evm', label: 'EVM (Ethereum, Base, Optimism, etc)' },
      { value: 'solana', label: 'Solana' },
      { value: 'sui', label: 'Sui' },
    ],
    initialValue: 'evm',
  });

  if (p.isCancel(network)) {
    p.cancel('Operation cancelled.');
    process.exit(0);
  }

  const templateList = templateOptions[network];

  const template = (await p.select({
    message: 'Which framework do you want to use?',
    options: templateList,
  })) as string;

  if (p.isCancel(template)) {
    p.cancel('Operation cancelled.');
    process.exit(0);
  }

  const installDeps = (await p.confirm({
    message: 'Would you like to install dependencies? (Recommended)',
    initialValue: true,
  })) as boolean;

  if (p.isCancel(installDeps)) {
    p.cancel('Operation cancelled.');
    process.exit(0);
  }

  p.outro(`Scaffolding a new DApp in ${pc.cyan(projectPath)}.`);

  return { projectPath, network, template, installDeps } satisfies CliResults;
}
