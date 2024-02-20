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
            if (cur == target)
                return step;
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

// LeetCode 102. 二叉树的层序遍历
// LeetCode 200. 岛屿数量
// LeetCode 127. 单词接龙
// LeetCode 207. 课程表
// LeetCode 210. 课程表 II
// LeetCode 279. 完全平方数
// LeetCode 994. 腐烂的橘子
// LeetCode 429. N叉树的层序遍历
// LeetCode 515. 在每个树行中找最大值
// LeetCode 542. 01 矩阵


console.log(res)