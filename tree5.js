// do it again
// 1.遍历 or 分解
// 2.位置：前中后

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
    // unfinish
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
// const res = findMode(t1)
// console.log(res)

// 508. 出现次数最多的子树元素和
var findFrequentTreeSum = function (root) {
    if (!root) return
    let res = []
    let maxLen = 0
    const map = new Map()
    const helper = (node) => {
        if (!node) return 0
        const sum = helper(node.left) + helper(node.right) + node.val
        map.set(sum, (map.get(sum) || 0) + 1)
        const n = map.get(sum)
        if (n > maxLen) {
            maxLen = n
            res = [sum]
        } else if (n === maxLen) {
            res.push(sum)
        }
        return sum
    }
    helper(root)
    return res
};
// const res = findFrequentTreeSum(t1)
// console.log(res)

// 513. 找树左下角的值
// 最底层最左边的值
var findBottomLeftValue = function (root) {
    if (!root) return
    const q = [root]
    let res = 0

    while (q.length) {
        const size = q.length
        const path = []
        for (let i = 0; i < size; i++) {
            const cur = q.shift()
            path.push(cur.val)
            if (i === 0) res = cur.val
            cur.left && q.push(cur.left)
            cur.right && q.push(cur.right)
        }
    }
    return res
};
// const res = findBottomLeftValue(t1)
// console.log(res)

// 515. 在每个树行中找最大值
// 给定一棵二叉树的根节点 root ，请找出该二叉树中每一层的最大值。
var largestValues = function (root) {
    if (!root) return
    const [q, res] = [[root], []]
    while (q.length) {
        const size = q.length
        const path = []
        let max = -Infinity
        for (let i = 0; i < size; i++) {
            const cur = q.shift()
            max = Math.max(max, cur.val)
            cur.left && q.push(cur.left)
            cur.right && q.push(cur.right)
        }
        res.push(max)
    }
    return res
};
// const res = largestValues(t1)
// console.log(res)

// 1080. 根到叶路径上的不足节点
// 假如通过节点 node 的每种可能的 “根-叶” 路径上值的总和全都小于给定的 limit，则该节点被称之为「不足节点」，需要被删除。
var sufficientSubset = function (root, limit) {
    if (!root) return null
    const helper = (node, sum = 0) => {
        // 返回符合条件的节点
        if (!node) return null
        sum += node.val
        // 如果我是叶子节点并且和小于limit
        if (!node.left && !node.right) {
            return sum < limit ? null : node
        }
        node.left = helper(node.left, sum)
        node.right = helper(node.right, sum)
        // 后序：如果我的孩子都没有，我也不要了
        if (!node.left && !node.right) return null

        return node
    }
    root = helper(root)
    return root
};
// const res = sufficientSubset(t1, 4)
// console.log(res)

// 1325. 删除给定值的叶子节点
var removeLeafNodes = function (root, target) {
    if (!root) return
    const helper = (node) => {
        if (!node) return null
        if (!node.left && !node.right && node.val === target) return null
        node.left = helper(node.left)
        node.right = helper(node.right)
        if (!node.left && !node.right && node.val === target) return null

        return node
    }
    root = helper(root)
    return root
};
// const res = removeLeafNodes(t1, 0)
// console.log(res)

// 1339. 分裂二叉树的最大乘积
var maxProduct = function (root) {
    if (!root) return
    let res = 0
    let sum = 0
    const helper = (node) => {
        if (!node) return
        sum += node.val
        helper(node.left)
        helper(node.right)
    }
    helper(root)
    const maxSum = (node) => {
        if (!node) return 0
        const leftVal = maxSum(node.left)
        const rightVal = maxSum(node.right)
        res = Math.max(leftVal * (sum - leftVal), rightVal * (sum - rightVal), res)
        return leftVal + rightVal + node.val
    }
    maxSum(root)
    return res % (1000000007)
};
// const res = maxProduct(t1)
// console.log(res)

