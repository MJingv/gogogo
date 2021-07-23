//冒泡排序 O(n^2)
//比我大/小就交换
const swap = (array, a, b) => {
    [array[a], array[b]] = [array[b], array[a]]
}
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


const list = [3, 5, 1, 4, 2]
const res = fn2(list)
console.log(res)

