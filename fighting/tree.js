// - 动态规划，分解问题，关注【子树】
// - 回溯，遍历，关注【树枝】
// - dfs，遍历，关注【节点】


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
// const res = diameterOfBinaryTree(t1)


// 第一个例子，给你一棵二叉树，请你用分解问题的思路写一个 count 函数，计算这棵二叉树共有多少个节点。
const count = (root) => {
    if (!root) return null
    const helper = (node) => {
        if (!node) return 0
        return helper(node.left) + helper(node.right) + 1
    }
    return helper(root)
}
// const res = count(t1)

// 给你一棵二叉树，请你用遍历的思路写一个 traverse 函数，打印出遍历这棵二叉树的过程

const traverse = (root) => {
    if (!root) return null
    const helper = (node) => {
        if (!node) return null
        console.log(node.val)
        traverse(node.left)
        traverse(node.right)
    }
    return helper(root)
}
// const res = traverse(t1)

const levelTraverse = (root) => {
    if (!root) return []
    const res = []
    const q = [root]
    while (q.length) {
        const size = q.length
        const path = []
        for (let i = 0; i < size; i++) {
            const cur = q.shift()
            path.push(cur.val)
            cur.left && q.push(cur.left)
            cur.right && q.push(cur.right)
        }
        res.push(path)
    }

    return res
}
const res = levelTraverse(t1)
console.log(res)