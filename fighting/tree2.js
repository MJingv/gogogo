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
const res = buildTree([1, 0, 3, 2, 4], [0, 1, 2, 3, 4])
console.log(res)
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



