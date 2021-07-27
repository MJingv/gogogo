//二分搜索
//递归
const {swap} = require("./sort");

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

//内插搜索（改良二分搜索）

const l = [0, 2, 8, 32, 99, 100]
const res = fn1(l, 99)
console.log(res)


//随机（洗牌）

const fn3 = (array) => {
    for (let i = array.length - 1; i > 0; i--) {
        const index =Math.round( Math.random() * i)
        swap(array, index, i)
    }
    return array
}
const l1 = [0, 1, 2, 3, 4, 5]
const res1 = fn3(l1)
console.log(res1)












