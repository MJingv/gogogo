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
const t6 = new TreeNode(6)

t1.left = t0
t1.right = t3
t3.left = t2
t3.right = t4
// t0.right = t6


const maxDepth = (root) => {
    const traverse = (node, res = 0) => {
        if (!node) return 0
        return Math.max(traverse(node.left), traverse(node.right)) + 1
    }
    return traverse(root)
}
// const res = maxDepth(t1)
// console.log(res)

// 617 合并二叉树
// 给你两棵二叉树： root1 和 root2 。
// 想象一下，当你将其中一棵覆盖到另一棵之上时，两棵树上的一些节点将会重叠（而另一些不会）。你需要将这两棵树合并成一棵新二叉树。合并的规则是：如果两个节点重叠，那么将这两个节点的值相加作为合并后节点的新值；否则，不为 null 的节点将直接作为新二叉树的节点。
// 返回合并后的二叉树。
// 注意: 合并过程必须从两个树的根节点开始。
var mergeTrees = function (root1, root2) {
    const traverse = (node1, node2) => {
        if (!node1) return node2
        if (!node2) return node1
        node2.val += node1.val
        node2.left = traverse(node1.left, node2.left)
        node2.right = traverse(node1.right, node2.right)
        return node2
    }

    return traverse(root1, root2)
};
// const res = mergeTrees(t1, t2)
// console.log(res)

// 563 二叉树的坡度
// 给你一个二叉树的根节点 root ，计算并返回 整个树 的坡度 。
// 一个树的 节点的坡度 定义即为，该节点左子树的节点之和和右子树节点之和的 差的绝对值 。如果没有左子树的话，左子树的节点之和为 0 ；没有右子树的话也是一样。空结点的坡度是 0 。
// 整个树 的坡度就是其所有节点的坡度之和。
var findTilt = function (root) {
    let res = 0
    const traverse = (node) => {
        if (!node) return 0
        const leftVal = traverse(node.left)
        const rightVal = traverse(node.right)
        res += Math.abs(leftVal - rightVal)
        return leftVal + rightVal + node.val
    }

    traverse(root)
    return res
};
// const res = findTilt(t1)
// console.log(res)

// 993
// 在二叉树中，根节点位于深度 0 处，每个深度为 k 的节点的子节点位于深度 k+1 处。
// 如果二叉树的两个节点深度相同，但 父节点不同 ，则它们是一对堂兄弟节点。
// 我们给出了具有唯一值的二叉树的根节点 root ，以及树中两个不同节点的值 x 和 y 。
// 只有与值 x 和 y 对应的节点是堂兄弟节点时，才返回 true 。否则，返回 false。
var isCousins = function (root, x, y) {
    let [deepX, deepY, parentX, parentY] = [0, 0, null, null]
    const traverse = (node, x, y, deep = 0, parent = null) => {
        if (!node) return
        if (node.val === x) {
            deepX = deep
            parentX = parent
        }
        if (node.val === y) {
            deepY = deep
            parentY = parent
        }

        traverse(node.left, x, y, deep + 1, node)
        traverse(node.right, x, y, deep + 1, node)
    }

    traverse(root, x, y)
    return (deepX === deepY) && (parentX !== parentY)
};

// const res = isCousins(t1, 2, 4)
// console.log(res)


// 257
// 给你一个二叉树的根节点 root ，按 任意顺序 ，返回所有从根节点到叶子节点的路径。叶子节点 是指没有子节点的节点。
var binaryTreePaths = function (root) {
    if (!root) return []
    const res = []
    const path = []

    const traverse = (node) => {
        if (!node) return
        path.push(node.val)
        if (!node.left && !node.right) {
            // 叶子节点
            res.push(path.join('->'))
        }
        traverse(node.left)
        traverse(node.right)
        path.pop()

    }
    traverse(root)
    return res
};
// const res = binaryTreePaths(t1)
// console.log(res)

