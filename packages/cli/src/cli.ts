import path from 'node:path';
import { Command } from 'commander';
import logSymbols from 'log-symbols';
import pc from 'picocolors';
import prompts from 'prompts';
import { isEmptyDirectory } from './utils/fs.js';
import { getPackageManager } from './utils/scaffold.js';

export type Network = 'evm' | 'solana' | 'sui';

export interface CliResults {
  projectPath: string;
  network: Network;
  template: string;
  installDeps: boolean;
  includeAgents?: boolean;
}

const TEMPLATES: Record<Network, { value: string; label: string }[]> = {
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

  const options = program.opts();
  const [projectPathArg] = program.args;
  const pkgManager = getPackageManager();

  const response = await prompts(
    [
      {
        type: projectPathArg ? null : 'text',
        name: 'projectPath',
        message: 'What is the project name?',
        initial: projectPathArg || 'my-dapp',
      },
      {
        type: options.network ? null : 'select',
        name: 'network',
        message: 'Which network do you want to use?',
        initial: options.network ? 0 : undefined,
        choices: [
          { title: 'EVM', value: 'evm' },
          { title: 'Solana', value: 'solana' },
          { title: 'Sui', value: 'sui' },
        ],
      },
      {
        type: options.template ? null : 'select',
        name: 'template',
        message: 'Which template do you want to use?',
        choices: (prev) => {
          const network = options.network || prev;
          return TEMPLATES[network as Network].map((t) => ({ title: t.label, value: t.value }));
        },
      },
      {
        type: (prev) => {
          const template = options.template || prev;
          return template === 'next' ? 'toggle' : null;
        },
        name: 'includeAgents',
        message:
          'Would you like to include AGENTS.md to guide coding agents to write up-to-date Next.js code?',
        initial: true,
        active: 'yes',
        inactive: 'no',
      },
      {
        type: options.default ? null : 'toggle',
        name: 'installDeps',
        message: `Do you want to install dependencies with ${pkgManager}?`,
        initial: true,
        active: 'yes',
        inactive: 'no',
      },
    ],
    {
      onCancel: () => {
        console.log(pc.red(`\n${logSymbols.error} Installation cancelled.`));
        process.exit(1);
      },
    }
  );

  const projectPath = path.resolve(
    process.cwd(),
    response.projectPath || projectPathArg || 'my-dapp'
  );

  if (!(await isEmptyDirectory(projectPath))) {
    console.error(pc.red(`\n${logSymbols.error} Directory ${pc.cyan(projectPath)} is not empty.`));
    process.exit(1);
  }

  return {
    projectPath,
    network: options.network || response.network,
    template: options.template || response.template,
    installDeps: options.default ? true : response.installDeps,
    includeAgents: response.includeAgents,
  };
}
