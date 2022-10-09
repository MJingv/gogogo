// https://mp.weixin.qq.com/s/njl6nuid0aalZdH5tuDpqQ
// 236. 二叉树的最近公共祖先
// 剑指 Offer 68 - II. 二叉树的最近公共祖先
// 输入：root = [1,2], p = 1, q = 2 输出：1
const {BinarySearchTree, Node} = require('./tree');


var lowestCommonAncestor = function (root, p, q) {
    // 如果一个节点能够在它的左右子树中分别找到p和q，则该节点为LCA节点。
    const traverse = (node, p, q) => {
        if (!node) return
        // 一定存在p和q，所以如果等于p/q直接返回该节点
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
const t6 = new Node(6)


t.left = t2
t.right = t3
t2.left = t4
t2.right = t5

// const res = lowestCommonAncestor(t, 3, 5)
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
const res = lowestCommonAncestor3(t, [t2, t3])
console.log(res)

// 力扣第 1644 题「二叉树的最近公共祖先 II」
// 给你输入一棵不含重复值的二叉树的，以及两个节点p和q，如果p或q不存在于树中，则返回空指针，否则的话返回p和q的最近公共祖先节点。
var lowestCommonAncestor4 = function (root, p, q) {
    let foundP = false, foundQ = false
    const find = (root, pVal, qVal) => {
        if (!root) return null

        const left = find(root.left, pVal, qVal)
        const right = find(root.right, pVal, qVal)
        if (left && right) return root

        if (root.val === pVal || root.val === qVal) {
            if (root.val === pVal) foundP = true
            if (root.val === qVal) foundQ = true
            return root
        }
        return left ? left : right
    }
    const res = find(root, p.key, q.key)
    if (!foundP || !foundP) return null
    return res
};
// const res = lowestCommonAncestor4(t, [t6, t5])
// console.log(res)


// 剑指 Offer 68 - I. 二叉搜索树的最近公共祖先
var lowestCommonAncestor2 = function (root, p, q) {


};
// const res = lowestCommonAncestor2()
// console.log(res)