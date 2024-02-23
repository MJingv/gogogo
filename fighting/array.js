// 第 26 题「删除有序数组中的重复项」
var removeDuplicates = function (nums) {
    const len = nums.length
    if (!len) return 0
    let i = 0, j = 1
    while (j < len) {
        if (nums[i] === nums[j]) {
            j++
        } else {
            i++
            nums[i] = nums[j]
        }
    }
    return i + 1
    return nums.slice(0, i + 1)


};
// const res = removeDuplicates([1, 1, 2, 2, 2, 3])


// 力扣第 283 题「移动零」：
var moveZeroes = function (nums) {
    let i = 0, j = 0
    while (j < nums.length) {
        if (nums[j] !== 0) nums[i++] = nums[j]
        j++
    }
    while (i < nums.length) {
        nums[i++] = 0

    }
    return nums

};
const res = moveZeroes([0, 1, 0, 3, 12])
// 力扣第 344 题「反转字符串」
const reverseString = (s = '') => {
    return s.split('').reverse().join('')
}
// const res = reverseString('jehol')
const isPalindrome = (s = '') => {
    return s === s.split('').reverse().join('')
}
// const res = isPalindrome('abba')

const longestPalindrome = (s = '') => {
}
// const res = longestPalindrome('000000009abba999')
console.log(res)