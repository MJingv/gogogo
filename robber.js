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
const res = rob([1, 2, 3, 1], 4)
console.log(res)

// 213. 打家劫舍 II

// 337. 打家劫舍 III


// 剑指 Offer II 089. 房屋偷盗


// 剑指 Offer II 090. 环形房屋偷盗