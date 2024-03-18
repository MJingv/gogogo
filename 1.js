// 给你一个只包含三种字符的字符串，支持的字符类型分别是 '('、')' 和 '*'。请你检验这个字符串是否为有效字符串，如果是有效字符串返回 true 。
// 有效字符串符合如下规则：
// 任何左括号 '(' 必须有相应的右括号 ')'。
// 任何右括号 ')' 必须有相应的左括号 '(' 。
// 左括号 '(' 必须在对应的右括号之前 ')'。
// '*' 可以被视为单个右括号 ')' ，或单个左括号 '(' ，或一个空字符串。
// 一个空字符串也被视为有效字符串。

const fn = (s = '') => {
    const len = s.length
    if (!len) return true
    let res = true
    const list = []
    for (let i = 0; i < len; i++) {
        if (i === len && list.length) res = false
        if (s[i] === '(') list.push(')')
        if (s[i] === ')' || s[i] === '*') {
            const cur = list.shift()
            if (cur !== s[i] && s[i] !== '*') res = false
        }
    }
    return res
}
// const res = fn('(()*')
// console.log(res)

// 输入：intervals = [[1,3],[2,6],[8,10],[15,18]]
// 输出：[[1,6],[8,10],[15,18]]
const fn = (arr = []) => {
    const len = arr.length
    if (!len) return []
    arr.sort((a, b) => a[0] - b[0])
    const list = [arr[0]]
    let last = arr[0]
    for (let i = 1; i < len; i++) {
        const [a, b] = arr[i]
        if (a <= last[1]) {
            list[list.length - 1][1] = b
        } else {
            list.push(arr[i])
        }
    }
    return list
}
const res = fn([[1, 3], [2, 6], [8, 10], [15, 18]])
console.log(res)