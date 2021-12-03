import { GameConsole, GameConsoleResponse, GameConsoleCode, GameConsoleOperation } from "./lib/GameConsole";

function part1(input: Array<string>) {
  const console = new GameConsole(input);
  const result = console.run();

  return result.data;
}

const mutateInstruction = (instruction: string) => {
  const [opCode, value] = instruction.split(/\s/);

  if (opCode === GameConsoleOperation.ACCUMULATOR) {
    return instruction;
  }

  if (opCode === GameConsoleOperation.NOP) {
    return `${GameConsoleOperation.JUMP} ${value}`;
  }

  return `${GameConsoleOperation.NOP} ${value}`;
};

function part2(input: Array<string>) {
  let result: GameConsoleResponse | null = null;
  let index = 0;


  while (!result || result.status !== GameConsoleCode.OK) {
    const mutatedInstructions = [...input];
    mutatedInstructions[index] = mutateInstruction(mutatedInstructions[index]);

    result = new GameConsole(mutatedInstructions).run();
    index++;
  }

  return result.data;
}

export {
  part1,
  part2
};
