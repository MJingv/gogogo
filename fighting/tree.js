// - 动态规划，分解问题，关注【子树】
// - 回溯，遍历，关注【树枝】
// - dfs，遍历，关注【节点】


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


const maxDepth = (root = null) => {
    if (!root) return
    const helper = (node = null, res) => {
        if (!node) return 0
        return Math.max(helper(node.left), helper(node.right)) + 1
    }
    return helper(root)
}

const preOrder = (root = null) => {
    const res = []
    if (!root) return res
    const helper = (node = null) => {
        if (!node) return
        res.push(node.val)
        helper(node.left)
        helper(node.right)
    }
    helper(root)
    return res
}
// const res = preOrder(t1)

// 1、如果把根节点看做第 1 层，如何打印出每一个节点所在的层数？
const atLevelNum = (root) => {
    if (!root) return 0
    const helper = (node, level = 1) => {
        if (!node) return level
        console.log(node.val, level, '----')
        helper(node.left, level + 1)
        helper(node.right, level + 1)

    }
    helper(root)
}
// const res = atLevelNum(t1)

// 2、如何打印出每个节点的左右子树各有多少节点？
const sumChildren = (root) => {
    if (!root) return 0
    const helper = (node) => {
        if (!node) return 0
        const leftSum = helper(node.left)
        const rightSum = helper(node.right)
        console.log(node.val, '---l', leftSum, '---r', rightSum)
        return leftSum + rightSum + 1
    }
    helper(root)
}
// const res = sumChildren(t1)

// 第 543 题「二叉树的直径」
const diameterOfBinaryTree = (root) => {
    // 左右最大深度之和,不包含自己
    if (!root) return 0
    let max = 0
    const helper = (node) => {
        if (!node) return 0
        const left = helper(node.left)
        const right = helper(node.right)
        max = Math.max(max, left + right)
        return Math.max(left, right) + 1
    }
    helper(root)
    return max
};
// const res = diameterOfBinaryTree(t1)


// 第一个例子，给你一棵二叉树，请你用分解问题的思路写一个 count 函数，计算这棵二叉树共有多少个节点。
const count = (root) => {
    if (!root) return null
    const helper = (node) => {
        if (!node) return 0
        return helper(node.left) + helper(node.right) + 1
    }
    return helper(root)
}
// const res = count(t1)

// 给你一棵二叉树，请你用遍历的思路写一个 traverse 函数，打印出遍历这棵二叉树的过程

const traverse = (root) => {
    if (!root) return null
    const helper = (node) => {
        if (!node) return null
        console.log(node.val)
        traverse(node.left)
        traverse(node.right)
    }
    return helper(root)
}
// const res = traverse(t1)

const levelTraverse = (root) => {
    if (!root) return []
    const res = []
    const q = [root]
    while (q.length) {
        const size = q.length
        const path = []
        for (let i = 0; i < size; i++) {
            const cur = q.shift()
            path.push(cur.val)
            cur.left && q.push(cur.left)
            cur.right && q.push(cur.right)
        }
        res.push(path)
    }

    return res
}
// const res = levelTraverse(t1)


// 力扣第 226 题「翻转二叉树」
const invertTree = (root) => {
    if (!root) return null
    const helper = (node) => {
        if (!node) return null
        const left = helper(node.left)
        const right = helper(node.right)
        node.left = right
        node.right = left
        return node
    }
    return helper(root)

}
// const res = invertTree(t1)


// 力扣第 116 题「填充每个二叉树节点的右侧指针」
const connect = (root) => {
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
}


// const res = connect(t1)


// 114. 二叉树展开为链表
// 向右展开
const flatten = (root) => {
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
    return root


}
// const res = JSON.stringify(flatten(t1))

const quickSort = (list = []) => {
    const len = list.length
    if (len <= 1) return list
    const left = [], right = [], equal = []
    const pivot = Math.floor(len / 2)
    for (let i = 0; i < len; i++) {
        const cur = list[i]
        const mid = list[pivot]
        if (cur === mid) equal.push(cur)
        if (cur < mid) left.push(cur)
        if (cur > mid) right.push(cur)
    }
    return [...quickSort(left), ...equal, ...quickSort(right)]
}

