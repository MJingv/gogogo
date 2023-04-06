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

};
// [04, 06, 16, 18, 27, 29, 34, 38, 40, 43, 49, 60, 61, 67, 72, 76, 81, 83, 92, 94]
const res = knightDialer(2)//20
console.log(res)

// 72. Edit Distance
var minDistance = function (word1, word2) {

};
// const res = minDistance()
// console.log(res)
