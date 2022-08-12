// 回溯法（back tracking）（探索与回溯法）是一种选优搜索法，又称为试探法，按选优条件向前搜索，以达到目标。但当探索到某一步时，发现原先选择并不优或达不到目标，就退回一步重新选择，这种走不通就退回再走的技术为回溯法，而满足回溯条件的某个状态的点称为“回溯点”。


// 「剑指 Offer 12. 矩阵中的路径」
// 输入：board = [["A","B","C","E"],["S","F","C","S"],["A","D","E","E"]], word = "ABCCED"
// 输出：true

const exist = (board, word) => {
    const [m, n] = [board.length, board[0].length];

    const dfs = (i, j, index) => {
        // 越界、或者字符不匹配
        if (i < 0 || i >= m || j < 0 || j >= n || board[i][j] !== word[index]) return false;
        // 索引等于单词长度-1，说明全匹配上了
        if (index === word.length - 1) return true;
        // 保存当前字符
        const temp = board[i][j];
        // 将当前字符设置为空，防止四个方向dfs再次遍历到
        board[i][j] = '';
        // 四个方向遍历
        const res =
            dfs(i + 1, j, index + 1) ||
            dfs(i, j + 1, index + 1) ||
            dfs(i - 1, j, index + 1) ||
            dfs(i, j - 1, index + 1);
        // 恢复当前字符
        board[i][j] = temp;
        return res;
    };

    // 从第一个匹配的字符处开始dfs
    for (let i = 0; i < m; i++) {
        for (let j = 0; j < n; j++) {
            if (dfs(i, j, 0)) return true;
        }
    }

    return false;
}
// const res = exist([["A", "A", "A", "A", "A", "A"], ["A", "A", "A", "A", "A", "A"], ["A", "A", "A", "A", "A", "A"], ["A", "A", "A", "A", "A", "A"], ["A", "A", "A", "A", "A", "B"], ["A", "A", "A", "A", "B", "A"]], "AAAAAAAAAAAAABB")


// 「剑指 Offer 13. 机器人的运动范围」
// 地上有一个m行n列的方格，从坐标 [0,0] 到坐标 [m-1,n-1] 。一个机器人从坐标 [0, 0] 的格子开始移动，它每次可以向左、右、上、下移动一格（不能移动到方格外），也不能进入行坐标和列坐标的数位之和大于k的格子。例如，当k为18时，机器人能够进入方格 [35, 37] ，因为3+5+3+7=18。但它不能进入方格 [35, 38]，因为3+5+3+8=19。请问该机器人能够到达多少个格子？
// 输入：m = 2, n = 3, k = 1
// 输出：3

const movingCount = (m, n, k) => {
    const isTrue = (i, j, k) => ((`${i}${j}`.split('') || []).reduce((i, p) => Number(i) + Number(p))) <= k
    const visited = new Array(m).fill(0).map(i => new Array(n).fill(false)) //一定要map新array，直接fill空数组会引用地址一样
    let res = 0
    const dfs = (i, j) => {
        if (i < 0 || j < 0 || i >= m || j >= n || visited[i][j]) return
        visited[i][j] = true
        if (isTrue(i, j, k)) {
            res++
            dfs(i + 1, j)
            dfs(i - 1, j)
            dfs(i, j + 1)
            dfs(i, j - 1)
        }
    }
    dfs(0, 0)
    return res
}
// const res = movingCount(2, 3, 1)


// 200. 岛屿数量
// 给你一个由 '1'（陆地）和 '0'（水）组成的的二维网格，请你计算网格中岛屿的数量。岛屿总是被水包围，并且每座岛屿只能由水平方向和/或竖直方向上相邻的陆地连接形成。此外，你可以假设该网格的四条边均被水包围。

const numIslands = (grid) => {
    if (!grid.length) return
    const [m, n] = [grid.length, grid[0].length]
    let res = 0
    const dfs = (i, j) => {
        if (i < 0 || j < 0 || i >= m || j >= n || grid[i][j] === '0' || grid[i][j] === '2') return false
        grid[i][j] = '2'
        dfs(i + 1, j)
        dfs(i - 1, j)
        dfs(i, j + 1)
        dfs(i, j - 1)
    }
    for (let i = 0; i < m; i++) {
        for (let j = 0; j < n; j++) {
            if (grid[i][j] === '1') {
                dfs(i, j)
                if (grid.length) res++
                // console.log(grid)
            }
        }
    }
    return res

}
// const res = numIslands([
//     ["1", "1", "1", "1", "0"],
//     ["1", "1", "0", "1", "0"],
//     ["1", "1", "0", "0", "0"],
//     ["0", "0", "0", "0", "1"]
// ])


// 463. 岛屿的周长
// 给定一个 row x col 的二维网格地图 grid ，其中：grid[i][j] = 1 表示陆地， grid[i][j] = 0 表示水域。
// 网格中的格子 水平和垂直 方向相连（对角线方向不相连）。整个网格被水完全包围，但其中恰好有一个岛屿（或者说，一个或多个表示陆地的格子相连组成的岛屿）。
// 岛屿中没有“湖”（“湖” 指水域在岛屿内部且不和岛屿周围的水相连）。格子是边长为 1 的正方形。网格为长方形，且宽度和高度均不超过 100 。计算这个岛屿的周长。

