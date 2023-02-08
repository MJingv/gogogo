// do it again
// 1.遍历 or 分解
// 2.位置：前中后

function TreeNode(val, left, right) {
    this.val = (val === undefined ? 0 : val)
    this.left = (left === undefined ? null : left)
    this.right = (right === undefined ? null : right)
}

const t1 = new TreeNode(1)
t1.left = new TreeNode(0)
const t3 = new TreeNode(3)
t3.left = new TreeNode(2)
t3.right = new TreeNode(4)
t1.right = t3

// 力扣第 104 题「 二叉树的最大深度」
// 遍历 dfs 回溯
var maxDepth = function (root) {
    let max = 0, depth = 0
    const helper = (node) => {
        if (!node) return
        depth++ //前序处理
        if (!node.left && !node.right) max = Math.max(max, depth)
        helper(node.left)
        helper(node.right)
        depth--
    }
    helper(root)
    return max

};
// 分解
const maxDepth1 = (root) => {
    if (!root) return 0
    //后序处理
    return Math.max(maxDepth1(root.left), maxDepth1(root.right)) + 1
}
// const res = maxDepth1(t1)
// console.log(res)

// 遍历
const traverse = (root) => {
    const res = []
    const helper = (node) => {
        if (!node) return
        res.push(node.val)
        helper(node.left)
        helper(node.right)
    }
    helper(root)
    return res
}
// 分解
const traverse1 = (root) => {
    let res = []
    if (!root) return res
    res.push(root.val)
    res = [...res, ...traverse1(root.left)]
    res = [...res, ...traverse1(root.right)]
    return res
}
// const res = traverse1(t1)
// console.log(res)


// 1、如果把根节点看做第 1 层，如何打印出每一个节点所在的层数？
const fn1 = (root) => {
    const helper = (node, depth = 1) => {
        if (!node) return depth
        console.log(node.val, depth) //前序
        helper(node.left, depth + 1)
        helper(node.right, depth + 1)
    }
    return helper(root)
    // return root
}
// const res = fn1(t1)
// console.log(res)

// 2、如何打印出每个节点的左右子树各有多少节点？
const fn2 = (root) => {
    const helper = (node) => {
        if (!node) return 0
        const left = helper(node.left)
        const right = helper(node.right)
        console.log(node.val, 'left', left, 'right', right,)//后序
        return left + right + 1
    }
    helper(root)
}
// const res = fn2(t1)
// console.log(res)

// 力扣第 543 题「 二叉树的直径」
// 不一定过根结点，不等于根的左最大+右最大
var diameterOfBinaryTree = function (root) {
    // 求每个节点的直径
    const maxDepth = (node) => {
        if (!node) return 0
        return Math.max(maxDepth(node.left), maxDepth(node.right)) + 1
    }
    let max = 0
    const helper = (node) => {
        if (!node) return
        max = Math.max(maxDepth(node.right) + maxDepth(node.left) , max)
        helper(node.left)
        helper(node.right)
    }
    helper(root)
    return max
};
const res = diameterOfBinaryTree(t1)
console.log(res)