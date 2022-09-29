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
const res = sort([2, 34, 9, 0, 1])
console.log(res)


// 215. 数组中的第K个最大元素


// 剑指 Offer II 076. 数组中的第 k 大的数字