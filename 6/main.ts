const solve = (lines: string[]): number[] => {
    // process lines
    const racePairs: number[][] = getRacePairs(lines);
    console.log(racePairs);

    // trim
    racePairs.shift();


    // const raceTimes = racePairs.map(([timeAvail, distance]) => {
    //     const minValue = getLowestAttempt(timeAvail, distance);     
    //     const factors = getAttempts(timeAvail, distance, minValue);
        
    //     return factors;
    // });
    // console.log(raceTimes);

    // const lengths = raceTimes.map(times => times.length);
    // console.log(lengths);

    // const product = lengths.reduce((prev, curr) => prev * curr);
    // console.log(product);

    const quickTotals = racePairs.map(([timeAvail, distance]) => {
        const minPair = getLowestAttempt(timeAvail, distance);

        return (minPair[1] - minPair[0])+1;
    });
    console.log(quickTotals);
    
    const product = quickTotals.reduce((prev, curr) => prev * curr);
    console.log(product);

    // solve part 1
    const part1 = 0;

    // solve part 2
    const part2 = 0;

    // return both solutions
    return [part1, part2];
}

function getRacePairs(lines: string[]) {
    const races = lines.map(line => {
        const matches = line.match(/(.*)\:(.*)/);
        const numbers = matches[2].split(/\s+/).map(Number);
        return numbers;
    })
    const pairs = races[0].map((time, i) => [time, races[1][i]]);
    return pairs;
}

function getAttempts(time: number, distance: number, minValue = 2) {
    const attempts = [];
    for (let i = minValue; i <= time-minValue; i++) {
        const inverse = time-i;
        if (i * inverse > distance) attempts.push([i, inverse]);
    }
    return attempts;
}

function getLowestAttempt(time: number, distance: number) {
    const minValue = 2;
    for (let i = minValue; i <= time-minValue; i++) {
        const inverse = time-i;
        if (i * inverse > distance) return [i, inverse];
    }
}


// get factors of number
function getFactors(number: number) {
    const factors = [];
    for (let i = 1; i <= Math.sqrt(number); i++) {
        if (number % i === 0) {
            factors.push(i);
            if (number / i !== i) {
                factors.push(number / i);
            }
        }
    }
    return factors.sort((a, b) => a - b);
}

function getFactorPairs(number: number): number[][] {
    const factorPairs = [];
    for (let i = 1; i <= Math.sqrt(number); i++) {
        if (number % i === 0) {
            factorPairs.push([i, number / i]);
        }
    }
    return factorPairs.sort((a, b) => a[0] - b[0]);
}

function isBetween(number: number, range: number[]) {
    return number >= range[0] && number <= range[1];
}



export default solve;
