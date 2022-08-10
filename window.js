//滑动窗口

// 「剑指 Offer 48. 最长不含重复字符的子字符串」
// 请从字符串中找出一个最长的不包含重复字符的子字符串，计算该最长子字符串的长度。
// 输入: "abcabcbb"
// 输出: 3
// 解释: 因为无重复字符的最长子串是 "abc"，所以其长度为 3。


//子串是连续的部分
//子序列不是连续的部分

const lengthOfLongestSubstring = (s) => {
    if (s.length === 0) return 0
    let [window, len, max] = [[], s.length, 0]
    for (let i = 0; i < len; i++) {
        if (window.includes(s[i])) {
            max = Math.max(max, window.length)
            window = []
            window.push(s[i])

        }else {
            window.push(s[i])
            max = Math.max(max, window.length)
        }
    }
    return max
}
const res = lengthOfLongestSubstring('dvdf')
console.log(res)
