// 198. 打家劫舍
// 输入：[1,2,3,1] 输出：4
var rob = function (nums) {
    const len = nums.length
    if (!len) return 0
    const memo = Array(len).fill(-1)
    const dp = (nums, i) => {
        if (i < 0) return 0
        if (memo[i] !== -1) return memo[i]
        memo[i] = Math.max(dp(nums, i - 2) + nums[i], dp(nums, i - 1))
        return memo[i]
    }
    dp(nums, len - 1)
    return memo[len - 1]
};
const rob1 = (nums) => {
    const len = nums.length
    if (!len) return 0
    const dp = [nums[0], Math.max(nums[0], nums[1])]

    for (let i = 2; i < len; i++) {
        dp[i] = Math.max(dp[i - 2] + nums[i], dp[i - 1])
    }
    return dp[len - 1]
}
// const res = rob1([1, 2, 3, 1], 4)
// console.log(res)

// 213. 打家劫舍 II
// 输入：nums = [2,3,2] 输出：3 解释：你不能先偷窃 1 号房屋（金额 = 2），然后偷窃 3 号房屋（金额 = 2）
const rob2 = (nums) => {
    const len = nums.length
    if (!len) return 0
    if (len === 1) return nums[0]

    const hepler = (m, n, nums) => {
        if (m === n) return nums[m]
        const dp = Array(len).fill(0)
        dp[m] = nums[m]
        dp[m + 1] = Math.max(nums[m], nums[m + 1])
        for (let i = m + 2; i <= n; i++) {
            dp[i] = Math.max(dp[i - 1], dp[i - 2] + nums[i])
        }
        return dp[n]
    }
    return Math.max(hepler(0, len - 2, nums), hepler(1, len - 1, nums))


}
const res = rob2([1, 2, 3])
console.log(res)

// 337. 打家劫舍 III


// 剑指 Offer II 089. 房屋偷盗


// 剑指 Offer II 090. 环形房屋偷盗