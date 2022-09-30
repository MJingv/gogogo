// https://mp.weixin.qq.com/s/njl6nuid0aalZdH5tuDpqQ
// 236. 二叉树的最近公共祖先
// 剑指 Offer 68 - II. 二叉树的最近公共祖先
// 输入：root = [1,2], p = 1, q = 2 输出：1
const {BinarySearchTree, Node} = require('./tree');


var lowestCommonAncestor = function (root, p, q) {
    const traverse = (node, p, q) => {
        if (!node) return
        if (node.key === p || node.key === q) return node

        const left = traverse(node.left, p, q)
        const right = traverse(node.right, p, q)

        if (left && right) return node
        return left ? left : right
    }
    return traverse(root, p, q)
};
const t = new Node(1)
const t2 = new Node(2)
const t3 = new Node(3)
const t4 = new Node(4)
const t5 = new Node(5)

t.left = t2
t.right = t3
t2.left = t4
t2.right = t5
// const res = lowestCommonAncestor(t, 3, 5)
// console.log(res)


// 剑指 Offer 68 - I. 二叉搜索树的最近公共祖先
var lowestCommonAncestor2 = function (root, p, q) {


};
// const res = lowestCommonAncestor2()
// console.log(res)


// 力扣第 1676 题「二叉树的最近公共祖先 IV」
// 依然给你输入一棵不含重复值的二叉树，但这次不是给你输入p和q两个节点了，而是给你输入一个包含若干节点的列表nodes（这些节点都存在于二叉树中），让你算这些节点的最近公共祖先。
var lowestCommonAncestor3 = function (root, nodes) {
    const map = new Map()
    nodes.map(i => map.set(i.key, true))
    const traverse = (node, list) => {
        if (!node || !map.size) return null

        if (map.get(node.key)) {
            map.delete(node.key)
            return node
        }

        const left = traverse(node.left)
        const right = traverse(node.right)
        if (left && right) return node
        return left ? left : right
    }

    return traverse(root, nodes)
};
const res = lowestCommonAncestor3(t, [t4, t5])
console.log(res)
