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
const res = numIslands([["1", "1", "0", "0", "0"], ["1", "1", "0", "0", "0"], ["0", "0", "1", "0", "0"], ["0", "0", "0", "1", "1"]])
console.log(res)