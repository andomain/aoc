import { isError } from "../../types";

export enum GameConsoleOperation {
  ACCUMULATOR = 'acc',
  JUMP = 'jmp',
  NOP = 'nop',
}

export enum GameConsoleCode {
  OK,
  ERROR,
  INFINITE_LOOP,
}

export type GameConsoleResponse = {
  status: GameConsoleCode,
  error: string | null,
  data: number,
}

export type GameConsoleInstruction = {
  opCode: GameConsoleOperation,
  value: number,
  visited: boolean,
}

const GameConsoleInstruction = (GameConsoleInstructionString: string): GameConsoleInstruction => {
  const [opCode, value] = GameConsoleInstructionString.split(/\s/);

  return {
    opCode: opCode as GameConsoleOperation,
    value: Number(value),
    visited: false,
  };
};

export class GameConsole {
  private acc: number;
  private iPtr: number;
  private iMemory: GameConsoleInstruction[];

  constructor(bootCode: string[]) {
    this.acc = 0;
    this.iPtr = 0;
    this.iMemory = this.parseGameConsoleInstructions(bootCode);
  }

  private parseGameConsoleInstructions(code: string[]): GameConsoleInstruction[] {
    return code.map(GameConsoleInstruction);
  }

  run(): GameConsoleResponse {
    try {
      while (this.iPtr < this.iMemory.length) {
        if (this.currentGameConsoleInstruction.visited) {
          return this.end(GameConsoleCode.INFINITE_LOOP, 'Infinite loop');
        }
        this.step();
      }

      return this.end(GameConsoleCode.OK);
    } catch (err) {
      const errMessage = isError(err) ? err.message : 'Something went wrong';
      return this.end(GameConsoleCode.ERROR, errMessage);
    }
  }

  private end(status: GameConsoleCode, error: string | null = null): GameConsoleResponse {
    return { status, error, data: this.acc };
  }

  public step() {
    this.executeGameConsoleInstruction(this.iPtr);
  }

  private executeGameConsoleInstruction(location: number) {
    const GameConsoleInstruction = this.iMemory[location];
    const { opCode, value } = GameConsoleInstruction;
    GameConsoleInstruction.visited = true;

    switch (opCode) {
      case GameConsoleOperation.NOP: {
        this.iPtr++;
        break;
      }
      case GameConsoleOperation.JUMP: {
        this.iPtr += value;
        break;
      }
      case GameConsoleOperation.ACCUMULATOR: {
        this.acc += value;
        this.iPtr++;
        break;
      }
      default: throw new Error(`Unknown opCode ${opCode}`);
    }
  }

  get accumulator() {
    return this.acc;
  }

  private get currentGameConsoleInstruction() {
    return this.iMemory[this.iPtr];
  }
}
