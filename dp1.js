// 动态规划一般就是求最值，核心是穷举
// bad case 状态 选择 定义dp
// 最优子结构，问题相互独立


// 509. 斐波那契数
// 剑指 Offer 10- I. 斐波那契数列
var fib = function (n) {
    // 备忘录
    const dp = [0, 1]
    for (let i = 2; i <= n; i++) {
        dp[i] = dp[i - 1] + dp[i - 2]
    }
    return dp[n]
};
const fib1 = (n) => {
    // 尾优化
    if (n === 0) return 0
    if (n === 1) return 1
    let [a, b] = [0, 1]
    for (let i = 2; i <= n; i++) {
        const tmp = a + b
        a = b
        b = tmp
    }
    return b
}
// const res = fib1(5)
// console.log(res)

// 322. 零钱兑换
// 剑指 Offer II 103. 最少的硬币数目
// 输入：coins = [1, 2, 5], amount = 11 输出：3 解释：11 = 5 + 5 + 1
// 计算并返回可以凑成总金额所需的 最少的硬币个数
var coinChange = function (coins, amount) {
    const len = coins.length
    if (!amount) return 0
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
    return dp[amount] === Infinity ? -1 : dp[amount]
};
// const res = coinChange([1, 2, 5], 11)
// console.log(res)

// 剑指 Offer 10- II. 青蛙跳台阶问题
// 一只青蛙一次可以跳上1级台阶，也可以跳上2级台阶。求该青蛙跳上一个 n 级的台阶总共有多少种跳法。
// 答案需要取模 1e9+7（1000000007），如计算初始结果为：1000000008，请返回 1。
var numWays = function (n) {
    if (!n) return 1
    const dp = Array(n + 1).fill(0)
    dp[1] = 1
    dp[2] = 2
    for (let i = 3; i <= n; i++) {
        dp[i] = (dp[i - 1] + dp[i - 2]) % 1000000007
    }

    return dp[n] % 1000000007
};
// const res = numWays(7)
// console.log(res)

// 70. 爬楼梯
// 每次你可以爬 1 或 2 个台阶。你有多少种不同的方法可以爬到楼顶呢？
var climbStairs = function (n) {
    if (!n) return 1
    if (n === 1) return 1
    if (n === 2) return 2
    let [a, b] = [1, 2]
    for (let i = 3; i <= n; i++) {
        const tmp = a + b
        a = b
        b = tmp
    }
    return b
};
const res = climbStairs(3)
console.log(res)


// 面试题 三步问题
// 三步问题。有个小孩正在上楼梯，楼梯有n阶台阶，小孩一次可以上1阶、2阶或3阶。实现一种方法，计算小孩有多少种上楼梯的方式。结果可能很大，你需要对结果模1000000007。
var waysToStep = function (n) {
    const dp = Array(n + 1).fill(0)
    dp[1] = 1
    dp[2] = 2
    dp[3] = 4

    for (let i = 4; i <= n; i++) {
        dp[i] = (dp[i - 1] + dp[i - 2] + dp[i - 3]) % 1000000007
    }

    return dp[n] % 1000000007

};
// const res = waysToStep(5) //4
// console.log(res)

// 剑指 Offer 14- I. 剪绳子
// 112. 路径总和

// 115. 不同的子序列

// 139. 单词拆分

// 1696. 跳跃游戏 VI

// 221. 最大正方形

// 240. 搜索二维矩阵 II

// 343. 整数拆分

// 542. 01 矩阵

// 576. 出界的路径数

// 62. 不同路径

// 63. 不同路径 II

// 91. 解码方法

// 剑指 Offer 04. 二维数组中的查找
// 剑指 Offer 46. 把数字翻译成字符串
// 剑指 Offer II 091. 粉刷房子
// 剑指 Offer II 097. 子序列的数目
// 剑指 Offer II 098. 路径的数目