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


const maxDepth = (root = null) => {
    if (!root) return
    const helper = (node = null, res) => {
        if (!node) return 0
        return Math.max(helper(node.left), helper(node.right)) + 1
    }
    return helper(root)
}

const preOrder = (root = null) => {
    const res = []
    if (!root) return res
    const helper = (node = null) => {
        if (!node) return
        res.push(node.val)
        helper(node.left)
        helper(node.right)
    }
    helper(root)
    return res
}
// const res = preOrder(t1)

// 1、如果把根节点看做第 1 层，如何打印出每一个节点所在的层数？
const atLevelNum = (root) => {
    if (!root) return 0
    const helper = (node, level = 1) => {
        if (!node) return level
        console.log(node.val, level, '----')
        helper(node.left, level + 1)
        helper(node.right, level + 1)

    }
    helper(root)
}
// const res = atLevelNum(t1)

// 2、如何打印出每个节点的左右子树各有多少节点？
const sumChildren = (root) => {
    if (!root) return 0
    const helper = (node) => {
        if (!node) return 0
        const leftSum = helper(node.left)
        const rightSum = helper(node.right)
        console.log(node.val, '---l', leftSum, '---r', rightSum)
        return leftSum + rightSum + 1
    }
    helper(root)
}
// const res = sumChildren(t1)

// 第 543 题「二叉树的直径」
const diameterOfBinaryTree = (root) => {
    // 左右最大深度之和,不包含自己
    if (!root) return 0
    let max = 0
    const helper = (node) => {
        if (!node) return 0
        const left = helper(node.left)
        const right = helper(node.right)
        max = Math.max(max, left + right)
        return Math.max(left, right) + 1
    }
    helper(root)
    return max
};
const res = diameterOfBinaryTree(t1)

console.log(res)