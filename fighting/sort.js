const swap = (list, a, b) => [list[a], list[b]] = [list[b], list[a]]
const arr = [3, 0, 5, 2, 4, 1, 1, 4, 99];

// 选个pivot，左边比我大，右边比我小，递归2边的数
const quickSort = (arr) => {
    const len = arr.length
    if (len <= 1) return arr
    const left = [], right = [], equal = []
    const pivot = arr[Math.floor(len / 2)]
    for (let i = 0; i < len; i++) {
        if (arr[i] > pivot) {
            right.push(arr[i])
        } else if (arr[i] < pivot) {
            left.push(arr[i])
        } else {
            equal.push(arr[i])
        }
    }
    return [...quickSort(left), ...equal, ...quickSort(right)]
};
// const res = quickSort(arr);

// 遍历2次，小的交换到前面
const bubbleSort = (arr = []) => {
    const len = arr.length
    if (len <= 1) return arr
    for (let i = 0; i < len - 1; i++) {
        for (let j = 0; j < len - i - 1; j++) {
            if (arr[j + 1] < arr[j]) swap(arr, j + 1, j)
        }
    }
    return arr
}
// const res = bubbleSort(arr)

// 遍历选择最小的放已排好的后面
const selectSort = (arr = []) => {
    const len = arr.length
    if (len <= 1) return arr

    for (let i = 0; i < len - 1; i++) {
        let minIndex = i
        for (let j = i + 1; j < len; j++) {
            if (arr[j] < arr[minIndex]) minIndex = j
        }
        if (minIndex !== i) swap(arr, i, minIndex)
    }
    return arr
}
// const res = selectSort(arr)

const merge = (left = [], right = []) => {
    const res = []
    const len1 = left.length
    const len2 = right.length
    let i = 0, j = 0
    while (i < len1 && j < len2) {
        if (left[i] < right[j]) {
            res.push(left[i++])
        } else {
            res.push(right[j++])
        }
    }
    while (i < len1) res.push(left[i++])
    while (j < len2) res.push(right[j++])
    return res
}
const mergeSort = (arr = []) => {
    const len = arr.length
    if (len <= 1) return arr
    const mid = Math.floor(len / 2)
    const left = arr.slice(0, mid)
    const right = arr.slice(mid)
    return merge(mergeSort(left), mergeSort(right))
}
const res = mergeSort(arr)

console.log(res); // 输出：[0, 1, 1, 2, 3, 4, 4, 5, 99]