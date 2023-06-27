// 解题思路
// 1.遍历（一遍+外部变量存结果）
// 2.分解（返回值是答案+分解子问题）

// 节点思考
// 1.对单独节点做什么
// 2.在什么位置（前/中/后）做


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

// 104. 二叉树的最大深度
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

// const res = levelTraverse(t1)
// console.log(res)
const quickSort = (arr = [], l = 0, r = arr.length - 1) => {
    if (l <= r) {
        const p = helper(arr, l, r)
        quickSort(arr, l, p - 1)
        quickSort(arr, p + 1, r)
    }
    return arr

}
const helper = (arr, l, r) => {
    const cur = arr[l]
    while (l < r) {
        while (l < r && arr[r] >= cur) r--
        swap(arr, l, r)
        while (l < r && arr[l] < cur) l++
        swap(arr, l, r)
    }
    return l
}
const swap = (arr, a, b) => [arr[a], arr[b]] = [arr[b], arr[a]]


const mergeSort = (arr) => {
    const len = arr.length
    if (len < 2) return arr
    const mid = Math.floor(len / 2)
    const left = arr.slice(0, mid)
    const right = arr.slice(mid)
    return merge(mergeSort(left), mergeSort(right))
}
const merge = (left, right) => {
    let res = []
    while (left.length && right.length) {
        if (left[0] <= right[0]) {
            res.push(left.shift())
        } else {
            res.push(right.shift())
        }
    }
    if (left.length) {
        res = [...res, ...left]
    }
    if (right.length) {
        res = [...res, ...right]
    }

    return res
}
const bubbleSort = (arr) => {
    const len = arr.length
    for (let i = 0; i < len - 1; i++) {
        for (let j = 0; j < len - i - 1; j++) {
            if (arr[j] > arr[j + 1]) swap(arr, j, j + 1)
        }
    }
    return arr
}
// const res = bubbleSort([48, 48, 1, 0, 21, 3, 999, 10])
// console.log(res)

const levelNum = (root) => {
    if (!root) return
    const helper = (node, level = 1) => {
        if (!node) return
        console.log(node.val, '--in--', level, '--level')
        helper(node.left, level + 1)
        helper(node.right, level + 1)
    }
    helper(root)
}
const levelNum1 = (root) => {
    if (!root) return
    const res = []
    const helper = (node, level = 0) => {
        if (!node) return
        if (res?.[level]) {
            res[level].push(node.val)
        } else {

            res[level] = [node.val]
        }
        helper(node.left, level + 1)
        helper(node.right, level + 1)

    }
    helper(root)
    return res
}
// const res = levelNum1(t1)
// console.log(res)

const kids = (root) => {
    if (!root) return 0
    const left = kids(root.left)
    const right = kids(root.right)
    console.log(root.val, '-have-', left + right, '--kids')
    const res = left + right + 1
    return res
}
// const res = kids(t1)
// console.log(res)

// 力扣第 543 题「 二叉树的直径」
var diameterOfBinaryTree = function (root) {
    // 算出每个节点的直径，求最大值
    // 好好再想想
    let max = 0
    const helper = (node) => {
        if (!node) return 0
        const left = helper(node.left)
        const right = helper(node.right)
        max = Math.max(left + right, max)
        return Math.max(left, right) + 1 // 注意
    }
    helper(root)
    return max
};
// const res = diameterOfBinaryTree(t1)
// console.log(res)

// 124 二叉树中的最大路径和 hard
var maxPathSum = function (root) {
    if (!root) return
    let max = -Infinity
    const helper = (node) => {
        if (!node) return 0
        const left = helper(node.left)
        const right = helper(node.right)
        max = Math.max(left + right + node.val, max)
        return max
    }
    helper(root)
    return max
};
// const res = maxPathSum(t1)
// console.log(res)

// 力扣第 226 题「 翻转二叉树
var invertTree = function (root) {
    if (!root) return null
    const left = invertTree(root.left)
    const right = invertTree(root.right)
    root.left = right
    root.right = left
    return root

};
const invertTree1 = (root) => {
    if (!root) return null
    const helper = (node) => {
        if (!node) return null
        const tmp = node.left
        node.left = node.right
        node.right = tmp
        helper(node.left)
        helper(node.right)
    }
    helper(root)
    return root
}

// const res = invertTree1(t1)
// console.log(res)

// 力扣第 116 题「 填充每个二叉树节点的右侧指针」
// 遍历三叉树
var connect = function (root) {
    if (!root) return null
    const helper = (a, b) => {
        if (!a || !b) return
        a.next = b
        helper(a.left, a.right)
        helper(b.left, b.right)
        helper(a.right, b.left)
    }
    helper(root.left, root.right)
    return root

};
// const res = connect(t1)
// console.log(res)

// 114 题「 将二叉树展开为链表
var flatten = function (root) {
    if (!root) return null
    flatten(root.left)
    flatten(root.right)
    const left = root.left
    const right = root.right

    root.left = null
    root.right = left

    let p = root
    while (p.right) {
        p = p.right
    }
    p.right = right
};
// const res = flatten(t1)
// console.log(res)

// 剑指 Offer 26. 树的子结构
var isSubStructure = function (A, B) {
    // 分解
    const helper = (a, b) => {
        if (!b) return true
        if (!a) return false
        if (a.val !== b.val) return false
        return helper(a.left, b.left) && helper(a.right, b.right)
    }

    if (!A || !B) return false
    return helper(A, B) || helper(A.left, B) || helper(A.right, B)
};
// const res = isSubStructure(t1, new TreeNode(1))
// console.log(res)


// 剑指 Offer 27. 二叉树的镜像
// 分解
var mirrorTree = function (root) {
    if (!root) return null
    const left = mirrorTree(root.left)
    const right = mirrorTree(root.right)
    root.left = right
    root.right = left
    return root
};
// 遍历
var mirrorTree1 = function (root) {
    if (!root) return null
    const helper = (node) => {
        if (!node) return null
        const tmp = node.left
        node.left = node.right
        node.right = tmp
        helper(node.left)
        helper(node.right)
    }
    helper(root)
    return root
}

// 654. 最大二叉树
// 创建一个根节点，其值为 nums 中的最大值。
// 递归地在最大值 左边 的 子数组前缀上 构建左子树。
// 递归地在最大值 右边 的 子数组后缀上 构建右子树。
var constructMaximumBinaryTree = function (nums) {
    if (!nums.length) return null
    const max = Math.max(...nums)
    const index = nums.indexOf(max)
    const node = new TreeNode(max)
    node.left = constructMaximumBinaryTree(nums.slice(0, index))
    node.right = constructMaximumBinaryTree(nums.slice(index + 1))
    return node
};
// const res = constructMaximumBinaryTree([3, 2, 1])
// console.log(res)

// 力扣第 105 题「从前序和中序遍历序列构造二叉树」
var buildTree = function (preorder, inorder) {
    if (!preorder.length || !inorder.length) return null
    const cur = preorder.shift()
    const node = new TreeNode(cur)
    const index = inorder.indexOf(cur)
    console.log(index, inorder.slice(index + 1))
    node.left = buildTree(preorder, inorder.slice(0, index), node)
    node.right = buildTree(preorder, inorder.slice(index + 1), node)
    return node
};

// 输入: preorder = [3,9,20,15,7], inorder = [9,3,15,20,7] 输出: [3,9,20,null,null,15,7]
const res = buildTree([3, 9, 20, 15, 7], [9, 3, 15, 20, 7])
console.log(res)