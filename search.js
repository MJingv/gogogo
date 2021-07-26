//二分搜索
//递归
const fn = (array = [], val, left = 0, right = array.length - 1) => {
    if (!array.length || !val || right < left) return false
    const mid = Math.floor((left + right) / 2)
    if (array[mid] === val) return mid
    if (array[mid] < val) fn(array, val, mid + 1, right)
    if (array[mid] > val) fn(array, val, left, mid - 1)
}
//循环
const fn1 = (array = [], val) => {
    if (!array.length || !val) return false

    let left = 0
    let right = array.length - 1

    while (left < right) {
        let mid = Math.floor((left + right) / 2)
        if (array[mid] === val) return mid
        if (array[mid] < val) left = mid
        if (array[mid] > val) right = mid
    }
    return false
}

//内插搜索

//随机搜索


const l = [0, 2, 8, 32, 99, 100]
const res = fn1(l, 99)
console.log(res)