// 662. 二叉树最大宽度
// 每一层的 宽度 被定义为该层最左和最右的非空节点（即，两个端点）之间的长度。
// 将这个二叉树视作与满二叉树结构相同，两端点间会出现一些延伸到这一层的 null 节点，这些 null 节点也计入长度。
var widthOfBinaryTree = function (root) {
    // 父亲 index 左孩子 index*2+1 右孩子 index*2+2

    if (!root) return
    let res = []
    const q = [[root, 0]]
    while (q.length) {
        const size = q.length
        for (let i = 0; i < size; i++) {
            const [curVal, pos] = q.shift()


        }

    }

    return res
};
// const res = widthOfBinaryTree(t1)
// console.log(res)

// 958. 二叉树的完全性检验
var isCompleteTree = function (root) {
    // 如果出现了空节点,之后再出现非空节点就不是完全二叉树
    if (!root) return
    const q = [root]
    let isFindNull = false
    while (q.length) {
        const size = q.length
        for (let i = 0; i < size; i++) {
            const cur = q.shift()
            if (!cur) {
                isFindNull = true
            } else {
                if (isFindNull) return false
                q.push(cur.left)
                q.push(cur.right)
            }
        }
    }
    return isFindNull
};
const isCompleteTree1 = (root) => {
    // 如果遍历到一个节点为null的时候，如果栈内还有节点，则表示不是完全二叉树
    if (!root) return true
    const q = [root]
    while (q.length) {
        const cur = q.shift()
        if (!cur && q[0]) return false
        if (cur) {
            q.push(cur.left)
            q.push(cur.right)
        }
    }
    return true

}
// const res = isCompleteTree1(t1)
// console.log(res)

// 606 根据二叉树创建字符串
// 给你二叉树的根节点 root ，请你采用前序遍历的方式，将二叉树转化为一个由括号和整数组成的字符串，返回构造出的字符串。
// 空节点使用一对空括号对 "()" 表示，转化后需要省略所有不影响字符串与原始二叉树之间的一对一映射关系的空括号对。
// 输出："1(2(4))(3)" 解释：初步转化后得到 "1(2(4)())(3()())" ，
var tree2str = function (t) {
    // 题看不懂
    if (!t) {
        return ''
    }
    var left = tree2str(t.left)
    var right = tree2str(t.right)
    var res = `${t.val}`
    if (left || right) {
        res += `(${left})`
    }
    if (right) {
        res += `(${right})`
    }
    return res
};
// const res = tree2str(t1)
// console.log(res)

// 面试题04.12 求和路径
// 思路就是把所有节点都当作根节点
var pathSum = function (root, target) {
    if (!root) return 0
    let res = 0
    const helper = (node) => {
        if (!node) return
        getSum(node)
        helper(node.left)
        helper(node.right)
    }
    const getSum = (node, sum = 0) => {
        if (!node) return
        sum += node.val
        if (sum === target) res++
        getSum(node.left, sum)
        getSum(node.right, sum)
    }

    helper(root)
    return res
};
// const res = pathSum(t1, 8)
// console.log(res)

// LCP 34 二叉树染色
// 小扣有一个根结点为 root 的二叉树模型，初始所有结点均为白色，可以用蓝色染料给模型结点染色，模型的每个结点有一个 val 价值。
// 小扣出于美观考虑，希望最后二叉树上每个蓝色相连部分的结点个数不能超过k个，求所有染成蓝色的结点价值总和最大是多少？
var maxValue = function (root, k) {
    // 看不懂
    if (!root) return
    let res = 0
    const helper = (node, blue = k) => {
        if (!node) return 0

        if (!blue) {
            res = Math.max(helper(node.left), helper(node.right))
        } else {


        }
    }
    helper(root)
    return res

};
// const res = maxValue(t1, 2)
// console.log(res)

// 429 N叉树的层序遍历
var levelOrder = function (root) {
    if (!root) return []
    const q = [root]
    const res = []
    while (q.length) {
        const size = q.length
        const path = []
        for (let i = 0; i < size; i++) {
            const cur = q.shift()
            path.push(cur.val)
            const children = cur.children
            if (children) {
                for (let j = 0; j < children.length; j++) {
                    q.push(children[j])
                }
            }

        }
        res.push(path.slice())
    }
    return res
};
// const res = levelOrder()
// console.log(res)

