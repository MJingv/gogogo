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
const res = two([0, 1, 3, 7, 10, 100, 101, 102, 103], -5)
console.log(res)