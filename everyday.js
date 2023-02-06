// 树思路
// 1.return or 遍历
// 2.前中后
// 3.每一步做什么



// 233 计算布尔二叉树的值
// 给你一棵 完整二叉树 的根，这棵树有以下特征：
// 叶子节点 要么值为 0 要么值为 1 ，其中 0 表示 False ，1 表示 True 。
// 非叶子节点 要么值为 2 要么值为 3 ，其中 2 表示逻辑或 OR ，3 表示逻辑与 AND

function TreeNode(val, left, right) {
    this.val = (val === undefined ? 0 : val)
    this.left = (left === undefined ? null : left)
    this.right = (right === undefined ? null : right)
}

var evaluateTree = function (root) {
    if (!root.left && !root.right) return root.val
    const left = evaluateTree(root.left)
    const right = evaluateTree(root.right)
    if (root.val === 2) return left.val || right.val
    if (root.val === 3) return left.val && right.val
};
// 输入：root = [2,1,3,null,null,0,1] 输出：true
const t = new TreeNode(2)
t.left = new TreeNode(1)
const t3 = new TreeNode(3)
t3.left = new TreeNode(0)
t3.right = new TreeNode(1)
t.right = new TreeNode(t3)

// const res = evaluateTree(t)
// console.log(res)


