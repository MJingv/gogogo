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


const lowestCommonAncestor = (root, p, q) => {
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
const res = lowestCommonAncestor(t1, t3.left, t3.right)
console.log(res)