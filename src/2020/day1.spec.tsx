import { part1, part2 } from './day1';

const testInput = ['1721', '979', '366', '299', '675', '1456'];

describe('Day 1', () => {
    describe('Part 1', () => {
        it('is correct', () => {
            expect(part1(testInput)).toBe(514579);
        });
    });

    describe('Part 2', () => {
        it('is correct', () => {
            expect(part2(testInput)).toBe(241861950);
        });
    });
});
