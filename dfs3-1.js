// 排列（元素无重可复选）
const fun = (nums) => {
    const len = nums.length
    const [path, res] = [[], []]

    const helper = () => {
        if (path.length === len) return res.push([...path])
        for (let i = 0; i < len; i++) {
            path.push(nums[i])
            helper()
            path.pop()
        }
    }

    helper()
    return res
}
// const res = fun([1, 2, 3])
// console.log(res)

// 力扣第 78 题「 子集」
// 给你一个整数数组 nums ，数组中的元素 互不相同 。返回该数组所有可能的子集（幂集）。解集 不能 包含重复的子集。你可以按 任意顺序 返回解集。
// 输入：nums = [1,2,3]
// 输出：[[],[1],[2],[1,2],[3],[1,3],[2,3],[1,2,3]]
var subsets = function (nums) {
    const len = nums.length
    const [path, res] = [[], []]
    const helper = (start) => {
        res.push([...path])
        for (let i = start; i < len; i++) {
            path.push(nums[i])
            helper(i + 1)
            path.pop()
        }
    }
    helper(0)
    return res
};
// const res = subsets([1, 2, 3])
// console.log(res)

// 力扣第 90 题「 子集 II」
// 解集 不能 包含重复的子集。返回的解集中，子集可以按 任意顺序 排列。
// 输入：nums = [1,2,2] 输出：[[],[1],[1,2],[1,2,2],[2],[2,2]]
var subsetsWithDup = function (nums) {
    const len = nums.length
    const [path, res] = [[], []]
    nums = nums.sort()
    const helper = (start) => {
        res.push([...path])
        for (let i = start; i < len; i++) {
            if (i > start && nums[i] === nums[i - 1]) continue
            path.push(nums[i])
            helper(i + 1)
            path.pop()
        }
    }
    helper(0)
    return res
};
// const res = subsetsWithDup([1, 2, 2])
// console.log(res)

// 46 题「 全排列」
// 输入：nums = [1,2,3] 输出：[[1,2,3],[1,3,2],[2,1,3],[2,3,1],[3,1,2],[3,2,1]]
var permute = function (nums) {
    const len = nums.length
    const [path, res] = [[], []]
    const helper = (used = {}) => {
        if (path.length === len) return res.push([...path])
        for (let i = 0; i < len; i++) {
            if (used[i]) continue
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
// const res = permute([1, 2, 3])
// console.log(res)


// 47 题「 全排列 II」
// 输入：nums = [1,1,2] 输出： [[1,1,2], [1,2,1], [2,1,1]]
const permuteUnique = (nums) => {
    const len = nums.length
    const [path, res] = [[], []]
    nums = nums.sort()
    const helper = (used = {}) => {
        if (path.length === len) res.push([...path])
        for (let i = 0; i < len; i++) {
            if (used[i]) continue
            if (i > 0 && nums[i - 1] === nums[i] && !used[i - 1]) continue
            path.push(nums[i])
            used[i] = true
            helper(used)
            path.pop()
            used[i] = false
        }
    }
    helper()
    return res
}
// const res = permuteUnique([1, 1, 2])
// console.log(res)

// 力扣第 77 题「 组合」
// 给定两个整数 n 和 k，返回范围 [1, n] 中所有可能的 k 个数的组合。
// 输入：n = 4, k = 2
// 输出：[[2, 4], [3, 4], [2, 3], [1, 2], [1, 3], [1, 4],]
var combine = function (n, k) {
    const [path, res] = [[], []]
    const helper = (start = 1) => {
        if (path.length === k) return res.push([...path])
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


// 力扣第 39 题「 组合总和」
// candidates 中的 同一个 数字可以 无限制重复被选取 。如果至少一个数字的被选数量不同，则两种组合是不同的。
// 输入：candidates = [2,3,6,7], target = 7 输出：[[2,2,3],[7]]
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
}
// const res = combinationSum([2, 3, 6, 7], 7)
// console.log(res)

// 力扣第 40 题「 组合总和 II」
// 输入: candidates = [10,1,2,7,6,1,5], target = 8, 输出: [ [1,1,6], [1,2,5], [1,7], [2,6] ]
// candidates 中的每个数字在每个组合中只能使用 一次 。
var combinationSum2 = function (candidates, target) {
    const len = candidates.length
    const [path, res] = [[], []]
    let cur = 0
    candidates = candidates.sort()
    const helper = (start = 0) => {
        if (cur === target) res.push([...path])
        if (cur > target) return
        for (let i = start; i < len; i++) {
            if (i > start && candidates[i - 1] === candidates[i]) continue
            path.push(candidates[i])
            cur += candidates[i]
            helper(i + 1)
            path.pop()
            cur -= candidates[i]
        }
    }
    helper()
    return res
}
const res = combinationSum2([10, 1, 2, 7, 6, 1, 5], 8)
console.log(res)