// 450删除二叉搜索树中的节点
var deleteNode = function (root, key) {
    if (!root) return null
    const helper = (node) => {
        if (!node) return null
        if (node.val === key) {
            if (!node.left && !node.right) return null
            if (node.left && node.right) {
                const left = node.left
                const right = node.right
                let p = right
                while (p.left) {
                    p = p.left
                }
                p.left = left
                return right
            }
            if (node.right) return node.right
            if (node.left) return node.left

        }
        node.left = helper(node.left)
        node.right = helper(node.right)
        return node
    }
    root = helper(root)
    return root
};
// const res = deleteNode(t1, 1)
// console.log(res)

// 687 最长同值路径
var longestUnivaluePath = function (root) {
    if (!root) return 0
    let max = 0
    const helper = (node, pVal = 0) => {
        if (!node) return 0
        const left = helper(node.left, node.val)
        const right = helper(node.right, node.val)
        max = Math.max(max, left + right)
        if (pVal !== node.val) return 0
        if (pVal === node.val) return Math.max(left, right) + 1
    }
    helper(root)
    return max
};
// const res = longestUnivaluePath(t1)
// console.log(res)


// 116. 填充每个节点的下一个右侧节点指针
// 给定一个 完美二叉树 ，其所有叶子节点都在同一层，每个父节点都有两个子节点。二叉树定义如下：
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

// 117. 填充每个节点的下一个右侧节点指针2
var connect1 = function (root) {
    // levelorder
    if (!root) return null
    const q = [root]
    while (q.length) {
        const size = q.length
        let last = null
        for (let i = 0; i < size; i++) {
            const cur = q.shift()
            console.log(cur.val, last?.val)
            cur.next = last
            last = cur
            cur.right && q.push(cur.right)
            cur.left && q.push(cur.left)
        }
    }
    return root
};
// const res = connect1(t1)
// console.log(res)

// 669 修剪二叉搜索树
var trimBST = function (root, low, high) {
    if (!root) return
    const helper = (node) => {
        if (!node) return null

        if (node.val < low) {
            return helper(node.right)
        }
        if (node.val > high) {
            return helper(node.left)
        }
        node.left = helper(node.left)
        node.right = helper(node.right)
        return node
    }
    root = helper(root)
    return root
};
// const res = trimBST(t1, 3, 4)
// console.log(res)

// 987二叉树的垂序遍历
// 对位于 (row, col) 的每个结点而言，其左右子结点分别位于 (row + 1, col - 1) 和 (row + 1, col + 1) 。树的根结点位于 (0, 0) 。
var verticalTraversal = function (root) {
    if (!root) return
    const map = new Map()
    const res = []
    const helper = (node, [row = 0, col = 0]) => {
        if (!node) return
        map.set(col, map.get(col) ? [...map.get(col), {row, val: node.val}] : [{row, val: node.val}])
        node.left && helper(node.left, [row + 1, col - 1])
        node.right && helper(node.right, [row + 1, col + 1])
    }
    helper(root, [0, 0])

    const list = [...map].sort((a, b) => a[0] - b[0])
    const list1 = list.map(i => i[1].sort((a, b) => {
        if (b.row !== a.row) return a.row - b.row
        return a.val - b.val

    }))

    list1.map(i => {
        const path = []
        i.map(item => {
            path.push(item.val)
        })
        res.push(path.slice())
    })

    return res

};
// const res = verticalTraversal(t1)
// console.log(res)

var insertIntoBST = function (root, val) {
    if (!root) return new TreeNode(val)
    const helper = (node) => {
        if (!node) return new TreeNode(val)
        if (val < node.val) node.left = helper(node.left)
        if (val > node.val) node.right = helper(node.right)
        return node
    }
    root = helper(root)
    return root
};
// const res = insertIntoBST(t1, -1)
// console.log(res)

var bstFromPreorder = function (preorder) {
    const len = preorder.length
    if (!len) return null
    const helper = (list = preorder) => {
        if (!list.length) return null
        const val = list.shift()
        const node = new TreeNode(val)
        node.left = helper(list.filter(i => i < val))
        node.right = helper(list.filter(i => i >= val))
        return node
    }
    return helper()
};
// const res = bstFromPreorder([8, 5, 1, 7, 10, 12])
// console.log(res)

