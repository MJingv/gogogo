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
// t1.left = t0
// t1.right = t3
// t3.left = t2
// t3.right = t4
t3.left = t1
t3.right = t4
t1.right = t2

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
const res = kthSmallest(t3, 1)
console.log(res)