// bad case + stutus + choice + dp
// 递归和2层遍历都可以

// 509. 斐波那契数
var fib = function (n) {
    if (n === 0 || n === 1) return n
    if (n === 2) return 1
    return fib(n - 1) + fib(n - 2)

};
const fib1 = (n) => {
    const dp = [0, 1,]
    for (let i = 2; i <= n; i++) {
        dp[i] = dp[i - 1] + dp[i - 2]
    }
    return dp[n]
}
var fib2 = function (n) {
    if (n === 0 || n === 1) return n
    let [d1, d2] = [0, 1]
    for (let i = 2; i <= n; i++) {
        const tmp = d1 + d2
        d1 = d2
        d2 = tmp
    }
    return d2
};

// 力扣第 322 题「 零钱兑换」
// 剑指 Offer II 103. 最少的硬币数目
// 输入：coins = [1, 2, 5], amount = 11 输出：3 解释：11 = 5 + 5 + 1
// 给你一个整数数组 coins ，表示不同面额的硬币；以及一个整数 amount ，表示总金额。计算并返回可以凑成总金额所需的 最少的硬币个数 。如果没有任何一种硬币组合能组成总金额，返回 -1 。你可以认为每种硬币的数量是无限的。
var coinChange = function (coins, amount) {
    if (amount < 0) return -1
    if (amount === 0) return 0

    const dp = Array(amount + 1).fill(Infinity)
    dp[0] = 0
    for (let i = 1; i <= amount; i++) {
        for (let coin of coins) {
            if (coin <= i) {
                dp[i] = Math.min(dp[i], dp[i - coin] + 1)
            }
        }
    }
    return dp[amount] === Infinity ? -1 : dp[amount]
};
// const res = coinChange([1, 2, 5], 11) ///3
// console.log(res)


// 300. 最长递增子序列
// 输入：nums = [10,9,2,5,3,7,101,18] 输出：4 解释：最长递增子序列是 [2,3,7,101]，因此长度为 4 。
// 子串一定是连续的，而子序列不一定是连续的。
var lengthOfLIS = function (nums) {
    const dp = [] //以nums[i]结尾的最值
    for (let i = 0; i < nums.length; i++) {
        dp[i] = 1
        for (let j = 0; j < i; j++) {
            if (nums[i] > nums[j]) {
                dp[i] = Math.max(dp[i], dp[j] + 1)
            }
        }
    }
    return Math.max(...dp)
};
// const res = lengthOfLIS([10, 9, 2, 5, 3, 7, 101, 18])//4
// console.log(res)

// 354. 俄罗斯套娃信封问题


// 力扣第 931 题「 下降路径最小和」
// 输入：matrix = [[2,1,3],[6,5,4],[7,8,9]] 输出：13
var minFallingPathSum = function (matrix) {
    const len = matrix.length
    const memo = Array(len).fill(Infinity).map(i => Array(len).fill(Infinity))
    const dp = (matrix, row, col) => {
        if (row < 0 || row >= len) return Infinity
        if (col < 0 || col >= len) return Infinity
        if (memo[row][col] !== Infinity) return memo[row][col]
        if (row === 0) return matrix[0][col]
        memo[row][col] = Math.min(dp(matrix, row - 1, col - 1), dp(matrix, row - 1, col), dp(matrix, row - 1, col + 1)) + matrix[row][col]
        return memo[row][col]
    }

    let res = Infinity
    for (let j = 0; j < len; j++) {
        res = Math.min(dp(matrix, len - 1, j), res)
    }

    return res
};
// const res = minFallingPathSum([[2, 1, 3], [6, 5, 4], [7, 8, 9]])//13
// console.log(res)

// 63. 不同路径 II
// 一个机器人位于一个 m x n 网格的左上角 （起始点在下图中标记为 “Start” ）。机器人每次只能向下或者向右移动一步。机器人试图达到网格的右下角（在下图中标记为 “Finish”）。
// 现在考虑网格中有障碍物。那么从左上角到右下角将会有多少条不同的路径？
var uniquePathsWithObstacles = function (obstacleGrid) {
    const len = obstacleGrid.length
    let res = 0
    const dp = (list, i, j) => {
        if (i < 0 || i >= len) return false
        if (j < 0 || j >= len) return false
        if (list[i][j] === 1) return false
        if (list[i - 1][j] === 0 || list[i][j - 1] === 0) return true
        return false
    }

    dp(obstacleGrid, len - 1, len - 1)


};
// const res = uniquePathsWithObstacles([[0, 0, 0], [0, 1, 0], [0, 0, 0]]) //2
// console.log(res)

