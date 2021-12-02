import { splitByEmptyLine } from './lib';

const getUniqueAnswerCount = (groups: string[][]) => groups.reduce((sum, group) => {
  // Join rows and split into individual questions
  const uniqueAnswers = new Set(group.join('').split(''));
  return sum + uniqueAnswers.size;
}, 0);

const getSharedAnswerCount = (groups: string[][]): number => groups.reduce((sum, group) => {
  const groupSize = group.length;
  const allAnswers = group.join('').split('');
  const answerCount = allAnswers.reduce((lookup, answer) => {
    const current = lookup.get(answer) || 0;
    return lookup.set(answer, current + 1);
  }, new Map<string, number>());

  const allAnswered = Array.from(answerCount.values()).filter(count => count === groupSize);

  return sum += allAnswered.length;
}, 0);

function part1(input: Array<string>) {
  const groups = splitByEmptyLine(input);
  return getUniqueAnswerCount(groups);
}

function part2(input: Array<string>) {
  const groups = splitByEmptyLine(input);
  return getSharedAnswerCount(groups);
}

export {
  part1,
  part2
};
