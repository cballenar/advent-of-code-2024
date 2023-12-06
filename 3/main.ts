const SYMBOLS = /[^a-zA-z0-9\.]/g;
const NUMBERS = /[0-9]*/g;
const ASTERISKS = /\*/g;

interface Gear {
    row: number;
    col: number;
    hits: number[];
}

function findGears(lines: string[]) {
    const allGears: Gear[] = [];
    lines.forEach((line,i)=>{
        [...line.matchAll(ASTERISKS)].forEach(match => {
            if (match.index) allGears.push( { row: i, col: match.index, hits: [] } )
        });
    });

    return allGears;
}

function processLines(lines: string[], part=1) {
    const validNumbers: number[] = [];

    const allGears = (part === 2) ? findGears(lines) : [];

    lines.forEach((line, i) => {
        const numbers = [...line.matchAll(NUMBERS)].filter(n => n[0]!=="");
        
        numbers.forEach(number => {
            const startPos = number.index ?? 0;
            const endPos = startPos + number[0].length;
            
            const target_lines = (i===0) ? [i, i+1] : (i===lines.length-1) ? [i-1, i]: [i-1, i, i+1];

            let isValid = false;
            for (let ii = 0; ii < target_lines.length; ii++) {
                const li = target_lines[ii];
                const currentLine = lines[li];

                if (part === 1) {
                    const symbols = [...currentLine.matchAll(SYMBOLS)];
                
                    if (!symbols.length) continue;
    
                    while (symbols.length) {
                        const symbol = symbols.shift();
                        if (startPos-1 <= symbol.index && symbol.index <= endPos) {
                            // console.log(number[0], li, startPos-1, symbol.index, endPos);
                            isValid = true;
                        }
                    }
                } else {
                    const gears = [...currentLine.matchAll(ASTERISKS)];
                    
                    if (!gears.length) continue;
    
                    while (gears.length) {
                        const gear = gears.shift();
                        // console.log(gear);
                        if (startPos-1 <= gear.index && gear.index <= endPos) {
                            // console.log(number[0], li, startPos-1, gear.index, endPos);
                            const validGear = allGears.findIndex(globalGear => globalGear.row === li && globalGear.col === gear.index);
                            // console.log(validGear);
                            allGears[validGear].hits.push( Number(number[0]) );
                        }
                    }
                }
            }
            if (isValid) validNumbers.push( Number(number[0]) );
        })
    });
    return part === 1 ? validNumbers : allGears;
}

function getGearRatios(gears: Gear[]) {
    let totalProduct = 0;
    gears.forEach(gear => {
        let ratio = 1;
        if (gear.hits.length > 1) {
            gear.hits.forEach(hit => ratio*=hit);
            totalProduct += ratio;
        }
    })
    return totalProduct;
}

const solve = (lines: string[]): number[] => {
    // process lines
    const validNumbers = processLines(lines, 1);

    // solve part 1
    const part1 = validNumbers.reduce((p,c) => p + Number(c), 0);

    // solve part 2
    const part2 = getGearRatios(processLines(lines, 2));

    // return both solutions
    return [part1, part2];
}

export default solve;
