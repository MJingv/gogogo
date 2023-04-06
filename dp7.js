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
    // timeout
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
const res = knightDialer(2)//20
console.log(res)

// 72. Edit Distance
var minDistance = function (word1, word2) {

};
// const res = minDistance()
// console.log(res)
