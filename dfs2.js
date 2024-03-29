// 回溯本质是暴力
// 没有思路用回溯

// def backtrack(...):
// for 选择 in 选择列表:
// 做选择
// backtrack(...)
// 撤销选择

// 模版
var temp = function (s) {
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
    const swapCase = (ch) => {
        if (ch >= 'a' && ch <= 'z') return ch.toUpperCase()
        if (ch >= 'A' && ch <= 'Z') return ch.toLowerCase()
    }
    const isLetter = (ch) => ch >= 'a' && ch <= 'z' || ch >= 'A' && ch <= 'Z'
    const len = s.length
    const res = []
    s = s.split('')

    const helper = (path, i) => {
        if (path.length === len) return res.push(path.join(''))
        if (isLetter(s[i])) {
            helper([...path, s[i]], i + 1)
            helper([...path, swapCase(s[i])], i + 1)

        } else {
            helper([...path, s[i]], i + 1)
        }
    }
    helper([], 0)
    return res

};

// const res = letterCasePermutation('3z4')
// console.log(res)

// 1219 黄金矿工
// 输入：grid = [[0,6,0],[5,8,7],[0,9,0]] 输出：24
var getMaximumGold = function (grid) {
    const [m, n] = [grid.length, grid[0].length]
    let max = 0
    const dirs = [[0, -1], [0, 1], [-1, 0], [1, 0]]

    const helper = (x, y, sum) => {
        sum += grid[x][y]
        max = Math.max(max, sum)
        let tmp = grid[x][y]
        grid[x][y] = 0
        for (const dir of dirs) {
            const newX = x + dir[0]
            const newY = y + dir[1]
            if (newX < m && newX >= 0 && newY < n && newY >= 0 && grid[newX][newY] > 0) {
                helper(newX, newY, sum)
            }
        }
        grid[x][y] = tmp
    }
    for (let i = 0; i < m; i++) {
        for (let j = 0; j < n; j++) {
            if (grid[i][j] !== 0) helper(i, j, 0)
        }
    }
    return max
};
// const res = getMaximumGold([[0, 6, 0], [5, 8, 7], [0, 9, 0]])//24
// console.log(res)


const quanpailie = (s) => {
    const [len, res, path] = [s.length, [], []]
    if (!len) return res
    const helper = (used = {}) => {
        if (path.length === len) res.push(path.join(''))
        for (let i = 0; i < len; i++) {
            if (used[s[i]]) continue
            path.push(s[i])
            used[s[i]] = true
            helper(used)
            used[s[i]] = false
            path.pop()
        }
    }
    helper()
    return res
}
// const res = quanpailie('123')
// console.log(res)

// 698. 划分为k个相等的子集
// 输入： nums = [4, 3, 2, 3, 5, 2, 1], k = 4 输出： True 说明： 有可能将其分成 4 个子集（5），（1,4），（2,3），（2,3）等于总和。

const canPartitionKSubsets = function (nums, k) {
    const sum = nums.reduce((a, b) => a + b)
    if (sum % k) return false
    nums = nums.sort((a, b) => b - a)
    const target = sum / k
    if (nums[0] > target) return false
    const bucket = Array(k).fill(0)
    const helper = (index = 0) => {
        // 第index个球
        if (index === nums.length) {
            for (let i = 0; i < k; i++) {
                if (bucket[i] !== target) return false
            }
            return true
        }
        for (let i = 0; i < k; i++) {
            // 第i个桶
            if (bucket[i] + nums[index] > target) continue
            bucket[i] += nums[index]
            if (helper(index + 1)) return true
            bucket[i] -= nums[index]
        }
        return false
    }
    return helper()

};

const canPartitionKSubsets1 = (nums, k) => {
    // timeout 需要位运算优化
    const len = nums.length
    const sum = nums.reduce((a, b) => a + b)
    if (sum % k) return false
    nums = nums.sort((a, b) => b - a)
    const target = sum / k
    if (nums[0] > target) return false

    const helper = (n, used = {}, start = 0, bucket = 0) => {
        if (n === 0) {
            // 桶都装完了
            return true
        }
        if (bucket === target) {
            return helper(n - 1, used, 0, 0)
        }
        for (let i = start; i < len; i++) {
            if (used[i]) continue // i必须是引用，数字可能会重复
            if (bucket + nums[i] > target) continue
            used[i] = true
            bucket += nums[i]
            if (helper(n, used, start + 1, bucket)) return true
            bucket -= nums[i]
            used[i] = false
        }
        return false

    }
    return helper(k, {}, 0, 0)
}


const canPartitionKSubsets2 = (nums, k) => {
    // 以球的角度，遍历桶，球选择放or不放
    const len = nums.length
    const sum = nums.reduce((a, b) => a + b)
    if (sum % k) return false
    const target = sum / k
    nums.sort((a, b) => b - a)
    if (nums[0] > target) return false
    const bucket = Array(k).fill(0)

    const helper = (index) => {
        // 第index个球
        if (index === len) return true
        for (let i = 0; i < k; i++) {
            if (bucket[i] === bucket[i - 1]) continue
            if (bucket[i] + nums[index] > target) continue
            bucket[i] += nums[index]
            if (helper(index + 1)) return true
            bucket[i] -= nums[index]
        }
        return false

    }
    return helper(0)

}
const res = canPartitionKSubsets2([4, 3, 2, 3, 5, 2, 1], 4)
console.log(res)