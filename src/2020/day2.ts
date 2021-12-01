import { logicalXor, numBetween } from "./lib";

type PasswordParts = {
  a: number
  b: number
  char: string
  password: string
}

const getParts = (inputString: string): PasswordParts => {
  const reg = /(\d+)\-(\d+) (\w): (\w+)/;
  const parts = inputString.match(reg)!;

  return {
    a: Number(parts[1]),
    b: Number(parts[2]),
    char: parts[3],
    password: parts[4],
  };
}

function part1(input: Array<string>) {
  return input.reduce((count, passwordLine) => {
    const { a, b, char, password } = getParts(passwordLine);
    const charCount = password.split(char).length - 1;
    if (numBetween(charCount, a, b)) {
      count++;
    }
    return count;
  }, 0);
}

function part2(input: Array<string>) {
  return input.reduce((count, passwordLine) => {
    const { a, b, char, password } = getParts(passwordLine);
    if (logicalXor(password[a - 1] === char, password[b - 1] === char)) {
      count++;
    }

    return count;

  }, 0);
}

export {
  part1,
  part2
}
