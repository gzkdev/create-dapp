import logSymbols from 'log-symbols';
import { Ora } from 'ora';
import pc from 'picocolors';
import { removeDirectory } from './scaffold.js';

export type Result<T> = { data: T; error: null } | { data: null; error: Error };

export function trySafe<T, Args extends unknown[]>(fn: (...args: Args) => Promise<T>) {
  return async (...args: Args): Promise<Result<T>> => {
    try {
      const data = await fn(...args);
      return { data, error: null };
    } catch (error) {
      return { data: null, error: error as Error };
    }
  };
}

export class PromptsManager {
  constructor(
    private spinner: Ora,
    private projectPath: string
  ) {}

  async run<T, Args>(options: {
    startMsg?: string;
    successMsg?: string;
    fn: (args: Args) => Promise<T>;
    args: Args;
    silent?: boolean;
  }): Promise<T> {
    const { startMsg, successMsg, fn, args, silent = false } = options;

    if (!silent) {
      this.spinner.start(startMsg);
    }

    const { data, error } = await trySafe(fn)(args);

    if (error) {
      this.spinner.fail(pc.red(`${startMsg} failed`));
      console.error(pc.red(`\n${logSymbols.error} Critical Error:\n`));
      console.error(`${pc.dim(error.stack || error.message)}\n`);
      await removeDirectory(this.projectPath);
      process.exit(1);
    }

    if (!silent) {
      this.spinner.succeed(successMsg);
    }

    return data as T;
  }
}
