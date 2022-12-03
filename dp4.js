// 322 题「 零钱兑换」
var coinChange = function (coins, amount) {
    if (amount === 0) return 0
    const len = coins.length
    if (!len) return -1
    const dp = Array(amount + 1).fill(Infinity)
    dp[0] = 0

    for (let i = 1; i < amount + 1; i++) {

        for (let j = 0; j < len; j++) {
            if (coins[j] <= i) {
                dp[i] = Math.min(dp[i], dp[i - coins[j]] + 1)
            }
        }
    }


    return dp[amount]

};
// const res = coinChange(coins = [1, 2, 5], amount = 11)
// console.log(res)

// 221. 最大正方形
var maximalSquare = function (matrix) {

    const [m, n] = [matrix.length, matrix[0].length]
    if (!m || !n) return 0
    const dp = Array(m).fill(0).map(i => Array(n).fill(0))
    let max = 0

    for (let i = 0; i < m; i++) {
        dp[i][0] = matrix[i][0]
        if (dp[i][0] === '1') max = 1
    }
    for (let j = 0; j < n; j++) {
        dp[0][j] = matrix[0][j]
        if (dp[0][j] === '1') max = 1

    }

    for (let i = 1; i < m; i++) {
        for (let j = 1; j < n; j++) {
            if (matrix[i][j] === '1') {
                dp[i][j] = Math.min(dp[i - 1][j], dp[i - 1][j - 1], dp[i][j - 1]) + 1 //求最小边长
                max = Math.max(max, dp[i][j])
            }
        }
    }

    return max * max

};
// const res = maximalSquare([["1", "0", "1", "0", "0"], ["1", "0", "1", "1", "1"], ["1", "1", "1", "1", "1"], ["1", "0", "0", "1", "0"]])
// console.log(res)

// 139. 单词拆分
var wordBreak = function (s, wordDict) {
    const len = s.length
    const dp = Array(len + 1).fill(false)
    dp[0] = true

    for (let i = 1; i <= len; i++) {

        for (let j = 0; j < i; j++) {
            const str = s.slice(j, i)
            if (dp[j] && wordDict.includes(str)) {
                dp[i] = true
            }
        }
    }
    return dp[len]
};
// const res = wordBreak(s = "applepenapple", wordDict = ["apple", "pen"])
// console.log(res)

// 97. 交错字符串
var isInterleave = function (s1, s2, s3) {
    const [l1, l2, l3] = [s1.length, s2.length, s3.length]
    if (!l1 && !l2 && !l3) return true
    if (l1 + l2 !== l3) return false
    const memo = Array(l1 + 1).fill(-1).map(i => Array(l2 + 1).fill(-1))


    const dp = (s1, i, s2, j, s3) => {
        const k = i + j
        let res = false
        if (k === l3) return true

        if (memo[i][j] !== -1) return memo[i][j] === 1

        if (i < l1 && s1[i] === s3[k]) {
            res = dp(s1, i + 1, s2, j, s3)
        }
        if (j < l2 && s2[j] === s3[k]) {
            res = res || dp(s1, i, s2, j + 1, s3)
        }
        memo[i][j] = res ? 1 : 0
        return res


    }
    return dp(s1, 0, s2, 0, s3)


};
// const res = isInterleave(s1 = "aabcc", s2 = "dbbca", s3 = "aadbbcbcac")
// console.log(res)


var reverseStr = function (s, k) {
    const list = []
    const len = s.length
    const r = s => s.split('').reverse().join('')
    for (let i = 0; i < len; i += 2 * k) {
        const str = s.slice(i, i + k)
        list.push(r(str))
        list.push(s.slice(i + k, i + 2 * k))
    }
    return list.join('')

};
// const res = reverseStr('abcdefg', 3)//cbadefg
// console.log(res)


// 264. 丑数 II
var nthUglyNumber = function (n) {
    if (n === 1) return n
    let [a, b, c] = [0, 0, 0]
    const dp = []
    dp[0] = 1
    for (let i = 1; i < n; i++) {
        dp[i] = Math.min(dp[a] * 2, dp[b] * 3, dp[c] * 5)
        if (dp[i] === dp[a] * 2) a++
        if (dp[i] === dp[b] * 3) b++
        if (dp[i] === dp[c] * 5) c++
    }

    return dp[n - 1]

};
// [1, 2, 3, 4, 5, 6, 8, 9, 10, 12]
// const res = nthUglyNumber(10)//12
// console.log(res)