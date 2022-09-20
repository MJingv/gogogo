// 【调整数组顺序使奇数位于偶数前面】
// 输入一个整数数组，实现一个函数来调整该数组中数字的顺序，使得所有奇数在数组的前半部分，所有偶数在数组的后半部分。

const swap = (a, b, list) => {
    [list[a], list[b]] = [list[b], list[a]]
    return list
}

//双指针+交换
const exchange = (list = []) => {
    if (!list.length) return []
    let [left, right] = [0, list.length - 1]
    while (left < right) {
        while (list[left] & 1) left++
        while (!(list[right] & 1)) right--
        if (left < right) {
            [list[left], list[right]] = [list[right], list[left]]
        }
    }
    return list
}

// const res = exchange([1, 2, 3, 4, 5])

//【和为s的两个数字】
// 输入一个递增排序的数组和一个数字s，在数组中查找两个数，使得它们的和正好是s。如果有多对数字的和等于s，则输出任意一对即可。
// 输入：nums = [2,7,11,15], target = 9
// 输出：[2,7] 或者 [7,2]
const twoSum = (nums = [], target = -1) => {
    if (!nums.length) return []
    let [left, right] = [0, nums.length - 1]
    while (left < right) {
        const sum = nums[left] + nums[right]
        if (sum === target) return [nums[left], nums[right]]
        if (sum > target) {
            right--
        } else {
            left++
        }
    }
    return []
};

// const res = twoSum([0, 2, 7, 11, 15], 9)


// 【和为s的连续正数序列】
// 输入一个正整数 target ，输出所有和为 target 的连续正整数序列（至少含有两个数）。序列内的数字由小到大排列，不同序列按照首个数字从小到大排列。

// 正整数从1开始，连续正整数序列（滑动窗口）
const findContinuousSequence = (target) => {
    if (target <= 0) return []
    let [res, window, sum] = [[], [1, 2], 3]
    while (window[0] <= target >> 1) {
        if (target === sum) {
            res.push([...window])
            sum -= window.shift()//老忘，记住
        } else if (target > sum) {//右+1
            const nextVal = window[window.length - 1] + 1
            window.push(nextVal)
            sum += nextVal
        } else {//左-1
            sum -= window.shift()
        }
    }
    return res
}

// const res = findContinuousSequence(15)
// console.log(res)


// 5. 最长回文子串
// 给你一个字符串 s，找到 s 中最长的回文子串。
// 输入：s = "babad"
// 输出："bab"
// 解释："aba" 同样是符合题意的答案。
const longestPalindrome = (s) => {
    if (!s) return
    let max = ''
    const helper = (l, r) => {
        while (l >= 0 && r < s.length && s[l] === s[r]) {
            l--
            r++
        }
        const str = s.slice(l + 1, r + 1 - 1) //符合条件的最后指针多执行了一次
        max = str.length > max.length ? str : max
    }
    for (let i = 0; i < s.length; i++) {
        helper(i, i)
        helper(i, i + 1)
    }
    return max
};
// const res = longestPalindrome("cbbd")
// console.log(res)


// 田忌赛马 870. 优势洗牌
// 输入：nums1 = [2,7,11,15], nums2 = [1,10,4,11] 输出：[2,11,7,15]
var advantageCount = function (nums1, nums2) {

};
const res = advantageCount([2, 7, 11, 15], [1, 10, 4, 11])
console.log(res)