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
const res = traverse1(t1)
console.log(res)