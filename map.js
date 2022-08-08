// 【第一个只出现一次的字符】
// 在字符串 s 中找出第一个只出现一次的字符。如果没有，返回一个单空格。 s 只包含小写字母。
const firstUniqChar = (str) => {
    const map = new Map()
    for (let i = 0; i < str.length; i++) {
        map.set(str[i], (map.get(str[i]) || 0) + 1)
    }
    for (let item of map) {
        if (map.get(item[0]) === 1) {
            return item[0]
        }
    }
    return ' '
x
}
const res = firstUniqChar("loveleetcode")
console.log(res)
