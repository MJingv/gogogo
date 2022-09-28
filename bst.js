const {BinarySearchTree, Node} = require('./tree');

// 第 230 题「 二叉搜索树中第 K 小的元素」
// 输入：root = [3,1,4,null,2], k = 1 输出：1
// 给定一个二叉搜索树的根节点 root ，和一个整数 k ，请你设计一个算法查找其中第 k 个最小元素（从 1 开始计数）。
var kthSmallest = function (root, k) {
    const res = []
    const traverse = (node, k) => {
        if (!node) return null
        traverse(node.left, k)
        res.push(node.key)
        traverse(node.right, k)
    }
    traverse(root, k)
    return res[k - 1]
};

// const t = new Node(3)
// const t2 = new Node(1)
// const t3 = new Node(2)
// const t4 = new Node(4)
// t.left = t2
// t2.right = t3
// t.right = t4
// const res = kthSmallest(t, 1)
// console.log(res)

// 力扣第 538/ 1038 题 把二叉搜索树转换为累加树
var convertBST = function (root) {
    let sum = 0
    const traverse = (node) => {
        if (!node) return null
        traverse(node.right)
        sum += node.key
        node.key = sum
        traverse(node.left)
        return node
    }
    return traverse(root)
};

// const t = new Node(1)
// const t2 = new Node(0)
// const t3 = new Node(2)
// t.left = t2
// t.right = t3
// const res = convertBST(t)
// console.log(res)


// 力扣第 98 题「 验证二叉搜索树」
// 输入：root = [2,1,3]输出：true
var isValidBST = function (root) {
    let res = true
    const helper = (node, target = 0, left = false) => {
        if (!node) return
        if (left && (node.key > target)) {
            return res = false
        }
        if (!left && (node.key < target)) {
            return res = false
        }
        node.left && helper(node.left, node.key, true)
        node.right && helper(node.right, node.key, false)
        return res
    }

    return helper(root, root.key)
}

const t = new Node(2)
const t2 = new Node(1)
const t3 = new Node(3)
t.left = t2
t.right = t3
const res = isValidBST(t)
console.log(res)