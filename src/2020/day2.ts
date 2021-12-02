import { logicalXor, numBetween } from './lib';

type PasswordParts = {
  a: number;
  b: number;
  char: string;
  password: string;
};
type Validator = (rule: PasswordParts) => boolean;

export const getParts = (inputString: string): PasswordParts => {
  const reg = /(\d+)-(\d+) (\w): (\w+)/;
  const parts = inputString.match(reg);

  if (!parts) {
    throw new Error(`Unknown rule structure ${inputString}`);
  }

  return {
    a: Number(parts[1]),
    b: Number(parts[2]),
    char: parts[3],
    password: parts[4],
  };
};

const validate = (input: Array<string>, validatorFn: Validator) => (
  input.reduce((count, passwordLine) => {
    const validatorParts = getParts(passwordLine);

    if (validatorFn(validatorParts)) {
      return count + 1;
    }
    return count;
  }, 0)
);

function part1(input: Array<string>) {
  return validate(input, (rule) => {
    const charCount = rule.password.split(rule.char).length - 1;
    return numBetween(charCount, rule.a, rule.b);
  });
}

function part2(input: Array<string>) {
  return validate(input, (rule) => {
    const charA = rule.password[rule.a];
    const charB = rule.password[rule.b];

    return logicalXor(charA === rule.char, charB === rule.char);
  });
}

export { part1, part2 };
