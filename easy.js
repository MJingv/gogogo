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
// const res = luckyNumbers([[1, 10, 4, 2], [9, 3, 8, 7], [15, 16, 17, 12]])
// console.log(res)

var squareIsWhite = function (coordinates) {
    const l = coordinates.split('')

};
// const res = squareIsWhite('h3')
// console.log(res)

// 13 罗马数字转整数
// I 可以放在 V (5) 和 X (10) 的左边，来表示 4 和 9。
// X 可以放在 L (50) 和 C (100) 的左边，来表示 40 和 90。
// C 可以放在 D (500) 和 M (1000) 的左边，来表示 400 和 900。
// I 1 V 5 X 10 L 50 C 100 D 500 M 1000
var romanToInt = function (s) {
    if (!s) return 0
    const map = new Map()
    map.set('I', 1)
    map.set('V', 5)
    map.set('X', 10)
    map.set('L', 50)
    map.set('C', 100)
    map.set('D', 500)
    map.set('M', 1000)
    map.set('a', 4)
    map.set('b', 9)
    map.set('c', 40)
    map.set('d', 90)
    map.set('e', 40)
    map.set('f', 900)

    s = s.replace('IV', "a").replace('IX', 'b').replace('XL', 'c').replace('XC', 'd').replace('CD', 'e').replace('CM', 'f')

    s = s.split('')
    let res = 0
    s.map(i => {
        res += map.get(i)
    })
    return res
};
// 输入: s = "MCMXCIV" 输出: 1994 解释: M = 1000, CM = 900, XC = 90, IV = 4.
// const res = romanToInt('MCMXCIV')
// console.log(res)

// 58
var lengthOfLastWord = function (s) {
    const list = s.split(' ')
    for (let i = list.length - 1; i >= 0; i--) {
        if (list[i]) {
            return list[i].length
        }
    }

};
// const res = lengthOfLastWord('Hello World')
// console.log(res)

// 67
var addBinary = function (a, b) {
    const a1 = BigInt('0b' + a)
    const b1 = BigInt('0b' + b)
    const sum = a1 + b1
    return sum.toString(2)
};
// const res = addBinary("1010", "1011")
// console.log(res)
// 输入：a = "1010", b = "1011" 输出："10101"

// 191
var hammingWeight = function (n) {
    return n.toString(2).replace(/0+/g, '').length;
};
// const res = hammingWeight('00000000000000000000000000001011')
// console.log(res)

//202
// 「快乐数」 定义为：
// 对于一个正整数，每一次将该数替换为它每个位置上的数字的平方和。
// 然后重复这个过程直到这个数变为 1，也可能是 无限循环 但始终变不到 1。
// 如果这个过程 结果为 1，那么这个数就是快乐数。
// 如果 n 是 快乐数 就返回 true ；不是，则返回 false 。

var isHappy = function (n) {
    const map = {};
    while (n !== 1) {
        if (map[n]) {
            return false
        }
        map[n] = true
        n = String(n).split("").map(item => item ** 2).reduce((acc, cur) => acc + cur)
    }
    return true
};
// const res = isHappy(2)
// console.log(res)

// 342
var isPowerOfFour = function (n) {
    if (n === 1) return true
    if (n % 4) return false

    while (n) {
        n = n / 4
        if (n === 1) return true
    }
    return false
};
// const res = isPowerOfFour(16)
// console.log(res)

var summaryRanges = function (nums) {
    const len = nums.length
    if (!len) return []
    if (len === 1) return [nums[0] + '']
    const res = []
    let path = [nums[0]]
    for (let i = 1; i <= len; i++) {
        if (nums[i - 1] + 1 === nums[i]) {
            path.push(nums[i])
        } else {
            res.push(path)
            path = [nums[i]]
        }
    }
    const list = []
    res.map(i => {
        if (i.length === 1) {
            list.push(String(i[0]))
        } else {
            list.push(`${i[0]}->${i[i.length - 1]}`)
        }

    })
    return list
};
// 输入：nums = [0,1,2,4,5,7] 输出：["0->2","4->5","7"]
// 输入：nums = [0,2,3,4,6,8,9] 输出：["0","2->4","6","8->9"]
// const res = summaryRanges([-1])
// console.log(res)


// 219
// 给你一个整数数组 nums 和一个整数 k ，判断数组中是否存在两个 不同的索引 i 和 j ，满足 nums[i] == nums[j] 且 abs(i - j) <= k 。如果存在，返回 true ；否则，返回 false 。
var containsNearbyDuplicate = function (nums, k) {
    const len = nums.length
    if (!k) return false
    const set = new Set([...nums])
    const size = set.size
    if (size === len) return false
    let res = false
    for (let i = 0; i < len; i++) {
        for (let j = i + 1; j < len; j++) {
            if (nums[i] === nums[j]) {
                const diff = Math.abs(j - i)
                if (diff <= k) return res = true
            }
        }
    }
    return res

};
// const res = containsNearbyDuplicate([99, 99], 2)
// console.log(res)

