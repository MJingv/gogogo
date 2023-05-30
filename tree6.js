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

// 341. 扁平化嵌套列表迭代器
const fn = (arr) => {
    const len = arr.length
    if (!len) return []
    const res = []

    const helper = (list = []) => {
        if (!list.length) return
        for (let i = 0; i < len; i++) {
            if (Number.isInteger(list[i])) {
                res.push(list[i])
            } else {
                helper(list[i])
            }
        }
    }
    helper(arr)
    return res
}
// const res = fn([[1, 1], 2, [1, 1]])
// console.log(res)

// 输入：nestedList = [[1,1],2,[1,1]] 输出：[1,1,2,1,1]

const maxDepth = (root) => {
    // 分解
    if (!root) return 0
    const left = maxDepth(root.left)
    const right = maxDepth(root.right)
    return Math.max(left, right) + 1
}
const maxDepth1 = (root) => {
    // 遍历
    if (!root) return
    let max = 0
    let depth = 0
    const helper = (node) => {
        if (!node) {
            max = Math.max(max, depth)
            return
        }
        depth++
        helper(node.left)
        helper(node.right)
        depth--
    }
    helper(root)
    return max
}

// const res = maxDepth1(t1)
// console.log(res)

const preorder = (root) => {
    // 遍历，for里helper
    if (!root) return
    const res = []
    const helper = (node) => {
        if (!node) return
        res.push(node.val)
        helper(node.left)
        helper(node.right)
    }
    helper(root)
    return res
}
const preorder1 = (root) => {
    // 分解,利用结果做事情
    if (!root) return
    const res = []
    res.push(root.val)
    res.push(...preorder(root.left))
    res.push(...preorder(root.right))
    return res
}
// const res = preorder1(t1)
// console.log(res)

const levelTraverse = (root) => {
    if (!root) return
    const [res, q] = [[], [root]]
    while (q.length) {
        const size = q.length
        const level = []
        for (let i = 0; i < size; i++) {
            const cur = q.shift()
            level.push(cur.val)
            if (cur.left) q.push(cur.left)
            if (cur.right) q.push(cur.right)
        }
        res.push(level)
    }
    return res
}
const res = levelTraverse(t1)
console.log(res)