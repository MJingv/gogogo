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
    if (amount < 0) return -1
    if (amount === 0) return 0

    const dp = Array(amount + 1).fill(Infinity)
    dp[0] = 0
    for (let i = 1; i <= amount; i++) {
        for (let coin of coins) {
            if (coin <= i) {
                dp[i] = Math.min(dp[i], dp[i - coin] + 1)
            }
        }
    }
    return dp[amount] === Infinity ? -1 : dp[amount]
};
// 输入：coins = [1, 2, 5], amount = 11 输出：3 解释：11 = 5 + 5 + 1
// 给你一个整数数组 coins ，表示不同面额的硬币；以及一个整数 amount ，表示总金额。计算并返回可以凑成总金额所需的 最少的硬币个数 。如果没有任何一种硬币组合能组成总金额，返回 -1 。你可以认为每种硬币的数量是无限的。
const res = coinChange([1, 2, 5], 11) ///3
console.log(res)


// 剑指 Offer II 103. 最少的硬币数目
var coinChange = function (coins, amount) {

};
