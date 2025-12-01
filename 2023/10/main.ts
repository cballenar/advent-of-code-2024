import * as math from "https://deno.land/x/math@v1.1.0/matrix/mod.ts";

const realPipes = {
    "S": {
        gui: "S",
        io: [0, 1, 2, 3]
    },
    "|": {
        gui: "│",
        io: [0, 2]
    },
    "-": {
        gui: "─",
        io: [1, 3]
    },
    "J": {
        gui: "┘",
        io: [0, 3]
    },
    "L": {
        gui: "└",
        io: [0, 1]
    },
    "7": {
        gui: "┐",
        io: [2, 3]
    },
    "F": {
        gui: "┌",
        io: [1, 2]
    }
};

const solve = (lines: string[]): number[] => {
    const linesArray = lines.map((line) => Array.from(line)); // .map(c=> realPipes[c]?.gui || c)

    // process lines
    const data = new math.Matrix(linesArray);
    console.log(data.matrix);

    const matrixWidth = data.matrix[0].length;
    const matrixHeight = data.matrix.length;

    // find starting point
    let start: [number, number] = [0, 0];
    data.matrix.forEach((row, i) => {
        row.forEach((cell, j) => {
            if (cell === "S") {
                start = [i, j];
            }
        });
    });
    // console.log(start);

    // define surrounding cells
    function getSurroundings(coordinates: [number, number]): number[][] {
        const surrounding = [
            [-1,  0],
            [ 0,  1],
            [ 1,  0],
            [ 0, -1]
        ];
        const surroundings = surrounding.map(([dy, dx]) => {
            if (coordinates === undefined) return undefined;
            // console.log(coordinates, dy, dx);
            
            const targetY = parseInt(coordinates[0]) + dy;
            const targetX = parseInt(coordinates[1]) + dx;
            if (targetX < 0 || targetX >= matrixWidth || targetY < 0 || targetY >= matrixHeight) {
                return undefined;
            }
            return [targetY, targetX];
        });
        return surroundings;
    }

    // define From and To
    const fromTo = {
        "0": 2,
        "1": 3,
        "2": 0,
        "3": 1
    };

    // define possible pipes
    function getPossiblePipes( coordinates: [number, number], from: number = -1): [[number, number], number][] {
        const possiblePipes = getSurroundings(coordinates)
            .map((target, i) => [target, fromTo[i.toString()]])
            .filter(([target,], i) => {
                if ( target === undefined) return false;

                const [y, x] = target;
                const cell = data.pointAt(y, x);
                const isNotSameWay = from !== i; // fromTo[from.toString()] === i;
                const validation = isNotSameWay && (
                    (i === 0) ? (cell === "|" || cell === "F" || cell === "7") :
                    (i === 1) ? (cell === "-" || cell === "J" || cell === "7") :
                    (i === 2) ? (cell === "|" || cell === "J" || cell === "L") :
                    (i === 3) ? (cell === "-" || cell === "F" || cell === "L") : false );

                // console.log(from, i, isNotSameWay, cell, target, validation);
                return validation;
            });
        return possiblePipes;
    }

    function getNextPipe(targetPipe): [[number, number], number][] {
        const [coordinates, from] = targetPipe;
        const cell = data.pointAt(coordinates[0], coordinates[1]);
        const exit = realPipes[cell].io.filter(c=>c!==from)[0];
        const nextPipe = [getSurroundings(coordinates)[exit], fromTo[exit.toString()]];
        return nextPipe;
    }

    let steps = 1;
    let nextPipes = getPossiblePipes(start);
    while ( nextPipes[0][0].join(',') !== nextPipes[1][0].join(',')) {
        steps += 1;
        nextPipes = nextPipes.map(getNextPipe);
        console.log(steps, nextPipes, data.pointAt(nextPipes[0][0][0], nextPipes[0][0][1]), data.pointAt(nextPipes[1][0][0], nextPipes[1][0][1]));
    }
    console.log(steps, nextPipes);

    // solve part 1
    const part1 = steps;

    // solve part 2
    const part2 = 0;

    // return both solutions
    return [part1, part2];
}

export default solve;
