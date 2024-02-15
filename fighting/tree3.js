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

const res = levelOrderBottom(t1)

console.log(res)