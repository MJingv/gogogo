// 回溯-排列组合问题合集

// 有顺序+start
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


const res = subsetsWithDup([1, 1, 2])
console.log(res)


// 力扣第 40 题「 组合总和 II」
