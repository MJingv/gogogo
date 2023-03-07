// 回溯
// 1。已经做的选择
// 2。面临的选择
// 3。结束条件

// backtrace(路径,选择列表){
//     if（终止条件） return
//     for(选择 in 列表){
//         做选择
//         backtrack()
//         撤销选择
//     }
// }


function TreeNode(val, left, right) {
    this.val = (val === undefined ? 0 : val)
    this.left = (left === undefined ? null : left)
    this.right = (right === undefined ? null : right)
}

const t1 = new TreeNode(1)
const t0 = new TreeNode(0)
t1.left = t0
// t0.left = new TreeNode(0)
const t3 = new TreeNode(3)
t3.left = new TreeNode(2)
t3.right = new TreeNode(4)
t1.right = t3

// 力扣第 46 题「 全排列」
// 剑指 Offer II 083. 没有重复元素集合的全排列
var permute = function (nums) {
    const len = nums.length
    const [res, path] = [[], []]
    const helper = (used = {}) => {
        if (path.length === len) return res.push(path.slice())
        for (let i = 0; i < len; i++) {
            if (used[i]) continue
            path.push(nums[i])
            used[i] = true
            helper(used)
            path.pop()
            used[i] = false
        }
    }
    helper()
    return res
};
// const res = permute([1, 2, 3])
// console.log(res)


// 112. 路径总和
// 遍历+记路径
var hasPathSum = function (root, targetSum) {
    if (!root) return false
    let res = false
    const helper = (node, sum) => {
        if (!node) return
        if (!node.left && !node.right && sum === targetSum) return res = true
        node.left && helper(node.left, sum + node.left.val)
        node.right && helper(node.right, sum + node.right.val)

    }
    helper(root, root.val)
    return res
};
// const res = hasPathSum(t1, 1)
// console.log(res)


// 113. 路径总和 II
// 剑指 Offer 34. 二叉树中和为某一值的路径
var pathSum = function (root, target) {
    if (!root) return []
    const res = []
    const helper = (node, path, sum) => {
        if (!node) return
        if (!node.left && !node.right && sum === target) res.push(path.slice())
        node.left && helper(node.left, [...path, node.left.val], sum + node.left.val)
        node.right && helper(node.right, [...path, node.right.val], sum + node.right.val)
    }
    helper(root, [root.val], root.val)
    return res

};
// const res = pathSum(t1, 1)
// console.log(res)

