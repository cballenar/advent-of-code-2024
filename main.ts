import { getData, getLines } from "./utils.ts";

export async function challenge(day=0, isSample=false, overrideTestPath: string): Promise<string> {
  // build challenge directory
  const dir = `./${day.toString()}`;

  // get solve function
  const solve = await import(`${dir}/main.ts`);

  // get data
  const dataPath = overrideTestPath ?? `${dir}/data-${isSample ? 'sample' : 'input'}.txt`;
  const data = getData(dataPath);
  const lines = getLines(data);

  const solution = solve.default(lines);

  return `Part 1: ${solution[0]}\nPart 2: ${solution[1]}`;
}

if (import.meta.main) {
  const day = Deno.args[0] ? parseInt(Deno.args[0]) : 0;
  const isSample = Deno.args[1] === "true";
  const overrideTestPath = Deno.args[2];

  console.log(await challenge(day, isSample, overrideTestPath));
}
