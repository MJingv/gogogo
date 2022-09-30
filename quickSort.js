// 912. 排序数组
const swap = (list, a, b) => [list[a], list[b]] = [list[b], list[a]]

const partition = (list, left, right) => {
    const mid = (left + right) >> 1
    const val = list[mid]
    let i = left, j = right

    while (i <= j) {
        while (val > list[i]) i++
        while (val < list[j]) j--
        if (i <= j) {
            swap(list, i++, j--)
        }
    }
    return i
}
const quickSort = (list, left, right) => {
    if (left >= right) return
    const p = partition(list, left, right)
    quickSort(list, left, p - 1)
    quickSort(list, p, right)
}

const sort = (list) => {
    const len = list.length
    if (!len) return
    quickSort(list, 0, len - 1)
    return list
}

// const res = sort([5, 1, 1, 2, 0, 0])
// console.log(res)

// 215. 数组中的第K个最大元素
// 输入:[3,2,1,5,6,4], k = 2 输出: 5
var findKthLargest = function (nums, k) {
    // 待优化
    const len = nums.length
    if (!len || len < k) return
    const swap = (l, x, y) => [l[x], l[y]] = [l[y], l[x]]

    const partition = (nums, left, right) => {
        const mid = (left + right) >> 1
        const val = nums[mid]
        let i = left, j = right
        while (i <= j) {
            while (val > nums[i]) i++
            while (val < nums[j]) j--
            if (i <= j) swap(nums, i++, j--)
        }
        return i
    }

    const sort = (nums, left, right) => {
        if (left >= right) return
        const p = partition(nums, left, right)
        sort(nums, left, p - 1)
        sort(nums, p, right)
    }
    sort(nums, 0, len - 1)
    return nums[len - k]

};
// const res = findKthLargest([3, 2, 1, 5, 6, 4], 2)
// console.log(res)


// 236. 二叉树的最近公共祖先
// 剑指 Offer 68 - II. 二叉树的最近公共祖先
var lowestCommonAncestor = function (root, p, q) {

};


// 剑指 Offer 68 - I. 二叉搜索树的最近公共祖先
var lowestCommonAncestor2 = function (root, p, q) {

};