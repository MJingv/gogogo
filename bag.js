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
// 有一堆石头，用整数数组 stones 表示。其中 stones[i] 表示第 i 块石头的重量。每一回合，从中选出任意两块石头，然后将它们一起粉碎。假设石头的重量分别为 x 和 y，且 x <= y。那么粉碎的可能结果如下：
// 如果 x == y，那么两块石头都会被完全粉碎；如果 x != y，那么重量为 x 的石头将会完全粉碎，而重量为 y 的石头新重量为 y-x。最后，最多只会剩下一块 石头。返回此石头 最小的可能重量 。如果没有石头剩下，就返回 0。
// 输入：stones = [2,7,4,1,8,1] 输出：1 解释： 组合 2 和 4，得到 2，所以数组转化为 [2,7,1,8,1]， 组合 7 和 8，得到 1，所以数组转化为 [2,1,1,1]， 组合 2 和 1，得到 1，所以数组转化为 [1,1,1]， 组合 1 和 1，得到 0，所以数组转化为 [1]，这就是最优值。
var lastStoneWeightII = function (stones) {
    // 转化为01背包问题，能不能分成差最小的2份
    const len = stones.length
    if (len === 1) return stones[0]
    if (len === 2) return Math.abs(stones[0] - stones[1])
    stones.sort()
    const sum = stones.reduce((i, p) => i + p)
    const target = Math.floor(sum / 2)
    // 前i个东西，j的重量，最多装多少的重量
    const dp = Array(target + 1).fill(0)
    for (let i = 0; i < len; i++) {
        for (let j = target; j >= stones[i]; j--) {
            dp[j] = Math.max(dp[j], dp[j - stones[i]] + stones[i])
        }
    }
    return sum - 2 * dp[target]
};

// 1046 最后一块石头的重量
// 最后，最多只会剩下一块石头。返回此石头的重量。如果没有石头剩下，就返回 0。
var lastStoneWeight = function (stones) {
    const len = stones.length
    if (len === 1) return stones[0]
    if (len === 2) return Math.abs(stones[0] - stones[1])


};
const res = lastStoneWeight([2, 7, 4, 1, 8, 1])
console.log(res)
