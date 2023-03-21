// 背包问题专题

// 416 分割等和子集
// 请你判断是否可以将这个数组分割成两个子集，使得两个子集的元素和相等。 输入：nums = [1,5,11,5] 输出：true 解释：数组可以分割成 [1, 5, 5] 和 [11] 。
var canPartition = function (nums) {
    const len = nums.length
    if (!len) return true
    const sum = nums.reduce((i, p) => i + p)
    if (sum % 2) return false
    const target = sum / 2
    nums.sort()
    if (nums[len - 1] > target) return false
    // dp 数组的定义：dp[i][j] = x 表示，对于前 i 个物品，当前背包的容量为 j 时，若 x 为 true，则说明可以恰好将背包装满，若 x 为 false，则说明不能恰好将背包装满。
    const dp = Array(len).fill(0).map(i => Array(target + 1).fill(0))
    for (let i = 0; i < len; i++) {
        dp[i][0] = true
    }
    for (let i = 1; i < len; i++) {
        for (let j = 1; j <= target; j++) {
            // 不放 or 放
            if (j - nums[i - 1] < 0) {
                dp[i][j] = dp[i - 1][j]
            } else {
                dp[i][j] = dp[i - 1][j] || dp[i - 1][j - nums[i - 1]]
            }
        }
    }
    return dp[len - 1][target]

};
// const res = canPartition([1, 5, 11, 5])
// console.log(res)

// 474 一和零
// 请你找出并返回 strs 的最大子集的长度，该子集中 最多 有 m 个 0 和 n 个 1 。
var findMaxForm = function (strs, m, n) {
    const len = strs.length
    if (!len) return 0
    const list = Array(len).fill(0).map(i => Array(2).fill(0))
    strs.map((item, index) => {
        list[index][0] = item.split('').filter(i => i === '0').length
        list[index][1] = item.split('').filter(i => i === '1').length
    })
    // i个0 j个1 组成最大的子集
    const dp = Array(m + 1).fill(0).map(i => Array(n + 1).fill(0))

    for (let k = 0; k < len; k++) {
        const zero = list[k][0]
        const one = list[k][1]
        for (let i = m; i >= zero; i--) {
            for (let j = n; j >= one; j--) {
                dp[i][j] = Math.max(dp[i][j], dp[i - zero][j - one] + 1)

            }
        }
    }
    return dp[m][n]
};
// const res = findMaxForm(["10", "0001", "111001", "1", "0"], 5, 3)
// console.log(res)

// 494 目标和
// 输入：nums = [1,1,1,1,1], target = 3 输出：5
// 例如，nums = [2, 1] ，可以在 2 之前添加 '+' ，在 1 之前添加 '-' ，然后串联起来得到表达式 "+2-1"
var findTargetSumWays = function (nums, target) {
    // 动态规划不太理解
    const len = nums.length
    if (!len) return 0
    // 前i个数字组成目标是j的最大组合数量
    const dp = Array(len).fill(0).map(i => Array(target + 1).fill(0))
    // dp[i][j] = dp[i - 1][j - nums[i]] + dp[i - 1][j + nums[i]]
    let res = 0

    console.log(dp)

    return res
};
const findTargetSumWays1 = (nums, target) => {
    // 深度遍历 bfs
    const len = nums.length
    if (!len) return 0
    let res = 0
    const helper = (i, sum) => {
        if (i === len) {
            if (sum === target) res++
            return
        }
        helper(i + 1, sum + nums[i])
        helper(i + 1, sum - nums[i])
    }
    helper(0, 0)
    return res
}
//
// const res = findTargetSumWays([1, 1, 1, 1, 1], 3)
// console.log(res)


// 1049 最后一块石头的重量2
var lastStoneWeightII = function (stones) {

};
