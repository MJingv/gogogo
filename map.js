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
}
// const res = firstUniqChar("loveleetcode")

//【数组中数字出现的次数 II】
// 在一个数组 nums 中除一个数字只出现一次之外，其他数字都出现了三次。请找出那个只出现一次的数字。
const singleNumber = (nums) => {
    if (!nums.length) return
    const map = new Map()
    nums.map(i => {
        map.set(i, (map.get(i) || 0) + 1)
    })
    for (let item of map) {
        if (item[1] === 1) return item[0]
    }
}
const res = singleNumber([9, 1, 7, 9, 7, 9, 7])
console.log(res)