//326
var isPowerOfThree = function (n) {
    if (!n) return false
    if (n === 1) return true
    if (n % 3) return false

    while (n) {
        n = n / 3
        if (n === 1) return true
    }
    return false

};
// const res = isPowerOfThree(9)
// console.log(res)

// 387
var firstUniqChar = function (s) {
    const len = s.length
    s = s.split('')
    const map = new Map()
    let res = 0
    for (let i = 0; i < len; i++) {
        if (!map.has(s[i])) {
            map.set(s[i], 1)
        } else {
            map.set(s[i], map.get(s[i]) + 1)
        }
    }
    for (let i = 0; i < len; i++) {
        if (map.get(s[i]) === 1) return res = i
    }

    return res
};
// 输入: s = "loveleetcode" 输出: 2
// const res = firstUniqChar('loveleetcode')
// console.log(res)


var thirdMax = function (nums) {
    nums.sort((a, b) => b - a)
    const len = nums.length
    const set = new Set([...nums])
    if (len < 3 || set.size < 3) return nums[0]
    let list = [nums[0]]
    for (let i = 1; i < len; i++) {
        if (nums[i] !== list[list.length - 1]) {
            list.push(nums[i])
        }
        if (list.length === 3) return list[list.length - 1]

    }
    return -1

};
// const res = thirdMax([1, 1, 2])
// console.log(res)

var countSegments = function (s) {
    if (Number(s) === 0) return 0
    s = s.split(' ')
    let res = 0
    for (let i = 0; i < s.length; i++) {
        if (Number(s[i]) !== 0) res++
    }
    return res
};
// const res = countSegments('Of all the gin joints in all the towns in all the world,   ')
// console.log(res)

//409
// 给定一个包含大写字母和小写字母的字符串 s ，返回 通过这些字母构造成的 最长的回文串 。
var longestPalindrome = function (s) {
    if (!s) return 0
    const len = s.length
    if (len === 1) return 1
    const map = new Map()
    let res = 0
    for (let i = 0; i < len; i++) {
        map.set(s[i], (map.get(s[i]) || 0) + 1)
    }
    let k = 0
    map.forEach((val, key) => {
        if (val % 2) {
            res += val === 1 ? 0 : val - 1
            k++
        } else {
            res += val
        }
    })

    return k ? res + 1 : res
};
// const res = longestPalindrome('abccccdd')
// console.log(res)

// 459
// 输入: s = "abcabcabcabc" 输出: true
var repeatedSubstringPattern = function (s) {
    // 没过 不理解
    const len = s.length
    if (len === 1) return true
    const map = new Map()
    let res = true
    for (let i = 0; i < len; i++) {
        map.set(s[i], (map.get(s[i]) || 0) + 1)
    }
    map.forEach((val, key) => {
        if (val % 2) res = false
    })
    return res
};
// const res = repeatedSubstringPattern('abcabcabcabc')
// console.log(res)

// 520
var detectCapitalUse = function (word) {
    const len = word.length
    let a = 0
    let b = 0
    let firstBig = false
    // 大写字母A-Z对应的ASCII码值是65-90
    // 小写字母a-z对应的ASCII码值是97-122
    for (let i = 0; i < len; i++) {
        const v = word[i]
        const n = v.charCodeAt()
        if (n >= 65 && n <= 90) {
            if (i === 0) firstBig = true
            a++
        }
        if (n >= 97 && n <= 122) b++
    }
    const res = a === len || b === len || a === 1 && firstBig
    return res

};
// const res = detectCapitalUse("FlaG")
// console.log(res)

//557
var reverseWords = function (s) {
    const list = s.split(' ')
    const len = list.length
    let res = ''
    for (let i = 0; i < len; i++) {
        const r = list[i].split('').reverse().join('')
        res += r + (i === len - 1 ? '' : ' ')

    }
    return res

};
// const res = reverseWords("Let's take LeetCode contest")
// console.log(res)

// 485
var findMaxConsecutiveOnes = function (nums) {
    const len = nums.length
    if (len === 1) return nums[0] === 1 ? true : false
    if (!nums.includes(1)) return false
    let res = 0
    nums = nums.join('').split('0')
    nums.map(i => res = Math.max(res, i.length))

    return res
};
const findMaxConsecutiveOnes1 = (nums) => {
    const len = nums.length
    let n = 0
    let res = 0
    for (let i = 0; i < len; i++) {
        if (nums[i] === 1) {
            n++
            res = Math.max(res, n)
        } else {
            n = 0
        }
    }
    return res
}
// const res = findMaxConsecutiveOnes1([1, 1, 0, 1, 1, 1])
// console.log(res)
// 输入：nums = [1,1,0,1,1,1] 输出：3


