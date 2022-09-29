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
    quickSort(list, p + 1, right)
}

const sort = (list) => {
    const len = list.length
    if (!len) return
    quickSort(list, 0, len - 1)
    return list
}


var sortArray = function (nums) {

    const swap = (l, x, y) => [l[x], l[y]] = [l[y], l[x]]

    const partition = (nums, left, right) => {
        const mid = (left + right) >> 1
        const val = nums[mid]
        let i = left, j = right
        while (i <= j) {
            while (nums[i] < val) i++
            while (nums[j] > val) j--
            if (i <= j) {
                swap(nums, i++, j--)
            }
        }
        return i

    }

    const quickSort = (nums, left, right) => {
        if (left >= right) return
        const p = partition(nums, left, right)
        quickSort(nums, left, p - 1)
        quickSort(nums, p, right)
    }


    const len = nums.length
    if (!len) return
    quickSort(nums, 0, len - 1)
    return nums
};


const res = sortArray([5, 1, 1, 2, 0, 0])
console.log(res)


// 215. 数组中的第K个最大元素


// 剑指 Offer II 076. 数组中的第 k 大的数字