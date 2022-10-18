// 遍历 or 分解递归
// 单独节点做什么

class Node {
    constructor(val) {
        this.val = val
        this.left = null
        this.right = null
    }
}

const t0 = new Node(0)
const t1 = new Node(1)
const t2 = new Node(2)
const t3 = new Node(3)
const t4 = new Node(4)
t1.left = t0
t1.right = t3
t3.left = t2
t3.right = t4

// 力扣第 104 题「 二叉树的最大深度」
var maxDepth1 = function (root) {
    // 分解子问题
    if (!root) return 0
    console.log(root.val)
    return 1 + Math.max(maxDepth1(root.left), maxDepth1(root.right))
};
const maxDepth2 = (root) => {
    // 遍历方法
    let n = 0, res = 0
    const traverse = (root) => {
        if (!root) return null
        n++
        console.log(n)
        if (!root.left && !root.right) {
            res = Math.max(n, res)
        }
        traverse(root.left)
        traverse(root.right)
        n--
    }
    traverse(root)
    return res
}

const res = maxDepth2(t1)
console.log(res)