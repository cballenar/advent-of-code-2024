const solve = (lines: string[]): number[] => {
    const directions = Array.from(lines.shift());
    console.log(directions);

    // process lines
    const parsedRoads: Record<string, string[]> = lines.reduce((routes, line) => {
        // match "AAA = (BBB, CCC)"
        const RE = /(.+)\s\=\s\((.+)\,\s(.+)\)/;
        const match = line.match(RE);
        // console.log(match);
        
        if (match) {
            routes[match[1]] = [match[2], match[3]];
        }
        return routes;
    }, {});
    // console.log(parsedRoads);

    function getStepsInStraightRoute() {
        const targetPosition = 'ZZZ';
        let nextPosition = 'AAA',
            stepNumber = 0,
            totalSteps = 0;
    
        while (nextPosition !== targetPosition) {
            // get next step
            const nextDirection = directions[stepNumber] === "R" ? 1 : 0;
    
            // calculate next position
            nextPosition = parsedRoads[nextPosition][nextDirection];
    
            // calculate total steps
            totalSteps += 1;
    
            // calculate next step and reset if needed
            stepNumber += 1;
            stepNumber === directions.length && (stepNumber = 0);
        };

        return totalSteps;
    }
    
    const startingNodes = Object.keys(parsedRoads).filter(k => k.endsWith('A'));
    let nextNodes = startingNodes;
    console.log(startingNodes);

    const targetsNeeded = startingNodes.length;
    let targetsHit = 0,
        stepNumber = 0,
        totalSteps = 0;
    while (targetsHit !== targetsNeeded) {
        // get next step
        const nextDirection = directions[stepNumber] === "R" ? 1 : 0;

        // calculate next position for each target
        nextNodes = nextNodes.map(n => parsedRoads[n][nextDirection]);
        
        targetsHit = nextNodes.filter(node => node.endsWith('Z')).length;

        // calculate total steps
        totalSteps += 1;

        // calculate next step and reset if needed
        stepNumber += 1;
        stepNumber === directions.length && (stepNumber = 0);

        console.log(totalSteps, nextNodes);
    }

    console.log(totalSteps, nextNodes);
    
    

    // solve part 1
    const part1 = 0; //getStepsInStraightRoute();

    // solve part 2
    const part2 = 0;

    // return both solutions
    return [part1, part2];
}

export default solve;
