import { mkdirp, pathExists, readdir } from 'fs-extra';

export async function isEmptyDirectory(dirPath: string): Promise<boolean> {
  if (!(await pathExists(dirPath))) {
    return true;
  }
  const files = await readdir(dirPath);
  return files.length === 0 || (files.length === 1 && files[0] === '.git');
}

export async function createDir(dirPath: string) {
  if (!(await pathExists(dirPath))) {
    await mkdirp(dirPath);
  }
}
