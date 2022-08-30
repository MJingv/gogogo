// https://labuladong.github.io/algo/2/20/23/
// 数组相关的双指针算法
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
const res = removeElement([3, 2, 2, 3], 2)
console.log(res)