// 1022 从根到叶的二进制之和
var sumRootToLeaf = function (root) {
    if (!root) return 0
    let res = []
    const helper = (node, path = '') => {
        if (!node) return ''
        path += `${node.val}`
        console.log(path)
        if (!node.left && !node.right) {
            res += parseInt(path, 2)
        }
        helper(node.left, path)
        helper(node.right, path)
    }
    helper(root)
    return res
};
// const res = sumRootToLeaf(t1)
// console.log(res)

// 1302 层数最深叶子节点的和
var deepestLeavesSum = function (root) {
    if (!root) return 0
    const q = [root]
    let tmp = []
    while (q.length) {
        const size = q.length
        const path = []
        for (let i = 0; i < size; i++) {
            const cur = q.shift()
            path.push(cur.val)
            cur.left && q.push(cur.left)
            cur.right && q.push(cur.right)
        }
        tmp = path
    }
    const res = tmp.reduce((i, p) => i + p)
    return res
};
// const res = deepestLeavesSum(t1)
// console.log(res)

// 1367 二叉树的链表
var isSubPath = function (head, root) {
    // 不知道为什么a不了
    if (!root) return false

    const helper = (node, p) => {
        if (!p) return true
        if (!node) return false
        if (node.val === p.val) return helper(node.left, p.next) || helper(node.right, p.next)
        return false
    }
    if (root.val === head.val && helper(root, head)) return true
    return helper(root.left, head) || helper(root.right, head)


};
// const res = isSubPath()
// console.log(res)

var delNodes = function (root, to_delete) {
    if (!root) return null
    const len = to_delete.length
    if (!len) return root
    const res = []
    const helper = (node, p = null) => {
        // 函数定义 返回处理好的节点
        if (!node) return null
        node.left = helper(node.left)
        node.right = helper(node.right)
        // 后序 孩子放不放
        if (to_delete.includes(node.val)) {
            node.left && res.push(node.left)
            node.right && res.push(node.right)
            return null //把自己当null 返回了
        }
        return node
    }
    helper(root)
    if (helper(root)) res.push(root) //自己放入
    return res

};
// const res = delNodes(t1, [3])
// console.log(res)


var smallestFromLeaf = function (root) {
    if (!root) return
    const res = []
    const helper = (node, tmp = '') => {
        if (!node) return ''
        tmp = `${String.fromCharCode(Number(node.val) + 97)}${tmp}`
        if (!node.left && !node.right) res.push(tmp)
        node.left && helper(node.left, tmp)
        node.right && helper(node.right, tmp)
    }
    helper(root)
    return res.sort()[0]

}

// const res = smallestFromLeaf(t1)
// console.log(res)


var maxAncestorDiff = function (root) {
    if (!root) return
    let res = 0
    const helper = (node) => {
        // 返回含节点的最大/小值
        if (!node) return []
        const [leftMin = node.val, leftMax = node.val] = helper(node.left)
        const [rightMin = node.val, rightMax = node.val] = helper(node.right)
        const max = Math.max(leftMax, rightMax)
        const min = Math.min(leftMin, rightMin)
        res = Math.max(res, Math.abs(node.val - max), Math.abs(node.val - min))
        return [Math.min(node.val, min), Math.max(node.val, max)]
    }

    helper(root)
    return res
};
// const res = maxAncestorDiff(t1)
// console.log(res)

var distributeCoins = function (root) {
    // 看不懂

};
// const res = distributeCoins(t1)
// console.log(res)


var subtreeWithAllDeepest = function (root) {
    if (!root) return
    if (!root.left && !root.right) return root
    const max_list = []
    const helper = (node) => {
        if (!node) return 0
        return Math.max(helper(node.left), helper(node.right)) + 1
    }
    helper(root)

    const helper1 = (node) => {

    }
    helper1(root)
    return res

};
// const res = subtreeWithAllDeepest(t1)
// console.log(res)


const test = (root) => {
    if (!root) return
    const [res, path1] = [[], []]
    const helper = (left, right, path) => {
        if (!left && !right) res.push(path)
        left && helper(left.left, left.right, [...path, left.val])
        right && helper(right.left, right.right, [...path, right.val])
    }
    helper(root.left, root.right, [root.val])
    return res
}
const res = test(t1)
console.log(res)