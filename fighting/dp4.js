// -------------------------------------------stock---------------------------------------------------
// 好难看懂状态机


// 121. 买卖股票的最佳时机
var maxProfit = function (prices) {
    // timeout
    const len = prices.length
    if (!len) return 0
    let res = 0

    for (let i = 0; i < len - 1; i++) {
        for (let j = i + 1; j < len; j++) {
            res = Math.max(res, prices[j] - prices[i])
        }

    }
    return res
};
var maxProfit1 = function (prices) {
    const len = prices.length
    const dp = Array(len).fill(0)
    let min = prices[0] //point记录最小值
    for (let i = 1; i < len; i++) {
        min = Math.min(min, prices[i])
        dp[i] = Math.max(dp[i - 1], prices[i] - min)

    }

    return Math.max(...dp)
}
// const res = maxProfit1([7, 1, 5, 3, 6, 4])//5


// 188
var maxProfit = function (k, prices) {


};
// const res = maxProfit1(2, [3, 2, 6, 5, 0, 3])//7


// 122
var maxProfit = function (prices) {

};


// -------------------------------------------rob---------------------------------------------------
//打劫问题
// 力扣第 198 题「打家劫舍」
// 相邻报警
var rob = function (nums) {
    const len = nums.length
    if (!len) return 0
    const dp = Array(len).fill(0)
    dp[0] = nums[0]
    dp[1] = Math.max(nums[0], nums[1])

    for (let i = 2; i < len; i++) {
        dp[i] = Math.max(dp[i - 1], dp[i - 2] + nums[i])

    }
    return dp[len - 1]
};
// const res = rob([1, 2, 3, 1])//4

// 213. 打家劫舍 II
// 环形2个连续的会报警
// 输入：nums = [1,2,3,1] 输出：4

var rob = function (nums) {
    const len = nums.length;
    if (!len) return 0;
    if (len === 1) return nums[0];
    if (len === 2) return Math.max(nums[0], nums[1]);

    const helper = (list) => {
        const len = list.length;
        let a = list[0], b = Math.max(list[0], list[1]);
        for (let i = 2; i < len; i++) {
            const tmp = Math.max(b, a + list[i]);
            a = b;
            b = tmp;
        }
        return b;
    }

    return Math.max(helper(nums.slice(0, len - 1)), helper(nums.slice(1)));
};
// const res = rob([1, 2, 3, 1])
// 337. 打家劫舍 III

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

const rob = (root) => {
    if (!root) return 0

    const helper = (node) => {
        const res = [0, 0]
        if (!node) return res
        const left = helper(node.left)
        const right = helper(node.right)
        res[1] = node.val + left[0] + right[0]//node抢，孩子都不抢
        res[0] = Math.max(left[0], left[1]) + Math.max(right[0], right[1])
        return res
    }
    return Math.max(...helper(root))
}
// 剑指 Offer II 089. 房屋偷盗

// 剑指 Offer II 090. 环形房屋偷盗

// const res = canCompleteCircuit(t1)


// -------------------------------------------speedy---------------------------------------------------
// 贪心
// 134. 加油站
// 输入: gas = [1,2,3,4,5], cost = [3,4,5,1,2] 输出: 3
var canCompleteCircuit = function (gas, cost) {
    const [m, n] = [gas.length, cost.length]
    let res = -1





    return res
};
const res = canCompleteCircuit([1, 2, 3, 4, 5], [3, 4, 5, 1, 2])
console.log(res)


