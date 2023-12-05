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

// Fonction pour calculer la somme d'une liste d'entiers
function listSum(someList) {
    return someList.reduce((sum, item) => sum + item, 0);
}

// Fonction pour trouver le maximum dans une liste d'entiers
function findMax(someList) {
    return Math.max(...someList);
}

// Fonction pour convertir une liste de chaînes représentant des entiers en une liste de sommes triées
function strIntListsToSumsSorted(strIntLists) {
    const intList = strIntLists.map(strIntList => {
        const ints = strIntList.split('\n').map(strValue => parseInt(strValue));
        return listSum(ints);
    });

    return intList.sort((a, b) => a - b);
}

// Fonction pour résoudre la partie 1
function p1(input) {
    const sums = strIntListsToSumsSorted(input.split('\n\n'));
    return findMax(sums);
}

// Fonction pour résoudre la partie 2
function p2(input) {
    const sums = strIntListsToSumsSorted(input.split('\n\n'));
    return listSum(sums.slice(-3));
}

// Fonction principale
function main() {
    const input = readFile('./input.txt');
    console.log('p1:', p1(input));
    console.log('p2:', p2(input));
}

// Exécution de la fonction principale
main();
