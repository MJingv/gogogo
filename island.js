// 力扣第 200 题「 岛屿数量」
// 给你一个由 '1'（陆地）和 '0'（水）组成的的二维网格，请你计算网格中岛屿的数量。
var numIslands = function (grid) {
    // dfs floodfill
    const [m, n] = [grid.length, grid[0].length]
    let res = 0
    const dir = [[1, 0], [-1, 0], [0, 1], [0, -1]]
    const helper = (i, j) => {
        if (i < 0 || i >= m || j < 0 || j >= n) return //越界
        if (grid[i][j] === '0') return; //已经是海水了
        grid[i][j] = '0'
        helper(i + 1, j)
        helper(i - 1, j)
        helper(i, j + 1)
        helper(i, j - 1)
    }

    for (let i = 0; i < m; i++) {
        for (let j = 0; j < n; j++) {
            if (grid[i][j] === '1') {
                res++
                helper(i, j)
            }
        }
    }
    return res
};
// const res = numIslands([["1", "1", "0", "0", "0"], ["1", "1", "0", "0", "0"], ["0", "0", "1", "0", "0"], ["0", "0", "0", "1", "1"]])
// console.log(res)

// 力扣第 1254 题「 统计封闭岛屿的数目」
var closedIsland = function (grid) {
    const [m, n] = [grid.length, grid[0].length]
    let res = 0
    const helper = (i, j) => {
        if (i < 0 || i >= m || j < 0 || j >= n) return
        if (grid[i][j] === 1) return; //已经是水了
        grid[i][j] = 1
        helper(i + 1, j)
        helper(i - 1, j)
        helper(i, j + 1)
        helper(i, j - 1)
    }

    for (let i = 0; i < m; i++) {
        helper(i, 0)
        helper(i, n - 1)
    }
    for (let j = 0; j < n; j++) {
        helper(0, j)
        helper(m - 1, j)
    }

    for (let i = 0; i < m; i++) {
        for (let j = 0; j < n; j++) {
            if (grid[i][j] === 0) {
                res++
                helper(i, j)
            }

        }
    }
    return res
};
// const res = closedIsland([[0, 0, 1, 0, 0], [0, 1, 0, 1, 0], [0, 1, 1, 1, 0]])
// console.log(res)

// 力扣第 1020 题「 飞地的数量」
var numEnclaves = function (grid) {
    const [m, n] = [grid.length, grid[0].length]
    let res = 0
    const helper = (i, j) => {
        if (i < 0 || i >= m || j < 0 || j >= n) return
        if (grid[i][j] === 0) return;
        grid[i][j] = 0
        helper(i + 1, j)
        helper(i - 1, j)
        helper(i, j + 1)
        helper(i, j - 1)
    }

    for (let i = 0; i < m; i++) {
        for (let j = 0; j < n; j++) {
            if (grid[i][j] === 1) {
                res++
                helper(i, j)
            }
        }
    }
    return res - 1
};
const res = numEnclaves([[0, 0, 0, 0], [1, 0, 1, 0], [0, 1, 1, 0], [0, 0, 0, 0]])
console.log(res)