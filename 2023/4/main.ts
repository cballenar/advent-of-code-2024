function processLines(lines: string[]) {
    const RE = /\s(\d*)\:\s*(.*)\|\s*(.*)/;

    const cards: Record<string, [string[],string[],number]> = {};

    lines.forEach(line => {
        const lineParts = line.match(RE);
        if (lineParts) {
            const [, cardId, group1, group2] = lineParts;
            const g1 = group1.trim().split(' ').filter(n => n!=="");
            const g2 = group2.trim().split(' ').filter(n => n!=="");
            cards[cardId] = [g1, g2, 1];
        }
    });

    let points = 0;
    let totalCards = 0;
    Object.entries(cards).forEach(([cardId, [g1, g2, n]]) => {
        let wins = 0;
        g1.forEach(n => wins += g2.includes(n) ? 1 : 0);
        points += (wins > 0) ? Math.pow(2,wins-1) : 0;
        for (let i = 1; i <= wins; i++) {
            const targetCardId = (parseInt(cardId) + i).toString();
            if (cards[targetCardId]){
                cards[targetCardId].push(cards[targetCardId].pop() + n);
            }
        }
        totalCards += n;
    });
    return [points, totalCards];
}

const solve = (lines: string[]): number[] => {
    // process lines
    const parsedLines: number[] = processLines(lines);

    // solve part 1
    const part1 = parsedLines[0];

    // solve part 2
    const part2 = parsedLines[1];

    // return both solutions
    return [part1, part2];
}

export default solve;
