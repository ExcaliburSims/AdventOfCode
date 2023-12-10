const fs = require('fs');

const HIGH_CARD = 0;
const ONE_PAIR = 1;
const TWO_PAIR = 2;
const THREE_OF_A_KIND = 3;
const FULL_HOUSE = 4;
const FOUR_OF_A_KIND = 5;
const FIVE_OF_A_KIND = 6;

function parse(filename) {
    const input = fs.readFileSync(filename, 'utf-8');
    const hands = [];

    for (const line of input.split('\n')) {
        if (line.trim() === '') {
            continue;
        }

        const pos = line.indexOf(' ');
        const cards = line.slice(0, pos).split('').map(c => c.charCodeAt(0));
        const countMap = new Map();

        for (const c of cards) {
            countMap.set(c, (countMap.get(c) || 0) + 1);
        }

        const bid = parseInt(line.slice(pos + 1), 10);

        const counts = Array.from(countMap.values());
        counts.sort((a, b) => b - a);

        hands.push({
            cards,
            bid,
            counts,
        });
    }

    return hands;
}

class Hand {
    constructor(cards, bid, counts) {
        this.cards = cards;
        this.bid = bid;
        this.counts = counts;
    }

    type() {
        if (this.counts[0] >= 5) {
            return FIVE_OF_A_KIND;
        } else if (this.counts[0] >= 4) {
            return FOUR_OF_A_KIND;
        } else if (this.counts[0] >= 3 && this.counts[1] >= 2) {
            return FULL_HOUSE;
        } else if (this.counts[0] >= 3) {
            return THREE_OF_A_KIND;
        } else if (this.counts[0] >= 2 && this.counts[1] >= 2) {
            return TWO_PAIR;
        } else if (this.counts[0] >= 2) {
            return ONE_PAIR;
        }

        return HIGH_CARD;
    }

    distributeJokers() {
        const countMap = new Map();

        for (const c of this.cards) {
            countMap.set(c, (countMap.get(c) || 0) + 1);
        }

        // in case we only counted a single card type (incl. jokers)
        if (countMap.size === 1) {
            this.counts = [5];
            return;
        }

        const counts = Array.from(countMap.values()).filter(card => card !== 'J');
        counts.sort((a, b) => b - a);

        let nJokers = countMap.get('J') || 0;
        const diff = Math.max(0, 3 - counts[0]);
        counts[0] += nJokers;
        nJokers -= diff;

        if (counts.length > 1 && nJokers > 0) {
            counts[1] += nJokers;
        }

        this.counts = counts;
    }
}

function solve(hands, cardValues) {
    hands.sort((a, b) => {
        const diff = a.type() - b.type();

        if (diff === 0) {
            for (let c = 0; c < a.cards.length; c++) {
                if (a.cards[c] === b.cards[c]) {
                    continue;
                }

                return cardValues[a.cards[c]] < cardValues[b.cards[c]];
            }
        }

        return diff < 0;
    });

    let winnings = 0;

    for (let rank = 0; rank < hands.length; rank++) {
        const h = hands[rank];
        winnings += (rank + 1) * h.bid;
    }

    return winnings;
}

function main() {
    const timeStart = Date.now();
    const hands = parse("input.txt");

    const cardValues = {
        '2': 1,
        '3': 2,
        '4': 3,
        '5': 4,
        '6': 5,
        '7': 6,
        '8': 7,
        '9': 8,
        'T': 9,
        'J': 10,
        'H': 11,
        'Q': 12,
        'K': 13,
        'A': 14,
    };

    const a1 = solve(hands, cardValues);

    cardValues['J'.charCodeAt(0)] = 0;

    for (let i = 0; i < hands.length; i++) {
        hands[i].distributeJokers();
    }

    const a2 = solve(hands, cardValues);

    console.log("--- Day 7: Camel Cards ---");
    console.log(`Part 1: ${a1}`);
    console.log(`Part 2: ${a2}`);
    console.log(`Time: ${(Date.now() - timeStart).toFixed(2)}ms`);
}

main();
