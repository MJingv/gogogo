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
const res = removeDuplicates([1, 2, 3, 4, 4, 5, 6, 6, 7])
console.log(res)

// 83 题「 删除排序链表中的重复元素」