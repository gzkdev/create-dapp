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
  projectName: string;
  network: string;
  template: string;
}

export async function runCli(): Promise<CliResults> {
  const program = new Command()
    .name('create-dapp')
    .description('A tool to bootstrap your next web3 application')
    .argument('[project-directory]', 'Project directory')
    .option('-t, --template <string>', 'Template to use')
    .option('-n, --network <string>', 'Network to use (evm, solana, sui)')
    .option('-y, --default', 'Use default options without prompting')
    .parse(process.argv);

  const args = program.args;
  let projectName = args[0];

  p.intro(pc.bgCyan(pc.black(' create-dapp ')));

  if (!projectName) {
    const projectDir = await p.text({
      message: 'What is your project named?',
      placeholder: 'my-dapp',
      defaultValue: 'my-dapp',
      validate: (value) => {
        if (!value) return 'Please enter a project name.';
      },
    });

    if (p.isCancel(projectDir)) {
      p.cancel('Operation cancelled.');
      process.exit(0);
    }
    projectName = projectDir as string;
  }

  const targetDir = path.resolve(process.cwd(), projectName);

  if (!(await isEmptyDirectory(targetDir))) {
    const shouldOverwrite = await p.confirm({
      message: `Directory ${pc.cyan(projectName)} is not empty. Do you want to continue and overwrite existing files?`,
      initialValue: false,
    });

    if (!shouldOverwrite || p.isCancel(shouldOverwrite)) {
      p.cancel('Operation cancelled.');
      process.exit(0);
    }
  }

  const network = await p.select({
    message: 'Which network are you building for?',
    options: [
      { value: 'evm', label: 'EVM (Ethereum, Polygon, L2s)' },
      { value: 'solana', label: 'Solana' },
      { value: 'sui', label: 'Sui' },
    ],
    initialValue: 'evm',
  });

  if (p.isCancel(network)) {
    p.cancel('Operation cancelled.');
    process.exit(0);
  }

  const templateOptions: Record<string, { value: string; label: string }[]> = {
    evm: [
      { value: 'next', label: 'Next.js' },
      { value: 'vite', label: 'Vite (React)' },
      { value: 'tanstack', label: 'TanStack Start' },
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

  const templateList = templateOptions[network as string];

  const template = await p.select({
    message: 'Which framework do you want to use?',
    options: templateList,
  });

  if (p.isCancel(template)) {
    p.cancel('Operation cancelled.');
    process.exit(0);
  }

  p.outro(
    `Project configuration complete! We will scaffold ${pc.cyan(projectName)} targeting ${pc.cyan(network as string)} using ${pc.cyan(template as string)}.`
  );

  return {
    projectName,
    network: network as string,
    template: template as string,
  };
}