//448
// 给你一个含 n 个整数的数组 nums ，其中 nums[i] 在区间 [1, n] 内。请你找出所有在 [1, n] 范围内但没有出现在 nums 中的数字，并以数组的形式返回结果。
var findDisappearedNumbers = function (nums) {
    const n = nums.length
    const map = new Map()
    const res = []
    Array(n).fill(0).map((i, index) => map.set(index + 1, false))
    nums.map(i => {
        map.set(i, true)
    })
    map.forEach((val, key) => {
        if (!val) {
            res.push(key)
        }
    })
    return res
};
var findDisappearedNumbers1 = function (nums) {
    const n = nums.length
    const set = new Set(nums)
    const res = []
    for (let i = 1; i <= n; i++) {
        if (!set.has(i)) res.push(i)
    }
    return res
}
// const res = findDisappearedNumbers1([4, 3, 2, 7, 8, 2, 3, 1])
// console.log(res)

// 345
// 元音字母包括 'a'、'e'、'i'、'o'、'u'，且可能以大小写两种形式出现不止一次。
var reverseVowels = function (s) {
    const len = s.length
    let [i, j] = [0, len - 1]
    s = s.split('')
    const swap = (array, a, b) => [array[a], array[b]] = [array[b], array[a]]

    while (i < j) {
        while (!(/a|e|i|o|u|A|E|I|O|U/g).test(s[i])) i++
        while (!(/a|e|i|o|u|A|E|I|O|U/g).test(s[j])) j--
        if (i >= j) return s.join('')
        swap(s, i, j)
        i++
        j--
    }
    return s.join('')

};
// const res = reverseVowels('leetcode')
// console.log(res)

// 205
// 输入：s = "egg", t = "add" 输出：true
var isIsomorphic = function (s, t) {
    const sl = s.length
    const tl = t.length
    if (sl !== tl) return false
    const map1 = new Map()
    const map2 = new Map()
    for (let i = 0; i < sl; i++) {
        if (map1.has(s[i]) || map2.has(t[i])) {
            if (map1.get(s[i]) !== map2.get(t[i])) return false
        }
        map1.set(s[i], i)
        map2.set(t[i], i)
    }
    return true

};
// const res = isIsomorphic('egg', 'add')
// console.log(res)

// 832
// 输入：image = [[1,1,0],[1,0,1],[0,0,0]] 输出：[[1,0,0],[0,1,0],[1,1,1]]
var flipAndInvertImage = function (image) {
    image = image.map(i => i.reverse())
    image = image.map(i => i.map(j => j === 0 ? 1 : 0))
    return image
};
// const res = flipAndInvertImage([
//     [1, 1, 0],
//     [1, 0, 1],
//     [0, 0, 0]]
// )
// console.log(res)

// 917
// 输入：s = "a-bC-dEf-ghIj"
var reverseOnlyLetters = function (s) {
    const len = s.length
    s = s.split('')
    let [i, j] = [0, len - 1]
    const swap = (list, a, b) => [list[a], list[b]] = [list[b], list[a]]
    while (i < j) {
        while ((/[^a-zA-Z]/).test(s[i])) i++
        while ((/[^a-zA-Z]/).test(s[j])) j--
        if (i > j) return s.join('')
        swap(s, i, j)
        i++
        j--
    }
    return s.join('')

};
// 输入：s = "Test1ng-Leet=code-Q!" 输出："Qedo1ct-eeLg=ntse-T!"
// const res = reverseOnlyLetters("Test1ng-Leet=code-Q!")
// console.log(res)


// lcp 66 最小展台数量
// demand[i][j] 表示第 i 天展览时第 j 个展台的类型。
// 请返回后勤部需要准备的 最小 展台数量。
// 同一展台在不同天中可以重复使用。
var minNumBooths = function (demand) {
    const len = demand.length
    if (!len) return ''
    const map = new Map()
    demand.map(i => {
        let tmp = new Map()
        i.split('').map(j => {
            tmp.set(j, (tmp.get(j) || 0) + 1)

        })
        i.split('').map(j => {
            const sum = Math.max(map.get(j) || 0, tmp.get(j))
            map.set(j, sum)
        })
    })
    let res = 0
    for (let item of map.values()) {
        res += item

    }
    return res
};
const res = minNumBooths(["acd", "bed", "accd"])
console.log(res)