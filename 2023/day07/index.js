const CARD_2 = 2;
const CARD_3 = 3;
const CARD_4 = 4;
const CARD_5 = 5;
const CARD_6 = 6;
const CARD_7 = 7;
const CARD_8 = 8;
const CARD_9 = 9;
const CARD_T = 10;
const CARD_J = 11;
const CARD_Q = 12;
const CARD_K = 13;
const CARD_A = 14;

const HIGH_CARD = 0;
const ONE_PAIR = 1;
const TWO_PAIR = 2;
const THREE_OF_A_KIND = 3;
const FULL_HOUSE = 4;
const FOUR_OF_A_KIND = 5;
const FIVE_OF_A_KIND = 6;

class Hand {
    constructor(cards, bid) {
        this.cards = cards;
        this.bid = bid;
    }

    type() {
        const counts = Array(16).fill(0);
        for (const c of this.cards) {
            counts[c] = counts[c] + 1;
        }

        let threes = 0;
        let pairs = 0;
        for (const c of counts) {
            if (c >= 5) {
                return FIVE_OF_A_KIND;
            }

            if (c >= 4) {
                return FOUR_OF_A_KIND;
            }

            if (c >= 3) {
                threes++;
                continue;
            }

            if (c >= 2) {
                pairs++;
                continue;
            }
        }

        if (pairs === 1 && threes === 1) {
            return FULL_HOUSE;
        }

        if (threes === 1) {
            return THREE_OF_A_KIND;
        }

        if (pairs === 2) {
            return TWO_PAIR;
        }

        if (pairs === 1) {
            return ONE_PAIR;
        }

        return HIGH_CARD;
    }
}

function parse(filename) {
    const input = require('fs').readFileSync("./input.txt", 'utf8');
    const hands = [];

    const charToCard = {
        '2': CARD_2,
        '3': CARD_3,
        '4': CARD_4,
        '5': CARD_5,
        '6': CARD_6,
        '7': CARD_7,
        '8': CARD_8,
        '9': CARD_9,
        'T': CARD_T,
        'J': CARD_J,
        'K': CARD_K,
        'Q': CARD_Q,
        'A': CARD_A,
    };

    for (const line of input.split('\n')) {
        if (line === '') {
            continue;
        }

        const pos = line.indexOf(' ');
        const cards = [];
        let h;
        for (const c of line.slice(0, pos)) {
            if (!charToCard[c]) {
                throw new Error('Unexpected input');
            }
            h = charToCard[c];
            cards.push(h);
        }

        const bid = parseInt(line.slice(pos + 1), 10);
        hands.push(new Hand(cards, bid));
    }

    return hands;
}

function pt1(hands) {
    hands.sort((a, b) => {
        const diff = a.type() - b.type();

        if (diff === 0) {
            for (let c = 0; c < a.cards.length; c++) {
                if (a.cards[c] !== b.cards[c]) {
                    return a.cards[c] - b.cards[c];
                }
            }
        }

        return diff;
    });

    let pt1 = 0;
    for (let rank = 0; rank < hands.length; rank++) {
        pt1 += (rank + 1) * hands[rank].bid;
    }
    return pt1;
}

const timeStart = Date.now();
const hands = parse("input.txt");

const a1 = pt1(hands);
console.log("---- Day 6: Wait For It ---");
console.log(`Part 1: ${a1}`);
console.log(`Time: ${(Date.now() - timeStart).toFixed(2)}ms`);
