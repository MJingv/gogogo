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

// const res = fn1(t1)
// console.log(res)

// 力扣第 543 题「 二叉树的直径」
// 现在让我求整棵树中的最长「直径」，那直截了当的思路就是遍历整棵树中的每个节点，然后通过每个节点的左右子树的最大深度算出每个节点的「直径」，最后把所有「直径」求个最大值即可。

var diameterOfBinaryTree = function (root) {
    let res = 0
    const deep = (root) => {
        if (!root) return 0
        return Math.max(deep(root.left), deep(root.right)) + 1
    }
    const traverse = (root) => {
        if (!root) return
        const l = deep(root.left)
        const r = deep(root.right)
        res = Math.max(l + r, res)
        traverse(root.left)
        traverse(root.right)
    }
    traverse(root)
    return res
};

const diameterOfBinaryTree1 = (root) => {
    let max = 0
    const traverse = (root) => {
        // 求该节点的最大深度
        if (!root) return 0
        const left = traverse(root.left)
        const right = traverse(root.right)
        max = Math.max(right + left, max)
        return 1 + Math.max(left, right)
    }
    traverse(root)
    return max
}
const levelTraverse = (root, level = 0) => {
    // 层序遍历
    if (!root) return 0
    console.log(level, root.val)
    levelTraverse(root.left, level + 1)
    levelTraverse(root.right, level + 1)
}
const levelTraverse1 = (root, level = 0) => {
    const res = {}
    const traverse = (root, level = 0) => {
        if (!root) return
        if (!res[level]) {
            res[level] = []
            res[level].push(root.val)
        } else {
            res[level].push(root.val)
        }
        traverse(root.left, level + 1)
        traverse(root.right, level + 1)
    }
    traverse(root)
    return res
}

// 第 226 题「 翻转二叉树」
const invertTree = (root) => {
    // 遍历解法，只关注当前node的做法，一般前序，回溯想后序
    const traverse = (root) => {
        if (!root) return null
        const tmp = root.left
        root.left = root.right
        root.right = tmp
        traverse(root.left)
        traverse(root.right)
    }
    traverse(root)
    return root
}


const invertTree1 = (root) => {
    const fn = (root) => {
        if (!root) return null
        const right = fn(root.right)
        const left = fn(root.left)
        root.left = right
        root.right = left
        return root
    }

    fn(root)
    return root
}

// 力扣第 116 题「 填充每个二叉树节点的右侧指针」
var connect = function (root) {
    // 想象成二叉树
    const traverse = (node1, node2) => {
        if (!node1 && !node2) return
        node1.next = node2 //将2个node连接起来
        traverse(node1.left, node2.right)
        traverse(node2.left, node2.right)
        traverse(node1.right, node2.left)
    }
    traverse(root.left, root.right)
    return root
};
// 第 114 题「 将二叉树展开为链表」
// 需要原地拉平，不能新建节点
// preorder
var flatten = function (root) {
    const dummy = new Node(-1)
    let p = dummy
    const traverse = (root) => {
        if (!root) return null
        p.right = new Node(root.val)
        p = p.right

        traverse(root.left)
        traverse(root.right)
    }
    traverse(root)
    return JSON.stringify(dummy.right)

};
const flatten1 = (root) => {
    if (!root) return
    flatten1(root.left)
    flatten1(root.right)
    const left = root.left
    const right = root.right
    root.left = null
    root.right = left
    let p = root
    while (p.right) {
        p = p.right
    }
    p.right = right
}

// 剑指offer 052 展平二叉搜索树
var increasingBST = function (root) {
    const dummy = new Node(-1)
    let p = dummy
    const traverse = (root) => {
        if (!root) return
        traverse(root.left)
        p.right = new Node(root.val)
        p = p.right
        traverse(root.right)
    }
    traverse(root)
    return dummy.right
};
var increasingBST1 = function (root) {
    // inorder 看不懂
    if (!root) return null
    const left = increasingBST1(root.left)
    root.left = null
    const right = increasingBST1(root.right)
    root.right = right
    if (!left) {
        return root
    }
    let p = left
    while (p && p.right) {
        p = p.right
    }
    p.right = root
    return left
}


// 力扣第 654 题「 最大二叉树」
// 输入：nums = [3,2,1,6,0,5] 输出：[6,3,5,null,2,0,null,null,1]
// 解释：递归调用如下所示： - [3,2,1,6,0,5] 中的最大值是 6 ，左边部分是 [3,2,1] ，右边部分是 [0,5] 。 - [3,2,1] 中的最大值是 3 ，左边部分是 [] ，右边部分是 [2,1] 。 - 空数组，无子节点。 - [2,1] 中的最大值是 2 ，左边部分是 [] ，右边部分是 [1] 。 - 空数组，无子节点。 - 只有一个元素，所以子节点是一个值为 1 的节点。 - [0,5] 中的最大值是 5 ，左边部分是 [0] ，右边部分是 [] 。 - 只有一个元素，所以子节点是一个值为 0 的节点。 - 空数组，无子节点。
var constructMaximumBinaryTree = function (nums) {
    const len = nums.length
    if (!len) return
    const helper = (nums) => {
        if (!nums.length) return null
        const max = Math.max(...nums)
        const maxIndex = nums.indexOf(max)
        const node = new Node(max)
        const left = helper(nums.slice(0, maxIndex))
        const right = helper(nums.slice(maxIndex + 1))
        node.left = left
        node.right = right
        return node
    }
    return helper(nums)

};
// const res = constructMaximumBinaryTree([3, 2, 1, 6, 0, 5])
// console.log(JSON.stringify(res))


// 力扣第 105 题「 从前序和中序遍历序列构造二叉树」
// 输入: preorder = [3,9,20,15,7], inorder = [9,3,15,20,7] 输出: [3,9,20,null,null,15,7]
var buildTree = function (preorder, inorder) {
    const helper = (preorder, inorder, node = null) => {
        if (!preorder.length || !inorder.length) return null

        const val = preorder.shift()
        const index = inorder.indexOf(val)
        node = new Node(val)

        node.left = helper(preorder, inorder.slice(0, index), node)
        node.right = helper(preorder, inorder.slice(index + 1))

        return node
    }
    return helper(preorder, inorder)
};
const res = buildTree([3, 9, 20, 15, 7], [9, 3, 15, 20, 7])
console.log(res)







