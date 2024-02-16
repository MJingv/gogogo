// game


// 64. 最小路径和
// 剑指 Offer II 099. 最小路径之和
// 输入：grid = [[1,3,1],[1,5,1],[4,2,1]] 输出：7


var minPathSum = function (grid) {
    const [m, n] = [grid.length, grid[0].length]
    const dp = Array(m).fill(0).map(() => Array(n).fill(Infinity))
    dp[0][0] = grid[0][0]
    for (let j = 1; j < n; j++) {
        dp[0][j] = grid[0][j] + dp[0][j - 1]
    }
    for (let i = 1; i < m; i++) {
        dp[i][0] = dp[i - 1][0] + grid[i][0]
    }
    for (let i = 1; i < m; i++) {
        for (let j = 1; j < n; j++) {
            dp[i][j] = Math.min(dp[i - 1][j], dp[i][j - 1]) + grid[i][j]
        }

    }

    return dp[m - 1][n - 1]

};
// const res = minPathSum([[1, 3, 1], [1, 5, 1], [4, 2, 1]])

// 力扣第 174 题「地下城游戏」
var calculateMinimumHP = function (dungeon) {
    const [m, n] = [dungeon.length, dungeon[0].length]
    const dp = Array(m).fill(0).map(() => Array(n).fill(-Infinity))
    // 不太懂


};
// const res = calculateMinimumHP([[-2, -3, 3], [-5, -10, 1], [10, 30, -5]])//7


// 787. K 站中转内最便宜的航班
var findCheapestPrice = function (n, flights, src, dst, k) {
    const len = flights.length
    const dp = Array(n).fill(0).map(() => Array(k + 2).fill(Infinity))
    for (let i = 0; i <= k + 1; i++) {
        dp[src][i] = 0;
    }

    for (let i = 1; i <= k + 1; i++) {
        for (let [u, v, cost] of flights) {
            dp[v][i] = Math.min(dp[v][i], dp[u][i - 1] + cost)

        }
    }
    return dp[dst][k + 1] === Infinity ? -1 : dp[dst][k + 1]

};
const res = findCheapestPrice(3, [[0, 1, 100], [1, 2, 100], [0, 2, 500]], 0, 2, 1)
console.log(res)