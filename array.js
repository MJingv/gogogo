// https://labuladong.github.io/algo/2/20/23/
// 数组相关的双指针算法(快慢指针)
// 删除有序数组中的重复项
const removeDuplicates = (nums) => {
    const len = nums.length
    if (!len) return []
    let [fast, slow] = [0, 0]
    while (fast < len) {
        if (nums[fast] === nums[slow]) {
            fast++
        } else {
            slow++
            nums[slow] = nums[fast]
        }
    }
    return slow + 1
};
// const res = removeDuplicates([1, 2, 3, 4, 4, 5, 6, 6, 7])
// console.log(res)

// 第 27 题「 移除元素」
// 输入：nums = [0,1,2,2,3,0,4,2], val = 2 输出：5, nums = [0,1,4,0,3]
const removeElement = function (nums, val) {
    const len = nums.length
    if (!len) return
    let [fast, slow] = [0, 0]
    while (fast < len) {
        if (nums[fast] !== val) {
            nums[slow] = nums[fast]
            slow++
        }
        fast++
    }
    return nums
};
// const res = removeElement([3, 2, 2, 3], 2)
// console.log(res)

// 第 283 题「 移动零」
// 给定一个数组 nums，编写一个函数将所有 0 移动到数组的末尾，同时保持非零元素的相对顺序。
// 请注意 ，必须在不复制数组的情况下原地对数组进行操作。
// 示例 1:
// 输入: nums = [0,1,0,3,12]
// 输出:[1,3,12,0,0]
const moveZeroes = (nums) => {
    // 记录非0个数，其他补充0
    const len = nums.length
    let j = 0
    for (let i = 0; i < len; i++) {
        if (nums[i] !== 0) {
            nums[j] = nums[i]
            j++
        }
    }
    for (let i = j; i < len; i++) {
        nums[i] = 0
    }
    return nums
};
const moveZeroes2 = (nums) => {
    const len = nums.length
    if (!len) return []
    let j = 0
    for (let i = 0; i < len; i++) {
        if (nums[i] !== 0) {
            const tmp = nums[i]
            nums[i] = nums[j]
            nums[j++] = tmp
        }
    }
    return nums
}

// const res = moveZeroes2([0, 1, 0, 3, 12])
// console.log(res)

// 数组相关的双指针算法(左右指针)

//二分查找
const two = (nums, target) => {
    const len = nums.length
    if (!len) return
    let [left, right] = [0, len - 1]

    while (left <= right) {
        const mid = (right + left) >> 2
        if (nums[mid] === target) {
            return mid
        }
        if (nums[mid] > target) {
            right = mid - 1
        }
        if (nums[mid] < target) {
            left = mid + 1
        }
    }
    return -1
}
// const res = two([0, 1, 3, 7, 10, 100, 101, 102, 103], -5)
// console.log(res)

// 力扣第 167 题「 两数之和 II」
// 输入：numbers = [-1,0], target = -1 输出：[1,2] 解释：-1 与 0 之和等于目标数 -1 。因此 index1 = 1, index2 = 2 。返回 [1, 2] 。
const twoSum = (numbers, target) => {
    const len = numbers.length
    if (!len) return []
    let [left, right] = [0, len - 1]

    while (left <= right) {
        const sum = numbers[left] + numbers[right]
        if (sum === target) {
            return [left + 1, right + 1]
        }
        if (sum < target) {
            left++
        }
        if (sum > target) {
            right--
        }
    }
    return []
};
// const res = twoSum([2, 7, 11, 15], 9)
// console.log(res)

// 力扣第 344 题「 反转字符串」
// 不要给另外的数组分配额外的空间，你必须原地修改输入数组、使用 O(1) 的额外空间解决这一问题。
// 输入：s = ["h","e","l","l","o"]
// 输出：["o","l","l","e","h"]
const reverseString = (s) => {
    const len = s.length
    if (!len) return []
    let [left, right] = [0, len - 1]

    while (left <= right) {
        const tmp = s[left]
        s[left++] = s[right]
        s[right--] = tmp
    }
    return s
};
// const res = reverseString(["h", "e", "l", "l", "o"])
// console.log(res)

var isPalindrome = function (s) {
    const len = s.length
    if (!len) return
    let newList = []
    s.split('').map(i => {
        if (/[0-9a-zA-Z]/.test(i)) {
            newList.push(i.toLowerCase())
        }
    })
    const newStr = newList.join('')
    let [left, right] = [0, newList.length - 1]
    while (left <= right) {
        if (newStr[left++] !== newStr[right--]) return false
    }
    return true
};
// const res = isPalindrome("A man, a plan, a canal: Panama")
// console.log(res)
// 中心扩散法
const longestPalindrome = (s) => {

};
const res = longestPalindrome("babad")
console.log(res)