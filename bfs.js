// 问题的本质就是让你在一幅「图」中找到从起点 start 到终点 target 的最近距离，这个例子听起来很枯燥，但是 BFS 算法问题其实都是在干这个事儿
// 一般来说在找最短路径的时候使用 BFS，其他时候还是 DFS 使用得多一些（主要是递归代码好写）

class TreeNode {
    constructor(val) {
        this.val = val
        this.left = null
        this.right = null
    }
}

const t0 = new TreeNode(0)
const t1 = new TreeNode(1)
const t2 = new TreeNode(2)
const t3 = new TreeNode(3)
const t4 = new TreeNode(4)
t1.left = t0
t1.right = t3
t3.left = t2
t3.right = t4

// 力扣第 111 题「 二叉树的最小深度」
var minDepth = function (root) {
    const q = [root]
    let min = 1
    while (q.length) {
        const len = q.length
        for (let i = 0; i < len; i++) {
            const cur = q.shift()
            if (!cur.left && !cur.right) return min
            if (cur.left) q.push(cur.left)
            if (cur.right) q.push(cur.right)
        }
        min++
    }
    return min
};
// const res = minDepth(t1)
// console.log(res)

// 102. 二叉树的层序遍历
var levelOrder = function (root) {
    if (!root) return []
    const [q, res] = [[root], []]
    let path = []
    while (q.length) {
        const len = q.length
        for (let i = 0; i < len; i++) {
            const cur = q.shift()
            path.push(cur.val)
            // if (!cur.left && !cur.right) return
            if (cur.left) q.push(cur.left)
            if (cur.right) q.push(cur.right)
        }
        res.push([...path])
        path = []
    }
    return res
};
// const res = levelOrder(t1)
// console.log(res)

var largestValues = function (root) {
    if (!root) return []
    const [res, q] = [[], [root]]
    let max = -Infinity
    while (q.length) {
        const len = q.length
        for (let i = 0; i < len; i++) {
            const cur = q.shift()
            if (cur.val > max) max = cur.val
            if (cur.left) q.push(cur.left)
            if (cur.right) q.push(cur.right)
        }
        res.push(max)
        max = -Infinity
    }
    return res
};
// const res = largestValues(t1)
// console.log(res)

// 剑指 Offer 32 - II. 从上到下打印二叉树 II
var levelOrder = function (root) {
    if (!root) return []
    const [res, q] = [[], [root]]
    let path = []
    while (q.length) {
        const len = q.length
        for (let i = 0; i < len; i++) {
            const cur = q.shift()
            path.push(cur.val)
            if (cur.left) q.push(cur.left)
            if (cur.right) q.push(cur.right)
        }
        res.push([...path])
        path = []

    }
    return res
};
// const res = levelOrder(t1)
// console.log(res)

// 863. 二叉树中所有距离为 K 的结点
var distanceK = function (root, target, k) {

};
// const res = distanceK(t1)
// console.log(res)

// 1091. 二进制矩阵中的最短路径
var shortestPathBinaryMatrix = function (grid) {
    const n = grid.length
    const [res, q] = [[], []]


};
// const res = shortestPathBinaryMatrix([[0, 1], [1, 0]])
// console.log(res)

// 117. 填充每个节点的下一个右侧节点指针 II
// 542. 01 矩阵
// 773. 滑动谜题


// 力扣第 752 题「 打开转盘锁」
// 剑指 Offer II 109. 开密码锁
// 输入：deadends = ["0201","0101","0102","1212","2002"], target = "0202" 输出：6
var openLock = function (deadends, target) {
    const q = ['0000']
    let step = 0
    const set = new Set()
    const up = (str, i) => {
        str = str.split('')
        let num = Number(str[i])
        if (num === 9) {
            num = 0
        } else {
            num++
        }
        str[i] = num + ''
        return str.join('')
    }
    const down = (str, i) => {
        str = str.split('')
        let num = Number(str[i])
        if (num === 0) {
            num = 9
        } else {
            num--
        }
        str[i] = num + ''
        return str.join('')
    }

    while (q.length) {
        const len = q.length
        for (let i = 0; i < len; i++) {
            const cur = q.shift()
            if (deadends.includes(cur)) continue
            if (cur === target) return step
            for (let j = 0; j < 4; j++) {
                const downStr = down(cur, j)
                if (!set.has(downStr)) {
                    q.push(downStr)
                    set.add(downStr)
                }
                const upStr = up(cur, j)
                if (!set.has(upStr)) {
                    q.push(upStr)
                    set.add(upStr)
                }
            }
        }
        step++
    }
    return -1
};
// const res = openLock(["0201", "0101", "0102", "1212", "2002"], '0202')
// console.log(res)