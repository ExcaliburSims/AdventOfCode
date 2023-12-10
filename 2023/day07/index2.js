const HAND_RANKS = [
    [5],            // Five-of-a-kind
    [4, 1],         // Four-of-a-kind
    [3, 2],         // Full House
    [3, 1, 1],      // Three-of-a-kind
    [2, 2, 1],      // Two-pair
    [2, 1, 1, 1],   // One-pair
    [1, 1, 1, 1, 1] // High-card
];

const CARD_ORDER = [
    "A",
    "K",
    "Q",
    "T",
    "9",
    "8",
    "7",
    "6",
    "5",
    "4",
    "3",
    "2",
    "J"
];

function identifyRankPattern(hand) {
    const uniqueCards = {};

    for (const card of hand) {
        uniqueCards[card] = (uniqueCards[card] || 0) + 1;
    }

    if (uniqueCards["J"] && uniqueCards["J"] !== 5) {
        const numJokers = uniqueCards["J"];
        delete uniqueCards["J"];
        const mostCards = Object.keys(uniqueCards).reduce((a, b) => uniqueCards[a] > uniqueCards[b] ? a : b);
        uniqueCards[mostCards] += numJokers;
    }

    return Object.values(uniqueCards).sort((a, b) => b - a);
}

function betterHand(hand1, hand2) {
    const rank1Pattern = identifyRankPattern(hand1);
    const rank2Pattern = identifyRankPattern(hand2);

    let rank1, rank2;
    for (let i = 0; i < HAND_RANKS.length; i++) {
        if (JSON.stringify(HAND_RANKS[i]) === JSON.stringify(rank1Pattern)) {
            rank1 = i;
        }
        if (JSON.stringify(HAND_RANKS[i]) === JSON.stringify(rank2Pattern)) {
            rank2 = i;
        }
    }

    if (rank1 > rank2) {
        return -1;
    } else if (rank2 > rank1) {
        return 1;
    }

    for (let i = 0; i < hand1.length; i++) {
        if (hand1[i] === hand2[i]) {
            continue;
        }

        for (const card of CARD_ORDER) {
            if (card === hand1[i]) {
                return 1;
            } else if (card === hand2[i]) {
                return -1;
            }
        }
    }

    return 0;
}

function main() {
    const game = [];

    const fs = require('fs');
    const input = fs.readFileSync("./input.txt", "utf-8").split('\n');

    for (const line of input) {
        const [hand, bid] = line.split(" ");
        game.push([hand, parseInt(bid)]);
    }

    game.sort((a, b) => betterHand(a[0], b[0]));

    let totalWinnings = 0;

    for (let i = 0; i < game.length; i++) {
        totalWinnings += game[i][1] * (i + 1);
    }

    console.log(totalWinnings);
}

main();
