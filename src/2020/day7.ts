const TARGET_COLOR = 'shiny gold';

type Bag = {
  color: string,
  contains: {
    color: string,
    amount: number,
  }[],
};
export type BagMap = Map<string, Bag>;

export const getBags = (input: Array<string>): Bag[] => input.map(line => {
  const ruleParts = /^\s*(.*) bags contain (.*)\.\s*$/gm.exec(line);
  if (!ruleParts) {
    throw new Error(`Unknown rule: ${line}`);
  }

  const color = ruleParts[1];
  const contains = ruleParts[2]
    .split(/,/g)
    .filter(containStr => !/no other bags/.test(containStr))
    .map((containStr) => {
      const colorMatch = /(\d+) ([\w\s]+) bag[s]?/.exec(containStr);
      if (!colorMatch) {
        throw new Error(`Unknown rule: ${line}`);
      }

      return { color: colorMatch[2], amount: Number(colorMatch[1]) };
    });

  return { color, contains };
});

export const canBagContain = (color: string, targetColor: string, bagLookup: BagMap): boolean => {
  const bag = bagLookup.get(color);

  if (!bag) {
    return false;
  }

  return bag.contains.some((contained) => contained.color === targetColor || canBagContain(contained.color, targetColor, bagLookup));
};

export const countBagsContained = (color: string, bagLookup: BagMap): number => {
  const bag = bagLookup.get(color);

  if (!bag) {
    throw new Error(`Unknown bag color: ${color}`);
  }

  return bag.contains.reduce((sum, contents) => {
    return sum + contents.amount + contents.amount * countBagsContained(contents.color, bagLookup);
  }, 0);
};

function part1(input: Array<string>) {
  const bags = getBags(input);

  const bagLookup = bags.reduce((lookup: BagMap, bag) => lookup.set(bag.color, bag), new Map);

  const bagsThatCanContain = new Set(
    bags.filter(bag => canBagContain(bag.color, TARGET_COLOR, bagLookup))
  );

  return bagsThatCanContain.size;
}

function part2(input: Array<string>) {
  const bags = getBags(input);
  const bagLookup = bags.reduce((lookup: BagMap, bag) => lookup.set(bag.color, bag), new Map);

  return countBagsContained(TARGET_COLOR, bagLookup);

}

export {
  part1,
  part2
};
