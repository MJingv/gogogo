// 二叉树解法
// https://labuladong.github.io/algo/2/21/36/
// 1.【遍历】遍历一遍可以得到答案，traverse+外部变量
// 2.【分解问题】递归子问题解决问题，返回值来解决
// 3.每个节点做什么，需要在什么时机（前中后）做


// 第 543 题「 二叉树的直径」
// 给定一棵二叉树，你需要计算它的直径长度。一棵二叉树的直径长度是任意两个结点路径长度中的最大值。这条路径可能穿过也可能不穿过根结点。

const {BinarySearchTree, Node} = require('./tree');

var diameterOfBinaryTree = function (root) {

    return root
};
const t = new Node(9)
const t2 = new Node(1)
const t3 = new Node(2)
const t4 = new Node(3)
const t5 = new Node(4)
const t6 = new Node(5)
t.right = t2
t2.left = t3
t2.right = t4
t3.left = t5
t3.right = t6
const res = diameterOfBinaryTree(t)
console.log(JSON.stringify(res))