// 637
// 给定一个非空二叉树的根节点 root , 以数组的形式返回每一层节点的平均值。与实际答案相差 10-5 以内的答案可以被接受。
var averageOfLevels = function (root) {
    if (!root) return []
    const res = []
    let q = [root]

    while (q.length) {
        const size = q.length
        let sum = 0
        for (let i = 0; i < size; i++) {
            const node = q.shift()
            sum += node.val
            if (node.left) q.push(node.left)
            if (node.right) q.push(node.right)
        }
        res.push(sum / size)
    }
    return res
};
// const res = averageOfLevels(t1)
// console.log(res)

// 938
// 给定二叉搜索树的根结点 root，返回值位于范围 [low, high] 之间的所有结点的值的和。
var rangeSumBST = function (root, low, high) {
    if (!root) return
    let sum = 0
    const traverse = (node, low, high) => {
        if (!node) return
        traverse(node.left, low, high)
        const val = node.val
        if (val >= low && val <= high) {
            sum += val
        }
        traverse(node.right, low, high)
    }
    traverse(root, low, high)
    return sum
};
// const res = rangeSumBST(t1, 2, 4)
// console.log(res)

// 783 二叉搜索树节点最小距离
var minDiffInBST = function (root) {
    if (!root) return
    let diff = Number.MAX_SAFE_INTEGER
    let prev = null
    const traverse = (node,) => {
        if (!node) return
        traverse(node.left)
        if (prev) {
            diff = Math.min(diff, Math.abs(node.val - prev.val))
        }
        prev = node
        traverse(node.right)
    }
    traverse(root)
    return diff

};
// const res = minDiffInBST(t1)
// console.log(res)


var findTarget = function (root, k) {
    if (!root) return
    const set = new Set()
    let res = false
    const traverse = (node, k) => {
        if (!node) return
        const val = node.val
        if (set.has(k - val)) return res = true
        set.add(val)
        traverse(node.left, k)
        traverse(node.right, k)
    }
    traverse(root, k)
    return res
};
var findTarget1 = function (root, k) {
    if (!root) return
    const list = []
    let res = false
    const traverse = (node) => {
        if (!node) return
        traverse(node.left)
        list.push(node.val)
        traverse(node.right)
    }
    traverse(root)

    let [left, right] = [0, list.length - 1]
    while (left < right) {
        const sum = list[left] + list[right]
        if (sum === k) return res = true
        if (sum > k) {
            right--
        }
        if (sum < k) {
            left++
        }
    }
    return list
};
// const res = findTarget1(t1, 6)
// console.log(res)

var findSecondMinimumValue = function (root) {
    if (!root) return
    let res = Number.MAX_SAFE_INTEGER
    const rootVal = root.val

    const traverse = (node) => {
        if (!node) return
        traverse(node.left)
        if (node.val > rootVal) {
            res = Math.min(res, node.val)
        }
        traverse(node.right)
    }
    traverse(root)
    if (res === Number.MAX_SAFE_INTEGER) res = -1

    return res
};
// const res = findSecondMinimumValue(t1)
// console.log(res)


var isSubtree = function (root, subRoot) {
    if (!root || !subRoot) return true
    const isSame = (t1, t2) => {
        if (!t1 && !t2) return true
        if (!t1 || !t2) return false
        if (t1.val === t2.val) {
            return isSame(t1.left, t2.left) && isSame(t1.right, t2.right)
        }
        return false
    }
    const traverse = (node) => {
        if (!node) return
        if (isSame(node, subRoot)) return true
        return traverse(node.left, subRoot) || traverse(node.right, subRoot)
    }

    return traverse(root)
};
// const res = isSubtree(t1, t3)
// console.log(res)


var sortedArrayToBST = function (nums) {
    const len = nums.length
    if (!len) return null
    const traverse = (list) => {
        const len = list.length
        if (!len) return
        if (len === 1) return new TreeNode(list[0])
        const midIndex = (0 + len) >> 1
        const node = new TreeNode(list[midIndex])
        node.left = traverse(list.slice(0, midIndex))
        node.right = traverse(list.slice(midIndex + 1))
        return node
    }
    return traverse(nums)

};
const res = sortedArrayToBST([-10, -3, 0, 5, 9])
console.log(res)