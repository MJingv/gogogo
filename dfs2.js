// 回溯本质是暴力
// 没有思路用回溯

// def backtrack(...):
// for 选择 in 选择列表:
// 做选择
// backtrack(...)
// 撤销选择


// 力扣第 46 题「 全排列」
var permute = function (nums) {
    const len = nums.length
    const res = []
    const path = []
    if (!len) return res

    const helper = (used = {}) => {
        if (path.length === len) res.push(path.slice())
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
var permute1 = function (nums) {
    const len = nums.length
    const res = []
    if (!len) return res
    const path = []
    const helper = (used = {}) => {
        if (path.length === len) res.push(path.slice())
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

}
// const res = permute1([1, 2, 3])
// console.log(res)

// 力扣第 51 题「 N 皇后」
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
// console.log(res)

// 784 字母大小写全排列
// 输入: s = "3z4" 输出: ["3z4","3Z4"]
var letterCasePermutation = function (s) {
    const len = s.length
    const res = []
    if (!len) return res
    const path = []
    s = s.split('')
    const helper = (used = {}) => {
        if (path.length === len) res.push(path.join(''))
        for (let i = 0; i < len; i++) {
            if (used[s[i]]) continue
            path.push(s[i])
            used[s[i]] = true
            helper(used)
            path.pop()
            used[s[i]] = false
        }
    }
    helper()
    return res
};
const res = letterCasePermutation('3z4')
console.log(res)
