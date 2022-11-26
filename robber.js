class TreeNode {
    constructor(val) {
        this.val = val
        this.left = null
        this.right = null
    }
}


// 198. 打家劫舍
// 输入：[1,2,3,1] 输出：4
var rob = function (nums) {
    const len = nums.length
    if (!len) return 0
    const memo = Array(len).fill(-1)
    const dp = (nums, i) => {
        if (i < 0) return 0
        if (memo[i] !== -1) return memo[i]
        memo[i] = Math.max(dp(nums, i - 2) + nums[i], dp(nums, i - 1))
        return memo[i]
    }
    dp(nums, len - 1)
    return memo[len - 1]
};
const rob1 = (nums) => {
    const len = nums.length
    if (!len) return 0
    const dp = [nums[0], Math.max(nums[0], nums[1])]

    for (let i = 2; i < len; i++) {
        dp[i] = Math.max(dp[i - 2] + nums[i], dp[i - 1])
    }
    return dp[len - 1]
}
// const res = rob1([1, 2, 3, 1], 4)
// console.log(res)

// 213. 打家劫舍 II
// 输入：nums = [2,3,2] 输出：3 解释：你不能先偷窃 1 号房屋（金额 = 2），然后偷窃 3 号房屋（金额 = 2）
const rob2 = (nums) => {
    const len = nums.length
    if (!len) return 0
    if (len === 1) return nums[0]

    const hepler = (m, n, nums) => {
        if (m === n) return nums[m]
        const dp = Array(len).fill(0)
        dp[m] = nums[m]
        dp[m + 1] = Math.max(nums[m], nums[m + 1])
        for (let i = m + 2; i <= n; i++) {
            dp[i] = Math.max(dp[i - 1], dp[i - 2] + nums[i])
        }
        return dp[n]
    }
    return Math.max(hepler(0, len - 2, nums), hepler(1, len - 1, nums))
}
// const res = rob2([1, 2, 3])
// console.log(res)

// 337. 打家劫舍 III
// 输入: root = [3,2,3,null,3,null,1] 输出: 7 解释: 小偷一晚能够盗取的最高金额 3 + 3 + 1 = 7
const rob3 = (root) => {
    // time out
    const memo = new Map()
    const helper = (root) => {
        if (!root) return 0
        if (memo.has(root)) return memo.get(root)
        let hasRoot = root.val
        let hasNoRoot = 0

        hasNoRoot = rob3(root.left) + rob3(root.right)
        if (root.left) {
            hasRoot += rob3(root.left.left) + rob3(root.left.right)
        }
        if (root.right) {
            hasRoot += rob3(root.right.left) + rob3(root.right.right)
        }
        const res = Math.max(hasNoRoot, hasRoot)
        memo.set(root, res)
        return res
    }
    return helper(root)

}

const rob4 = (root) => {
    const helper = (node) => {
        let res = [0, 0]
        if (!node) return res
        const left = helper(node.left)
        const right = helper(node.right)
        res[0] = Math.max(...left) + Math.max(...right)
        res[1] = node.val + left[0] + right[0]
        return res
    }
    const res = helper(root)
    return Math.max(res[0], res[1])
}


const t = new TreeNode(3)
t.left = new TreeNode(2)
t.right = new TreeNode(3)
t.left.right = new TreeNode(3)
t.right.right = new TreeNode(1)

const res = rob4(t)
console.log(res)


// 剑指 Offer II 089. 房屋偷盗


// 剑指 Offer II 090. 环形房屋偷盗