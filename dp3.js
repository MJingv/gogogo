// 64. 最小路径和
// 剑指 Offer II 099. 最小路径之和
// 剑指 Offer 47. 礼物的最大价值

// 给定一个包含非负整数的 m x n 网格 grid ，请找出一条从左上角到右下角的路径，使得路径上的数字总和为最小。说明：每次只能向下或者向右移动一步。
// 输入：grid = [[1,3,1],[1,5,1],[4,2,1]] 输出：7 解释：因为路径 1→3→1→1→1 的总和最小。
var minPathSum = function (grid) {
    const m = grid.length
    if (!m) return 0
    const n = grid[0].length
    const dp = Array(m).fill(0).map(i => Array(n).fill(0))
    dp[0][0] = grid[0][0]

    for (let i = 1; i < m; i++) {
        dp[i][0] = dp[i - 1][0] + grid[i][0]
    }
    for (let j = 1; j < n; j++) {
        dp[0][j] = dp[0][j - 1] + grid[0][j]
    }


    for (let i = 1; i < m; i++) {
        for (let j = 1; j < n; j++) {
            dp[i][j] = Math.min(dp[i - 1][j], dp[i][j - 1]) + grid[i][j]
        }
    }

    return dp[m - 1][n - 1]
};
var minPathSum1 = function (grid) {
    const m = grid.length
    if (!m) return
    const n = grid[0].length
    const memo = Array(m).fill(Infinity).map(i => Array(n).fill(Infinity))
    const dp = (grid, i, j) => {
        if (i === 0 && j === 0) return memo[0][0] = grid[0][0]
        if (i < 0 || j < 0) return Infinity
        if (memo[i][j] !== Infinity) return memo[i][j]
        memo[i][j] = Math.min(dp(grid, i - 1, j), dp(grid, i, j - 1)) + grid[i][j]
        return memo[i][j]
    }
    dp(grid, m - 1, n - 1)
    return memo[m - 1][n - 1]
}

// const res = minPathSum1([[1, 3, 1], [1, 5, 1], [4, 2, 1]])
// console.log(res)


// 174. 地下城游戏
var calculateMinimumHP = function (dungeon) {
    const m = dungeon.length
    if (!m) return
    const n = dungeon[0].length
    const memo = Array(m).fill(Infinity).map(i => Array(n).fill(Infinity))
    const dp = (grid, i, j) => {
        // 从i，j到右下角需要多少血
        if (i === m - 1 && j === n - 1) {
            return memo[i][j] = grid[i][j] >= 0 ? 1 : 1 - grid[i][j]
        }
        if (i >= m || j >= n) return Infinity
        if (memo[i][j] !== Infinity) return memo[i][j]
        const res = Math.min(dp(grid, i + 1, j), dp(grid, i, j + 1)) - grid[i][j]
        memo[i][j] = res <= 0 ? 1 : res
        return memo[i][j]
    }
    dp(dungeon, 0, 0)
    return memo
    return dp(dungeon, 0, 0)
};

const calculateMinimumHP1 = (dungeon) => {
    const m = dungeon.length
    if (!m) return
    const n = dungeon[0].length
    const dp = Array(m).fill(Infinity).map(i => Array(n).fill(Infinity))

    for (let i = m - 1; i >= 0; i--) {
        for (let j = n - 1; j >= 0; j--) {
            // 放弃
        }
    }
    return dp

}
const res = calculateMinimumHP1([[-2, -3, 3], [-5, -10, 1], [10, 30, -5]])
console.log(res)