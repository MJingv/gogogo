// 回溯算法模版
// result = []
// def backtrack(路径, 选择列表):
// if 满足结束条件:
// result.add(路径)
// return
//
// for 选择 in 选择列表:
// 做选择
// backtrack(路径, 选择列表)
// 撤销选择


// 416. 分割等和子集
// 剑指 Offer II 101. 分割等和子集
// 给你一个 只包含正整数 的 非空 数组 nums 。请你判断是否可以将这个数组分割成两个子集，使得两个子集的元素和相等。
// 输入：nums = [1,5,11,5] 输出：true 解释：数组可以分割成 [1, 5, 5] 和 [11] 。
var canPartition = function (nums) {
    const len = nums.length
    if (!len) return
    let sum = nums.reduce((a, b) => a + b)
    if (sum % 2) return false // sum奇数不能
    sum = sum / 2
    const dp = Array(len + 1).fill(0).map(i => Array(sum + 1).fill(0))
    for (let i = 0; i <= len; i++) {
        dp[i][0] = true
    }
    for (let i = 1; i <= len; i++) {
        for (let j = 1; j <= sum; j++) {
            if (j - nums[i - 1] < 0) {
                dp[i][j] = dp[i - 1][j]
            } else {
                dp[i][j] = dp[i - 1][j] || dp[i - 1][j - nums[i - 1]]
            }
        }
    }

    return dp[len][sum]
};
const canPartition1 = (nums) => {
    const len = nums.length
    if (!len) return
    let sum = nums.reduce((a, b) => a + b)
    if (sum % 2) return false
    sum = sum / 2
    const dp = [true]
    for (let i = 0; i < len; i++) {
        for (let j = sum; j >= 0; j--) {
            if (j >= nums[i]) {
                dp[j] = dp[j] || dp[j - nums[i]]
            }

        }
    }
    return dp[sum] || false
}

// const res = canPartition1([1, 5, 11, 5])
// console.log(res)

// 518. 零钱兑换 II
// 给你一个整数数组 coins 表示不同面额的硬币，另给一个整数 amount 表示总金额。请你计算并返回可以凑成总金额的硬币组合数。如果任何硬币组合都无法凑出总金额，返回 0 。假设每一种面额的硬币有无限个。
// 输入：amount = 5, coins = [1, 2, 5] 输出：4 解释：有四种方式可以凑成总金额： 5=5 5=2+2+1 5=2+1+1+1 5=1+1+1+1+1
var change = function (amount, coins) {
    const len = coins.length
    if (!len) return 0
    const dp = Array(amount + 1).fill(0)
    dp[0] = 1
    for (let i = 0; i < len; i++) {
        for (let j = 1; j <= amount; j++) {
            if (j >= coins[i]) {
                dp[j] = dp[j] + dp[j - coins[i]]
            }
        }
    }
    return dp[amount]
};
// const res = change(5, [1, 2, 5])
// console.log(res)

// 494. 目标和
// 剑指 Offer II 102. 加减的目标值

// 给你一个整数数组 nums 和一个整数 target 。向数组中的每个整数前添加 '+' 或 '-' ，然后串联起所有整数，可以构造一个 表达式
// 输入：nums = [1,1,1,1,1], target = 3 输出：5
var findTargetSumWays = function (nums, target) {
    // 加的和a，减的和b
    // a-b=target
    // a=(t+s)/2

    const len = nums.length
    if (!len) return 0

    const sum = nums.reduce((a, b) => a + b)
    if ((target + sum) % 2) return 0
    const t = (target + sum) / 2

    const dp = Array(sum + 1).fill(0)
    dp[0] = 1
    const back = (t, nums) => {
        for (let i = 0; i < len; i++) {
            for (let j = t; j >= 0; j--) {
                if (j >= nums[i]) {
                    dp[j] = dp[j] + dp[j - nums[i]]
                }
            }
        }
    }

    back(t, nums)
    return dp[t] || 0
};
// const res = findTargetSumWays([1, 1, 1, 1, 1], 3)
// console.log(res)

// 22. 括号生成
// rules
// 1、一个「合法」括号组合的左括号数量一定等于右括号数量，这个很好理解。
// 2、对于一个「合法」的括号字符串组合 p，必然对于任何 0 <= i < len(p) 都有：子串 p[0..i] 中左括号的数量都大于或等于右括号的数量。
var generateParenthesis = function (n) {
    const helper = (left, right, q = [], res) => {
        if (left > right || left < 0 || right < 0) return
        if (left === 0 && right === 0) return res.push(q.join(''))


        // 选择使用一个(
        q.push('(')
        helper(left - 1, right, q, res)
        q.pop() //撤销选择

        // 选择使用一个)
        q.push(')')
        helper(left, right - 1, q, res)
        q.pop() //撤销选择
    }

    let res = []
    helper(n, n, [], res)
    return res
};
// const res = generateParenthesis(3)// ["((()))","(()())","(())()","()(())","()()()"]
// console.log(res)

// 93. 复原IP地址
var restoreIpAddresses = function (s) {
    const len = s.length
    const [path, res] = [[], []]

    const helper = (start = 0) => {
        if (path.length > 4) return;
        if (start === len && path.length === 4) return res.push(path.join('.'))
        for (let end = start; end < len; end++) {
            const cur = s.slice(start, end + 1)
            if (cur.length > 3 || +cur > 255) break
            if (cur.length > 1 && cur[0] === '0') break
            path.push(cur)
            helper(end + 1)
            path.pop()
        }
    }
    helper()
    return res
};
// const res = restoreIpAddresses('25525511135')
// console.log(res)

// 306. 累加数
var isAdditiveNumber = function (num) {
    const len = num.length
    if (len < 3) return false
    if (!Number(num)) return false
    let res = true



    return res
};
// const res = isAdditiveNumber('112358')
// console.log(res)









