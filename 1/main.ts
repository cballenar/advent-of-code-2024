const numbers = [
    ["zero", "z0o"],
    ["one", "o1e"], 
    ["two", "t2o"], 
    ["three", "t3e"], 
    ["four", "f4r"], 
    ["five", "f5e"], 
    ["six", "s6x"], 
    ["seven", "s7n"], 
    ["eight", "e8t"],
    ["nine", "n9e"]
];

function replace_numbers(line: string): string {
    const matches: RegExpMatchArray[] = [];

    // find all matches
    numbers.forEach((n)=>{
        const match = line.match(n[0]);
        if (match) matches.push(match);
    });

    if (!matches.length) return line;

    // replace earliest match
    const lowest_match_value = matches.reduce((prev, curr) => prev?.index > curr?.index ? curr : prev, {index:999})[0];
    const new_line = line.replace(`${lowest_match_value}`, numbers.find(n => n[0] === lowest_match_value)[1])
    return replace_numbers(new_line);
}

function trebuchet(lines: string[], doReplace: boolean) {
    let total_sum = 0;
    lines.forEach((line)=> {
        const targetLine = doReplace ? replace_numbers(line) : line;
        console.log(targetLine);
        const digits = [];
        for (const char of targetLine) {
            const digit = parseInt(char);
            if (!isNaN(digit)) digits.push(digit);
        }
        console.log(digits);
        total_sum += parseInt(digits[0] + "" + digits[digits.length-1]);
    });
    return total_sum;
}

const solve = (lines: string[]): number[] => {
    // solve part 1
    const part1 = trebuchet(lines, false);

    // solve part 2
    const part2 = trebuchet(lines, true);

    // return both solutions
    return [part1, part2];
}

export default solve;