// https://mp.weixin.qq.com/s/njl6nuid0aalZdH5tuDpqQ
// 236. 二叉树的最近公共祖先
// 剑指 Offer 68 - II. 二叉树的最近公共祖先
// 输入：root = [1,2], p = 1, q = 2 输出：1
const {BinarySearchTree, Node} = require('./tree');


var lowestCommonAncestor = function (root, p, q) {
    const traverse = (node, p, q) => {
        if (!node) return
        if (node.key === p.key || node.key === q.key) return node

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

t.left = t2
t.right = t3
const res = lowestCommonAncestor(t, 1, 2)
console.log(res)


// 剑指 Offer 68 - I. 二叉搜索树的最近公共祖先
var lowestCommonAncestor2 = function (root, p, q) {

};