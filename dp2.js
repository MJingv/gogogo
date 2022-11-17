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
// 剑指 Offer II 103. 最少的硬币数目
// 输入：coins = [1, 2, 5], amount = 11 输出：3 解释：11 = 5 + 5 + 1
// 给你一个整数数组 coins ，表示不同面额的硬币；以及一个整数 amount ，表示总金额。计算并返回可以凑成总金额所需的 最少的硬币个数 。如果没有任何一种硬币组合能组成总金额，返回 -1 。你可以认为每种硬币的数量是无限的。
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
// const res = coinChange([1, 2, 5], 11) ///3
// console.log(res)


// 300. 最长递增子序列
// 输入：nums = [10,9,2,5,3,7,101,18] 输出：4 解释：最长递增子序列是 [2,3,7,101]，因此长度为 4 。
// 子串一定是连续的，而子序列不一定是连续的。
var lengthOfLIS = function (nums) {
    const dp = [] //以nums[i]结尾的最值
    for (let i = 0; i < nums.length; i++) {
        dp[i] = 1
        for (let j = 0; j < i; j++) {
            if (nums[i] > nums[j]) {
                dp[i] = Math.max(dp[i], dp[j] + 1)
            }
        }
    }
    return Math.max(...dp)
};
// const res = lengthOfLIS([10, 9, 2, 5, 3, 7, 101, 18])//4
// console.log(res)

// 354. 俄罗斯套娃信封问题


// 力扣第 931 题「 下降路径最小和」
// 输入：matrix = [[2,1,3],[6,5,4],[7,8,9]] 输出：13
var minFallingPathSum = function (matrix) {
    const len = matrix.length
    const memo = Array(len).fill(Infinity).map(i => Array(len).fill(Infinity))
    const dp = (matrix, row, col) => {
        if (row === 0) return matrix[0][col]
        if (row < 0 || row >= len) return Infinity
        if (col < 0 || col >= len) return Infinity
        memo[row][col] = Math.min(dp(matrix, row - 1, col - 1), dp(matrix, row - 1, col), dp(matrix, row - 1, col + 1)) + matrix[row][col]
        return memo[row][col]
    }

    let res = Infinity
    for (let j = 0; j < len; j++) {
        res = dp(matrix, len - 1, j)
    }

    return memo
};
const res = minFallingPathSum([[2, 1, 3], [6, 5, 4], [7, 8, 9]])//13
console.log(res)
