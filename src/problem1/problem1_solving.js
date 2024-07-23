var sum_to_n_a = function (n) {
    return Array(n).fill(0).reduce((sum, _, idx) => sum + idx + 1, 0)
};

var sum_to_n_b = function (n) {
    if (n <= 0)
        throw new Error('Please don\'t input negative');

    let sum = 0;
    for (let i = 1; i <= n; i++)
        sum += i

    return sum;
};

var sum_to_n_c = function (n) {
    if (n <= 0)
        throw new Error('Please don\'t input negative');
    return (n * (n + 1)) / 2
};

console.time('Result1 runtime')
console.log(`Result1 : ${sum_to_n_a(50000000)}`)
console.timeEnd('Result1 runtime')

console.time('Result2 runtime')
console.log(`Result2 : ${sum_to_n_b(50000000)}`)
console.timeEnd('Result2 runtime')

console.time('Result3 runtime')
console.log(`Result3 : ${sum_to_n_c(50000000)}`)
console.timeEnd('Result3 runtime')