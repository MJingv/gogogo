// dp
// base case、状态、选择、dp函数

// # 自顶向下递归的动态规划
// def dp(状态1, 状态2, ...):
// for 选择 in 所有可能的选择:
// # 此时的状态已经因为做了选择而改变
// result = 求最值(result, dp(状态1, 状态2, ...))
// return result
//
// # 自底向上迭代的动态规划
// # 初始化 base case
// dp[0][0][...] = base case
// # 进行状态转移
// for 状态1 in 状态1的所有取值：
// for 状态2 in 状态2的所有取值：
// for ...
// dp[状态1][状态2][...] = 求最值(选择1，选择2...)

// 力扣第 322 题「零钱兑换」
// 剑指 Offer II 103. 最少的硬币数目
// 输入：coins = [1, 2, 5], amount = 11 输出：3 解释：11 = 5 + 5 + 1
var coinChange = function (coins, amount) {
    const len = coins.length
    if (!len) return 0

    const dp = Array(amount + 1).fill(Infinity)
    dp[0] = 0
    for (let i = 1; i <= amount; i++) {
        for (let j = 0; j < len; j++) {
            if (coins[j] <= i) dp[i] = Math.min(dp[i], dp[i - coins[j]] + 1)
        }

    }
    return dp[amount] === Infinity ? -1 : dp[amount]
};

// const res = coinChange([1, 2, 5], 11)


// 509. 斐波那契数

var fib = function (n) {
    if (n === 1 || n === 0) return n
    let x = 0, y = 1, res = 0
    for (let i = 2; i <= n; i++) {
        res = x + y
        x = y
        y = res
    }

    return res
};
// const res = fib(4)

// 300. 最长递增子序列
var lengthOfLIS = function (nums) {
    const len = nums.length
    if (!len) return 0
    const dp = Array(len).fill(1) // 以我结尾的最长递增子序列
    for (let i = 1; i < len; i++) {
        for (let j = 0; j < i; j++) {
            if (nums[j] < nums[i]) dp[i] = Math.max(dp[i], dp[j] + 1)
        }
    }
    return Math.max(...dp)
};
// const res = lengthOfLIS([10, 9, 2, 5, 3, 7, 101, 18])


// 力扣第 931 题「下降路径最小和」
var minFallingPathSum = function (matrix) {
    const x = matrix.length
    if (!x) return 0
    const y = matrix[0].length
    const dp = []
    for (let i = 0; i < x; i++) {
        dp[i] = Array(y).fill(Infinity)
        for (let j = 0; j < y; j++) {
            dp[0][j] = matrix[0][j]
        }
    }
    for (let i = 1; i < x; i++) {
        for (let j = 0; j < y; j++) {
            dp[i][j] = matrix[i][j] + Math.min(dp[i - 1][j - 1] || Infinity, dp[i - 1][j], dp[i - 1][j + 1] || Infinity)
        }
    }
    return Math.min(...dp[x - 1])

};
// const res = minFallingPathSum([[-19, 57], [-40, -5]])


// 115
// s的角度
var numDistinct = function (s, t) {
    const m = s.length, n = t.length;
    const dp = Array(m + 1).fill(0).map(() => Array(n + 1).fill(0));
    for (let i = 0; i <= m; i++) {
        dp[i][0] = 1;
    }
    for (let i = 1; i <= m; i++) {
        for (let j = 1; j <= n; j++) {
            if (s[i - 1] === t[j - 1]) {
                dp[i][j] = dp[i - 1][j - 1] + dp[i - 1][j];
            } else {
                dp[i][j] = dp[i - 1][j];
            }
        }
    }
    return dp[m][n];
};
// const res = numDistinct('babgbag', 'bag')
// 力扣第 139 题「单词拆分」
var wordBreak = function (s, wordDict) {
    const m = s.length, n = wordDict.length
    const dp = Array(m + 1).fill(false)
    dp[0] = true
    for (let i = 1; i <= m; i++) {
        for (let j = 0; j < i; j++) {
            const tmp = s.slice(j, i)
            if (dp[j] && wordDict.includes(tmp)) dp[i] = true
        }
    }
    return dp[m]

};
// const res = wordBreak("leetcode", ["leet", "code"])


// 力扣第 53 题「最大子序和」
var maxSubArray = function (nums) {
    const len = nums.length
    if (len === 1) return nums[0]
    const dp = Array(len).fill(0)
    dp[0] = nums[0]
    for (let i = 1; i < len; i++) {
        dp[i] = Math.max(dp[i - 1] + nums[i], nums[i])
    }
    return Math.max(...dp)
};
const maxSubArray1 = (nums) => {
    const len = nums.length
    if (!len) return 0
    if (len === 1) return nums[0]
    let res = 0
    let a = nums[0], b = 0
    for (let i = 1; i < len; i++) {
        b = Math.max(nums[i], a + nums[i])
        a = b
        res = Math.max(res, a)
    }
    return res
}
// const res = maxSubArray1([-2, 1, -3, 4, -1, 2, 1, -5, 4])
// 输入：nums = [-2,1,-3,4,-1,2,1,-5,4] 输出：6 解释：连续子数组 [4,-1,2,1] 的和最大，为 6 。


// 1143. 最长公共子序列
var longestCommonSubsequence = function (text1, text2) {
    const [m, n] = [text1.length, text2.length]
    if (!m || !n) return 0
    let res = 0
    const dp = Array(m).fill(0).map(() => Array(n).fill(0))
    dp[0][0] = text1[0] === text2[0] ? 1 : 0
    for (let i = 1; i < m; i++) {
        dp[i][0] = Math.max(dp[i - 1][0], text1[i] === text2[0] ? 1 : 0)
    }
    for (let j = 1; j < n; j++) {
        dp[0][j] = Math.max(dp[0][j - 1], text1[0] === text2[j] ? 1 : 0)
    }

    for (let i = 1; i < m; i++) {
        for (let j = 1; j < n; j++) {
            if (text1[i] === text2[j]) {
                dp[i][j] = dp[i - 1][j - 1] + 1
            } else {
                dp[i][j] = Math.max(dp[i - 1][j], dp[i][j - 1])
            }

        }
    }
    return dp[m - 1][n - 1]
};
// 输入：text1 = "abcde", text2 = "ace" 输出：3 解释：最长公共子序列是 "ace" ，它的长度为 3 。
const res = longestCommonSubsequence('abcde', 'ace')
console.log(res)