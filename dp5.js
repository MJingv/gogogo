// 力扣第 300 题「 最长递增子序列」
// 输入：nums = [10,9,2,5,3,7,101,18] 输出：4 解释：最长递增子序列是 [2,3,7,101]，因此长度为 4 。
var lengthOfLIS = function (nums) {
    const len = nums.length
    // 以i结尾的最大长度
    let res = 1
    const dp = Array(len).fill(1)
    for (let i = 0; i < len; i++) {
        for (let j = 0; j < i; j++) {
            if (nums[i] > nums[j]) {
                dp[i] = Math.max(dp[i], dp[j] + 1)
                res = Math.max(res, dp[i])
            }
        }
    }
    return res
};
// const res = lengthOfLIS([4, 10, 4, 3, 8, 9])
// console.log(res)

// 1425. 带限制的子序列和 hard

// 368. 最大整除子集
// 给你一个由 无重复 正整数组成的集合 nums ，请你找出并返回其中最大的整除子集 answer ，子集中每一元素对 (answer[i], answer[j]) 都应当满足：
// answer[i] % answer[j] == 0 或 answer[j] % answer[i] == 0
// 输入：nums = [1,2,3] 输出：[1,2] 解释：[1,3] 也会被视为正确答案。
var largestDivisibleSubset = function (nums) {
    // a了少一半 max对，list不对
    const len = nums.length
    if (len === 1) return nums
    const dp = Array(len).fill(1)
    let max = 1
    list[0] = [nums[0]]
    nums.sort((a, b) => a - b)
    for (let i = 0; i < len; i++) {
        for (let j = 0; j < i; j++) {
            if (nums[i] % nums[j] === 0) {
                list[i].push(nums[i])
                dp[i] = Math.max(dp[j] + 1, dp[i - 1])
                max = Math.max(dp[i], max)
                if (dp[i - 1] > dp[j] + 1) {
                    list[i] = list[i - 1]
                } else {
                    list[i] = [...list[j], nums[i]]
                }
            } else {
                if (j === i - 1 && list[i].length === 0) {
                    list[i] = list[i - 1]
                }
            }
        }
    }
    console.log(max, list)
    const res = list.find(item => item.length === max)
    return res
};
// const res = largestDivisibleSubset([1, 2, 4, 8, 16])
// console.log(res)

// 剑指 Offer II 091. 粉刷房子
var minCost = function (costs) {

};