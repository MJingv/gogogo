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


// 120. 三角形最小路径和
// 输入：triangle = [[2],[3,4],[6,5,7],[4,1,8,3]] 输出：11
var minimumTotal = function (triangle) {
    const len = triangle.length
    if (len === 1) return triangle[0]
    const dp = Array(len).fill(Infinity).map(i => Array(len).fill(Infinity))
    dp[0][0] = triangle[0][0]
    let min = Infinity
    for (let i = 1; i < len; i++) {
        dp[i][0] = dp[i - 1][0] + triangle[i][0]
    }

    for (let i = 1; i < len; i++) {
        for (let j = 1; j < i + 1; j++) {
            dp[i][j] = Math.min(dp[i - 1][j], dp[i - 1][j - 1]) + triangle[i][j]
            if (i === len - 1) {
                min = Math.min(dp[i][j], min)
            }

        }
    }
    return min

};
// const res = minimumTotal([[2], [3, 4], [6, 5, 7], [4, 1, 8, 3]])
// console.log(res)

// 343. 整数拆分
// 输入: n = 10 输出: 36 解释: 10 = 3 + 3 + 4, 3 × 3 × 4 = 36。
var integerBreak = function (n) {
    const dp = Array(n + 1).fill(0)
    dp[1] = 1
    dp[2] = 1
    for (let i = 3; i <= n; i++) {
        for (let j = i - 1; j >= 1; j--) {
            dp[i] = Math.max(dp[i], dp[i - j] * j, (i - j) * j)
        }

    }
    return dp[n]
};
// const res = integerBreak(10)
// console.log(res)

// 698. 划分为k个相等的子集
// 输入： nums = [4, 3, 2, 3, 5, 2, 1], k = 4 输出： True 说明： 有可能将其分成 4 个子集（5），（1,4），（2,3），（2,3）等于总和。
// 输入: nums = [1,2,3,4], k = 3 输出: false
var canPartitionKSubsets = function (nums, k) {
    const len = nums.length
    const sum = nums.reduce((a, b) => a + b)
    if (sum % k) return false
    const val = sum / k
    const map = new Map()
    nums.map(i => {
        if (map.get(i)) {
            map.set(i, map.get(i) + 1)
        } else {
            map.set(i, 1)
        }
    })
    let n = k

    for (let item of map) {
        if (item[0] > val) return false
        if (item[0] === val) n--
        if (map.get(val - item[0])) {
            map.set(item[0], map.get(item[0]) - 1)
            map.set(val - item[0], map.get(val - item[0]) - 1)
            n--
        }

    }

    return n === 0
};
const res = canPartitionKSubsets([1,1,1,1,2,2,2,2], 2)
console.log(res)