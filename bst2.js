// 230 题「 二叉搜索树中第 K 小的元素」

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


var kthSmallest = function (root, k) {
    let res = ''
    let i = 0
    const traverse = (node) => {
        if (!node) return
        traverse(node.left, k)
        i++
        if (i === k) {
            res = node.val
            return;
        }
        traverse(node.right, k)
    }
    traverse(root, k)
    return res
};
// const res = kthSmallest(t3, 1)
// console.log(res)

// 力扣第 538 题和 1038 题 BST 转化累加树
var convertBST = function (root) {
    if (!root) return
    let sum = 0
    const traverse = (node) => {
        if (!node) return 0
        traverse(node.right)
        // 直接在这里写preval 拿不到下一个 只能拿到上一个节点的值
        // 引入变量 解决问题
        sum += node.val
        node.val = sum
        traverse(node.left)
        return node
    }
    return traverse(root)
};
// const res = convertBST(t1)
// console.log(res)

// 力扣第 98 题「 验证二叉搜索树」
var isValidBST = function (root) {
    const traverse = (node, min = null, max = null) => {
        if (!node) return true
        if (min && node.val <= min.val) return false
        if (max && node.val >= max.val) return false
        return traverse(node.left, min, node) && traverse(node.right, node, max)
    }
    return traverse(root)
};
// const res = isValidBST(t1)
// console.log(res)


// 力扣第 700 题「 二叉搜索树中的搜索」
var searchBST = function (root, val) {
    const traverse = (node, val) => {
        if (!node) return null
        if (val === node.val) return node
        if (val < node.val) {
            return traverse(node.left, val)
        }
        if (val > node.val) {
            return traverse(node.right, val)
        }
    }
    return traverse(root, val)
};
// const res = searchBST(t1, 3)
// console.log(res)

const addBST = (root, val) => {
    if (!root) return new TreeNode(6)
    const traverse = (node, val) => {
        if (!node) return new TreeNode(val)

        // if (node.val === val) {
        //     //相同的不要
        //     return node
        // }
        if (node.val > val) {
            node.left = traverse(node.left, val)
        }
        if (node.val < val) {
            node.right = traverse(node.right, val)
        }
        return node
    }

    return traverse(root, val)
}
// const res = addBST(t1, 6)
// console.log(res)

const removeBST = (root, val) => {
    const exist = searchBST(root, val)
    if (!exist) return root

    const traverse = (node, val) => {
        if (!node) return

        if (node.val === val) {
            if (!node.left || !node.right) {
                return node.left || node.right
            }
            let p = node.right
            while (p.left) {
                p = p.left
            }
            removeBST(node, p.val)
            node.val = p.val
            return node
        }
        if (node.val < val) {
            node.right = removeBST(node.right, val)
        }
        if (node.val > val) {
            node.left = removeBST(node.left, val)
        }
        return node
    }


    return traverse(root, val)
}

// const res = removeBST(t1, 1)
// console.log(res)


var findTarget = function (root, k) {
    if (!root) return
    const list = []
    const traverse = (node) => {
        if (!node) return
        traverse(node.left)
        list.push(node.val)
        traverse(node.right)

    }
    traverse(root)

    const len = list.length

    let [low, high] = [0, len - 1]
    while (low < high) {
        const sum = list[low] + list[high]
        if (sum === k) return true
        if (sum < k) {
            low++
        }
        if (sum > k) {
            high--
        }

    }
    return false
};
// const res = findTarget(t1, 10)
// console.log(res)

// 96. 不同的二叉搜索树
var numTrees = function (n) {
    const memo = new Array(n + 1).fill(0).map(() => new Array(n + 1).fill(0))
    const count = (low, high) => {
        if (low > high) return 1
        if (memo[low][high]) {
            return memo[low][high]
        }
        let res = 0
        for (let i = low; i <= high; i++) {
            const left = count(low, i - 1)
            const right = count(i + 1, high)
            res += left * right
        }
        memo[low][high] = res
        return res
    }
    return count(1, n) //闭区间求值
};
// const res = numTrees(3)
// console.log(res)


// 95. 不同的二叉搜索树 II
var generateTrees = function (n) {
    const res = []
    const helper = (low, high) => {
        if (low > high) return [null]
        for (let i = low; i <= high; i++) {
            const leftTree = helper(low, i - 1)
            const rightTree = helper(i + 1, high)

            for (const left of leftTree) {
                for (const right of rightTree) {
                    const node = new TreeNode(i)
                    node.left = left
                    node.right = right
                    res.push(node)
                }
            }
        }
        return res
    }
    return helper(1, n)

};
// const res = generateTrees(3)
// console.log(res)

const lowestCommonAncestor = (root, p, q) => {
    const traverse = (node, p, q) => {
        if (!node) return
        const val = node.val

        if (p.val > val && q.val > val) return traverse(node.right, p, q)
        if (p.val < val && q.val < val) return traverse(node.left, p, q)

        return node
    }
    return traverse(root, p, q)
}
//
// const res = lowestCommonAncestor(t1, new TreeNode(2), new TreeNode(4))
// console.log(res)


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
const res = mergeTrees(t1, t2)
console.log(res)

