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
    // min < val < max
    const helper = (node, min = 0, max = 0) => {
        if (!node) return true
        if (min && node.key <= min.key) return false
        if (max && node.key >= max.key) return false

        return helper(node.left, min, node) && helper(node.right, node, max) //巧啊
    }
    return helper(root)
}

// const t = new Node(2)
// const t2 = new Node(2)
// const t3 = new Node(2)
// t.left = t2
// t.right = t3
// const res = isValidBST(t)
// console.log(res)


// 力扣第 700 题「 二叉搜索树中的搜索」
// 输入：root = [4,2,7,1,3], val = 2 输出：[2,1,3]
var searchBST = function (root, val) {
    const helper = (node) => {
        if (!node) return null
        if (node.key === val) {
            return node
        }

        if (node.key > val) {
            return helper(node.left)
        }
        if (node.key < val) {
            return helper(node.right)
        }
    }

    return helper(root)
};

var insertBST = function (root, val) {
    if (!root) return new Node(val)
    if (root.key > val) {
        root.left = insertBST(root.left, val)
    }
    if (root.key < val) {
        root.right = insertBST(root.right, val)
    }
    return root
};
const removeBST = (root, val) => {
    if (!root) return

    if (root.key === val) {
        //删除操作
        if (!root.left && !root.right) {
            //叶子节点
            return null
        }
        if (root.right && !root.left || root.left && !root.right) {
            //一个孩子
            return root.right || root.left
        }
        if (root.right && root.left) {
            //两个孩子,用较大的替换
            let max = null
            if (root.right.key > root.left.key) {
                max = root.right
                max.left = root.left

            } else {
                max = root.left
                max.left = root.right
            }
            return max
        }
    }
    if (root.key > val) {
        root.left = removeBST(root.left, val)
    }
    if (root.key < val) {
        root.right = removeBST(root.right, val)
    }
    return root
}


// const t = new Node(4)
// const t2 = new Node(2)
// const t3 = new Node(1)
// const t4 = new Node(3)
// const t5 = new Node(7)
// const t6 = new Node(6)
// t.left = t2
// t.right = t5
// t2.left = t3
// t2.right = t4
// t5.left = t6
// const res = removeBST(t, 2)
// console.log(JSON.stringify(res))


// 第 96 题「 不同的二叉搜索树」
// 输入：n = 3 输出：5
var numTrees = function (n) {

};

// 95. 不同的二叉搜索树 II
var generateTrees = function (n) {

};