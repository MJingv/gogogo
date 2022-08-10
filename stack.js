//十进制转二进制
const list = []
//递归
const fn = (n) => {
    const a = Math.floor(n / 2)
    const b = n % 2
    list.push(b)
    if (Math.floor(n / 2) === 0) return list.reverse().join('')
    fn(a)
}
// fn(10)
// console.log(list.reverse().join(''))

//循环实现
const fn2 = (n) => {
    while (n > 0) {
        let a = Math.floor(n / 2)
        let b = n % 2
        list.push(b)
        n = a
    }
    return list
}

// const res = fn2(11)
// console.log(res.reverse().join(''))

// 「剑指 Offer 40. 最小的k个数」
// 输入整数数组 arr ，找出其中最小的 k 个数。例如，输入4、5、1、6、2、7、3、8这8个数字，则最小的4个数字是1、2、3、4。
// 输入：arr = [3,2,1], k = 2
// 输出：[1,2] 或者 [2,1]

const getLeastNumbers = ((arr, k) => {
    const swap = (list, a, b) => [list[a], list[b]] = [list[b], list[a]]
    let maxHeap = arr.slice(0, k)

    for (let i = k; i < arr.length; i++) {
        if (arr[i] < maxHeap[0]) {
            maxHeap.shift()
            maxHeap.push(arr[i])
            const max = Math.max(...maxHeap)


        }
    }
    return maxHeap
})
const res = getLeastNumbers([4, 5, 1, 6, 2, 7, 3, 8], 4)
console.log(res)
