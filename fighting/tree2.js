function TreeNode(val, left, right) {
    this.val = (val === undefined ? 0 : val)
    this.left = (left === undefined ? null : left)
    this.right = (right === undefined ? null : right)
}

const t1 = new TreeNode(1)
const t0 = new TreeNode(0)
t1.left = t0
// t0.left = new TreeNode(0)95
const t3 = new TreeNode(3)
t3.left = new TreeNode(2)
t3.right = new TreeNode(4)
t1.right = t3

// 236
const lowestCommonAncestor1 = (root, p, q) => {
    // 普通树
    if (!root) return null
    if (!p) return q
    if (!q) return p
    if (root === p || root === q) return root

    const left = lowestCommonAncestor(root.left, p, q)
    const right = lowestCommonAncestor(root.right, p, q)

    if (!left && !right) return null
    if (left && right) return root
    if (!left) return right
    if (!right) return left


}
// const res = lowestCommonAncestor(t1, t3.left, t3.right)


// 235
var lowestCommonAncestor2 = function (root, p, q) {
    // 二叉搜索树
    if (!root) return null
    if (!p) return q
    if (!q) return p
    if (root === p || root === q) return root

    const s = Math.min(p.val, q.val)
    const l = Math.max(p.val, q.val)
    const helper = (node) => {
        if (!node) return null
        const cur = node.val
        if (cur < s) return helper(node.right)
        if (cur > l) return helper(node.left)
        return node
    }
    return helper(root)
};
// const res = lowestCommonAncestor2(t1, t3.left, t3.right)


// 222. 完全二叉树的节点个数
var countNodes1 = function (root) {
    if (!root) return 0
    let res = 0
    const helper = (node) => {
        if (!node) return null
        res++
        helper(node.left)
        helper(node.right)

    }
    helper(root)
    return res

};
var countNodes = function (root) {

    let hr = 0, hl = 0
    let left = root, right = root
    while (left) {
        left = left.left
        ++hl
    }
    while (right) {
        right = right.right
        ++hr
    }
    if (hl === hr) {
        return Math.pow(2, hr) - 1
    } else {
        const traverse = (root) => {
            if (!root) return 0
            return traverse(root.left) + traverse(root.right) + 1
        }
        return traverse(root)
    }

};


var countNodes2 = function (root) {
    if (!root) return 0
    let i = 0, j = 0
    let left = root, right = root
    while (left) {
        left = left.left
        i++
    }
    while (right) {
        right = right.right
        j++
    }

    if (i === j) {
        return Math.pow(2, i) - 1
    } else {
        const helper = (node) => {
            if (!node) return 0
            return helper(node.left) + helper(node.right) + 1

        }
        return helper(root)
    }
}
const res = countNodes2(t1)
console.log(res)