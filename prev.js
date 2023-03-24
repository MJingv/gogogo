// 前缀和专项

// 剑指 Offer II 010 和为k的子数组
// 有负数啊，前缀和解
// 给定一个整数数组和一个整数 k ，请找到该数组中和为 k 的连续子数组的个数。
// 输入:nums = [1,1,1], k = 2 输出: 2 解释: 此题 [1,1] 与 [1,1] 为两种不同的情况
var subarraySum = function (nums, k) {
    const len = nums.length
    const map = new Map()
    map.set(0, 1)
    let [res, sum] = [0, 0]
    for (let i = 0; i < len; i++) {
        sum += nums[i]
        res += map.get(sum - k) || 0
        map.set(sum, (map.get(sum) || 0) + 1)
    }
    return res
};
// const res = subarraySum([1, -1, 0], 0)
// console.log(res)