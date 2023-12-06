function parseLines(lines: string[]) {
    const sorted_data: Record<string, Record<string, number>[]> = {};
    lines.forEach(line => {
        const parts = line.split(": ");
        const game_id = parts[0].split(" ")[1];
        sorted_data[game_id] = [];
        const game_samples = parts[1].split("; ");
        game_samples.forEach((sample, i) => {
            sorted_data[game_id].push({});
            const sub_samples = sample.split(", ");
            sub_samples.forEach(sub_sample => {
                const sub_sample_data = sub_sample.split(" ");
                const sub_sample_color = sub_sample_data[1];
                const sub_sample_number = sub_sample_data[0];
                sorted_data[game_id][i][sub_sample_color] = parseInt(sub_sample_number);
            });
        })
    });
    return sorted_data;
}

function getValidSamples(data: Record<string, Record<string, number>[]>, validator: Record<string, number> = {red: 12, green: 13, blue: 14}) {
    const validIDs: string[] = [];
    for (const [id, games] of Object.entries(data)) {
        let isValid = true;
        games.forEach((samples: Record<string, number>) => {
            if (isValid) {
                for (const [color, value] of Object.entries(samples)) {
                    if (validator[color] < value ) {
                        isValid = false;
                        break
                    }
                }
            }
        });
        if (isValid) validIDs.push(id);
    }
    return validIDs;
}

function getLowestValues(data: Record<string, Record<string, number>[]>) {
    const lowestValues: Record<string, Record<string, number>> = {};
    for (const [id, games] of Object.entries(data)) {
        const lowestSample: Record<string, number> = { red: 0, green: 0, blue: 0 };
        games.forEach(samples => {
            for (const [color, value] of Object.entries(samples)) {
                if (lowestSample[color] <= value) lowestSample[color] = value;
            };
        });
        for (const [color, value] of Object.entries(lowestSample)) {
            if (value === 0) lowestSample[color] = 0;
        }
        lowestValues[id] = lowestSample;
    }
    return lowestValues;
}

function getTotalPower(data: Record<string, Record<string, number>>) {
    let totalPower = 0;
    for (const [id, samples] of Object.entries(data)) {
        let subPower = 1;
        for (const [color, value] of Object.entries(samples)) {
            subPower *= value;
        }
        totalPower += subPower;
    };
    return totalPower;
}

const solve = (lines: string[]): number[] => {
    // process lines
    const parsed_data = parseLines(lines);

    // solve part 1
    const validSamples = getValidSamples(parsed_data);
    let totalSum = 0;
    validSamples.forEach(n => totalSum += parseInt(n));

    // solve part 2
    const totalPower = getTotalPower(getLowestValues(parsed_data));

    // return both solutions
    return [totalSum, totalPower];
}

export default solve;
