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
    if (!len) return []
    const map = new Map()
    for (let i = 0; i < len; i++) {
        const partner = target - arr[i]
        if (map.has(partner)) return [i, map.get(partner)]
        map.set(arr[i], i)
    }
    return []
}
// const res = twoSum1([2, 7, 11, 15], 9)

// 多个满足target的组合
const twoSum2 = (arr, target) => {
    const len = arr.length
    const res = []
    if (!len) return res

    arr.sort()
    let i = 0, j = len - 1
    while (i <= j) {
        const sum = arr[i] + arr[j]
        if (sum === target) { //死循环
            res.push([i, j])
        } else if (sum < target) {
            i++
        } else if (sum > target) {
            j--
        }
    }
    return res

}
const res = twoSum2([1, 3, 1, 2, 2, 3], 4)
console.log(res)