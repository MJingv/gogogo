// 二分搜索：闭区间+i<=j

const binarySearch = (arr = [], target, i = 0, j = arr.length - 1) => {
    if (i > j) return -1
    const mid = Math.floor((i + j) / 2)
    if (arr[mid] === target) {
        return mid
    } else if (arr[mid] > target) {
        return binarySearch(arr, target, i, mid - 1)

    } else if (arr[mid] < target) {
        return binarySearch(arr, target, mid + 1, j)
    }
}
const binarySearch1 = (arr = [], target) => {
    const len = arr.length
    let i = 0, j = len - 1

    while (i <= j) { //注意是等于
        const mid = Math.floor((i + j) / 2)
        if (arr[mid] === target) {
            return mid
        } else if (arr[mid] > target) {
            j = mid - 1
        } else if (arr[mid] < target) {
            i = mid + 1
        }
    }
    return -1

}
const res = binarySearch1([1, 3, 8, 9, 14, 14, 99], 14)
console.log(res)