// 回溯专题 -排列组合

// 全排列used，子集组合start


// 回溯算法是在遍历「树枝」，DFS 算法是在遍历「节点」

// result = []
// def backtrack(路径, 选择列表):
// if 满足结束条件:
// result.add(路径)
// return
//
// for 选择 in 选择列表:
// 做选择
// backtrack(路径, 选择列表)
// 撤销选择


// 46. 全排列
// 剑指 Offer II 083. 没有重复元素集合的全排列

// 给定一个不含重复数字的数组 nums ，返回其 所有可能的全排列 。你可以 按任意顺序 返回答案。
var permute = function (nums) {
    const len = nums.length
    if (!len) return []
    if (len === 1) return [nums]
    const res = []
    let path = []
    const helper = (used = {}) => {
        if (path.length === len) {
            res.push(path.slice()) //注意是slice，push当前的值
            return
        }
        for (let i = 0; i < len; i++) {
            if (!used[i]) {
                path.push(nums[i])
                used[i] = true
                helper(used)
                path.pop()
                used[i] = false
            }
        }
    }
    helper()

    return res

};
// const res = permute([1, 2, 3])// 输出：[[1,2,3],[1,3,2],[2,1,3],[2,3,1],[3,1,2],[3,2,1]]


// 47. 全排列 II
// 给定一个可包含重复数字的序列 nums ，按任意顺序 返回所有不重复的全排列
// 输入：nums = [1,1,2] 输出： [[1,1,2], [1,2,1], [2,1,1]]
var permuteUnique = function (nums) {
    const len = nums.length
    const [path, res] = [[], []]
    nums.sort()
    const helper = (used = {}) => {
        if (path.length === len) return res.push(path.slice())

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

};
// const res = permuteUnique([1, 1, 2])

// 力扣第 78 题「子集」
// 给你一个整数数组 nums ，数组中的元素 互不相同 。返回该数组所有可能的子集（幂集）。
// 输入：nums = [1,2,3] 输出：[[],[1],[2],[1,2],[3],[1,3],[2,3],[1,2,3]]
var subsets = function (nums) {
    const len = nums.length
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


// 比如力扣第 77 题「组合」：
// 给定两个整数 n 和 k，返回范围 [1, n] 中所有可能的 k 个数的组合。
var combine = function (n, k) {
    if (!k || !n) return []
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
// const res = combine(4, 2)//[[2, 4], [3, 4], [2, 3], [1, 2], [1, 3], [1, 4],]

// 力扣第 90 题「子集 II」
// 输入：nums = [1,2,2] 输出：[[],[1],[1,2],[1,2,2],[2],[2,2]]
var subsetsWithDup = function (nums) {
    const len = nums.length
    const [res, path] = [[], []]
    nums.sort()
    const helper = (start = 0) => {
        res.push(path.slice())
        for (let i = start; i < len; i++) {
            if (nums[i] === nums[i - 1] && i > start) continue
            path.push(nums[i])
            helper(i + 1)
            path.pop()
        }

    }
    helper()
    return res
};
// const res = subsetsWithDup([1, 2, 2])

// 力扣第 40 题「组合总和 II」：
// candidates 中的每个数字在每个组合中只能使用 一次 。
var combinationSum2 = function (candidates, target) {

    const len = candidates.length
    const [path, res] = [[], []]
    candidates.sort()
    const helper = (start = 0, sum = 0) => {
        if (sum === target) return res.push(path.slice())
        for (let i = start; i < len; i++) {
            const cur = candidates[i]
            if (cur > target || sum > target || i > start && cur === candidates[i - 1]) continue
            path.push(cur)
            sum += cur
            helper(i + 1, sum)
            path.pop()
            sum -= cur
        }
    }
    helper()
    return res

};
const res = combinationSum2([10, 1, 2, 7, 6, 1, 5], 8)// 输出: [ [1,1,6], [1,2,5], [1,7], [2,6] ]

// 51. N 皇后
// 输入：n = 4 输出：[[".Q..","...Q","Q...","..Q."],["..Q.","Q...","...Q",".Q.."]]
var solveNQueens = function (n) {
    const isValid = (board, row, col) => {
        // 一行一行放Q 不用判断行
        // 列存在重复Q
        for (let i = 0; i < row; i++) {
            if (board[i][col] === 'Q') return false
        }
        // 右上重复Q
        for (let i = row - 1, j = col + 1; i >= 0 && j < n; i--, j++) {
            if (board[i][j] === 'Q') return false
        }
        // 左上重复Q
        for (let i = row - 1, j = col - 1; i >= 0 && j >= 0; i--, j--) {
            if (board[i][j] === 'Q') return false
        }
        return true
    }

    const res = []

    const helper = (board, row = 0) => {
        if (row === board.length) {
            return res.push(board.map((row) => row.join("")));
        }

        for (let col = 0; col < n; col++) {
            if (!isValid(board, row, col)) continue

            board[row][col] = 'Q'
            helper(board, row + 1)
            board[row][col] = '.'
        }

    }
    const b = Array(n).fill(0).map(i => Array(n).fill('.'))
    helper(b, 0)
    return res

};
// const res = solveNQueens(4)
// 52. N皇后 II


console.log(res)