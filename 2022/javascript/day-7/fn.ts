import { IAoCInput } from "../../../utils/javascript/deno-utils/input.ts";

interface ICommand {
  command: string;
  args: string[];
}

interface IFile {
  name: string;
  size: number;
}

interface IDirectory {
  name: string;
  files: ReadonlyArray<IFile>;
  directories: ReadonlyArray<IDirectory>;
  parent: IDirectory | null;
  size?: number;
}

const isCommand = (line: string) => line.startsWith("$");
const isDirectory = (line: string) => line.startsWith("dir");
const isFile = (line: string) => !isCommand(line) && !isDirectory(line);
const parseCommand = (line: string): ICommand => {
  const [_, command, ...args] = line.split(" ");
  return { command, args };
};
const parseFile = (line: string): IFile => {
  const [size, name] = line.split(" ");
  return { name, size: parseInt(size, 10) };
};
const parseDirectory = (line: string): IDirectory => {
  const [_, name] = line.split(" ");
  return { name, files: [], directories: [], parent: null };
};
const parseInput = (lines: ReadonlyArray<string>): IDirectory => {
  const root = parseDirectory("dir /");
  let currentDir = root;
  let currentLineIndex = 1;
  while (currentLineIndex < lines.length) {
    const currentLine = lines[currentLineIndex];
    if (isCommand(currentLine)) {
      const { command, args } = parseCommand(currentLine);
      if (command === "cd") {
        if (args[0] === "..") {
          currentDir = currentDir.parent || currentDir;
        } else {
          const newDir = currentDir.directories.find((d) => d.name === args[0]);
          if (newDir) {
            currentDir = newDir;
          } else {
            throw new Error("Directory not found");
          }
        }
      }
    } else if (isDirectory(currentLine)) {
      const newDir = parseDirectory(currentLine);
      newDir.parent = currentDir;
      currentDir.directories = [...currentDir.directories, newDir];
    } else if (isFile(currentLine)) {
      const newFile = parseFile(currentLine);
      currentDir.files = [...currentDir.files, newFile];
    } else {
      throw new Error("Unknown line type");
    }
    currentLineIndex++;
  }
  return root;
};
const computeSizeForDir = (dir: IDirectory) => {
  dir.directories.forEach(computeSizeForDir);
  dir.size = dir.files.map(({ size }) => size).reduce((a, b) => a + b, 0) +
    dir.directories.map(({ size }) => size as number).reduce(
      (a, b) => a + b,
      0,
    );
};
const getSizeBelow =
  (limit: number) => (dir: IDirectory): ReadonlyArray<number> => {
    const sizes = dir.directories.map(getSizeBelow(limit)).reduce(
      (a, b) => [...a, ...b],
      [],
    );
    if (dir.size as number > limit) {
      return sizes;
    }
    return [dir.size as number, ...sizes];
  };
const getAllSizes = (dir: IDirectory): ReadonlyArray<number> => {
  const sizes = dir.directories.map(getAllSizes).reduce(
    (a, b) => [...a, ...b],
    [],
  );
  return [dir.size as number, ...sizes];
};

export const fn1 = ({ input }: IAoCInput) => {
  const sizeLimit = 100000;
  const root = parseInput(input);
  computeSizeForDir(root);
  return getSizeBelow(sizeLimit)(root).reduce((a, b) => a + b, 0);
};
export const fn2 = ({ input }: IAoCInput) => {
  const TOTAL_SIZE = 70000000;
  const REQUIRED_SIZE = 30000000;
  const root = parseInput(input);
  computeSizeForDir(root);
  const unUsedSpace = TOTAL_SIZE - (root.size as number);
  return Math.min(
    ...getAllSizes(root).filter((s) => s > REQUIRED_SIZE - unUsedSpace),
  );
};
