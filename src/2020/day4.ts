import { numBetween } from "./lib";
import Validator, { Rule } from "./lib/Validator";

enum PassportFields {
  BIRTH_YR = 'byr',
  ISSUE_YR = 'iyr',
  EXP_YR = 'eyr',
  HEIGHT = 'hgt',
  HAIR_CL = 'hcl',
  EYE_CL = 'ecl',
  PASSPORT_ID = 'pid',
  COUNTRY_ID = 'cid',
}
type Passport = {
  byr?: string,
  iyr?: string,
  eyr?: string,
  hgt?: string,
  hcl?: string,
  ecl?: string,
  pid?: string,
  cid?: string,
};

export const requiredFields: Rule<Passport> = (passport) => {
  const required = [
    PassportFields.BIRTH_YR,
    PassportFields.ISSUE_YR,
    PassportFields.EXP_YR,
    PassportFields.HEIGHT,
    PassportFields.HAIR_CL,
    PassportFields.EYE_CL,
    PassportFields.PASSPORT_ID,
  ];

  return required.every(reqKey => passport[reqKey]);
};

export const birthYear: Rule<Passport> = (passport) => {
  if (!passport[PassportFields.BIRTH_YR]) {
    return false;
  }

  return numBetween(Number(passport[PassportFields.BIRTH_YR]), 1920, 2002);
};

export const issueYear: Rule<Passport> = (passport) => {
  if (!passport[PassportFields.ISSUE_YR]) {
    return false;
  }

  return numBetween(Number(passport[PassportFields.ISSUE_YR]), 2010, 2020);
};

export const expYear: Rule<Passport> = (passport) => {
  if (!passport[PassportFields.EXP_YR]) {
    return false;
  }
  return numBetween(Number(passport[PassportFields.EXP_YR]), 2020, 2030);
};

export const height: Rule<Passport> = (passport) => {
  const passportHeight = passport[PassportFields.HEIGHT];

  if (!passportHeight) {
    return false;
  }

  if (/^\d+cm$/.test(passportHeight)) {
    const height = Number(passportHeight.split('cm')[0]);
    return numBetween(height, 150, 193);
  }

  if (/\d+in$/.test(passportHeight)) {
    const height = Number(passportHeight.split('in')[0]);
    return numBetween(height, 59, 76);
  }

  return false;
};

export const hair: Rule<Passport> = (passport) => {
  const color = passport[PassportFields.HAIR_CL];

  if (!color) {
    return false;
  }

  return /^#[0-9a-z]{6}$/.test(color);
};

export const eyes: Rule<Passport> = (passport) => {
  const color = passport[PassportFields.EYE_CL];

  if (!color) {
    return false;
  }
  return ['amb', 'blu', 'brn', 'gry', 'grn', 'hzl', 'oth'].indexOf(color) > -1;
};

export const pid: Rule<Passport> = (passport) => {
  const pid = passport[PassportFields.PASSPORT_ID];

  if (!pid) {
    return false;
  }

  return /^[0-9]{9}$/.test(pid);
};

const getPassports = (input: Array<string>): Passport[] => {
  const passports: Passport[] = [];

  let currentPassport: Passport = {};

  for (const line of input) {
    if (line == '') {
      passports.push(currentPassport);
      currentPassport = {};
    }

    const entries = line.split(/\s/);
    entries.forEach((entry) => {
      const [key, val] = entry.split(':') as [keyof Passport, string];
      currentPassport[key] = val;
    });
  }

  passports.push(currentPassport);

  return passports;
};

function part1(input: Array<string>) {
  const passports = getPassports(input);
  return new Validator<Passport>([requiredFields]).filterInvalid(passports).length;
}

function part2(input: Array<string>) {
  const passports = getPassports(input);

  return new Validator<Passport>([
    requiredFields,
    birthYear,
    issueYear,
    expYear,
    height,
    hair,
    eyes,
    pid,
  ]).filterInvalid(passports).length;
}

export {
  part1,
  part2
};
