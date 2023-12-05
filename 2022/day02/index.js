const fs = require('fs');

const endings = {
    "X": 0,
    "Y": 3,
    "Z": 6,
};

const values = {
    "A": 1,
    "B": 2,
    "C": 3,
    "X": 1,
    "Y": 2,
    "Z": 3,
};

const scores = {
    "XA": 3,
    "YB": 3,
    "ZC": 3,
    "XB": 0,
    "XC": 6,
    "YC": 0,
    "YA": 6,
    "ZA": 0,
    "ZB": 6,
};

class Round {
    constructor(opponent, suggestion) {
        this.opponent = opponent;
        this.suggestion = suggestion;
    }
}

// Fonction pour lire le contenu d'un fichier
function readFile(path) {
    try {
        const buf = fs.readFileSync(path, 'utf8');
        return buf.toString();
    } catch (err) {
        console.error("Couldn't read file:", err);
        process.exit(1);
    }
}

// Fonction pour parser l'entrée
function parseInput(input) {
    input = input.trim();
    return input.split('\n').map(line => new Round(line[0], line[2]));
}

// Fonction pour résoudre la partie 1
function p1(rounds) {
    let final = 0;
    for (const r of rounds) {
        const base = values[r.suggestion];
        final += scores[r.suggestion + r.opponent] + base;
    }
    return final;
}

// Fonction pour résoudre la partie 2
function p2(rounds) {
    let final = 0;
    const choices = ["X", "Y", "Z"];
    for (const r of rounds) {
        for (const c of choices) {
            if (endings[r.suggestion] === scores[c + r.opponent]) {
                final += endings[r.suggestion] + values[c];
            }
        }
    }
    return final;
}

// Fonction principale
function main() {
    const input = readFile('./input.txt');
    const rounds = parseInput(input);
    console.log('p1:', p1(rounds));
    console.log('p2:', p2(rounds));
}

// Exécution de la fonction principale
main();
