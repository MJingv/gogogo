// 力扣第 344 题「反转字符串」
const reverseString = (s = '') => {
    return s.split('').reverse().join('')
}
// const res = reverseString('jehol')
const isPalindrome = (s = '') => {
    return s === s.split('').reverse().join('')
}
// const res = isPalindrome('abba')

const longestPalindrome = (s='') => {
}
const res = longestPalindrome('000000009abba999')
console.log(res)