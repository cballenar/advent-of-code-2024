const solve = (lines: string[]): number[] => {
    // process lines
    const parsedLines: number[] = lines.map(l => parseInt(l));

    // solve part 1
    const part1 = parsedLines.reduce((p:number, c:number) => p + c, 0);

    // solve part 2
    const part2 = parsedLines.reduce((p:number, c:number) => p * c, 1);

    // return both solutions
    return [part1, part2];
}

export default solve;
