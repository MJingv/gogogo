//冒泡排序 O(n^2)
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

const list = [5, 1, 4, 3, 2]
const res = fn1(list)
console.log(res)

