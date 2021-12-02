# Advent of Code Solutions

Collection of solutions for the [Advent of Code](https://adventofcode.com/).

Bootstrapped using [aocjs/cli](https://github.com/aocjs/cli)

Started during 2021 but slowly porting over previous years solutions.

## Setup

Create a `.aorc` file

```json
{
  "$schema": "https://raw.githubusercontent.com/aocjs/cli/main/schema/schema.json",
  "session": "ENTER YOUR COOKIE HERE",
  "compiler": "ts",
  "year": TARGET_YEAR
}
```

## Run

Run a paticular day with `npm run dayX` and that day for the year mentioned in `.aocrc` will run.

### Testing

```javascript
npm run test  // Runs all tests
npm run test YEAR/dayX  // Runs tests for year/day combo
```
