//滑动窗口
// 左开右闭，[0,0) 初始化window里没有数值


// 「剑指 Offer 48. 最长不含重复字符的子字符串」
// 请从字符串中找出一个最长的不包含重复字符的子字符串，计算该最长子字符串的长度。
// 输入: "abcabcbb"
// 输出: 3
// 解释: 因为无重复字符的最长子串是 "abc"，所以其长度为 3。


//子串是连续的部分
//子序列不是连续的部分

const lengthOfLongestSubstring = (s) => {
    let [window, len, max] = [[], s.length, 0]
    for (let i = 0; i < len; i++) {
        const index = window.indexOf(s[i])
        if (index !== -1) {//子串里有重复
            window.splice(0, index + 1)
        }
        window.push(s[i])
        max = Math.max(max, window.length)
    }
    return max
}
// const res = lengthOfLongestSubstring('dvdf')
// console.log(res)


// 718. 最长重复子数组
// 给两个整数数组 nums1 和 nums2 ，返回 两个数组中 公共的 、长度最长的子数组的长度 。
// 输入：nums1 = [1,2,3,2,1], nums2 = [3,2,1,4,7]
// 输出：3
// 解释：长度最长的公共子数组是 [3,2,1] 。
const findLength = (nums1, nums2) => {
    if (!nums2.length || !nums1.length) return 0
    const [l1, l2] = [nums1.length, nums2.length]
    const res = []
    const compareFn = (l1 = [], l2 = []) => {
        if (l1.length !== l2.length) return false
        for (let i = 0; i < l1.length; i++) {
            if (l1[i] !== l2[i]) return false
        }
        return true
    }
    for (let i = 0; i < l1 + l2 - 1; i++) {
        if (i < l1) {
            const a = nums1.slice(0, i + 1)
            const b = nums2.slice(l2 - 1 - i)
            console.log(a, b)
            if (compareFn(a, b)) {
                res.push(a)
            }
        } else {
            const a = nums1.slice(i - l1 + 1)
            const b = nums2.slice(i - l2 + 1)


            //放弃，，，，，
        }
    }
    return res
}
// const res = findLength([1, 2, 3, 2, 1], [3, 2, 1, 4, 7])
// console.log(res)

// 力扣第 76 题「 最小覆盖子串」 hard
// 输入：s = "ADOBECODEBANC", t = "ABC" 输出："BANC"
var minWindow = function (s, t) {
    const len = s.length
    const map = new Map()
    let [left, right, res] = [0, 0, '']
    for (let i = 0; i < t.length; i++) {
        const c = t[i]
        map.set(c, map.get(c) ? map.get(c) + 1 : 1); //target可能会重复
    }
    let mapSize = map.size
    while (right < len) {
        const c = s[right]
        if (map.has(c)) {
            map.set(c, map.get(c) - 1)
            if (map.get(c) === 0) mapSize--
        }
        while (mapSize === 0) {
            const newStr = s.substring(left, right + 1);
            if (!res || res.length > newStr.length) {
                res = newStr
            }
            const c = s[left]
            if (map.has(c)) {
                map.set(c, map.get(c) + 1)
                if (map.get(c) === 1) mapSize++

            }
            left++
        }
        right++
    }
    return res
};
var minWindow2 = function (s, t) {
    //按照模版自己写一遍
    let [left, right, res, len] = [0, 0, '', s.length]
    const map = new Map()
    for (let i = 0; i < t.length; i++) {
        map.set(t[i], (map.get(t[i]) || 0) + 1)
    }
    let mapSize = map.size
    while (right < len) {
        const c1 = s[right]
        right++
        if (map.has(c1)) {
            map.set(c1, map.get(c1) - 1)
            if (map.get(c1) === 0) mapSize--

        }
        while (mapSize === 0) {
            const newStr = s.slice(left, right + 1)
            if (!res || res.length > newStr.length) {
                res = newStr
            }
            const c2 = s[left]
            left++
            if (map.has(c2)) {
                map.set(c2, map.get(c2) + 1)
                if (map.get(c2) === 1) mapSize++
            }
        }
    }
    return res
}


const res = minWindow2('ADOBECODEBANC', 'ABC')
console.log(res)