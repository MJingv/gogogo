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
const res = binarySearch([1, 3, 8, 9, 14, 99], 14)
console.log(res)