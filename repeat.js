function TreeNode(val, left, right) {
    this.val = (val === undefined ? 0 : val)
    this.left = (left === undefined ? null : left)
    this.right = (right === undefined ? null : right)
}

const t1 = new TreeNode(1)
const t0 = new TreeNode(0)
t1.left = t0
// t0.left = new TreeNode(0)
const t3 = new TreeNode(3)
t3.left = new TreeNode(2)
t3.right = new TreeNode(4)
t1.right = t3

// 力扣第 116 题「 填充每个二叉树节点的右侧指针」
// 遍历
var connect = function (root) {
    if (!root) return
    const helper = (node1, node2) => {
        if (!node1 || !node2) return
        node1.next = node2
        helper(node1.left, node1.right)
        helper(node2.left, node2.right)
        helper(node1.right, node2.left)

    }
    helper(root.left, root.right)
    return root
}
// const res = connect(t1)
// console.log(res)

// 114 题「 将二叉树展开为链表
// 分解

var flatten = function (root) {
    if (!root) return
    flatten(root.left) //拉平左孩子
    flatten(root.right)
    const left = root.left
    const right = root.right
    root.left = null
    root.right = left
    // 把原来right接到现在的right后面
    let p = root
    while (p.right) {
        p = p.right
    }
    p.right = right

}
const res = flatten(t1)
console.log(res)