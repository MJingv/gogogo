// 回溯
// 1。已经做的选择
// 2。面临的选择
// 3。结束条件

// backtrace(路径,选择列表){
//     if（终止条件） return
//     for(选择 in 列表){
//         做选择
//         backtrack()
//         撤销选择
//     }
// }


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

// 力扣第 46 题「 全排列」
var permute = function (nums) {
    const len = nums.length
    const [res, path] = [[], []]
    const helper = (used = {}) => {
        if (path.length === len) return res.push(path.slice())
        for (let i = 0; i < len; i++) {
            if (used[i]) continue
            path.push(nums[i])
            used[i] = true
            helper(used)
            path.pop()
            used[i] = false
        }
    }
    helper()
    return res
};
// const res = permute([1, 2, 3])
// console.log(res)


// 112. 路径总和
// 遍历+记路径
var hasPathSum = function (root, targetSum) {
    if (!root) return false
    let res = false
    const helper = (node, sum) => {
        if (!node) return
        if (!node.left && !node.right && sum === targetSum) return res = true
        node.left && helper(node.left, sum + node.left.val)
        node.right && helper(node.right, sum + node.right.val)

    }
    helper(root, root.val)
    return res
};
// const res = hasPathSum(t1, 1)
// console.log(res)


// 剑指 Offer 34. 二叉树中和为某一值的路径
var pathSum = function (root, target) {
    if (!root) return []
    const res = []
    const helper = (node, path, sum) => {
        if (!node) return
        if (!node.left && !node.right && sum === target) res.push(path.slice())
        node.left && helper(node.left, [...path, node.left.val], sum + node.left.val)
        node.right && helper(node.right, [...path, node.right.val], sum + node.right.val)
    }
    helper(root, [root.val], root.val)
    return res

};
const res = pathSum(t1, 1)
console.log(res)

// 113. 路径总和 II

// 131. 分割回文串

// 140. 单词拆分 II

// 17. 电话号码的字母组合

// 22. 括号生成

// 39. 组合总和

// 698. 划分为k个相等的子集

// 77. 组合

// 78. 子集