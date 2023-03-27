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
// 假如有一排房子，共 n 个，每个房子可以被粉刷成红色、蓝色或者绿色这三种颜色中的一种，你需要粉刷所有的房子并且使其相邻的两个房子颜色不能相同。
// 输入: costs = [[17,2,17],[16,16,5],[14,3,19]] 输出: 10 解释: 将 0 号房子粉刷成蓝色，1 号房子粉刷成绿色，2 号房子粉刷成蓝色。 最少花费: 2 + 5 + 3 = 10。
var minCost = function (costs) {

    const len = costs.length
    if (!len) return 0
    for (let i = 1; i < len; i++) {
        costs[i][0] += Math.min(costs[i - 1][1], costs[i - 1][2])
        costs[i][1] += Math.min(costs[i - 1][0], costs[i - 1][2])
        costs[i][2] += Math.min(costs[i - 1][0], costs[i - 1][1])
    }
    return Math.min(...costs[len - 1])
};
// const res = minCost([[17, 2, 17], [16, 16, 5], [14, 3, 19]])
// console.log(res)


// 返回 两栋 颜色 不同 房子之间的 最大 距离。
// 2078 两栋颜色不同且距离最远的房子
// 输入：colors = [1,1,1,6,1,1,1] 输出：3
// 输入：colors = [1,8,3,8,3] 输出：4
var maxDistance = function (colors) {
    // 暴力法
    const len = colors.length
    if (len === 2 && colors[0] !== colors[1]) return 1
    const n = Math.ceil(len / 2)
    let max = 0
    for (let i = 0; i < n; i++) {
        for (let j = 0; j < len; j++) {
            if (colors[i] !== colors[j]) {
                max = Math.max(max, Math.abs(i - j))
            }
        }
    }
    return max
};
// const res = maxDistance([1, 8, 3, 8, 3])
// console.log(res)


// 115. 不同的子序列 hard

// 139. 单词拆分
// 给你一个字符串 s 和一个字符串列表 wordDict 作为字典。请你判断是否可以利用字典中出现的单词拼接出 s 。
// 注意：不要求字典中出现的单词全部都使用，并且字典中的单词可以重复使用。
// 输入: s = "leetcode", wordDict = ["leet", "code"]
// 输出: true
// 解释: 返回 true 因为 "leetcode" 可以由 "leet" 和 "code" 拼接成。
var wordBreak = function (s, wordDict) {
    const n = s.length
    const dp = Array(n + 1).fill(false)
    dp[0] = true
    for (let i = 1; i <= n; i++) {
        for (let j = 0; j < i; j++) {
            const str = s.slice(j, i)
            if (dp[j] && wordDict.includes((str))) dp[i] = true
        }

    }
    return dp[n]
};
// const res = wordBreak('applepenapple', ["apple", "pen"])
// console.log(res)
// 输入: s = "applepenapple", wordDict = ["apple", "pen"]
// 输入: s = "catsandog", wordDict = ["cats", "dog", "sand", "and", "cat"] 输出: false


// 221. 最大正方形
// 在一个由 '0' 和 '1' 组成的二维矩阵内，找到只包含 '1' 的最大正方形，并返回其面积。
var maximalSquare = function (matrix) {
    const [m, n] = [matrix.length, matrix[0].length]
    matrix = matrix.map(i => i.map(j => Number(j)))

    for (let i = 0; i < m - 1; i++) {
        for (let j = 0; j < n; j++) {
            if (matrix[i][j]) {
                if (matrix[i + 1][j] && matrix[i][j + 1] && matrix[i + 1][j + 1]) {
                    matrix[i][j] += 1
                    // matrix[i + 1][j] = matrix[i][j]
                    // matrix[i][j + 1] = matrix[i][j]
                    // matrix[i + 1][j + 1] = matrix[i][j]
                }
            }
        }
    }
    return matrix

};
// 输入：matrix = [["1","0","1","0","0"],["1","0","1","1","1"],["1","1","1","1","1"],["1","0","0","1","0"]]
const res = maximalSquare([
    ["1", "0", "1", "0", "0"],
    ["1", "0", "1", "1", "1"],
    ["1", "1", "1", "1", "1"],
    ["1", "0", "0", "1", "0"]])
console.log(res)

// 343. 整数拆分
// 576. 出界的路径数
// 63. 不同路径 II
// 91. 解码方法
// 剑指 Offer II 097. 子序列的数目