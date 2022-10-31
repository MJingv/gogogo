// 230 题「 二叉搜索树中第 K 小的元素」

class TreeNode {
    constructor(val) {
        this.val = val
        this.right = null
        this.left = null
    }
}

const t0 = new TreeNode(0)
const t1 = new TreeNode(1)
const t2 = new TreeNode(2)
const t3 = new TreeNode(3)
const t4 = new TreeNode(4)
const t6 = new TreeNode(6)

t1.left = t0
t1.right = t3
t3.left = t2
t3.right = t4
// t0.right = t6


var kthSmallest = function (root, k) {
    let res = ''
    let i = 0
    const traverse = (node) => {
        if (!node) return
        traverse(node.left, k)
        i++
        if (i === k) {
            res = node.val
            return;
        }
        traverse(node.right, k)
    }
    traverse(root, k)
    return res
};
// const res = kthSmallest(t3, 1)
// console.log(res)

// 力扣第 538 题和 1038 题 BST 转化累加树
var convertBST = function (root) {
    if (!root) return
    let sum = 0
    const traverse = (node) => {
        if (!node) return 0
        traverse(node.right)
        // 直接在这里写preval 拿不到下一个 只能拿到上一个节点的值
        // 引入变量 解决问题
        sum += node.val
        node.val = sum
        traverse(node.left)
        return node
    }
    return traverse(root)
};
// const res = convertBST(t1)
// console.log(res)

// 力扣第 98 题「 验证二叉搜索树」
var isValidBST = function (root) {
    const traverse = (node, min = null, max = null) => {
        if (!node) return true
        if (min && node.val <= min.val) return false
        if (max && node.val >= max.val) return false
        return traverse(node.left, min, node) && traverse(node.right, node, max)
    }
    return traverse(root)
};
// const res = isValidBST(t1)
// console.log(res)


// 力扣第 700 题「 二叉搜索树中的搜索」
var searchBST = function (root, val) {
    const traverse = (node, val) => {
        if (!node) return null
        if (val === node.val) return node
        if (val < node.val) {
            return traverse(node.left, val)
        }
        if (val > node.val) {
            return traverse(node.right, val)
        }
    }
    return traverse(root, val)
};
const res = searchBST(t1, 3)
console.log(res)
