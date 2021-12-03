import { GameConsole, GameConsoleCode } from ".";

describe('Console', () => {
  const testConsole = new GameConsole(['nop +0', 'acc +1', 'jmp -3']);

  it('initialises', () => {
    expect(testConsole.accumulator).toBe(0);
  });

  it('crashes', () => {
    const result = new GameConsole(['unknown']).run();
    expect(result.status).toBe(GameConsoleCode.ERROR);
    expect(result.error).toBe('Unknown opCode unknown');
  });

  it('steps through a basic program', () => {
    const testConsole = new GameConsole([
      'nop +0',
      'acc +3',
      'jmp +3',
      'nop +3',
      'nop +3',
      'acc -2',
      'jmp -5',
    ]);

    testConsole.step();
    expect(testConsole.accumulator).toBe(0);
    testConsole.step();
    expect(testConsole.accumulator).toBe(3);
    testConsole.step();
    expect(testConsole.accumulator).toBe(3);
    testConsole.step();
    expect(testConsole.accumulator).toBe(1);
    testConsole.step();
    expect(testConsole.accumulator).toBe(1);
    testConsole.step();
    expect(testConsole.accumulator).toBe(4);
  });

  it('runs until GameConsoleInstructions loops', () => {
    const testConsole = new GameConsole([
      'acc +3',
      'jmp +4',
      'nop +3',
      'nop +3',
      'acc -1',
      'acc +2',
      'jmp -4',
    ]);

    const result = testConsole.run();
    expect(result.status).toBe(GameConsoleCode.INFINITE_LOOP);
    expect(result.data).toBe(4);
  });

  it('runs until program completes', () => {
    const testConsole = new GameConsole([
      'acc +3',
      'nop +3',
      'nop +3',
    ]);

    const result = testConsole.run();
    expect(result.status).toBe(GameConsoleCode.OK);
    expect(result.data).toBe(3);
    expect(result.error).toBe(null);
  });
});
