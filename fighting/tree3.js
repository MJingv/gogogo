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


// 非递归遍历-后序
// 1.root入，左到头
// 2.right，lastvisited
// 3.右边访问过，出

const postOrder = (root) => {
    if (!root) return []
    const res = [], stack = []
    let cur = root, lastVisited = null

    while (cur || stack.length) {
        while (cur) {
            stack.push(cur)
            cur = cur.left
        }
        cur = stack[stack.length - 1]
        if (!cur.right || cur.right === lastVisited) {
            res.push(cur.val)
            stack.pop()
            lastVisited = cur
            cur = null
        } else {
            cur = cur.right
        }

    }
    return res
}
// const res = postOrder(t1)
const preOrder = (root) => {
    if (!root) return []
    const res = [], stack = []
    let cur = root
    while (cur || stack.length) {
        while (cur) {
            res.push(cur.val)
            stack.push(cur)
            cur = cur.left
        }
        cur = stack.pop()
        cur = cur.right
    }
    return res

}
// const res = preOrder(t1)
const inOrder = (root) => {
    if (!root) return []
    const res = []
    const stack = []
    let cur = root

    while (cur || stack.length) {
        while (cur) {
            stack.push(cur)
            cur = cur.left
        }
        cur = stack.pop()
        res.push(cur.val)
        cur = cur.right

    }
    return res
}
// const res = inOrder(t1)


var levelOrderBottom = function (root) {
    if (!root) return []
    const res = []
    const q = [root]
    while (q.length) {
        const len = q.length
        const level = []
        for (let i = 0; i < len; i++) {
            const cur = q.shift()
            level.push(cur.val)
            cur.left && q.push(cur.left)
            cur.right && q.push(cur.right)
        }
        res.unshift(level)

    }

    return res
};

// const res = levelOrderBottom(t1)

var rob = function (root) {
    if (!root) return 0
    const q = [root]
    const res = []
    while (q.length) {
        const len = q.length
        const level = []
        for (let i = 0; i < len; i++) {
            const cur = q.shift()
            level.push(cur.val)
            cur.left && q.push(cur.left)
            cur.right && q.push(cur.right)
        }
        res.push(level)
    }
    let res0 = 0, res1 = 0
    res.map((value, index) => {
        if (index % 2) {
            res1 += value.reduce((a, b) => a + b)
        } else {
            res0 += value.reduce((a, b) => a + b)

        }

    })
    return Math.max(res0, res1)


};
// const res = rob(t1)


// 105 前序和中序构造二叉树
// 输入: preorder = [3,9,20,15,7], inorder = [9,3,15,20,7] 输出: [3,9,20,null,null,15,7]
var buildTree = function (preorder, inorder) {
    // todo buildtree不要helper，改变的是本身
    const [l1, l2] = [preorder.length, inorder.length]
    if (!l1 || !l2) return null
    if (l1 === 1) return new TreeNode(preorder[0])
    const cur = preorder.shift()
    const node = new TreeNode(cur)
    const index = inorder.indexOf(cur)
    node.left = buildTree(preorder, inorder.slice(0, index))
    node.right = buildTree(preorder, inorder.slice(index + 1))
    return node
};
// const res = buildTree([3, 9, 20, 15, 7], [9, 3, 15, 20, 7])


// 106 后序和中序构造二叉树
var buildTree = function (inorder, postorder) {
    const [l1, l2] = [inorder.length, postorder.length]
    if (!l1 || !l2) return null
    if (l2 === 1) return new TreeNode(postorder[0])
    const cur = postorder.pop()
    const node = new TreeNode(cur)
    const index = inorder.indexOf(cur)
    node.left = buildTree(inorder.slice(0, index), postorder)
    node.right = buildTree(inorder.slice(index), postorder)
    return node
};
const res = buildTree([9, 3, 15, 20, 7], [9, 15, 7, 20, 3])

console.log(res)