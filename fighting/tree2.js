function TreeNode(val, left, right) {
    this.val = (val === undefined ? 0 : val)
    this.left = (left === undefined ? null : left)
    this.right = (right === undefined ? null : right)
}

const t1 = new TreeNode(1)
const t0 = new TreeNode(0)
t1.left = t0
// t0.left = new TreeNode(0)95
const t3 = new TreeNode(3)
t3.left = new TreeNode(2)
t3.right = new TreeNode(4)
t1.right = t3

// 94. Binary Tree Inorder Traversal
// 102. Binary Tree Level Order Traversal
// 104. Maximum Depth of Binary Tree
// 105. Construct Binary Tree from Preorder and Inorder Traversal
// 106. Construct Binary Tree from Inorder and Postorder Traversal
// 108. Convert Sorted Array to Binary Search Tree
// 110. Balanced Binary Tree
// 111. Minimum Depth of Binary Tree
// 112. Path Sum
// 113. Path Sum II
// 114. Flatten Binary Tree to Linked List
// 116. Populating Next Right Pointers in Each Node
// 124. Binary Tree Maximum Path Sum
// 129. Sum Root to Leaf Numbers
// 144. Binary Tree Preorder Traversal
// 145. Binary Tree Postorder Traversal
// 226. Invert Binary Tree
// 230. Kth Smallest Element in a BST
// 236. Lowest Common Ancestor of a Binary Tree
// 297. Serialize and Deserialize Binary Tree
// 617. Merge Two Binary Trees
// 654. Maximum Binary Tree
// 700. Search in a Binary Search Tree
// 701. Insert into a Binary Search Tree
// 938. Range Sum of BST


// 94. Binary Tree Inorder Traversal
var inorderTraversal = function (root) {
    const res = []
    if (!root) return res
    const helper = (node) => {
        if (!node) return
        helper(node.left)
        res.push(node.val)
        helper(node.right)

    }
    helper(root)
    return res

};
// 102. Binary Tree Level Order Traversal
var levelOrder = function (root) {
    const res = []
    if (!root) return res
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
        res.push(level)
    }
    return res
};
// const res = levelOrder(t1)
// console.log(res)
// 104. Maximum Depth of Binary Tree
var maxDepth = function (root) {
    if (!root) return 0
    return Math.max(maxDepth(root.left), maxDepth(root.right)) + 1
};
// 105. Construct Binary Tree from Preorder and Inorder Traversal
var buildTree = function (preorder, inorder) {
    if (!preorder.length || !inorder.length) return null
    const helper = (preorder, inorder) => {
        if (!preorder.length || !inorder.length) return null
        const val = preorder[0]
        const index = inorder.indexOf(val)
        if (index === -1) return null
        const node = new TreeNode(val)
        node.left = helper(preorder.slice(1, index), inorder.slice(0, index))
        node.right = helper(preorder.slice(index + 1), inorder.slice(index + 1))
        return node
    }
    return helper(preorder, inorder)

};
// const res = buildTree([1, 0, 3, 2, 4], [0, 1, 2, 3, 4])
// 106. Construct Binary Tree from Inorder and Postorder Traversal


// 108. Convert Sorted Array to Binary Search Tree


// 110. Balanced Binary Tree
var isBalanced = function (root) {
    let res = true
    if (!root) return res
    const helper = (node) => {
        if (!node) return 0
        const left = helper(node.left)
        const right = helper(node.right)
        if (Math.abs(left - right) > 1) return res = false

        return Math.max(left, right) + 1

    }
    helper(root)
    return res

};
// const res = isBalanced(t1)


// 111. Minimum Depth of Binary Tree

var minDepth = function (root) {
    if (!root) return 0
    const helper = (node) => {
        if (!node) return 0
        const left = helper(node.left)
        const right = helper(node.right)
        if (!left) return right + 1
        if (!right) return left + 1

        return Math.min(left, right) + 1
    }
    return helper(root)

};
// const res = minDepth(t1)

// 112. Path Sum


var hasPathSum = function (root, targetSum) {
    if (!root) return false
    let res = false
    const helper = (node, sum) => {
        if (!node) return
        if (!node.left && !node.right && sum === targetSum) return res = true
        node.left && helper(node.left, sum + node.left.val)
        node.right && helper(node.right, sum + node.right.val)
        return false

    }
    helper(root, root.val)
    return res
};

const hasPathSum1 = (root, sum) => {
    if (!root) return false
    if (!root.left && !root.right) return sum === root.val
    return hasPathSum1(root.left, sum - root.val) || hasPathSum1(root.right, sum - root.val)


}
const hasPathSum2 = (root, targetSum) => {
    // 没ac
    if (!root) return false
    let res = false
    let sum = 0
    const helper = (node) => {
        if (!node) return
        sum += node.val
        if (sum === targetSum) return res = true

        helper(node.left)
        sum -= node.val


        sum += node.val
        helper(node.right)
        sum -= node.val

    }
    helper(root)
    return res

}
// const res = hasPathSum2(t1, 6)


// 113. Path Sum II
var pathSum = function (root, targetSum) {
    let res = []
    if (!root) return res
    let path = []
    let sum = 0
    const helper = (node) => {
        if (!node) return
        sum += node.val
        path.push(node.val)
        if (!node.left && !node.right && sum === targetSum) res.push(path.slice())

        helper(node.left)
        sum -= node.val
        path.pop()

        sum += node.val
        path.push(node.val)
        helper(node.right)
        sum -= node.val
        path.pop()
    }

    helper(root)
    return res
}
// const res = pathSum(t1, 6)

// 114. Flatten Binary Tree to Linked List

