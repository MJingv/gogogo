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
const res = canPartition([1, 5, 11, 5])
console.log(res)
// 474
// 494
// 1049
