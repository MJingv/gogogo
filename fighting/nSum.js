// 力扣第 167 题「两数之和 II」
// 已排序求两数之和

// 参考二分
const twoSum = (arr, target) => {
    const len = arr.length
    if (!len) return [-1, -1]
    let i = 0, j = len - 1

    while (i <= j) {
        const sum = arr[i] + arr[j]
        if (sum === target) {
            return [i, j]
        } else if (sum < target) {
            i++
        } else if (sum > target) {
            j--
        }
    }
    return [-1, -1]
}
// const res = twoSum([2, 7, 11, 15], 9)

const twoSum1 = (arr = [], target) => {
    const len = arr.length
    if (!len) return [-1, -1]
    const map = new Map()
    for (let i = 0; i < len; i++) {
        if (!map.has(arr[i])) map.set(arr[i], i)
        if (map.has(target - arr[i])) return [i, map.get(target - arr[i])]
    }
    return [-1, -1]
}
const res = twoSum1([2, 7, 11, 15], 9)

console.log(res)