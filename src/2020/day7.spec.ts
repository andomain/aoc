import { BagMap, canBagContain, countBagsContained, getBags, part1, part2 } from "./day7";


describe('Day 7', () => {
  it('gets bags', () => {
    expect(() => getBags(['something incorrect'])).toThrow();
    expect(() => getBags(['light red bags contain something incorrect.'])).toThrow();
    expect(getBags(['light red bags contain 1 bright white bag, 2 muted yellow bags.'])).toEqual([{
      color: 'light red',
      contains: [
        { color: 'bright white', amount: 1 },
        { color: 'muted yellow', amount: 2 },
      ],
    }]);
  });

  it('checks a bag contains another', () => {
    const bagMap: BagMap = new Map();
    bagMap.set('red', {
      color: 'red',
      contains: [{ color: 'blue', amount: 1 }],
    });
    bagMap.set('blue', {
      color: 'blue',
      contains: [],
    });
    expect(canBagContain('wrongBag', 'blue', bagMap)).toBe(false);
    expect(canBagContain('blue', 'blue', bagMap)).toBe(false);
    expect(canBagContain('red', 'blue', bagMap)).toBe(true);
  });

  it('counts bags contained by another', () => {
    const bagMap: BagMap = new Map();
    bagMap.set('red', {
      color: 'red',
      contains: [{ color: 'blue', amount: 2 }],
    });
    bagMap.set('blue', {
      color: 'blue',
      contains: [{ color: 'green', amount: 3 }],
    });
    bagMap.set('green', {
      color: 'green',
      contains: [],
    });
    expect(() => countBagsContained('gold', bagMap)).toThrow();
    expect(countBagsContained('red', bagMap)).toBe(8);
    expect(countBagsContained('green', bagMap)).toBe(0);
  });

  describe('Part 1', () => {
    const testInput = [
      'light red bags contain 1 bright white bag, 2 muted yellow bags.',
      'dark orange bags contain 3 bright white bags, 4 muted yellow bags.',
      'bright white bags contain 1 shiny gold bag.',
      'muted yellow bags contain 2 shiny gold bags, 9 faded blue bags.',
      'shiny gold bags contain 1 dark olive bag, 2 vibrant plum bags.',
      'dark olive bags contain 3 faded blue bags, 4 dotted black bags.',
      'vibrant plum bags contain 5 faded blue bags, 6 dotted black bags.',
      'faded blue bags contain no other bags.',
      'dotted black bags contain no other bags.',
    ];
    it('is correct', () => {
      expect(part1(testInput)).toBe(4);
    });
  });

  describe('Part 2', () => {
    const testInput = [
      'shiny gold bags contain 2 dark red bags.',
      'dark red bags contain 2 dark orange bags.',
      'dark orange bags contain 2 dark yellow bags.',
      'dark yellow bags contain 2 dark green bags.',
      'dark green bags contain 2 dark blue bags.',
      'dark blue bags contain 2 dark violet bags.',
      'dark violet bags contain no other bags.'
    ];

    it('is correct', () => {
      expect(part2(testInput)).toBe(126);
    });
  });
});
