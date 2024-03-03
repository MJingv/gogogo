// 滑动窗口专项-子串问题

// tmp
// let [left, right] = [0, 0]
// while (left < right && right < length) {
//     window.add(s[right++])
//     while (window need shrink){
//         window.remove(s[left++])
//     }
// }


// 3 无重复字符的最长子串
var lengthOfLongestSubstring = function (s) {
    if (!s) return 0
    let [left, right] = [0, 0]
    const length = s.length, window = []
    let res = 0
    while (right < length) {
        const cur = s[right]
        while (window.includes(cur)) {
            window.shift()
            left++
        }
        window.push(cur)
        right++
        res = Math.max(res, right - left)
    }
    return res
};

const res = lengthOfLongestSubstring('abcabcbb')
console.log(res)