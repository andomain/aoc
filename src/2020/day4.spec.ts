
import {
  birthYear,
  expYear,
  eyes,
  hair,
  height,
  issueYear,
  pid,
  part1,
  part2,
} from "./day4";

const testInput = [
  'ecl:gry pid:860033327 eyr:2020 hcl:#fffffd',
  'byr:1937 iyr:2017 cid:147 hgt:183cm',
  '',
  'iyr:2013 ecl:amb cid:350 eyr:2023 pid:028048884',
  'hcl:#cfa07d byr:1929',
  '',
  'hcl:#ae17e1 iyr:2013',
  'eyr:2024',
  'ecl:brn pid:760753108 byr:1931',
  'hgt:179cm',
  '',
  'hcl:#cfa07d eyr:2025 pid:166559648',
  'iyr:2011 ecl:brn hgt:59in',
];

describe('Day 4', () => {
  describe('Passport validators', () => {
    it('validate birth year', () => {
      expect(birthYear({ byr: '1919' })).toBe(false);
      expect(birthYear({ byr: '1920' })).toBe(true);
      expect(birthYear({ byr: '2002' })).toBe(true);
      expect(birthYear({ byr: '2003' })).toBe(false);
      expect(birthYear({})).toBe(false);
    });

    it('validate issue year ', () => {
      expect(issueYear({ iyr: '2009' })).toBe(false);
      expect(issueYear({ iyr: '2010' })).toBe(true);
      expect(issueYear({ iyr: '2020' })).toBe(true);
      expect(issueYear({ iyr: '2021' })).toBe(false);
      expect(issueYear({})).toBe(false);
    });

    it('validate expiry year ', () => {
      expect(expYear({ eyr: '2019' })).toBe(false);
      expect(expYear({ eyr: '2020' })).toBe(true);
      expect(expYear({ eyr: '2030' })).toBe(true);
      expect(expYear({ eyr: '2031' })).toBe(false);
      expect(expYear({})).toBe(false);
    });

    it('validates height', () => {
      expect(height({ hgt: '149cm' })).toBe(false);
      expect(height({ hgt: '150cm' })).toBe(true);
      expect(height({ hgt: '193cm' })).toBe(true);
      expect(height({ hgt: '194cm' })).toBe(false);
      expect(height({ hgt: '58in' })).toBe(false);
      expect(height({ hgt: '59in' })).toBe(true);
      expect(height({ hgt: '76in' })).toBe(true);
      expect(height({ hgt: '77in' })).toBe(false);
      expect(height({ hgt: '60ft' })).toBe(false);
      expect(height({})).toBe(false);
    });

    it('validate hair', () => {
      expect(hair({ hcl: '#123456' })).toBe(true);
      expect(hair({ hcl: '#1234567' })).toBe(false);
      expect(hair({ hcl: '#12345' })).toBe(false);
      expect(hair({ hcl: 'rgb(1,2,3)' })).toBe(false);
      expect(hair({})).toBe(false);
    });

    it('validate eye color', () => {
      expect(eyes({ ecl: 'amb' })).toBe(true);
      expect(eyes({ ecl: 'blu' })).toBe(true);
      expect(eyes({ ecl: 'brn' })).toBe(true);
      expect(eyes({ ecl: 'gry' })).toBe(true);
      expect(eyes({ ecl: 'grn' })).toBe(true);
      expect(eyes({ ecl: 'hzl' })).toBe(true);
      expect(eyes({ ecl: 'oth' })).toBe(true);
      expect(eyes({ ecl: 'a' })).toBe(false);
      expect(eyes({})).toBe(false);
    });

    it('validate PID', () => {
      expect(pid({ pid: '123456789' })).toBe(true);
      expect(pid({ pid: '12345678' })).toBe(false);
      expect(pid({ pid: '1234567890' })).toBe(false);
      expect(pid({})).toBe(false);
    });

  });
  describe('Part 1', () => {
    it('is correct', () => {
      expect(part1(testInput)).toBe(2);
    });
  });

  describe('Part 2', () => {
    it('is correct', () => {
      expect(part2(testInput)).toBe(2);
    });
  });
});
