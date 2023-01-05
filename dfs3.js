// 回溯-排列组合问题合集

// 有顺序+start 不重复用元素
// 无重复+used


// 所有无重子集
// 力扣第 78 题「 子集」
// 比如输入 nums = [1,2,3]，算法应该返回如下子集：[ [],[1],[2],[3],[1,2],[1,3],[2,3],[1,2,3] ]
var subsets = function (nums) {
    // 这种需要顺序的从star开始遍历
    const len = nums.length
    const [path, res] = [[], []]
    const helper = (start) => {
        res.push(path.slice())
        for (let i = start; i < len; i++) {
            path.push(nums[i])
            helper(i + 1)
            path.pop()
        }
    }
    helper(0)
    return res
};

// 组合（元素无重不可复选
// 力扣第 77 题「 组合」
// 给定两个整数 n 和 k，返回范围 [1, n] 中所有可能的 k 个数的组合。
// 输入：n = 4, k = 2 输出： [ [2,4], [3,4], [2,3], [1,2], [1,3], [1,4], ]
var combine = function (n, k) {
    const [path, res] = [[], []]
    const helper = (start) => {
        if (path.length === k) res.push([...path])
        for (let i = start; i <= n; i++) {
            path.push(i)
            helper(i + 1)
            path.pop()
        }
    }
    helper(1)
    return res
};


// 排列（元素无重不可复选）
// 46 题「 全排列」
// 输入：nums = [1,2,3]
// 输出：[[1,2,3],[1,3,2],[2,1,3],[2,3,1],[3,1,2],[3,2,1]]
var permute = function (nums) {
    const len = nums.length
    const [path, res] = [[], []]
    const helper = (used = {}) => {
        if (path.length === len) res.push([...path])
        for (let i = 0; i < len; i++) {
            if (used[nums[i]]) continue
            path.push(nums[i])
            used[nums[i]] = true
            helper(used)
            path.pop()
            used[nums[i]] = false
        }
    }
    helper()
    return res
};

// 子集/组合（元素可重不可复选）
// 力扣第 90 题「 子集 II」
// 输入：nums = [1,2,2] 输出：[[],[1],[1,2],[1,2,2],[2],[2,2]]
// 解集 不能 包含重复的子集。返回的解集中，子集可以按 任意顺序 排列。
var subsetsWithDup = function (nums) {
    const len = nums.length
    const [path, res] = [[], []]
    nums = nums.sort() //排序使得相等的在一起
    const helper = (start) => {
        res.push([...path])
        for (let i = start; i < len; i++) {
            if (i > start && nums[i] === nums[i - 1]) continue //去重
            path.push(nums[i])
            helper(i + 1)
            path.pop()
        }
    }
    helper(0)
    return res
};


// 力扣第 40 题「 组合总和 II」
// candidates 中的每个数字在每个组合中只能使用 一次 。注意：解集不能包含重复的组合。
// 输出: [ [1,1,6], [1,2,5], [1,7], [2,6] ]
var combinationSum2 = function (candidates, target) {
    const len = candidates.length
    candidates.sort()
    const [res, path] = [[], []]
    let cur = 0

    const helper = (start) => {
        if (cur === target) res.push([...path])
        if (cur > target) return
        for (let i = start; i < len; i++) {
            if (i > start && candidates[i - 1] === candidates[i]) continue
            cur += candidates[i]
            path.push(candidates[i])
            helper(i + 1)
            cur -= candidates[i]
            path.pop()
        }
    }
    helper(0)
    return res
};
// const res = combinationSum2([10, 1, 2, 7, 6, 1, 5], 8)
// console.log(res)

// 47 题「 全排列 II」
// 给定一个可包含重复数字的序列 nums ，按任意顺序 返回所有不重复的全排列。
// 输入：nums = [1,1,2] 输出： [[1,1,2], [1,2,1], [2,1,1]]
var permuteUnique = function (nums) {
    const len = nums.length
    const [path, res] = [[], []]
    nums = nums.sort()
    const helper = (used = {}) => {
        if (path.length === len) res.push([...path])
        for (let i = 0; i < len; i++) {
            if (used[i]) continue
            if (i > 0 && nums[i] === nums[i - 1] && !used[i - 1]) continue //新增剪枝逻辑,相同的值前后顺序不变
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
// const res = permuteUnique([1, 1, 2])
// console.log(res)

// 力扣第 39 题「 组合总和」
// 输入：candidates = [2,3,6,7], target = 7 输出：[[2,2,3],[7]]
// candidates 中的 同一个 数字可以 无限制重复被选取 。如果至少一个数字的被选数量不同，则两种组合是不同的。
var combinationSum = function (candidates, target) {
    const len = candidates.length
    const [path, res] = [[], []]
    let cur = 0
    const helper = (start = 0) => {
        if (cur === target) res.push([...path])
        if (cur > target) return
        for (let i = start; i < len; i++) {
            cur += candidates[i]
            path.push(candidates[i])
            helper(i)
            cur -= candidates[i]
            path.pop()
        }
    }
    helper()
    return res
};
// const res = combinationSum([2, 3, 6, 7], 7)
// console.log(res)

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
const res = fun([1, 2, 3])
console.log(res)
