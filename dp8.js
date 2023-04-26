// 5 最长回文子串
// 输入：s = "babad" 输出："bab" 解释："aba" 同样是符合题意的答案。
var longestPalindrome = function (s) {
    const n = s.length
    if (n >= 1) return s
    const isHW = (s) => {
        const len = s.length
        if (len <= 1) return true
        return s.split('').reverse().join('') === s
    }



};
const res = longestPalindrome('babad')
console.log(res)