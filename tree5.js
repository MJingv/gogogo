// do it again
// 1.遍历 or 分解
// 2.位置：前中后

function TreeNode(val, left, right) {
    this.val = (val === undefined ? 0 : val)
    this.left = (left === undefined ? null : left)
    this.right = (right === undefined ? null : right)
}

const t1 = new TreeNode(1)
t1.left = new TreeNode(0)
const t3 = new TreeNode(3)
t3.left = new TreeNode(2)
t3.right = new TreeNode(4)
t1.right = t3

// 力扣第 104 题「 二叉树的最大深度」
// 遍历 dfs 回溯
var maxDepth = function (root) {
    let max = 0, depth = 0
    const helper = (node) => {
        if (!node) return
        depth++ //前序处理
        if (!node.left && !node.right) max = Math.max(max, depth)
        helper(node.left)
        helper(node.right)
        depth--
    }
    helper(root)
    return max

};
// 分解
const maxDepth1 = (root) => {
    if (!root) return 0
    //后序处理
    return Math.max(maxDepth1(root.left), maxDepth1(root.right)) + 1
}
// const res = maxDepth1(t1)
// console.log(res)

// 遍历
const traverse = (root) => {
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
// 分解
const traverse1 = (root) => {
    let res = []
    if (!root) return res
    res.push(root.val)
    res = [...res, ...traverse1(root.left)]
    res = [...res, ...traverse1(root.right)]
    return res
}
// const res = traverse1(t1)
// console.log(res)

const levelTraverse = (root) => {
    if (!root) return
    const [q, res] = [[root], []]
    while (q.length) {
        const size = q.length
        const path = []
        for (let i = 0; i < size; i++) {
            const node = q.shift()
            path.push(node.val)
            node.left && q.push(node.left)
            node.right && q.push(node.right)
        }
        res.push(path)
    }
    return res
}
// const res = levelTraverse(t1)
// console.log(res)

// 1、如果把根节点看做第 1 层，如何打印出每一个节点所在的层数？
const fn1 = (root) => {
    const helper = (node, depth = 1) => {
        if (!node) return depth
        console.log(node.val, depth) //前序
        helper(node.left, depth + 1)
        helper(node.right, depth + 1)
    }
    return helper(root)
    // return root
}
// const res = fn1(t1)
// console.log(res)

// 2、如何打印出每个节点的左右子树各有多少节点？
const fn2 = (root) => {
    const helper = (node) => {
        if (!node) return 0
        const left = helper(node.left)
        const right = helper(node.right)
        console.log(node.val, 'left', left, 'right', right,)//后序
        return left + right + 1
    }
    helper(root)
}
// const res = fn2(t1)
// console.log(res)

// 力扣第 543 题「 二叉树的直径」
// 不一定过根结点，不等于根的左最大+右最大
var diameterOfBinaryTree = function (root) {
    // 求每个节点的直径
    const maxDepth = (node) => {
        if (!node) return 0
        return Math.max(maxDepth(node.left), maxDepth(node.right)) + 1
    }
    let max = 0
    const helper = (node) => {
        if (!node) return
        max = Math.max(maxDepth(node.right) + maxDepth(node.left), max)
        helper(node.left)
        helper(node.right)
    }
    helper(root)
    return max
};
var diameterOfBinaryTree1 = function (root) {
    if (!root) return
    let max = 0
    const helper = (node) => {
        if (!node) return 0
        const leftMax = helper(node.left)
        const rightMax = helper(node.right)
        const maxD = leftMax + rightMax
        max = Math.max(max, maxD)
        return 1 + Math.max(leftMax, rightMax) // 算maxdepth
    }
    helper(root)
    return max
}
// const res = diameterOfBinaryTree1(t1)
// console.log(res)

// 100. 相同的树
var isSameTree = function (p, q) {
    let res = true
    const helper = (node1, node2) => {
        if (!node1 && node2 || node1 && !node2) return res = false
        if (!node1 && !node2) return
        if (node1.val !== node2.val) return res = false
        helper(node1.left, node2.left)
        helper(node1.right, node2.right)
    }
    helper(p, q)
    return res
};
// const res = isSameTree(t1, t3)
// console.log(res)

// 101. 对称二叉树
var isSymmetric = function (root) {
    const helper = (l, r) => {
        if (!l && !r) return true
        if (!l || !r) return false
        return l.val === r.val && helper(l.left, r.right) && helper(l.right, r.left)
    }
    return helper(root.left, root.right)

};
// const res = isSymmetric(t1)
// console.log(res)

// 113. 路径总和 II
var pathSum = function (root, targetSum) {
    const path = []
    const res = []
    let sum = 0
    const helper = (node) => {
        if (!node) return

        path.push(node.val)
        sum += node.val
        if (!node.left && !node.right && sum === targetSum) res.push(path.slice())

        helper(node.left)
        path.pop()
        sum -= node.val

        path.push(node.val)
        sum += node.val
        helper(node.right)
        path.pop()
        sum -= node.val

    }
    helper(root)
    return res

};
// const res = pathSum(t1, 8)
// console.log(res)


// 129. 求根节点到叶节点数字之和
var sumNumbers = function (root) {
    // 回溯
    if (!root) return 0
    if (!root.left && !root.right && root.val === 0) return 0
    let res = 0
    const path = []
    const helper = (node) => {
        if (!node) return
        path.push(node.val)
        if (!node.left && !node.right) res += Number(path.slice().join(''))

        helper(node.left)
        path.pop()

        path.push(node.val)
        helper(node.right)
        path.pop()

    }
    helper(root)
    return res
}
const sumNumbers1 = (root) => {
    if (!root) return 0
    if (!root.left && !root.right && root.val === 0) return 0
    let res = 0

    const helper = (node, c = '') => {
        if (!node) return
        c += node.val
        if (!node.left && !node.right) res += Number(c)
        helper(node.left, c)
        helper(node.right, c)
    }
    helper(root)
    return res

}
// const res = sumNumbers1(t1)
// console.log(res)

// 1315. 祖父节点值为偶数的节点和
var sumEvenGrandparent = function (root) {
    // 没有a
    if (!root) return 0
    let res = 0
    const helper = (node, p = null) => {
        if (!node) return
        if (p && p.val % 2 === 0) {
            res += node.val
        }
        if (node.left) {
            helper(node.left.left, node)
            helper(node.left.right, node)
        }
        if (node.right) {
            helper(node.right.left, node)
            helper(node.right.right, node)
        }
    }
    helper(root)
    return res

};
var sumEvenGrandparent1 = function (root) {
    if (!root) return
    let res = 0
    const helper = (node, parent = null, grandParent = null) => {
        if (!node) return
        if (grandParent && grandParent.val % 2 === 0) {
            res += node.val
        }
        helper(node.left, node, parent)
        helper(node.right, node, parent)
    }
    helper(root)
    return res
}
// const res = sumEvenGrandparent1(t1)
// console.log(res)


// 114. 二叉树展开为链表
// 给你二叉树的根结点 root ，请你将它展开为一个单链表：展开后的单链表应该同样使用 TreeNode ，其中 right 子指针指向链表中下一个结点，而左子指针始终为 null 。展开后的单链表应该与二叉树 先序遍历 顺序相同。
var flatten = function (root) {
    // 分解 相信函数名字
    if (!root) return
    flatten(root.left)
    flatten(root.right)
    // 后序位置，左右都flat了
    const [left, right] = [root.left, root.right]
    // 将左放到右
    root.left = null
    root.right = left
    // 找到最右，把原右放过去
    let p = root
    while (p.right) {
        p = p.right
    }
    p.right = right
};
// const res = flatten(t1)
// console.log(t1)

// 116. 填充每个节点的下一个右侧节点指针
var connect = function (root) {
    if (!root) return null
    const helper = (left = null, right = null) => {
        if (!left) return null
        right.next = null
        left.next = right
        helper(left.left, left.right)
        helper(left.right, right.left)
        helper(right.left, right.right)

    }
    helper(root.left, root.right)
    return root
};
// const res = connect(t1)
// console.log(res)

// 404. 左叶子之和
var sumOfLeftLeaves = function (root) {
    if (!root) return
    let res = 0
    const helper = (node) => {
        if (!node) return
        if (node.left && !node.left.left && !node.left.right) res += node.left.val
        helper(node.left)
        helper(node.right)
    }
    helper(root)
    return res

};
// const res = sumOfLeftLeaves(t1)
// console.log(res)
// 437. 路径总和 III
var pathSum = function (root, targetSum) {
    if (!root) return
    let res = 0
    let sum = 0
    const path = []
    const helper = (node) => {
        if (!node) return
        if (sum === targetSum) res++


    }
    helper(root)
    return res


};
// const res = pathSum()
// console.log(res)

// 501. 二叉搜索树中的众数
var findMode = function (root) {
    if (!root) return
    const map = new Map()
    const res = []
    let maxLen = 0
    const helper = (node) => {
        if (!node) return
        map.set(node.val, (map.get(node.val) || 0) + 1)
        maxLen = Math.max(maxLen, map.get(node.val))
        helper(node.left)
        helper(node.right)
    }
    helper(root)
    for (const [key, value] of map) {
        if (value === maxLen) res.push(key)
    }
    return res
};
const res = findMode(t1)
console.log(res)

// 508. 出现次数最多的子树元素和
// 513. 找树左下角的值
// 515. 在每个树行中找最大值

// 1080. 根到叶路径上的不足节点

// 1325. 删除给定值的叶子节点

// 1339. 分裂二叉树的最大乘积