// 输入：grid = [[0,1,0,0],[1,1,1,0],[0,1,0,0],[1,1,0,0]]
// 输出：16
// 解释：它的周长是上面图片中的 16 个黄色的边

const islandPerimeter = (grid) => {
    if (!grid.length) return
    const [m, n] = [grid.length, grid[0].length]
    let p = 0

    const dfs = (i, j) => {
        if (i < 0 || j < 0 || i >= m || j >= n || grid[i][j] === 0) {
            p += 1
            return false
        }
        if (grid[i][j] === 2) return false
        grid[i][j] = 2
        dfs(i + 1, j)
        dfs(i - 1, j)
        dfs(i, j + 1)
        dfs(i, j - 1)
    }

    for (let i = 0; i < m; i++) {
        for (let j = 0; j < n; j++) {
            if (grid[i][j] === 1) {
                dfs(i, j)
            }
        }
    }
    return p
}

// const res = islandPerimeter([
//     [0, 1, 0, 0],
//     [1, 1, 1, 0],
//     [0, 1, 0, 0],
//     [1, 1, 0, 0]
// ])


// 695. 岛屿的最大面积
// 给你一个大小为 m x n 的二进制矩阵 grid 。
// 岛屿 是由一些相邻的 1 (代表土地) 构成的组合，这里的「相邻」要求两个 1 必须在 水平或者竖直的四个方向上 相邻。你可以假设 grid 的四个边缘都被 0（代表水）包围着。
// 岛屿的面积是岛上值为 1 的单元格的数目。
// 计算并返回 grid 中最大的岛屿面积。如果没有岛屿，则返回面积为 0 。

const maxAreaOfIsland = (grid) => {
    if (!grid.length) return
    const [m, n] = [grid.length, grid[0].length]
    let max = 0

    const dfs = (i, j, sum) => {
        if (i < 0 || j < 0 || i >= m || j >= n || grid[i][j] === 2 || grid[i][j] === 0) return 0
        grid[i][j] = 2
        return 1 + dfs(i + 1, j, sum) + dfs(i - 1, j, sum) + dfs(i, j + 1, sum) + dfs(i, j - 1, sum)
    }
    for (let i = 0; i < m; i++) {
        for (let j = 0; j < n; j++) {
            if (grid[i][j] === 1) {
                const sum = dfs(i, j, 0)
                max = Math.max(sum, max)
            }
        }
    }
    return max
}
// const res = maxAreaOfIsland([
//     [0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0],
//     [0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 0, 0, 0],
//     [0, 1, 1, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0],
//     [0, 1, 0, 0, 1, 1, 0, 0, 1, 0, 1, 0, 0],
//     [0, 1, 0, 0, 1, 1, 0, 0, 1, 1, 1, 0, 0],
//     [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0],
//     [0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 0, 0, 0],
//     [0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0]]
// )


// 给你一个大小为 n x n 二进制矩阵 grid 。最多 只能将一格 0 变成 1 。
// 返回执行此操作后，grid 中最大的岛屿面积是多少？
// 岛屿 由一组上、下、左、右四个方向相连的 1 形成。
// 输入: grid = [[1, 0], [0, 1]]
// 输出: 3
// 解释: 将一格0变成1，最终连通两个小岛得到面积为 3 的岛屿。

//一半过了...放弃
const largestIsland = (grid) => {
    if (!grid.length) return
    const [m, n] = [grid.length, grid[0].length]
    let max = 0, res = 0, flag = false
    const dfs = (i, j, sum) => {
        if (i < 0 || j < 0 || i >= m || j >= n || grid[i][j] === 2 || grid[i][j] === 0) return 0
        if (grid[i][j] === 1) {
            sum += 1
        }
        grid[i][j] = 2
        return 1 + dfs(i + 1, j, sum) + dfs(i - 1, j, sum) + dfs(i, j + 1, sum) + dfs(i, j - 1, sum)
    }

    for (let i = 0; i < m; i++) {
        for (let j = 0; j < n; j++) {
            if (grid[i][j] === 0) {
                flag = true
                grid[i][j] = 1
                res = dfs(i, j, 0)
                max = Math.max(res, max)
                grid[i][j] = 0
            }
        }
    }

    if (!flag) {
        //全是1
        max = Math.max(max, m * n)
    }
    return max
};
const res = largestIsland([
    [0, 0, 0, 0, 0, 0, 0],
    [0, 1, 1, 1, 1, 0, 0],
    [0, 1, 0, 0, 1, 0, 0],
    [1, 0, 1, 0, 1, 0, 0],
    [0, 1, 0, 0, 1, 0, 0],
    [0, 1, 0, 0, 1, 0, 0],
    [0, 1, 1, 1, 1, 0, 0]
])

console.log(res)
