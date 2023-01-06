// 17. 电话号码的字母组合
// 368. 最大整除子集
// 491. 递增子序列


// 剑指 Offer 38. 字符串的排列
// 输入：s = "abc" 输出：["abc","acb","bac","bca","cab","cba"]
var permutation = function (s) {
    const len = s.length
    s = s.split('')
    s = s.sort()
    const [path, res] = [[], []]
    const helper = (used = {}) => {
        if (path.length === len) res.push(path.join(''))
        for (let i = 0; i < len; i++) {
            if (used[i]) continue
            if (i > 0 && s[i] === s[i - 1] && !used[i - 1]) continue
            path.push(s[i])
            used[i] = true
            helper(used)
            used[i] = false
            path.pop()
        }
    }
    helper()
    return res

};
const res = permutation('aab')
console.log(res)


// 剑指 Offer II 079. 所有子集


// 剑指 Offer II 080. 含有 k 个元素的组合
// 剑指 Offer II 081. 允许重复选择元素的组合
// 剑指 Offer II 083. 没有重复元素集合的全排列