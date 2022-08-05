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

const res = exchange([1, 2, 3, 4, 5])
console.log(res)
