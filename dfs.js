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
// const res = largestIsland([
//     [0, 0, 0, 0, 0, 0, 0],
//     [0, 1, 1, 1, 1, 0, 0],
//     [0, 1, 0, 0, 1, 0, 0],
//     [1, 0, 1, 0, 1, 0, 0],
//     [0, 1, 0, 0, 1, 0, 0],
//     [0, 1, 0, 0, 1, 0, 0],
//     [0, 1, 1, 1, 1, 0, 0]
// ])


// 给你一个 m x n 的矩阵 board ，由若干字符 'X' 和 'O' ，找到所有被 'X' 围绕的区域，并将这些区域里所有的 'O' 用 'X' 填充。

const solve = (board) => {
    if (!board.length) return
    const [m, n] = [board.length, board[0].length]
    let flag = false
    const raw = new Array(m).fill(0).map(() => new Array(n).fill(0))

    const dfs = (i, j) => {
        if (i < 0 || j < 0 || i >= m || j >= n || board[i][j] === '') return false

        if (board[i][j] === 'O') {
            board[i][j] = 2
            const res = dfs(i + 1, j) && dfs(i - 1, j) && dfs(i, j + 1) && dfs(i, j - 1)
            if (res === false) {
                board[i][j] = 'O'
            } else {
                board[i][j] = 'X'
            }
        }
    }
    for (let i = 0; i < m; i++) {
        for (let j = 0; j < n; j++) {
            raw[i][j] = board[i][j]
            if (board[i][j] === 'X') {
                flag = true
            }
            if (board[i][j] === 'O') {
                dfs(i, j)
            }
        }
    }
    if (!flag) {
        //全部是0
        return raw
    } else {
        return board
    }
}
// const res = solve([["O", "O"], ["O", "O"]])
// console.log(res)

// 给你一个 无重复元素 的整数数组 candidates 和一个目标整数 target ，找出 candidates 中可以使数字和为目标数 target 的 所有 不同组合 ，并以列表形式返回。你可以按 任意顺序 返回这些组合。
// candidates 中的 同一个 数字可以 无限制重复被选取 。如果至少一个数字的被选数量不同，则两种组合是不同的。
// 对于给定的输入，保证和为 target 的不同组合数少于 150 个。
// 示例 1：
// 输入：candidates = [2,3,6,7], target = 7
// 输出：[[2,2,3],[7]]
// 解释：
// 2 和 3 可以形成一组候选，2 + 2 + 3 = 7 。注意 2 可以使用多次。
// 7 也是一个候选， 7 = 7 。
// 仅有这两种组合。

const combinationSum = (candidates, target) => {
    const len = candidates.length
    if (!len) return
    const res = []

    const helper = (start, preSum, preArr) => {
        if (preSum === target) return res.push(preArr)
        if (preSum > target) return
        for (let i = start; i < len; i++) {
            const first = candidates[i]
            helper(i, preSum + first, [...preArr, first])
        }

    }
    helper(0, 0, [])

    return res
}
// const res = combinationSum([2, 3, 6, 7], 7)
// console.log(res)

//combinationSum2值不能重复
const combinationSum2 = (candidates, target) => {
    const len = candidates.length
    if (!len) return
    const res = []
    candidates.sort()
    const helper = (start, preSum, preArr) => {
        if (preSum === target) return res.push(preArr)
        if (preSum > target) return
        const used = {}
        for (let i = start; i < len; i++) {
            const first = candidates[i]
            if (used[first]) continue
            used[first] = true
            helper(i + 1, preSum + first, [...preArr, first])
        }
    }
    helper(0, 0, [])
    return res
};
// const res = combinationSum2([10, 1, 2, 7, 6, 1, 5], 8)
// console.log(res)
// [ [1,1,6], [1,2,5], [1,7], [2,6] ]


// 找出所有相加之和为 n 的 k 个数的组合，且满足下列条件：
// 只使用数字1到9
// 每个数字 最多使用一次
// 输入: k = 3, n = 7 输出: [[1,2,4]] 解释: 1 + 2 + 4 = 7 没有其他符合的组合了。
// [[1,2,4]]
const combinationSum3 = (k, n) => {
    const res = []
    const helper = (start, preSum, preArr) => {
        if (preArr.length === k && preSum === n) return res.push(preArr)
        if (preSum > n) return
        for (let i = start; i < 10; i++) {
            helper(i + 1, preSum + i, [...preArr, i])
        }
    }
    helper(0, 0, [])
    return res
};

const res = combinationSum3(3, 7)
console.log(res)

const permute = (nums) => {
    const res = []
    if (nums.length === 0) return []
    if (nums.length === 1) return [nums]
    const len = nums.length
    for (let i = 0; i < len; i++) {
        const char = nums[i]
        const left = [...nums.slice(0, i), ...nums.slice(i + 1)]
        const next = permute(left)
        next.forEach(i => {
            const list = Array.isArray(i) ? i : [i]
            res.push([char, ...list])
        })
    }
    return res
}

const permuteUnique = (nums) => {
    const len = nums.length
    if (!len) return []
    if (len === 1) return [nums]
    const res = []
    const tmp = []

    for (let i = 0; i < len; i++) {
        const first = nums[i]
        if (tmp.indexOf(first) === -1) {
            tmp.push(first)
            const left = [...nums.slice(0, i), ...nums.slice(i + 1)]
            const list = permuteUnique(left)
            list.forEach(i => {
                const l = Array.isArray(i) ? i : [i]
                res.push([first, ...l])
            })
        }
    }
    return res

}
// const res = permuteUnique([1])
// console.log(res)

// 输入：n = 4 输出：[[".Q..","...Q","Q...","..Q."],["..Q.","Q...","...Q",".Q.."]]
const solveNQueens = (n) => {

};
const res = solveNQueens(4)
console.log(res)