const countUniqueSegments = (segments: string[]): number => {
  let sum = 0;

  segments.forEach(segment => {
    switch (segment.length) {
      case 2:
      case 3:
      case 4:
      case 7:
        sum++;
        break;
      default:
    }
  });

  return sum;
};

const getSegmentMap = (segmentInput: string[]) => {
  const sortedInputs = segmentInput.sort((a, b) => a.length - b.length);
  // Num - Segments
  // 0 - 6
  // 1 - 2 Unique!
  // 2 - 5
  // 3 - 5
  // 4 - 4 Unique!
  // 5 - 5
  // 6 - 6
  // 7 - 3 Unique!
  // 8 - 7 Unique!
  // 9 - 6

  // Sorted lengths
  // 1 7 4 2/3/5 2/3/5 2/3/5 0/6/9 0/6/9 0/6/9 8

  const key: string[] = new Array(10).fill('');

  // Sorted lengths = [1,7,4,....,8,...];
  key[1] = sortedInputs.shift() as string;
  key[7] = sortedInputs.shift() as string;
  key[4] = sortedInputs.shift() as string;
  key[8] = sortedInputs.pop() as string;

  let threeTwoFive = sortedInputs.slice(0, 3);
  let zeroNineSix = sortedInputs.slice(3, 6);

  // Deduce other segments by comparing to known
  key[6] = zeroNineSix.filter(e => !([...key[1]].every(f => e.includes(f))))[0];
  zeroNineSix = zeroNineSix.filter(e => e !== key[6]);
  key[9] = zeroNineSix.filter(e => [...key[4]].every(f => e.includes(f)))[0];
  key[0] = zeroNineSix.filter(e => e !== key[9])[0];
  key[3] = threeTwoFive.filter(e => [...key[1]].every(f => e.includes(f)))[0];
  threeTwoFive = threeTwoFive.filter(e => e !== key[3]);
  key[5] = threeTwoFive.filter(e => [...e].every(f => key[6].includes(f)))[0];
  key[2] = threeTwoFive.filter(e => e !== key[5])[0];

  return [...key.entries()].reduce((lookup: { [key: string]: number }, [num, segments]) => {
    const sortedSegments = sortSegments(segments);
    lookup[sortedSegments] = num;

    return lookup;
  }, {});
};

const getIO = (input: string): { inputs: string[], outputs: string[] } => {
  const [inputs, outputs] = input.split(' | ').map(segments => segments.split(' '));
  return { inputs, outputs };
};

const sortSegments = (segment: string): string => {
  return segment.split('').sort().join('');
};

function part1(input: Array<string>) {
  return input.reduce((sum, data) => {
    const { outputs } = getIO(data);
    return sum += countUniqueSegments(outputs);
  }, 0);
}

function part2(input: Array<string>) {
  let output = 0;

  for (const line of input) {
    const { inputs, outputs } = getIO(line);
    const segmentMap = getSegmentMap(inputs);

    output += outputs.reduce((outputValue, outputSegments) => {
      outputValue = outputValue * 10 + segmentMap[sortSegments(outputSegments)];
      return outputValue;
    }, 0);
  }

  return output;
}

export {
  part1,
  part2
};
