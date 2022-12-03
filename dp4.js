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

    const [m, n] = [matrix.length, matrix[0].length]
    if (!m || !n) return 0
    const dp = Array(m).fill(0).map(i => Array(n).fill(0))
    let max = 0

    for (let i = 0; i < m; i++) {
        dp[i][0] = matrix[i][0]
        if (dp[i][0] === '1') max = 1
    }
    for (let j = 0; j < n; j++) {
        dp[0][j] = matrix[0][j]
        if (dp[0][j] === '1') max = 1

    }

    for (let i = 1; i < m; i++) {
        for (let j = 1; j < n; j++) {
            if (matrix[i][j] === '1') {
                dp[i][j] = Math.min(dp[i - 1][j], dp[i - 1][j - 1], dp[i][j - 1]) + 1 //求最小边长
                max = Math.max(max, dp[i][j])
            }
        }
    }

    return max * max

};
// const res = maximalSquare([["1", "0", "1", "0", "0"], ["1", "0", "1", "1", "1"], ["1", "1", "1", "1", "1"], ["1", "0", "0", "1", "0"]])
// console.log(res)

// 139. 单词拆分
var wordBreak = function (s, wordDict) {
    const len = s.length
    const dp = Array(len + 1).fill(false)
    dp[0] = true

    for (let i = 1; i <= len; i++) {

        for (let j = 0; j < i; j++) {
            const str = s.slice(j, i)
            if (dp[j] && wordDict.includes(str)) {
                dp[i] = true
            }
        }
    }
    return dp[len]


};
const res = wordBreak(s = "applepenapple", wordDict = ["apple", "pen"])
console.log(res)