const merge = (a = [], b = []) => {
    const l1 = a.length, l2 = b.length
    const res = []
    let i = 0, j = 0
    while (i < l1 && j < l2) {
        if (a[i] < b[j]) {
            res.push(a[i++])
        } else {
            res.push(b[j++])
        }
    }
    while (i < l1) res.push(a[i++])
    while (j < l2) res.push(b[j++])
    return res
}

const mergeSort = (list = []) => {
    const len = list.length
    if (len <= 1) return list
    const mid = Math.floor(len / 2)
    const a = list.slice(0, mid)
    const b = list.slice(mid)
    return merge(mergeSort(a), mergeSort(b))
}
// const res = mergeSort([9, 1, 5, 2, -2, 100, 0, 99, 100, 2])


// 654. 最大二叉树
const constructMaximumBinaryTree = (list) => {
    const len = list.length
    if (!len) return null
    if (len === 1) return new TreeNode(list[0])
    const max = Math.max(...list)
    const maxIndex = list.indexOf(max)

    const cur = new TreeNode(max)
    const left = list.slice(0, maxIndex)
    const right = list.slice(maxIndex + 1)
    cur.left = constructMaximumBinaryTree(left)
    cur.right = constructMaximumBinaryTree(right)
    return cur
}
// const res = constructMaximumBinaryTree([3, 2, 1, 6, 0, 5])


// 力扣第 105 题「从前序和中序遍历序列构造二叉树」
const buildTree = (preorder = [3, 9, 20, 15, 7], inorder = [9, 3, 15, 20, 7]) => {
    const l1 = preorder.length
    if (!l1) return null
    if (l1 === 1) return new TreeNode(preorder[0])
    const cur = preorder.shift()
    const index = inorder.indexOf(cur)
    const node = new TreeNode(cur)
    node.left = buildTree(preorder, inorder.slice(0, index))
    node.right = buildTree(preorder, inorder.slice(index + 1))
    return node
};

// 第 106 题「从后序和中序遍历序列构造二叉树」：
const buildTree1 = (inorder = [9, 3, 15, 20, 7], postorder = [9, 15, 7, 20, 3]) => {
    const len = postorder.length
    const len1 = inorder.length
    if (!len || !len1) return null
    if (len === 1) return new TreeNode(postorder[0])
    const val = postorder.pop()
    const index = inorder.indexOf(val)
    const node = new TreeNode(val)
    node.right = buildTree1(inorder.slice(index + 1), postorder)
    node.left = buildTree1(inorder.slice(0, index), postorder)
    return node
}
// const res = buildTree1()


// serialize
const serialize = (root) => {
    // 前序
    const tag = '#'
    if (!root) return tag
    let res = ''
    const helper = (node) => {
        if (!node) return res += tag
        res += node.val
        helper(node.left)
        helper(node.right)
    }
    helper(root)
    return res
}
const deserialize = (s) => {
    if (!s) return null
    const helper = (list = []) => {
        const len = list.length
        if (!len) return null
        if (len === 1) return new TreeNode(list[0])
        const val = list.shift()
        if (val === '#') {
            return null
        }
        const node = new TreeNode(val)
        node.left = helper(list)
        node.right = helper(list)
        return node
    }

    return helper(s.split(''))
}
// const res = deserialize('10##32##4##')


const serialize1 = (root) => {
    // 后序
    if (!root) return ''
    let res = ''
    const helper = (node) => {
        if (!node) return res += '#'
        helper(node.left)
        helper(node.right)
        res += node.val
    }
    helper(root)
    return res

}
// const res = serialize1(t1)
const deserialize1 = (s) => {
    if (!s) return null
    const helper = (list = []) => {
        const len = list.length
        if (!len) return null
        if (len === 1) return new TreeNode(list[0])
        const val = list.shift()
        if (val !== '#') {
            const node = new TreeNode(val)
            node.left = helper(list)
            node.right = helper(list)
            return node
        }
    }

    return helper(s.split(''))
}
// const res = deserialize1('##0##2##431')


