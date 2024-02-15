// dp
// base case、状态、选择、dp函数

// # 自顶向下递归的动态规划
// def dp(状态1, 状态2, ...):
// for 选择 in 所有可能的选择:
// # 此时的状态已经因为做了选择而改变
// result = 求最值(result, dp(状态1, 状态2, ...))
// return result
//
// # 自底向上迭代的动态规划
// # 初始化 base case
// dp[0][0][...] = base case
// # 进行状态转移
// for 状态1 in 状态1的所有取值：
// for 状态2 in 状态2的所有取值：
// for ...
// dp[状态1][状态2][...] = 求最值(选择1，选择2...)

// 力扣第 322 题「零钱兑换」
// 剑指 Offer II 103. 最少的硬币数目
// 输入：coins = [1, 2, 5], amount = 11 输出：3 解释：11 = 5 + 5 + 1
var coinChange = function (coins, amount) {
    const len = coins.length
    if (!len) return 0

    const dp = Array(amount + 1).fill(Infinity)
    dp[0] = 0
    for (let i = 1; i <= amount; i++) {
        for (let j = 0; j < len; j++) {
            if (coins[j] <= i) dp[i] = Math.min(dp[i], dp[i - coins[j]] + 1)
        }

    }
    return dp[amount] === Infinity ? -1 : dp[amount]
};

// const res = coinChange([1, 2, 5], 11)


// 509. 斐波那契数

var fib = function (n) {
    if (n === 1 || n === 0) return n
    let x = 0, y = 1, res = 0
    for (let i = 2; i <= n; i++) {
        res = x + y
        x = y
        y = res
    }

    return res
};
// const res = fib(4)

// 300. 最长递增子序列
var lengthOfLIS = function (nums) {
    const len = nums.length
    if (!len) return 0
    const dp = Array(len).fill(1) // 以我结尾的最长递增子序列
    for (let i = 1; i < len; i++) {
        for (let j = 0; j < i; j++) {
            if (nums[j] < nums[i]) dp[i] = Math.max(dp[i], dp[j] + 1)
        }
    }
    return Math.max(...dp)
};
const res = lengthOfLIS([10, 9, 2, 5, 3, 7, 101, 18])
console.log(res)