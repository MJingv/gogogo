// 力扣第 392 题「 判断子序列」
// 给定字符串 s 和 t ，判断 s 是否为 t 的子序列。
// 输入：s = "abc", t = "ahbgdc" 输出：true
var isSubsequence = function (s, t) {
    const [len1, len2] = [s.length, t.length]
    let [a, b] = [0, 0]
    while (a < len1 && b < len2) {
        const char = s[a]
        if (t[b] === char) {
            a++
            b++
        } else {
            b++
        }
    }
    return a === len1

};
const res = isSubsequence('abc', 'ahbgdc')
console.log(res)