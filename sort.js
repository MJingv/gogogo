//冒泡排序
const swap = (array, a, b) => {
    const tmp = array[a]
    array[a] = array[b]
    array[b] = tmp
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

const list = [5, 2, 10, 99, 0, 1]
const res = fn(list)
console.log(res)
