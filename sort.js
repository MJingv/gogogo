//冒泡排序 O(n^2)
//比我大/小就交换
const swap = (array, a, b) => [array[a], array[b]] = [array[b], array[a]]
const sum = (array) => array.reduce((total, curVal) => total + curVal, 0)

const fn = (array) => {
    if (!array || !array.length) return
    for (let i = 0; i < array.length; i++) {
        for (let j = i + 1; j < array.length; j++) {
            if (array[j] < array[i]) swap(array, i, j)
        }
    }
    return array
}

//选择排序 O(n^2)
//选最大/小的放前面
const fn1 = (array) => {
    if (!array || !array.length) return
    for (let i = 0; i < array.length - 1; i++) {
        let tmpIndex = i
        for (let j = i + 1; j < array.length; j++) {
            if (array[tmpIndex] > array[j]) {
                tmpIndex = j
            }
        }
        i !== tmpIndex && swap(array, i, tmpIndex)
    }
    return array
}
//插入排序
const fn2 = (array) => {
    if (!array || !array.length) return
    for (let i = 1; i < array.length; i++) {
        //分割，i前已排好
        let val = array[i]
        let tmpIndex = i
        for (let j = i - 1; j >= 0; j--) {
            if (val < array[j]) tmpIndex = j
        }
        array.splice(i, 1)
        array.splice(tmpIndex, 0, val)
    }
    return array
}

//归并排序(🔨)
//O(nlog^n)
const merge = (left = [], right = []) => {
    let res = []
    let i = 0
    let j = 0
    while (i < left.length && j < right.length) {
        res.push(left[i] < right[j] ? left[i++] : right[j++])
    }
    return res.concat(i < left.length ? left.slice(i) : right.slice(j))
}

const fn3 = (array) => {
    if (array.length > 1) {
        const middle = Math.floor(array.length / 2)
        const left = fn3(array.slice(0, middle))
        const right = fn3(array.slice(middle))
        array = merge(left, right)
    }
    return array
}

//快速排序
//O(nlog^n)
const parition = (array, left, right) => {
    let pivot = Math.floor((left + right) / 2)
    let i = left
    let j = right
    while (i <= j) {
        while (array[i] < array[pivot]) i++
        while (array[j] > array[pivot]) j--
        if (i <= j) swap(array, i++, j--)
    }
    return i
}
// todo 这个有问题
const fn4 = (array, left = 0, right = array.length - 1) => {
    if (array.length > 1) {
        const index = parition(array, left, right)
        if (left < index - 1) fn4(array, left, index - 1)
        if (right > index) fn4(array, index, right)
    }
    return array
}

//计数排序
//O(n+k)
const fn5 = (array) => {
    const res = []
    if (array.length > 1) {
        const maxVal = Math.max(...array)
        const tmpList = new Array(maxVal + 1)
        tmpList.fill(0)
        array.map(i => {
            tmpList[i]++
        })

        tmpList.map((item, index) => {
            while (item > 0) {
                res.push(index)
                item--
            }
        })
        return res
    }
}

//桶排序
const fn6 = () => {

}
//基数排序
const fn7 = () => {

}


const list = [3, 0, 5, 2, 4, 1, 1, 4, 99]
const res = fn4(list)
console.log(res)


module.exports = {swap}
