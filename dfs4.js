// 剑指 Offer 38. 字符串的排列
// 输入：s = "abc" 输出：["abc","acb","bac","bca","cab","cba"]
var permutation = function (s) {
    const len = s.length
    s = s.split('')
    s = s.sort()
    const [path, res] = [[], []]
    const helper = (used = {}) => {
        if (path.length === len) res.push(path.join(''))
        for (let i = 0; i < len; i++) {
            if (used[i]) continue
            if (i > 0 && s[i] === s[i - 1] && !used[i - 1]) continue
            path.push(s[i])
            used[i] = true
            helper(used)
            used[i] = false
            path.pop()
        }
    }
    helper()
    return res

};
// const res = permutation('aab')
// console.log(res)

// 剑指 Offer II 079. 所有子集
// 输入：nums = [1,2,3] 输出：[[],[1],[2],[1,2],[3],[1,3],[2,3],[1,2,3]]
var subsets = function (nums) {
    const len = nums.length
    const [path, res] = [[], []]
    const helper = (start = 0) => {
        res.push([...path])
        for (let i = start; i < len; i++) {
            path.push(nums[i])
            helper(i + 1)
            path.pop()
        }
    }
    helper()
    return res
};
// const res = subsets([1, 2, 3])
// console.log(res)

// 剑指 Offer II 080. 含有 k 个元素的组合
// 输入: n = 4, k = 2 输出: [ [2,4], [3,4], [2,3], [1,2], [1,3], [1,4], ]
var combine = function (n, k) {
    const [path, res] = [[], []]
    const helper = (start = 1) => {
        if (path.length === k) res.push([...path])
        for (let i = start; i <= n; i++) {
            path.push(i)
            helper(i + 1)
            path.pop()
        }
    }
    helper()
    return res
};
// const res = combine(4, 2)
// console.log(res)

// 剑指 Offer II 081. 允许重复选择元素的组合
// 输入: candidates = [2,3,6,7], target = 7 输出: [[7],[2,2,3]]
var combinationSum = function (candidates, target) {
    const len = candidates.length
    const [path, res] = [[], []]
    let cur = 0
    const helper = (start = 0) => {
        if (cur === target) res.push([...path])
        if (cur > target) return
        for (let i = start; i < len; i++) {
            path.push(candidates[i])
            cur += candidates[i]
            helper(i)
            path.pop()
            cur -= candidates[i]
        }
    }
    helper()
    return res
};
// const res = combinationSum([2, 3, 6, 7], 7)
// console.log(res)


// 剑指 Offer II 083. 没有重复元素集合的全排列
// 输入：nums = [1,2,3] 输出：[[1,2,3],[1,3,2],[2,1,3],[2,3,1],[3,1,2],[3,2,1]]
var permute = function (nums) {
    const len = nums.length
    const [path, res] = [[], []]
    const helper = (used = {}) => {
        if (path.length === len) res.push([...path])
        for (let i = 0; i < len; i++) {
            if (used[i]) continue
            used[i] = true
            path.push(nums[i])
            helper(used)
            used[i] = false
            path.pop()
        }
    }
    helper()
    return res
};
// const res = permute([1, 2, 3])
// console.log(res)

// 剑指 Offer II 082. 含有重复元素集合的组合
// 输入: candidates = [10,1,2,7,6,1,5], target = 8, 输出:[[1,1,6], [1,2,5], [1,7], [2,6]]
var combinationSum2 = function (candidates, target) {
    const len = candidates.length
    const [path, res] = [[], []]
    let cur = 0
    candidates = candidates.sort()
    const helper = (start = 0) => {
        if (cur === target) res.push([...path])
        if (cur > target) return
        for (let i = start; i < len; i++) {
            if (i > start && candidates[i] === candidates[i - 1]) continue
            path.push(candidates[i])
            cur += candidates[i]
            helper(i + 1)
            path.pop()
            cur -= candidates[i]
        }
    }
    helper()
    return res
};
// const res = combinationSum2([10, 1, 2, 7, 6, 1, 5], 8)
// console.log(res)

