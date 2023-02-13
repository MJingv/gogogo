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

const levelTraverse = (root) => {
    if (!root) return
    const [q, res] = [[root], []]
    while (q.length) {
        const size = q.length
        const path = []
        for (let i = 0; i < size; i++) {
            const node = q.shift()
            path.push(node.val)
            node.left && q.push(node.left)
            node.right && q.push(node.right)
        }
        res.push(path)
    }
    return res
}
// const res = levelTraverse(t1)
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
        max = Math.max(maxDepth(node.right) + maxDepth(node.left), max)
        helper(node.left)
        helper(node.right)
    }
    helper(root)
    return max
};
var diameterOfBinaryTree1 = function (root) {
    if (!root) return
    let max = 0
    const helper = (node) => {
        if (!node) return 0
        const leftMax = helper(node.left)
        const rightMax = helper(node.right)
        const maxD = leftMax + rightMax
        max = Math.max(max, maxD)
        return 1 + Math.max(leftMax, rightMax) // 算maxdepth
    }
    helper(root)
    return max
}
// const res = diameterOfBinaryTree1(t1)
// console.log(res)

// 100. 相同的树
var isSameTree = function (p, q) {
    let res = true
    const helper = (node1, node2) => {
        if (!node1 && node2 || node1 && !node2) return res = false
        if (!node1 && !node2) return
        if (node1.val !== node2.val) return res = false
        helper(node1.left, node2.left)
        helper(node1.right, node2.right)
    }
    helper(p, q)
    return res
};
// const res = isSameTree(t1, t3)
// console.log(res)

// 101. 对称二叉树
var isSymmetric = function (root) {
    const helper = (l, r) => {
        if (!l && !r) return true
        if (!l || !r) return false
        return l.val === r.val && helper(l.left, r.right) && helper(l.right, r.left)
    }
    return helper(root.left, root.right)

};
// const res = isSymmetric(t1)
// console.log(res)

// 113. 路径总和 II
var pathSum = function (root, targetSum) {
    const path = []
    const res = []
    let sum = 0
    const helper = (node) => {
        if (!node) return

        path.push(node.val)
        sum += node.val
        if (!node.left && !node.right && sum === targetSum) res.push(path.slice())

        helper(node.left)
        path.pop()
        sum -= node.val

        path.push(node.val)
        sum += node.val
        helper(node.right)
        path.pop()
        sum -= node.val

    }
    helper(root)
    return res

};
const res = pathSum(t1, 8)
console.log(res)