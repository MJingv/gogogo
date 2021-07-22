//冒泡排序
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

const list = [5, 4, 3, 2]
const res = fn(list)
console.log(res)
