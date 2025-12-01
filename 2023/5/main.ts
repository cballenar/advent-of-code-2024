function processSeeds(seeds, maps) {
    const trails: number[][] = seeds.map((seed) => {
        // console.log('-----------------------------');

        let prevValue = -2;
        const seedTrail = Object.entries(maps).map(([, currMap]) => {
            // console.log(currMap);

            let lowestDistance = 999999999999;
            if (prevValue === -2) prevValue = seed;

            const lowestDistanceIndex = currMap.reduce((targetIndex, currEntry, currIndex) => {
                const currentDiff = prevValue - currEntry.source;

                if (targetIndex === -1) {
                    lowestDistance = prevValue - 0;
                }
                lowestDistance = (0 <= currentDiff && currentDiff < lowestDistance) ? currentDiff : lowestDistance;

                return lowestDistance === currentDiff ? currIndex : targetIndex;
            }, -1);
            // console.log(prevValue, lowestDistanceIndex, lowestDistance);

            if (lowestDistanceIndex === -1) return prevValue;
            const nextEntry = currMap[lowestDistanceIndex];
            const rangeEnd = nextEntry.source + nextEntry.range;
            const destinationDiff = nextEntry.destination - nextEntry.source;
            prevValue = (prevValue <= rangeEnd) ? prevValue + destinationDiff : prevValue;

            // console.log(rangeEnd, destinationDiff, prevValue);

            return prevValue;
        });

        seedTrail.unshift(seed);
        return seedTrail;
    });
    // console.log(trails);

    const lowestNumber = trails.map((trail) => trail.pop()).reduce((p, c) => (p < c) ? p : c, 999999999999);

    console.log(lowestNumber);
    return lowestNumber;
}

function processKeypairSeeds(seeds, maps) {
    // build pairs from seeds
    const seedRanges = [];
    seeds.forEach((currSeed, index) => {
        if (index%2 !== 0) {
            const prevSeed = seeds[index-1];
            seedRanges.push([prevSeed, currSeed]);
        }
    });
    // console.log(seedRanges);

    let lowestNumber = 999999999999;
    while (seedRanges.length) {
        const seedRange = seedRanges[0];
        let [gCurrSeed,range] = seedRanges.shift();

        while (0<range) {
            
            let batchSize = 3000000;
            batchSize = batchSize < range ? batchSize : range;

            const seedsBatch = [];
            for (let i = 0; i < batchSize; i++) {
                seedsBatch.push(gCurrSeed + i);
            }
            // console.log(seedsBatch);

            const batchLowestNumber = processSeeds(seedsBatch, maps);

            lowestNumber = (batchLowestNumber < lowestNumber) ? batchLowestNumber : lowestNumber;

            gCurrSeed += batchSize;
            range -= batchSize;
            console.log(seedRange, gCurrSeed, lowestNumber);
        }
    }

    return lowestNumber;
}

const solve = (lines: string[]): number[] => {
    // process lines
    // const parsedLines: number[] = lines.map(l => parseInt(l));
    // console.log(lines);
    let seeds = lines.shift().split(": ")[1].split(" ").map((seed) => Number(seed));
    // console.log(seeds);

    let currMap = "";
    const maps: Record<string, Record<string, number>[]> = lines.reduce((mapsObject, currLine) => {
        if (currLine.endsWith(' map:')) {
            currMap = currLine.split(" ")[0];
            mapsObject[currMap] = [];
        }
        if (currLine !== "" && currLine[0].match(/\d/)) {
            const lineMap = currLine.split(" ");
            mapsObject[currMap].push({
                destination: Number(lineMap[0]),
                source: Number(lineMap[1]),
                range: Number(lineMap[2])
            });
        }
        return mapsObject;
    },{});
    // console.log(maps);

    // solve part 1
    const part1 = processSeeds(seeds, maps);

    // solve part 2
    const part2 = processKeypairSeeds(seeds, maps);

    // return both solutions
    return [part1, part2];
}

export default solve;
