const swap = (list, a, b) => [list[a], list[b]] = [list[b], list[a]]
const arr = [3, 0, 5, 2, 4, 1, 1, 4, 99];

const quickSort = (list = []) => {
    const len = list.length
    if (!len || len === 1) return list

    const left = [], right = [], equal = []
    const index = Math.floor(len / 2)
    const mid = list[index]

    for (let i = 0; i < len; i++) {
        const cur = list[i]
        if (mid === cur) equal.push(cur)
        if (mid < cur) right.push(cur)
        if (mid > cur) left.push(cur)
    }

    return [...quickSort(left), ...equal, ...quickSort(right)]

}
// const res = quickSort(arr)

const binarySearch = (list, key, i = 0, j = list.length - 1) => {
    if (i > j) return -1
    const mid = Math.floor((i + j) / 2)

    if (list[mid] === key) {
        return mid
    } else if (list[mid] < key) {
        return binarySearch(list, key, mid + 1, j)
    } else if (list[mid] > key) return binarySearch(list, key, i, mid - 1)

}

const binarySearch1 = (list, key) => {
    const len = list.length
    let i = 0, j = len - 1
    while (i <= j) {
        const mid = Math.floor((i + j) / 2)
        if (list[mid] === key) {
            return mid
        } else if (list[mid] < key) {
            i = mid + 1
        } else if (list[mid] > key) j = mid - 1

    }
    return -1
}
// const res = binarySearch1([1, 3, 8, 9, 14, 99], 14)

const quickSort1 = (arr = []) => {
    const len = arr.length
    if (!len) return []
    const [left, right, equal] = [[], [], []]
    const q = Math.floor(len / 2)
    const cur = arr[q]
    for (let i = 0; i < len; i++) {
        if (cur === arr[i]) equal.push(arr[i])
        if (cur < arr[i]) right.push(arr[i])
        if (cur > arr[i]) left.push(arr[i])
    }
    return [...quickSort1(left), ...equal, ...quickSort1(right)]


}
// const res = quickSort1(arr)


const merge = (left = [], right = []) => {
    const [l1, l2] = [left.length, right.length]
    let [i, j] = [0, 0]
    const res = []
    while (i < l1 && j < l2) {
        if (left[i] < right[j]) {
            res.push(left[i++])
        } else {
            res.push(right[j++])
        }

    }
    while (i < l1) res.push(left[i++])
    while (j < l2) res.push(right[j++])
    return res
}

const mergeSort = (arr = []) => {
    const len = arr.length
    if (len <= 1) return arr
    const mid = Math.floor(len / 2)
    return merge(mergeSort(arr.slice(0, mid)), mergeSort(arr.slice(mid)))

}
const res = mergeSort(arr)

console.log(res)