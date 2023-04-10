// 139. 单词拆分
var wordBreak = function (s, wordDict) {
    const [n, len] = [s.length, wordDict.length]
    const dp = Array(n + 1).fill(false)
    dp[0] = true
    for (let i = 1; i <= n; i++) {
        for (let j = 0; j < i; j++) {
            const tmp = s.slice(j, i)
            if (dp[j] && wordDict.includes(tmp)) dp[i] = true
        }
    }
    return dp[n]
};
// const res = wordBreak('catsandog', ["cats", "dog", "sand", "and", "cat"])
// console.log(res)

// 935 骑士拨号器
// 你可以将骑士放置在任何数字单元格上，然后你应该执行 n - 1 次移动来获得长度为 n 的号码。所有的跳跃应该是有效的骑士跳跃。
var knightDialer = function (n) {
    // backtrace-timeout
    const mat = [
        [1, 2, 3],
        [4, 5, 6],
        [7, 8, 9],
        [-1, 0, -1]
    ]
    const ad = [[-2, -1], [-2, 1], [-1, -2], [-1, 2], [1, -2], [1, 2], [2, -1], [2, 1]]
    const res = new Set()
    const path = []
    const helper = (left, i, j) => {
        if (path.length === n) res.add(path.slice().join(''))
        if (left === 0) return res
        if (i >= 0 && i <= 3 && j >= 0 && j <= 2 && mat[i][j] >= 0) {
            ad.map(item => {
                const [p, q] = item
                path.push(mat[i][j])
                helper(left - 1, i + p, j + q)
                path.pop()
            })
        }
    }
    for (let i = 0; i <= 3; i++) {
        for (let j = 0; j <= 2; j++) {
            helper(n, i, j)
        }
    }
    return res.size
};
// [04, 06, 16, 18, 27, 29, 34, 38, 40, 43, 49, 60, 61, 67, 72, 76, 81, 83, 92, 94]

// 你可以将骑士放置在任何数字单元格上，然后你应该执行 n - 1 次移动来获得长度为 n 的号码。所有的跳跃应该是有效的骑士跳跃。
var knightDialer1 = function (n) {
    const dp = Array(10).fill(1)
    const MOD = 1000000007
    const tmp = []
    for (let i = 0; i < n - 1; i++) {
        tmp[0] = (dp[4] + dp[6]) % MOD
        tmp[1] = (dp[6] + dp[8]) % MOD
        tmp[2] = (dp[7] + dp[9]) % MOD
        tmp[3] = (dp[4] + dp[8]) % MOD
        tmp[4] = (dp[3] + dp[9] + dp[0]) % MOD
        tmp[5] = 0
        tmp[6] = (dp[1] + dp[7] + dp[0]) % MOD
        tmp[7] = (dp[2] + dp[6]) % MOD
        tmp[8] = (dp[1] + dp[3]) % MOD
        tmp[9] = (dp[4] + dp[2]) % MOD
        for (let j = 0; j < 10; j++) {
            dp[j] = tmp[j]
        }
    }
    const res = dp.reduce((i, p) => (i + p) % MOD)
    return res
}
// const res = knightDialer1(2)//20
// console.log(res)

// 72. Edit Distance
// 给你两个单词 word1 和 word2， 请返回将 word1 转换成 word2 所使用的最少操作数 。
// 插入一个字符,删除一个字符,替换一个字符
var minDistance = function (word1, word2) {
    // 递归 timeout
    const [m, n] = [word1.length, word2.length]
    const helper = (i, j) => {
        if (i === -1) return j + 1
        if (j === -1) return i + 1
        if (word1[i] === word2[j]) {
            return helper(i - 1, j - 1)
        }

        return Math.min(
            helper(i - 1, j),
            helper(i, j - 1),
            helper(i - 1, j - 1)
        ) + 1
    }
    return helper(m - 1, n - 1)
};
var minDistance1 = function (word1, word2) {
    const [m, n] = [word1.length, word2.length]
    const memo = Array(m).fill(0).map(i => Array(n).fill(0))
    const helper = (i, j) => {
        if (i === -1) return j + 1
        if (j === -1) return i + 1
        if (memo[i][j]) return memo[i][j]
        if (word1[i] === word2[j]) {
            memo[i][j] = helper(i - 1, j - 1)
            return memo[i][j]
        }
        memo[i][j] = Math.min(
            helper(i - 1, j),
            helper(i, j - 1),
            helper(i - 1, j - 1)
        ) + 1
        return memo[i][j]
    }
    return helper(m - 1, n - 1)
}
var minDistance1 = function (word1, word2) {
    // dp
    const [m, n] = [word1.length, word2.length]
    const dp = Array(m + 1).fill(0).map(i => Array(n + 1).fill(0))
    for (let i = 0; i <= m; i++) {
        dp[i][0] = i
    }
    for (let j = 0; j <= n; j++) {
        dp[0][j] = j
    }
    for (let i = 1; i <= m; i++) {
        for (let j = 1; j <= n; j++) {
            if (word1[i - 1] === word2[j - 1]) {
                dp[i][j] = dp[i - 1][j - 1]
            } else {
                dp[i][j] = Math.min(dp[i - 1][j - 1], dp[i - 1][j], dp[i][j - 1]) + 1
            }
        }
    }

    return dp[m][n]
}
// horse -> rorse (将 'h' 替换为 'r') rorse -> rose (删除 'r') rose -> ros (删除 'e')

// const res = minDistance1("horse", "ros")
// console.log(res)

// 97. 交错字符串
var isInterleave = function (s1, s2, s3) {
    const [l1, l2, l3] = [s1.length, s2.length, s3.length]
    const helper = (i, j, k) => {
        console.log(i, j, k)
        if (i > l1) return s2.slice(j, l2) === s3.slice(k, l3)
        if (j === l2) return s1.slice(i, l1) === s3.slice(k, l3)
        if (s1[i] === s3[k]) {
            helper(i + 1, j, k + 1)
        }
        if (s2[j] === s3[k]) {
            helper(i, j + 1, k + 1)
        }
    }
    return helper(0, 0, 0)
};
// 输入：s1 = "aabcc", s2 = "dbbca", s3 = "aadbbcbcac"
const res = isInterleave('aabcc', 'dbbca', 'aadbbcbcac')
console.log(res)