// 剑指 Offer II 079. 所有子集
// 给定一个整数数组 nums ，数组中的元素 互不相同 。返回该数组所有可能的子集（幂集）。解集 不能 包含重复的子集。你可以按 任意顺序 返回解集。
// 输入：nums = [1,2,3]
// 输出：[[],[1],[2],[1,2],[3],[1,3],[2,3],[1,2,3]]
var subsets = function (nums) {
    const len = nums.length
    if (!len) return []
    const [res, path] = [[], []]
    const helper = (start = 0) => {
        res.push(path.slice())
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
// 给定两个整数 n 和 k，返回 1 ... n 中所有可能的 k 个数的组合。
// 输入: n = 4, k = 2
// 输出:
//     [
//         [2,4],
//         [3,4],
//         [2,3],
//         [1,2],
//         [1,3],
//         [1,4],
//     ]
var combine = function (n, k) {
    if (!k) return []
    const [res, path] = [[], []]
    const helper = (start = 0) => {
        if (path.length === k) res.push(path.slice())
        for (let i = start; i <= n; i++) {
            path.push(i)
            helper(i + 1)
            path.pop()
        }
    }
    helper(1)
    return res
};
// const res = combine(4, 2)
// console.log(res)

// 剑指 Offer II 081. 允许重复选择元素的组合
// 输入: candidates = [2,3,6,7], target = 7 输出: [[7],[2,2,3]]
var combinationSum = function (candidates, target) {
    const len = candidates.length
    if (!len) return []
    const [res, path] = [[], []]
    let sum = 0
    const helper = (start = 0) => {
        if (sum === target) res.push(path.slice())
        if (sum > target) return
        for (let i = start; i < len; i++) {
            sum += candidates[i]
            path.push(candidates[i])
            helper(i)
            path.pop()
            sum -= candidates[i]
        }
    }
    helper()
    return res
};
// const res = combinationSum([2, 3, 6, 7], 7)
// console.log(res)

// 131. 分割回文串
// 输入：s = "aab" 输出：[["a","a","b"],["aa","b"]]
var partition = function (s) {
    const len = s.length
    if (!len) return []
    const isHW = (s = '') => s.split('').reverse().join('') === s
    const [res, path] = [[], []]

    const helper = (start = 0) => {
        if (start === len) res.push(path.slice())
        for (let i = start; i < len; i++) {
            const tmp = s.slice(start, i + 1)
            if (!isHW(tmp)) continue
            path.push(tmp)
            helper(i + 1)
            path.pop()

        }
    }
    helper()
    return res
};
// const res = partition('aab')
// console.log(res)

// 93. 复原 IP 地址
// 有效 IP 地址 正好由四个整数（每个整数位于 0 到 255 之间组成，且不能含有前导 0），整数之间用 '.' 分隔。
var restoreIpAddresses = function (s) {
    const len = s.length
    const [res, path] = [[], []]

    const helper = (start = 0) => {
        if (path.length > 4) return
        if (start === len && path.length === 4) res.push(path.slice().join('.'))
        for (let i = start; i < len; i++) {
            const tmp = s.slice(start, i + 1)
            const n = Number(tmp)
            if (tmp.length > 3 || n > 255) break
            if (tmp.length > 1 && tmp[0] === '0') break

            path.push(tmp)
            helper(i + 1)
            path.pop()
        }
    }
    helper()
    return res
};

// const res = restoreIpAddresses('25525511135')
// console.log(res)

// 77. 组合
// 给定两个整数 n 和 k，返回范围 [1, n] 中所有可能的 k 个数的组合。你可以按 任何顺序 返回答案。
// 输入：n = 4, k = 2
// 输出：
// [
//     [2,4],
//     [3,4],
//     [2,3],
//     [1,2],
//     [1,3],
//     [1,4],
// ]
var combine = function (n, k) {
    const [res, path] = [[], []]
    const helper = (start = 1) => {
        if (path.length === k) return res.push(path.slice())
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

// 78. 子集
// 给你一个整数数组 nums ，数组中的元素 互不相同 。返回该数组所有可能的子集（幂集）。
// 输入：nums = [1,2,3]
// 输出：[[],[1],[2],[1,2],[3],[1,3],[2,3],[1,2,3]]
var subsets = function (nums) {
    const len = nums.length
    const [res, path] = [[], []]
    const helper = (start = 0) => {
        if (path.length <= len) res.push(path.slice())
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


// 140. 单词拆分 II hard

// 17. 电话号码的字母组合
var letterCombinations = function (digits) {
    const len = digits.length
    if (!len) return []
    const [res, path] = [[], []]
    const maps = {
        '2': ['a', 'b', 'c'],
        '3': ['d', 'e', 'f'],
        '4': ['g', 'h', 'i'],
        '5': ['j', 'k', 'l'],
        '6': ['m', 'n', 'o'],
        '7': ['p', 'q', 'r', 's'],
        '8': ['t', 'u', 'v'],
        '9': ['w', 'x', 'y', 'z'],
    }
    const helper = (start = 0) => {
        if (path.length === len) res.push(path.slice().join(''))
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
// 输入：digits = "23" 输出：["ad","ae","af","bd","be","bf","cd","ce","cf"]
// const res = letterCombinations('23')
// console.log(res)

// 22. 括号生成
// 剑指 Offer II 085. 生成匹配的括号
// 数字 n 代表生成括号的对数，请你设计一个函数，用于能够生成所有可能的并且 有效的 括号组合。
var generateParenthesis = function (n) {
    const [res, path] = [[], []]
    const helper = (left = 0, right = 0) => {
        if (left > n || right > n || left < right) return
        if (left === n && right === n) res.push(path.join(''))
        path.push('(')
        helper(left + 1, right)
        path.pop()
        path.push(')')
        helper(left, right + 1)
        path.pop()
    }
    helper()
    return res

};
// const res = generateParenthesis(3)
// console.log(res)

// 698. 划分为k个相等的子集
// 给定一个整数数组 nums 和一个正整数 k，找出是否有可能把这个数组分成 k 个非空子集，其总和都相等。
var canPartitionKSubsets = function (nums, k) {
    const sum = nums.reduce((i, p) => i + p)
    if (sum % k) return false
    const avg = sum / k
    nums.sort()
    if (nums[nums.length] > avg) return false
    const len = nums.length
    const bucket = Array(k).fill(0)
    const helper = (index = 0) => {
        if (index === len) return true
        for (let i = 0; i < k; i++) {
            if (bucket[i] === bucket[i - 1]) continue
            if (bucket[i] + nums[index] > avg) continue
            bucket[i] += nums[index]
            if (helper(index + 1)) return true
            bucket[i] -= nums[index]
        }
        return false
    }

    return helper()
};
const res = canPartitionKSubsets([4, 3, 2, 3, 5, 2, 1], 4)
console.log(res)


