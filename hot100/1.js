// 回溯
var letterCombinations = function (digits) {
    const len = digits.length
    const l = digits.split('')
    const mapping = ["", "", "abc", "def", "ghi", "jkl", "mno", "pqrs", "tuv", "wxyz"];
    const list = []
    l.map((i) => list.push(mapping[Number(i)]))
    const res = []
    const helper = (i = 0, path = []) => {
        if (path.length === len || i === len) return res.push(path.slice().join(''))
        for (let j of list[i]) {
            path.push(j)
            helper(i + 1, path)
            path.pop()
        }
    }
    helper()
    return res

};
// const res = letterCombinations('23')


// 46 全排列
var permute = function (nums) {
    const len = nums.length
    const res = []
    const path = []
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

// 77 组合
// 给定两个整数 n 和 k，返回范围 [1, n] 中所有可能的 k 个数的组合。
var combine = function (n, k) {
    if (!k) return []
    if (n < 1) return
    const res = []
    const path = []


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


// 39 组合总和 无重复，可复用
// 输入：candidates = [2,3,6,7], target = 7 输出：[[2,2,3],[7]]
var combinationSum = function (candidates, target) {
    const len = candidates.length
    const res = []
    const helper = (start = 0, path = [], sum = 0) => {
        if (sum > target) return
        if (sum === target) return res.push(path.slice())

        for (let i = start; i < len; i++) {
            const cur = candidates[i]
            path.push(cur)
            sum += cur
            helper(i, path, sum)
            path.pop()
            sum -= cur
        }
    }
    helper()
    return res


};
// const res = combinationSum([2, 3, 6, 7], 7)


// 22. 括号生成
var generateParenthesis = function (n) {
    const res = []
    const helper = (path = [], left = 0, right = 0) => {
        if (left < right || left > n || right > n) return
        if (left === n && right === n) return res.push(path.slice().join(''))

        path.push('(')
        helper(path, left + 1, right)
        path.pop()

        path.push(')')
        helper(path, left, right + 1)
        path.pop()

    }
    helper()
    return res

};
// const res = generateParenthesis(3)


// 79
var exist = function (board, word) {
    const [m, n] = [board.length, board[0].length]
    let res = false

    const helper = (row = 0, col = 0, i = 0) => {
        if (row < 0 || row >= m || col < 0 || col >= n) return
        if (i === word.length) return res = true
        if (board[row][col] !== word[i]) return false
        board[row][col] = -board[row][col]
        helper(row + 1, col, i + 1)
        helper(row - 1, col, i + 1)
        helper(row, col + 1, i + 1)
        helper(row, col - 1, i + 1)
        board[row][col] = -board[row][col]
    }
    for (let i = 0; i < m; i++) {
        for (let j = 0; j < n; j++) {
            if (board[i][j] === word[0]) {
                helper(i, j, 0)
            }
        }
    }

    return res

};
const res = exist([["A", "B", "C", "E"], ["S", "F", "C", "S"], ["A", "D", "E", "E"]], "ABCCED")
console.log(res)