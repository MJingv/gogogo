// bad case
// stutus
// choice
// dp

// 509. 斐波那契数
var fib = function (n) {
    if (n === 0 || n === 1) return n
    if (n === 2) return 1
    return fib(n - 1) + fib(n - 2)

};
const fib1 = (n) => {
    const dp = [0, 1,]
    for (let i = 2; i <= n; i++) {
        dp[i] = dp[i - 1] + dp[i - 2]
    }
    return dp[n]
}
var fib2 = function (n) {
    if (n === 0 || n === 1) return n
    let [d1, d2] = [0, 1]
    for (let i = 2; i <= n; i++) {
        const tmp = d1 + d2
        d1 = d2
        d2 = tmp
    }
    return d2
};

// 力扣第 322 题「 零钱兑换」
var coinChange = function (coins, amount) {

};


// 剑指 Offer II 103. 最少的硬币数目
var coinChange = function (coins, amount) {

};

const res = coinChange([1, 2, 5], 11) ///3
console.log(res)