var flatten = function (root) {
    if (!root) return
    flatten(root.left)
    flatten(root.right)
    const left = root.left
    const right = root.right
    root.right = left
    root.left = null

    let p = root
    while (p.right) {
        p = p.right
    }

    p.right = right
    return root
};
// const res = flatten(t1)

// 116. Populating Next Right Pointers in Each Node
var connect = function (root) {
    if (!root) return null

    const helper = (left, right) => {
        if (!right || !left) return null

        left.next = right
        helper(left.left, left.right)
        helper(right.left, right.right)
        helper(left.right, right.left)


    }
    helper(root.left, root.right)
    return root


};
// const res = connect(t1)


// 124. Binary Tree Maximum Path Sum
var maxPathSum = function (root) {
    if (!root) return 0
    let max = -Infinity

    const helper = (node) => {
        if (!node) return 0

        const left = Math.max(0, helper(node.left))
        const right = Math.max(0, helper(node.right))
        const cur = node.val + left + right
        max = Math.max(max, cur)
        return node.val + Math.max(left, right) // 注意这里，返回节点的最大贡献值
    }
    helper(root)
    return max

};
// const res = maxPathSum(t1)

// 129. Sum Root to Leaf Numbers
var sumNumbers = function (root) {
    // 回溯
    if (!root) return 0
    let sum = 0
    let tmp = []
    const helper = (node) => {
        if (!node) return
        tmp.push(node.val)

        if (!node.left && !node.right) sum += Number(tmp.join(''))

        helper(node.left)
        tmp.pop()

        tmp.push(node.val)
        helper(node.right)
        tmp.pop()
    }
    helper(root)
    return sum
};
const sumNumbers1 = (root) => {
    if (!root) return 0
    let res = 0
    const helper = (node, str = '') => {
        if (!node) return ''
        str += node.val
        if (!node.left && !node.right) res += Number(str)
        helper(node.left, str)
        helper(node.right, str)
    }
    helper(root)
    return res
}
// const res = sumNumbers1(t1)
// 144. Binary Tree Preorder Traversal
var preorderTraversal = function (root) {
    if (!root) return []
    const res = []
    const helper = (node) => {
        if (!node) return
        res.push(node.val)
        helper(node.left)
        helper(node.right)
    }
    helper(root)
    return res

};
// const res = preorderTraversal(t1)


// 145. Binary Tree Postorder Traversal
var postorderTraversal = function (root) {
    if (!root) return []
    const res = []
    const helper = (node) => {
        if (!node) return
        helper(node.left)
        helper(node.right)
        res.push(node.val)

    }
    helper(root)
    return res
};
// const res = postorderTraversal(t1)

// 226. Invert Binary Tree

var invertTree = function (root) {
    if (!root) return null
    const helper = (node) => {
        if (!node) return null
        const left = helper(node.left)
        const right = helper(node.right)
        node.left = right
        node.right = left
        return node
    }
    helper(root)
    return root
};
// const res = invertTree(t1)

// 230. Kth Smallest Element in a BST
var kthSmallest = function (root, k) {
    if (!root) return null
    let res = 0
    const helper = (node) => {
        if (!node) return
        helper(node.left,)
        k--
        if (k === 0) return res = node.val
        helper(node.right)

    }
    helper(root)
    return res
};
// const res = kthSmallest(t1, 2)

// 236. Lowest Common Ancestor of a Binary Tree
var lowestCommonAncestor = function (root, p, q) {
    // 记住吧，不太好理解
    if (!root) return null
    if (p === root || q === root) return root
    const left = lowestCommonAncestor(root.left, p, q)
    const right = lowestCommonAncestor(root.right, p, q)
    if (left && right) return root
    if (!left) return right
    if (!right) return left
};
// const res = lowestCommonAncestor(t1, t0, t3)

// 297. Serialize and Deserialize Binary Tree


// 617. Merge Two Binary Trees
var mergeTrees = function (root1, root2) {
    if (!root1) return root2
    if (!root2) return root1

    const helper = (t1, t2) => {
        if (!t1 && !t2) return null
        if (!t1) return t2
        if (!t2) return t1

        const left = helper(t1.left, t2.left)
        const right = helper(t1.right, t2.right)

        t1.val += t2.val
        t1.left = left
        t1.right = right

        return t1

    }
    helper(root1, root2)
    return root1
};
// const res = mergeTrees(t1, t1)

// 654. Maximum Binary Tree

var constructMaximumBinaryTree = function (nums) {
    const len = nums.length
    if (!len) return null
    const helper = (nums) => {
        const len = nums.length
        if (!len) return null
        const max=Math.max(...nums)
        const node=new TreeNode(max)
        const index=nums.indexOf(max)
        const left=helper(nums.slice(0,index))
        const right=helper(nums.slice(index+1))
        node.left=left
        node.right=right
        return node
    }
    return helper(nums)

};
const res = constructMaximumBinaryTree([3, 2, 1, 6, 0, 5])
// 700. Search in a Binary Search Tree
// 701. Insert into a Binary Search Tree
// 938. Range Sum of BST

// 993
var isCousins = function (root, x, y) {
    if (!root) return false
    let res = false
    let d1 = 0, d2 = 0, f1 = null, f2 = null


    const helper = (node, deep = 0, father) => {
        if (!node) return
        if (node.val === x) {
            d1 = deep
            f1 = father
        }
        if (node.val === y) {
            d2 = deep
            f2 = father
        }
        helper(node.left, deep + 1, node)
        helper(node.right, deep + 1, node)
    }

    helper(root)
    if (d1 === d2 && JSON.stringify(f1) !== JSON.stringify(f2)) res = true

    return res
};
// const res = isCousins(t1, 2, 4)


console.log(res)