// 652. 寻找重复的子树
const findDuplicateSubtrees = (root) => {
    const res = []
    const map = new Map()
    const helper = (node) => {
        if (!node) return '#'
        const left = helper(node.left)
        const right = helper(node.right)
        const str = `${node.val}-${left}-${right}`
        if (!map.has(str)) {
            map.set(str, 1)
        } else {
            map.set(str, map.get(str) + 1)
        }
        if (map.get(str) === 2) {
            res.push(node)
        }
        return str
    }
    helper(root)
    return res

}
// t0.left = new TreeNode(4)
// const res = findDuplicateSubtrees(t1)

//315 看不懂高
var countSmaller = function (nums = []) {
    const len = nums.length
    const res = {}
    if (!len) return []

    const merge = (a = [], b = []) => {
        const l1 = a.length, l2 = b.length
        const res1 = []
        let i = 0, j = 0
        while (i < l1 && j < l2) {
            if (a[i] > b[j]) {
                res[a[i]] = (res[a[i]] || 0) + b.length - j;
                res1.push(b[j++]);
            } else {
                res1.push(a[i++]);
            }
        }
        while (i < l1) res1.push(a[i++])
        while (j < l2) res1.push(b[j++])
        return res1
    }
    const mergeSort = (list = []) => {
        const len = list.length
        if (!len) return []
        if (len === 1) return list
        const pivot = Math.floor(len / 2)


        const left = mergeSort(list.slice(0, pivot))
        const right = mergeSort(list.slice(pivot))

        return merge(left, right)
    }
    mergeSort(nums)
    const a = []
    nums.map((i, index) => {
        a[index] = res[i] || 0
    })
    return res
};
// const res = countSmaller([5, 2, 6, 1])


// 力扣第 230 题「二叉搜索树中第 K 小的元素」
// （从 1 开始计数）
var kthSmallest = function (root, k) {
    if (!root || !k) return 0
    let res = 0
    const helper = (node) => {
        if (!node) return null
        helper(node.left)
        if (k-- === 1) return res = node.val
        helper(node.right)
    }
    helper(root)
    return res
};
// const res = kthSmallest(t1, 3)


// 538. 把二叉搜索树转换为累加树1038

var convertBST = function (root) {
    if (!root) return 0
    let n = 0

    const helper = (node) => {
        if (!node) return null
        helper(node.right)
        n += node.val
        node.val = n
        helper(node.left)
        return node
    }
    return helper(root)

};

// const res = convertBST(t1)

// 力扣第 98 题「验证二叉搜索树」
var isValidBST = function (root) {
    if (!root) return false

    const helper = (node, min = null, max = null) => {
        if (!node) return true

        if (min && node.val <= min.val) return false
        if (max && node.val >= max.val) return false


        const left = helper(node.left, min, node)
        const right = helper(node.right, node, max)

        return left && right
    }
    return helper(root)

};
// const res = isValidBST(t1)


// 力扣第 700 题「二叉搜索树中的搜索」
var searchBST = function (root, val) {
    if (!root) return null
    const helper = (node) => {
        if (!node) return null
        if (node.val === val) return node
        if (node.val > val) return helper(node.left)
        if (node.val < val) return helper(node.right)
    }
    return helper(root)

};
// const res = searchBST(t1, 3)

// 在 BST 中插入一个数
const insertBST = (root, val) => {
    if (!root) return null
    const helper = (node) => {
        if (!node) return new TreeNode(val)
        if (node.val < val) {
            node.right = helper(node.right, val)
        }
        if (node.val > val) {
            node.left = helper(node.left.val)
        }
        return node
    }
    return helper(root)
}
// const res = insertBST(t1, -1)

const getMin = (node) => {
    // right min
    while (node.left) node = node.left
    return node

}

const deleteBST = (node, val) => {
    if (!node) return node
    if (node.val === val) {
        // if (!node.left && !node.right) node = null
        if (!node.left) return node.right
        if (!node.right) return node.left

        let min = getMin(node.right)
        node.right = deleteBST(node.right, min.val)
        min.left = node.left
        min.right = node.right
        node = min

    }

    if (node.val > val) {
        node.left = deleteBST(node.left, val)
    }
    if (node.val < val) {
        node.right = deleteBST(node.right, val)
    }

    return node
}
const res = deleteBST(t1, 1)
console.log(res)
