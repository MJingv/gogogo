// bfs专题
// bfs就是求最短路径
// 问题的本质就是让你在一幅「图」中找到从起点 start 到终点 target 的最近距离


var BFS = function (start, target) {
    var q = []; // 核心数据结构
    var visited = new Set(); // 避免走回头路
    var step = 0;

    q.push(start); // 将起点加入队列
    visited.add(start);

    while (q.length > 0) {
        var sz = q.length;
        /* 将当前队列中的所有节点向四周扩散 */
        for (var i = 0; i < sz; i++) {
            var cur = q.shift();
            /* 划重点：这里判断是否到达终点 */
            if (cur == target) return step;
            /* 将 cur 的相邻节点加入队列 */
            var adj = cur.adj();
            for (var j = 0; j < adj.length; j++) {
                var x = adj[j];
                if (!visited.has(x)) {
                    q.push(x);
                    visited.add(x);
                }
            }
        }
        step++;
    }
    // 如果走到这里，说明在图中没有找到目标节点
}

function TreeNode(val, left, right) {
    this.val = (val === undefined ? 0 : val)
    this.left = (left === undefined ? null : left)
    this.right = (right === undefined ? null : right)
}

const t1 = new TreeNode(1)
const t0 = new TreeNode(0)
t1.left = t0
// t0.left = new TreeNode(0)
const t3 = new TreeNode(3)
t3.left = new TreeNode(2)
t3.right = new TreeNode(4)
t1.right = t3


// 111. 二叉树的最小深度
var minDepth = function (root) {
    // dfs
    if (!root) return 0
    const left = minDepth(root.left)
    const right = minDepth(root.right)
    if (!left || !right) return (left || right) + 1
    return Math.min(left, right) + 1

};
var minDepth2 = function (root) {
    // bfs
    if (!root) return 0
    const q = [root]
    let res = 1

    while (q.length) {
        const len = q.length
        for (let i = 0; i < len; i++) {
            const cur = q.shift()
            if (!cur.left && !cur.right) return res
            cur.left && q.push(cur.left)
            cur.right && q.push(cur.right)
        }
        res++
    }
    return res
}
// const res = minDepth2(t1)

// 752. 打开转盘锁
// 剑指 Offer II 109. 开密码锁
// 输入：deadends = ["0201","0101","0102","1212","2002"], target = "0202" 输出：6


var openLock = function (deadends, target) {
    const len = deadends.length
    let res = 0
    const q = ['0000']
    const visited = new Set('0000')

    const plusOne = (s, i) => {
        const list = s.split('')
        list[i] = list[i] === '9' ? '0' : (Number(list[i]) + 1) + ''
        return list.join('')


    }
    const minusOne = (s, i) => {
        const list = s.split('')
        list[i] = list[i] === '0' ? '9' : (Number(list[i]) - 1) + ''
        return list.join('')

    }

    while (q.length) {
        const len = q.length
        for (let i = 0; i < len; i++) {
            let cur = q.shift()
            if (deadends.includes(cur)) continue
            if (target === cur) return res
            for (let i = 0; i < 4; i++) {
                let up = plusOne(cur, i)
                if (!visited.has(up)) {
                    q.push(up)
                    visited.add(up)
                }
                let down = minusOne(cur, i)
                if (!visited.has(down)) {
                    q.push(down)
                    visited.add(down)
                }
            }
        }
        res++
    }

    return -1

};
// const res = openLock(["0201", "0101", "0102", "1212", "2002"], "0202")


// LeetCode 200. 岛屿数量
// 给你一个由 '1'（陆地）和 '0'（水）组成的的二维网格，请你计算网格中岛屿的数量。岛屿总是被水包围，并且每座岛屿只能由水平方向和/或竖直方向上相邻的陆地连接形成。
var numIslands = function (grid) {
    const [m, n] = [grid.length, grid[0].length]
    let res = 0

    const helper = (i, j) => {
        if (i < 0 || j < 0 || i >= m || j >= n || grid[i][j] === '0') return
        grid[i][j] = '0'
        helper(i - 1, j)
        helper(i + 1, j)
        helper(i, j - 1)
        helper(i, j + 1)
    }

    for (let i = 0; i < m; i++) {
        for (let j = 0; j < n; j++) {
            if (grid[i][j] === '1') {
                helper(i, j)
                res++
            }
        }
    }

    return res

};
// const res = numIslands([["1", "1", "0", "0", "0"], ["1", "1", "0", "0", "0"], ["0", "0", "1", "0", "0"], ["0", "0", "0", "1", "1"]])


// LeetCode 279. 完全平方数
// 给你一个整数 n ，返回 和为 n 的完全平方数的最少数量 。
// 输入：n = 13 输出：2 解释：13 = 4 + 9
var numSquares = function (n) {
    if (!n) return 0
    const dp = Array(n + 1).fill(Infinity)
    dp[0] = 0
    for (let i = 1; i <= n; i++) {
        for (let j = 1; j * j <= i; j++) {
            console.log(i, j)
            dp[i] = Math.min(dp[i - 1], dp[i - j * j]) + 1
        }
    }

    return dp[n - 1]
};
// const res = numSquares(13)

// LeetCode 515. 在每个树行中找最大值

var largestValues = function (root) {
    if (!root) return []
    const [res, q] = [[], [root]]
    let max = -Infinity
    while (q.length) {
        const len = q.length
        for (let i = 0; i < len; i++) {
            const cur = q.shift()
            max = Math.max(max, cur.val)
            cur.left && q.push(cur.left)
            cur.right && q.push(cur.right)
        }
        res.push(max)
        max = -Infinity
    }

    return res


};
const res = largestValues(t1)

// LeetCode 542. 01 矩阵


// LeetCode 994. 腐烂的橘子

// LeetCode 127. 单词接龙 hard

// LeetCode 207. 课程表
var canFinish = function (numCourses, prerequisites) {

};
// const res = canFinish()
// LeetCode 210. 课程表 II
var findOrder = function (numCourses, prerequisites) {

};


console.log(res)