// 力扣第 72 题「 编辑距离」
var minDistance = function (word1, word2) {
    if (!word1.length) return word2.length
    if (!word2.length) return word1.length
    const memo = Array(word1.length).fill(0).map(i => Array(word2.length).fill(Infinity))
    const dp = (s1, i, s2, j) => {
        if (i < 0) return j + 1
        if (j < 0) return i + 1
        if (memo[i][j] !== Infinity) return memo[i][j]

        if (s1[i] === s2[j]) {
            memo[i][j] = dp(s1, i - 1, s2, j - 1)
        } else {
            memo[i][j] = Math.min(
                dp(s1, i, s2, j - 1) + 1, //add
                dp(s1, i - 1, s2, j) + 1,//del
                dp(s1, i - 1, s2, j - 1) + 1 //rep
            )
        }

        return memo[i][j]
    }
    dp(word1, word1.length - 1, word2, word2.length - 1)
    return memo[word1.length - 1][word2.length - 1]

};

// const res = minDistance('horse', 'ros')
// console.log(res)

// 53. 最大子数组和
// 剑指 Offer 42. 连续子数组的最大和
// 给你一个整数数组 nums ，请你找出一个具有最大和的连续子数组（子数组最少包含一个元素），返回其最大和。
// 输入：nums = [-2,1,-3,4,-1,2,1,-5,4] 输出：6 解释：连续子数组 [4,-1,2,1] 的和最大，为 6 。
var maxSubArray = function (nums) {
    const len = nums.length
    if (!len) return 0
    if (len === 1) return nums[0]
    const dp = Array(len).fill(0)//以i结尾的最大子串和
    dp[0] = nums[0]
    for (let i = 1; i < len; i++) {
        dp[i] = Math.max(dp[i - 1] + nums[i], nums[i])

    }
    return Math.max(...dp)

};
var maxSubArray1 = function (nums) {
    const len = nums.length
    if (len === 0) return 0
    if (len === 1) return nums[0]
    let dp0 = nums[0], dp1 = 0, res = dp0
    for (let i = 1; i < len; i++) {
        dp1 = Math.max(dp0 + nums[i], nums[i])
        dp0 = dp1
        res = Math.max(res, dp0)
    }
    return res

}
// const res = maxSubArray1([-2, 1, -3, 4, -1, 2, 1, -5, 4])
// console.log(res)

// 1143. 最长公共子序列
// 剑指 Offer II 095. 最长公共子序列
// 给定两个字符串 text1 和 text2，返回这两个字符串的最长 公共子序列 的长度。如果不存在 公共子序列 ，返回 0 。

// 输入：text1 = "abcde", text2 = "ace" 输出：3
var longestCommonSubsequence = function (text1, text2) {
    const len1 = text1.length
    const len2 = text2.length
    if (!len1 || !len2) return 0
    const memo = Array(len1).fill(0).map(i => Array(len2).fill(0))
    const dp = (text1, i, text2, j) => {
        if (i >= len1) return 0
        if (j >= len2) return 0
        if (memo[i][j] !== 0) {
            return memo[i][j]
        }
        if (text1[i] === text2[j]) {
            memo[i][j] = dp(text1, i + 1, text2, j + 1) + 1
        } else {
            memo[i][j] = Math.max(
                dp(text1, i, text2, j + 1),
                dp(text1, i + 1, text2, j),
            )
        }
        return memo[i][j]
    }
    dp(text1, 0, text2, 0)
    return memo[0][0]

};
const longestCommonSubsequence1 = (text1, text2) => {
    const len1 = text1.length
    const len2 = text2.length
    if (!len1 || !len2) return 0
    const dp = Array(len1 + 1).fill(0).map(i => Array(len2 + 1).fill(0))

    for (let i = 1; i <= len1; i++) {
        for (let j = 1; j <= len2; j++) {
            if (text1[i - 1] === text2[j - 1]) {
                dp[i][j] = dp[i - 1][j - 1] + 1
            } else {
                dp[i][j] = Math.max(dp[i - 1][j], dp[i][j - 1])
            }
        }
    }
    return dp[len1][len2]
}
// const res = longestCommonSubsequence1('babcde', 'ace')
// console.log(res)


// 583. 两个字符串的删除操作
// 给定两个单词 word1 和 word2 ，返回使得 word1 和 word2 相同所需的最小步数
// 输入: word1 = "sea", word2 = "eat" 输出: 2 解释: 第一步将 "sea" 变为 "ea" ，第二步将 "eat "变为 "ea"
var minDistance = function (word1, word2) {
    const len1 = word1.length
    const len2 = word2.length
    if (!len1) return len2
    if (!len2) return len1
    const memo = Array(len1).fill(Infinity).map(i => Array(len2).fill(Infinity))
    const dp = (word1, i, word2, j) => {
        if (i >= len1) return len2 - j
        if (j >= len2) return len1 - i
        if (memo[i][j] !== Infinity) return memo[i][j]
        if (word1[i] === word2[j]) {
            memo[i][j] = dp(word1, i + 1, word2, j + 1)
        } else {
            memo[i][j] = Math.min(
                dp(word1, i + 1, word2, j) + 1,
                dp(word1, i, word2, j + 1) + 1,
            )
        }
        return memo[i][j]
    }
    dp(word1, 0, word2, 0)
    return memo[0][0]
};
// const res = minDistance('sea', 'eat')
// console.log(res)

