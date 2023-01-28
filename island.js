// 淹掉淹掉
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
    // 0是海
    // 返回不能上下左右离开网格的1数量
    // 不知道为什么过不了
    const [m, n] = [grid.length, grid[0].length]
    let res = 0
    const helper = (i, j) => {
        if (i >= m || i < 0 || j >= n || j < 0) return
        if (grid[i][j] === 0) return;
        grid[i][j] = 0 //淹掉
        helper(i + 1, j)
        helper(i - 1, j)
        helper(i, j + 1)
        helper(i, j - 1)
    }

    for (let i = 0; i < m; i++) {
        helper(i, 0)
        helper(0, n - 1)
    }

    for (let j = 0; j < n; j++) {
        helper(0, j)
        helper(m - 1, j)
    }
    for (let i = 0; i < m; i++) {
        for (let j = 0; j < n; j++) {
            if (grid[i][j] === 1) {
                res++
            }
        }
    }
    return res

};
// const res = numEnclaves([[0, 0, 0, 0], [1, 0, 1, 0], [0, 1, 1, 0], [0, 0, 0, 0]])
// console.log(res)

// 力扣第 695 题「 岛屿的最大面积」
var maxAreaOfIsland = function (grid) {
    const [m, n] = [grid.length, grid[0].length]
    let res = 0
    const helper = (i, j) => {
        if (i >= m || i < 0 || j >= n || j < 0 || grid[i][j] === 0) return 0
        grid[i][j] = 0
        return helper(i + 1, j) + helper(i - 1, j) + helper(i, j + 1) + helper(i, j - 1) + 1
    }
    for (let i = 0; i < m; i++) {
        for (let j = 0; j < n; j++) {
            if (grid[i][j] === 1) {
                res = Math.max(res, helper(i, j))
            }
        }
    }

    return res
};
// const res = maxAreaOfIsland([[0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 0, 0, 0], [0, 1, 1, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0], [0, 1, 0, 0, 1, 1, 0, 0, 1, 0, 1, 0, 0], [0, 1, 0, 0, 1, 1, 0, 0, 1, 1, 1, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0], [0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0]])
// console.log(res)


// 力扣第 1905 题「 统计子岛屿」
// 2为1的子集
var countSubIslands = function (grid1, grid2) {
    const [m, n] = [grid1.length, grid1[0].length]
    let res = 0

    const helper = (grid, i, j) => {
        // 淹掉函数
        const [m, n] = [grid.length, grid[0].length]
        if (i >= m || i < 0 || j >= n || j < 0 || grid[i][j] === 0) return
        grid[i][j] = 0
        helper(grid, i + 1, j)
        helper(grid, i - 1, j)
        helper(grid, i, j + 1)
        helper(grid, i, j - 1)
    }

    for (let i = 0; i < m; i++) {
        for (let j = 0; j < n; j++) {
            if (grid2[i][j] === 1 && grid1[i][j] === 0) {
                helper(grid2, i, j)
            }
        }
    }

    for (let i = 0; i < m; i++) {
        for (let j = 0; j < n; j++) {
            if (grid2[i][j] === 1) {
                res++
                helper(grid2, i, j)
            }
        }
    }
    return res
};
const res = countSubIslands(grid1 = [[1, 1, 1, 0, 0], [0, 1, 1, 1, 1], [0, 0, 0, 0, 0], [1, 0, 0, 0, 0], [1, 1, 0, 1, 1]], grid2 = [[1, 1, 1, 0, 0], [0, 0, 1, 1, 1], [0, 1, 0, 0, 0], [1, 0, 1, 1, 0], [0, 1, 0, 1, 0]])
console.log(res)

// 力扣第 694 题「 不同的岛屿数量」
const numDistinctIslands = () => {

}
