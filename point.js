// 【调整数组顺序使奇数位于偶数前面】
// 输入一个整数数组，实现一个函数来调整该数组中数字的顺序，使得所有奇数在数组的前半部分，所有偶数在数组的后半部分。

//双指针+交换
const exchange = (list = []) => {
    if (!list.length) return []
    let [left, right] = [0, list.length - 1]
    while (left < right) {
        while (left < right && (list[left] & 1)) {//判断奇数，后移++
            left++
        }
        while (left < right && !(list[right] & 1)) {
            right--
        }
        [list[left], list[right]] = [list[right], list[left]];//交换
    }
    return list
}

const res = exchange([1, 2, 3, 4, 5])
console.log(res)
