// LCP 06 拿硬币
// 输入：[4,2,1]输出：4
var minCount = function (coins) {
    const len = coins.length
    let res = 0
    coins.map(i => {
        if (i > 0) {
            if (i <= 2) {
                res++
            } else {
                const n = Math.floor(i / 2)
                res += n
                if (i % 2) res++
            }
        }
    })
    return res
};
// const res = minCount([4, 2, 1])
// console.log(res)

// 441 排列硬币
var arrangeCoins = function (n) {
    if (n === 1) return 1
    let sum = 0
    for (let i = 1; i <= n; i++) {
        sum += i
        if (n === sum) return i
        if (n < sum) return i - 1
    }
};
// const res = arrangeCoins(3)
// console.log(res)

var addDigits = function (num) {
    if (num === 0) return 0

    while (num > 9) {
        const l = num.toString().split('')
        console.log(l)
        num = l.reduce((a, b) => Number(a) + Number(b))
    }
    return num

};

// const res = addDigits(38)
// console.log(res)

var findTheDifference = function (s, t) {
    if (!s) return t
    if (!t) return s
    let i = 0
    let s1 = 0, s2 = 0
    while (i < t.length) {
        if (s[i]) s1 += s.charCodeAt(i)
        if (t[i]) s2 += t.charCodeAt(i)
        i++
    }
    return String.fromCharCode(s2 - s1)
};

// const res = findTheDifference("abcd", "abcde")
// console.log(res)


// 1365. 有多少小于当前数字的数字
// 输入：nums = [8,1,2,2,3] 输出：[4,0,1,1,3]
var smallerNumbersThanCurrent = function (nums) {
    const len = nums.length
    const sort = nums.slice().sort((a, b) => a - b)
    let res = []
    for (let i = 0; i < len; i++) {
        const index = sort.indexOf(nums[i])
        const val = index > -1 ? index : 0
        res[i] = val
    }
    return res

};
// const res = smallerNumbersThanCurrent([8, 1, 2, 2, 3])
// console.log(res)


// 输入：matrix = [[3,7,8],[9,11,13],[15,16,17]] 输出：[15]
var luckyNumbers = function (matrix) {
    const [m, n] = [matrix.length, matrix[0].length]
    const [row, col] = [Array(m).fill(Infinity), Array(n).fill(0)]
    for (let i = 0; i < m; i++) {
        for (let j = 0; j < n; j++) {
            row[i] = Math.min(matrix[i][j], row[i])
            col[j] = Math.max(matrix[i][j], col[j])
        }
    }
    const res = []
    row.map(i => {
        col.map(j => {
            if (i === j) res.push(i)
        })
    })


    return res
};
const res = luckyNumbers([[1, 10, 4, 2], [9, 3, 8, 7], [15, 16, 17, 12]])
console.log(res)