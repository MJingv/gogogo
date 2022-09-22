// 二叉树解法
// https://labuladong.github.io/algo/2/21/36/
// 1.【遍历】遍历一遍可以得到答案，traverse+外部变量
// 2.【分解问题】递归子问题解决问题，返回值来解决
// 3.每个节点做什么，需要在什么时机（前中后）做


// 第 543 题「 二叉树的直径」
// 给定一棵二叉树，你需要计算它的直径长度。一棵二叉树的直径长度是任意两个结点路径长度中的最大值。这条路径可能穿过也可能不穿过根结点。

const {BinarySearchTree, Node} = require('./tree');

var diameterOfBinaryTree = function (root) {
    let maxDiameter = 0;

    const maxDepth = (root) => {
        if (!root) return 0
        const leftMax = maxDepth(root.left)
        const rightMax = maxDepth(root.right)
        maxDiameter = Math.max(maxDiameter, leftMax + rightMax)
        return 1 + Math.max(leftMax, rightMax)
    }

    maxDepth(root)
    return maxDiameter
};
// const t = new Node(9)
// const t2 = new Node(1)
// const t3 = new Node(2)
// const t4 = new Node(3)
// const t5 = new Node(4)
// const t6 = new Node(5)
// t.right = t2
// t2.left = t3
// t2.right = t4
// t3.left = t5
// t3.right = t6
// const res = diameterOfBinaryTree(t)
// console.log(res)

// 第 226 题「 翻转二叉树」
// 1.遍历or分解
// 2.前中后哪里加
// 3.此节点干了什么
var mirrorTree = function (root) {
    const traverse = (root) => {
        if (!root) return
        traverse(root.left)
        traverse(root.right)
        const tmp = root.left
        root.left = root.right
        root.right = tmp
    }
    traverse(root)
    return root
};

const t = new Node(4)
const t2 = new Node(2)
const t3 = new Node(1)
const t4 = new Node(3)
const t5 = new Node(7)
const t6 = new Node(6)
const t7 = new Node(9)
t.left = t2
t2.left = t3
t2.right = t4
t.right = t5
t5.left = t6
t5.right = t7

// const res = mirrorTree(t)
// console.log(res)

// 力扣第 116 题「 填充每个二叉树节点的右侧指针」
// 遍历
var connect = function (root) {
    const traverse = (node1, node2) => {
        if (!node1 || !node2) return
        node1.next = node2
        traverse(node1.left, node1.right)
        traverse(node2.left, node2.right)
        traverse(node1.right, node2.left) //！两个节点中间要连起来
    }
    if (!root) return null
    traverse(root.left, root.right)
    return root
};

// 力扣第 114 题「 将二叉树展开为链表」

var flatten = function (root) {
    // 新节点反转
    const dummy = new Node(-1)
    let p = dummy

    const traverse = (root) => {
        if (!root) return null
        p.right = new Node(root.key)
        p = p.right

        traverse(root.left)
        traverse(root.right)
    }
    traverse(root)
    return dummy.right

};
// 原地反转
var flatten2 = function (root) {
}
const res = flatten2(t)
console.log(res)