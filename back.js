// 416. 分割等和子集
// 剑指 Offer II 101. 分割等和子集
// 给你一个 只包含正整数 的 非空 数组 nums 。请你判断是否可以将这个数组分割成两个子集，使得两个子集的元素和相等。
// 输入：nums = [1,5,11,5] 输出：true 解释：数组可以分割成 [1, 5, 5] 和 [11] 。
var canPartition = function (nums) {
    const len = nums.length
    if (!len) return
    let sum = nums.reduce((a, b) => a + b)
    if (sum % 2) return false // sum奇数不能
    sum = sum / 2
    const dp = Array(len + 1).fill(0).map(i => Array(sum + 1).fill(0))
    for (let i = 0; i <= len; i++) {
        dp[i][0] = true
    }
    for (let i = 1; i <= len; i++) {
        for (let j = 1; j <= sum; j++) {
            if (j - nums[i - 1] < 0) {
                dp[i][j] = dp[i - 1][j]
            } else {
                dp[i][j] = dp[i - 1][j] || dp[i - 1][j - nums[i - 1]]
            }
        }
    }

    return dp[len][sum]
};
const canPartition1 = (nums) => {
    const len = nums.length
    if (!len) return
    let sum = nums.reduce((a, b) => a + b)
    if (sum % 2) return false
    sum = sum / 2
    const dp = [true]
    for (let i = 0; i < len; i++) {
        for (let j = sum; j >= 0; j--) {
            if (j >= nums[i]) {
                dp[j] = dp[j] || dp[j - nums[i]]
            }

        }
    }
    return dp[sum] || false
}

// const res = canPartition1([1, 5, 11, 5])
// console.log(res)

// 518. 零钱兑换 II
// 给你一个整数数组 coins 表示不同面额的硬币，另给一个整数 amount 表示总金额。请你计算并返回可以凑成总金额的硬币组合数。如果任何硬币组合都无法凑出总金额，返回 0 。假设每一种面额的硬币有无限个。
// 输入：amount = 5, coins = [1, 2, 5] 输出：4 解释：有四种方式可以凑成总金额： 5=5 5=2+2+1 5=2+1+1+1 5=1+1+1+1+1
var change = function (amount, coins) {
    const len = coins.length
    if (!len) return 0
    const dp = Array(amount + 1).fill(0)
    dp[0] = 1
    for (let i = 0; i < len; i++) {
        for (let j = 1; j <= amount; j++) {
            if (j >= coins[i]) {
                dp[j] = dp[j] + dp[j - coins[i]]
            }
        }
    }
    return dp[amount]
};
const res = change(5, [1, 2, 5])
console.log(res)