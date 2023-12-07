const text =`Time:      54     70     82     75
Distance:  239   1142   1295   1253`;

const text2 = `Time:        54708275
Distance:   239114212951253`;

function parse(text) {
    const lines = text.split('\n');
    const times = lines[0].split(/\s+/).slice(1).map(Number);
    const distances = lines[1].split(/\s+/).slice(1).map(Number);
    return times.map((time, index) => [time, distances[index]]);
}

function quiz1(text) {
    const data = parse(text);
    let score = 1;

    for (const [t, d] of data) {
        score *= [...Array(t).keys()].reduce((count, push) => count + (push * (t - push) > d ? 1 : 0), 0);
    }

    return score;
}

console.log(quiz1(text));
console.log(quiz1(text2));
