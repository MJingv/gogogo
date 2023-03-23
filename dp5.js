// 力扣第 300 题「 最长递增子序列」
// 输入：nums = [10,9,2,5,3,7,101,18] 输出：4 解释：最长递增子序列是 [2,3,7,101]，因此长度为 4 。
var lengthOfLIS = function (nums) {
    const len = nums.length
    const dp = Array(len).fill(0)
    dp[0] = 1
    let res = 0
    for (let i = 1; i < len; i++) {
        res = Math.max(dp[i], res)
    }
    return dp
};
const res = lengthOfLIS([10, 9, 2, 5, 3, 7, 101, 18])
console.log(res)