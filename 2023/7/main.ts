const cards = {
    'e': 14,
    'd': 13,
    'c': 12,
    'b': 11,
    'a': 10,
    '9':  9,
    '8':  8,
    '7':  7,
    '6':  6,
    '5':  5,
    '4':  4,
    '3':  3,
    '2':  2
};
const counts = {
    '5': 1900000,
    '4': 110000,
    '3': 7000,
    '2': 100,
    '1': 0
};
const combos = {
    '11111': 1,
    '22111': 2,
    '22221': 3,
    '33311': 4,
    '33322': 5,
    '44441': 6,
    '55555': 7
};

function getHands(line: string): [string, number] {
    const parts = line.split(' ');
    return [parts[0], Number(parts[1])];
}

function parseToHex(hand: string) {
    return hand.replaceAll('T', 'a').replaceAll('J', 'b').replaceAll('Q', 'c').replaceAll('K', 'd').replaceAll('A', 'e');
}

function sortHand(hand: string) {
    return Array.from(hand).sort((a,b) => parseInt(a, 16) - parseInt(b, 16)).reverse().join('');
}

function getHandValue(hand: [string, number]) {
    const handValue = { 'hand': hand[0] };

    // group and count cards
    const countedCards = {};
    Array.from(hand[0]).forEach(c => countedCards[c] = countedCards[c] ? countedCards[c] + 1 : 1);
    // console.log(countedCards);

    const sortedCards = {};
    Object.keys(countedCards)
        .sort((a,b) => cards[a] - cards[b])
        .sort((a,b) => countedCards[a] - countedCards[b])
        .forEach(c => sortedCards[c] = countedCards[c]);
        // .sort((a,b) => cards[a] - cards[b])
        // .sort((a,b) => countedCards[a] - countedCards[b])
        // .forEach(c => sortedCards[countedCards[c]] = c);
    // console.log(sortedCards);

    handValue['score'] = Object.keys(sortedCards).reverse().reduce((p,c,i) => {
        const n = countedCards[c];
        const innerBonus = Math.pow(10,(5-i+1));
        const outerBonus = Math.pow(10, n);
        console.log(innerBonus, outerBonus);
        
        const value = (((counts[n] * cards[c]  * innerBonus) + (cards[c])) * outerBonus) + cards[c];

        // const n = Number(c);
        // const value = (counts[n] + cards[sortedCards[c]]) * Math.pow(10, n);

        return p + value;
    }, 0);

    handValue['bid'] = hand[1]

    return handValue;
}

function groupHands(hand: [string, number]) {
    // console.log(hand[0]);
    const handData = {};
    
    // group and count cards
    const countedGroups = {};
    Array.from(hand[0]).forEach(c => countedGroups[cards[c]] = countedGroups[cards[c]] ? countedGroups[cards[c]] + 1 : 1);
    // console.log(countedGroups);

    const sortedGroups = Object.keys(countedGroups)
        .sort((a,b) => cards[a] - cards[b])
        .sort((a,b) => countedGroups[a] - countedGroups[b])
        .reverse();
    // console.log(sortedGroups);

    const sortedGroupId = [];
    const sortedHand = [];

    sortedGroups
        .forEach(c => {
            const n = countedGroups[c];
            sortedGroupId.push(n.toString().repeat(n));
            sortedHand.push(Number(c).toString(16).repeat(n));
        });
    
    const handMultiplier = "0".repeat(combos[sortedGroupId.join('')]);

    
    handData['groupId'] = sortedGroupId.join('');
    handData['hand'] = sortedHand.join('');
    handData['bid'] = hand[1];

    sortedHand.push(handMultiplier);
    handData['handValue'] = parseInt(sortedHand.join(''), 16);
    
    return handData;
}

function getHandValueV2(hand: [string, number]) {
    handValue['score'] = Object.keys(sortedCards).reverse().reduce((p,c,i) => {
        const n = countedCards[c];
        const value = (counts[n]  + (cards[c])) + cards[c];

        return p + value;
    }, 0);

    return handValue;
}

const solve = (lines: string[]): number[] => {
    // process lines
    const hands = lines.map(getHands);
    // console.log(hands);
    
    const hexHands = hands.map(h => [ sortHand(parseToHex(h[0])), h[1]]);
    // console.log(hexHands);
    
    const handsData = hexHands.map(groupHands);
    handsData
        .sort((a,b) => b['handValue'] - a['handValue'])
        .reverse();
    handsData.forEach(h => console.log(h['hand'], parseInt(h['hand'], 16), h['handValue']));
    // console.log(handsData);
    

    // const handValues = hands.map(getHandValue);
    // handValues.sort((a,b) => b['score'] - a['score']).reverse();
    // console.log(handValues);
    
    const totalWinnings = handsData.reduce((p,c,i) => {        
        // console.log('=', p, '+', i+1, '*', c.bid);
        // console.log((c.bid * (i + 1)) + p);
        return (c.bid * (i + 1)) + p;
    }, 0);
    console.log(totalWinnings);
    

    // solve part 1
    const part1 = 0;

    // solve part 2
    const part2 = 0;

    // return both solutions
    return [part1, part2];
}

export default solve;


/*
255861132
255986280
256012057
256091635
256280545
256306687

256308515

255940725


*/