// 712. 两个字符串的最小ASCII删除和
// 给定两个字符串s1 和 s2，返回 使两个字符串相等所需删除字符的 ASCII 值的最小和 。
// 输入: s1 = "sea", s2 = "eat" 输出: 231 解释: 在 "sea" 中删除 "s" 并将 "s" 的值(115)加入总和。 在 "eat" 中删除 "t" 并将 116 加入总和。 结束时，两个字符串相等，115 + 116 = 231 就是符合条件的最小和。
var minimumDeleteSum = function (s1, s2) {
    const len1 = s1.length
    const len2 = s2.length
    const memo = Array(len1).fill(Infinity).map(i => Array(len2).fill(Infinity))

    const getSum = (str, m, n) => {
        let sum = 0
        for (let i = m; i < n; i++) {
            sum += str[i].charCodeAt()
        }
        return sum
    }
    const dp = (s1, i, s2, j) => {
        if (i >= len1) return getSum(s2, j, len2)
        if (j >= len2) return getSum(s1, i, len1)

        if (memo[i][j] !== Infinity) return memo[i][j]
        if (s1[i] === s2[j]) {
            memo[i][j] = dp(s1, i + 1, s2, j + 1)
        } else {
            const ci = s1[i].charCodeAt()
            const cj = s2[j].charCodeAt()

            memo[i][j] = Math.min(
                dp(s1, i + 1, s2, j) + ci,
                dp(s1, i, s2, j + 1) + cj,
                // dp(s1, i + 1, s2, j + 1) + ci + cj
            )
        }
        return memo[i][j]

    }
    dp(s1, 0, s2, 0)

    return memo

};
//input_formatted:"delete""leet"
//expected_output:403
// const res = minimumDeleteSum('delete', 'leet')
// console.log(res)

// 1312. 让字符串成为回文串的最少插入次数
// 给你一个字符串 s ，每一次操作你都可以在字符串的任意位置插入任意字符。请你返回让 s 成为回文串的 最少操作次数 。「回文串」是正读和反读都相同的字符串。

// 输入：s = "mbadm" 输出：2 解释：字符串可变为 "mbdadbm" 或者 "mdbabdm" 。
var minInsertions = function (s) {
    const len = s.length
    if (!len) return 0
    if (len === 1) return 0
    const memo = Array(len).fill(Infinity).map(i => Array(len).fill(Infinity))
    // s[i...j]的值
    const dp = (s, i, j) => {
        if (i >= j) return 0
        // if (j < 0 || i >= len) return 0
        if (memo[i][j] !== Infinity) return memo[i][j]
        if (s[i] === s[j]) {
            memo[i][j] = dp(s, i + 1, j - 1)
        } else {
            memo[i][j] = Math.min(dp(s, i + 1, j) + 1, dp(s, i, j - 1) + 1)
        }
        return memo[i][j]
    }
    dp(s, 0, len - 1)
    return memo[0][len - 1]
};

const minInsertions1 = (s) => {
    const len = s.length
    if (!len || len === 1) return 0
    const dp = Array(len).fill(0).map(i => Array(len).fill(0))
    for (let i = len - 1; i >= 0; i--) {
        for (let j = i + 1; j < len; j++) {
            if (s[i] === s[j]) {
                dp[i][j] = dp[i + 1][j - 1]
            } else {
                dp[i][j] = Math.min(dp[i + 1][j], dp[i][j - 1]) + 1
            }
        }
    }
    return dp[0][len - 1]
}
// const res = minInsertions1('mbadm')
// console.log(res)


// 516. 最长回文子序列
// 给你一个字符串 s ，找出其中最长的回文子序列，并返回该序列的长度。
// 输入：s = "bbbab" 输出：4 解释：一个可能的最长回文子序列为 "bbbb" 。

var longestPalindromeSubseq = function (s) {
    const len = s.length
    if (len < 2) return len
    const memo = Array(len).fill(0).map(i => Array(len).fill(0))
    for (let i = 0; i < len; i++) {
        memo[i][i] = 1
    }
    const dp = (s, i, j) => {
        if (i > j) return 0
        if (memo[i][j] !== 0) return memo[i][j]
        if (s[i] === s[j]) {
            memo[i][j] = dp(s, i + 1, j - 1) + 2
        } else {
            memo[i][j] = Math.max(
                dp(s, i, j - 1),
                dp(s, i + 1, j),
                // dp(s, i + 1, j - 1),
            )
        }
        return memo[i][j]
    }
    dp(s, 0, len - 1)
    return memo
};
const res = longestPalindromeSubseq('bbb')
console.log(res)