// 剑指 Offer II 084. 含有重复元素集合的全排列
// 输入：nums = [1,1,2] 输出： [[1,1,2], [1,2,1], [2,1,1]]
var permuteUnique = function (nums) {
    const len = nums.length
    const [path, res] = [[], []]
    nums = nums.sort()
    const helper = (used = {}) => {
        if (path.length === len) res.push([...path])
        for (let i = 0; i < len; i++) {
            if (used[i]) continue
            if (i > 0 && nums[i] === nums[i - 1] && !used[i - 1]) continue
            path.push(nums[i])
            used[i] = true
            helper(used)
            used[i] = false
            path.pop()
        }
    }
    helper()
    return res
};
// const res = permuteUnique([1, 1, 2])
// console.log(res)


// 剑指Offer II 104. 排列的数目
// 给定一个由 不同 正整数组成的数组 nums ，和一个目标整数 target 。请从 nums 中找出并返回总和为 target 的元素组合的个数。数组中的数字可以在一次排列中出现任意次，但是顺序不同的序列被视作不同的组合。
// 输入：nums = [1, 2, 3], target = 4 输出：7
// 解释：
// 所有可能的组合为：
// (1, 1, 1, 1)
// (1, 1, 2)
// (1, 2, 1)
// (1, 3)
// (2, 1, 1)
// (2, 2)
// (3, 1)
// 请注意，顺序不同的序列被视作不同的组合。
var combinationSum4 = function (nums, target) {
    // timeout
    // 回溯超时，dp再看看
    const len = nums.length
    const [path, res] = [[], []]
    let cur = 0
    const helper = () => {
        if (cur === target) res.push([...path])
        if (cur > target) return
        for (let i = 0; i < len; i++) {
            path.push(nums[i])
            cur += nums[i]
            helper()
            path.pop()
            cur -= nums[i]

        }
    }
    helper()
    return res
};
// const res = combinationSum4([4, 2, 1], 32)
// console.log(res)

// 17. 电话号码的字母组合
// 输入：digits = "23" 输出：["ad","ae","af","bd","be","bf","cd","ce","cf"]
var letterCombinations = function (digits) {
    if (!digits) return []
    const nums = digits.split('')
    const len = nums.length
    const [path, res] = [[], []]
    const maps = {
        '2': ['a', 'b', 'c'],
        '3': ['d', 'e', 'f'],
        '4': ['g', 'h', 'i'],
        '5': ['j', 'k', 'l'],
        '6': ['m', 'n', 'o'],
        '7': ['p', 'q', 'r', 's'],
        '8': ['t', 'u', 'v'],
        '9': ['w', 'x', 'y', 'z']
    }
    const helper = (start = 0) => {
        if (path.length === len) res.push(path.join(''))
        for (let i = start; i < len; i++) {
            const chs = maps[digits[i]]
            for (let j = 0; j < chs.length; j++) {
                path.push(chs[j])
                helper(i + 1)
                path.pop()
            }
        }
    }
    helper()
    return res
};
// const res = letterCombinations('23')
// console.log(res)

// 368. 最大整除子集
// answer[i] % answer[j] == 0 或 answer[j] % answer[i] == 0
// 输入：nums = [1,2,3] 输出：[1,2] 解释：[1,3] 也会被视为正确答案。
var largestDivisibleSubset = function (nums) {
    const len = nums.length
    const [path, res] = [[], []]
    const helper = (start) => {
        for (let i = start; i < len; i++) {
            path.push(nums[i])
            helper(i + 1)
            path.pop()
        }
    }
    helper()
    return res
};
// const res = largestDivisibleSubset([1, 2, 3])
// console.log(res)

// 491. 递增子序列
// 给你一个整数数组 nums ，找出并返回所有该数组中不同的递增子序列，递增子序列中 至少有两个元素 。你可以按 任意顺序 返回答案。
// 输入：nums = [4,6,7,7] 输出：[[4,6],[4,6,7],[4,6,7,7],[4,7],[4,7,7],[6,7],[6,7,7],[7,7]]
var findSubsequences = function (nums) {
    // 没有全过
    const len = nums.length
    const [path, res] = [[], []]
    const helper = (start = 0) => {
        if (path.length >= 2) res.push([...path])
        for (let i = start; i < len; i++) {
            if (nums[i] < nums[i - 1]) continue
            if (i > start && nums[i - 1] === nums[i]) continue
            path.push(nums[i])
            helper(i + 1)
            path.pop()
        }
    }
    helper()
    return res
};
const res = findSubsequences([4, 6, 7, 7])
console.log(res)
