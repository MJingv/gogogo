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

// const res = maxDepth2(t1)
// console.log(res)

const preorderTraverse = (root) => {
    const traverse = (root) => {
        if (!root) return null
        console.log(root.val)
        traverse(root.left)
        traverse(root.right)
    }
    return traverse(root)
}

// const res = preorderTraverse(t1)
// console.log(res)

// 1、如果把根节点看做第 1 层，如何打印出每一个节点所在的层数？
const fn = (root, level) => {
    if (!root) return null
    console.log(level, root.val)
    fn(root.left, level + 1)
    fn(root.right, level + 1)
}
// const res = fn(t1, 1)
// console.log(res)

// 2、如何打印出每个节点的左右子树各有多少节点？
const fn1 = (root) => {
    if (!root) return 0
    const left = fn1(root.left)
    const right = fn1(root.right)
    const sum = left + right + 1
    console.log(root.val, sum)
    return sum
}

const res = fn1(t1)
console.log(res)


