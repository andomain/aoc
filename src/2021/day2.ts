type SubPosition = {
  height: number,
  depth: number,
  aim: number,
}

type Instruction = {
  dir: string,
  amount: number,
}

type NavigatorFn = (pos: SubPosition, instruction: Instruction) => SubPosition

// Basic up/down/forward
const navigatorFn1: NavigatorFn = (pos, { dir, amount }) => {
  switch (dir) {
    case 'forward': pos.height += amount;
      break;
    case 'up': pos.depth -= amount;
      break;
    case 'down': pos.depth += amount;
      break;
    default: throw new Error(`Unknown direction ${dir}`);
  }
  return pos;
};

// Aim based depth navigation
const navigatorFn2: NavigatorFn = (pos, { dir, amount }) => {
  switch (dir) {
    case 'forward':
      pos.height += amount;
      pos.depth += pos.aim * amount;
      break;
    case 'up': pos.aim -= amount;
      break;
    case 'down': pos.aim += amount;
      break;
    default: throw new Error(`Unknown direction ${dir}`);
  }
  return pos;
};

// Apply a navigator function to a series of instructions
export const navigate = (
  input: Array<string>,
  navigatorFn: NavigatorFn,
  startPos: SubPosition = { height: 0, depth: 0, aim: 0 }
): SubPosition => {
  let position = startPos;

  input.forEach(line => {
    const [dir, amountStr] = line.split(/\s/);
    const amount = Number(amountStr);

    position = navigatorFn(position, { dir, amount });
  });

  return position;
};

function part1(input: Array<string>) {
  const position = navigate(input, navigatorFn1);
  return position.height * position.depth;
}

function part2(input: Array<string>) {
  const position = navigate(input, navigatorFn2);
  return position.height * position.depth;
}

export {
  part1,
  part2
};
