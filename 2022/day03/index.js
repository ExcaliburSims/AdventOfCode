const fs = require('fs');

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

// Fonction pour mapper les caractères ASCII
function asciiMap(asciiValue) {
    if (asciiValue > 96 && asciiValue < 123) {
        return asciiValue - 96;
    } else if (asciiValue > 64 && asciiValue < 91) {
        return 27 + asciiValue - 65;
    }
    return 0;
}

// Fonction pour calculer les priorités correspondantes
function matchingPriorities(s1, s2) {
    const matches = new Array(53).fill(0);
    const r1 = s1.split('');
    const r2 = s2.split('');

    for (let i = 0; i < r1.length; i++) {
        matches[asciiMap(r1[i].charCodeAt(0))] = 1;
    }

    for (let i = 0; i < r2.length; i++) {
        const p = asciiMap(r2[i].charCodeAt(0));
        if (matches[p] === 1) {
            matches[p] = 2;
        }
    }

    for (let i = 0; i < 53; i++) {
        matches[i] /= 2;
    }

    return matches;
}

// Fonction pour résoudre la partie 1
function p1(lines) {
    let psum = 0;
    for (const sack of lines) {
        const halfLen = Math.floor(sack.length / 2);
        const s1 = sack.substring(0, halfLen);
        const s2 = sack.substring(halfLen);
        const matches = matchingPriorities(s1, s2);
        for (let i = 0; i < matches.length; i++) {
            psum += matches[i] * i;
        }
    }
    return psum;
}

// Fonction pour résoudre la partie 2
function p2(lines) {
    let psum = 0;
    for (let i = 0; i < lines.length - 3; i += 3) {
        const e1 = lines[i];
        const e2 = lines[i + 1];
        const e3 = lines[i + 2];
        const me1e2 = matchingPriorities(e1, e2);
        const me2e3 = matchingPriorities(e2, e3);
        for (let j = 0; j < me1e2.length; j++) {
            if (me1e2[j] + me2e3[j] === 2) {
                psum += j;
            }
        }
    }
    return psum;
}

// Fonction principale
function main() {
    const lines = readFile('./input.txt').split('\n');
    console.log('p1:', p1(lines));
    console.log('p2:', p2(lines));
}

// Exécution de la fonction principale
main();
