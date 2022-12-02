// 322 题「 零钱兑换」
var coinChange = function (coins, amount) {
    if (amount === 0) return 0
    const len = coins.length
    if (!len) return -1
    const dp = Array(amount + 1).fill(Infinity)
    dp[0] = 0

    for (let i = 1; i < amount + 1; i++) {

        for (let j = 0; j < len; j++) {
            if (coins[j] <= i) {
                dp[i] = Math.min(dp[i], dp[i - coins[j]] + 1)
            }
        }
    }


    return dp[amount]

};
// const res = coinChange(coins = [1, 2, 5], amount = 11)
// console.log(res)

// 221. 最大正方形
var maximalSquare = function (matrix) {
    const len = matrix.length
    if (!len) return 0
    const dp = Array(len).fill(0).map(i => Array(len).fill(0))

    for (let i = 0; i < len; i++) {
        dp[i][0] = matrix[i][0] === '1' ? 1 : 0
    }
    for (let j = 0; j < len; j++) {
        dp[0][j] = matrix[0][j] === '1' ? 1 : 0
    }

    for (let i = 1; i < len - 1; i++) {
        for (let j = 1; j < len - 1; j++) {
            if (matrix[i][j] === '1') {
                dp[i][j] = Math.min(dp[i + 1][j], dp[i + 1][j + 1], dp[i][j + 1]) + 1 //求最小边长
            }
        }
    }


    return dp

};
const res = maximalSquare([["1", "0", "1", "0", "0"], ["1", "0", "1", "1", "1"], ["1", "1", "1", "1", "1"], ["1", "0", "0", "1", "0"]])
console.log(res)