const getAdapterDiffs = (ratings: number[]): Map<number, number> => {
  const sorted = ratings.sort((a, b) => a - b);
  const numAdapters = ratings.length;

  let currentRating = 0;
  const diffs = new Map<number, number>([[1, 0], [2, 0], [3, 0]]);

  for (let i = 0; i < numAdapters; i++) {
    const diff = sorted[i] - currentRating;
    currentRating = sorted[i];
    const currentCount = diffs.get(diff) || 0;
    diffs.set(diff, currentCount + 1);
  }

  return diffs;
};

const countRoutes = (ratings: number[]): number => {
  // Descending sort
  const sorted = ratings.sort((a, b) => b - a);
  const max = sorted[0];

  const routes: { [key: number]: number } = {
    1: 0,
    2: 0,
    3: 0,
    [max]: 1,
  };

  sorted.slice(1).forEach((rating) => {
    let routeCount = 0;

    // For each descending value, look to see if there are ratings 1/2/3 below
    // Increment count for each one
    for (let i = rating + 1; i <= rating + 3; i++) {
      const count = routes[i];
      if (count !== undefined) {
        routeCount += count;
      }
    }

    routes[rating] = routeCount;
  });

  // sum route count 1/2/3 to find all possible configurations
  return routes[1] + routes[2] + routes[3];
};

function part1(input: Array<string>) {
  const ratings = input.map(Number);
  const diffs = getAdapterDiffs(ratings);

  return diffs.get(1)! * (diffs.get(3)! + 1);
}

function part2(input: Array<string>) {
  return countRoutes(input.map(Number));
}

export {
  part1,
  part2
};
