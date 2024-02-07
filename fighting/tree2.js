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
        return node.val + Math.max(left, right)
    }
    helper(root)
    return max

};
const res = maxPathSum(t1)


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


console.log(res)



