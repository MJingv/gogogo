//二分
const binarySearch = (arr, target) => {
    let begin = 0;
    let end = arr.length - 1 //最后一位index
    while (begin <= end) {
        //重点: 因为闭区间，所以到了begin等于end时，其实区间内还有一个值要判断，
        //因此只有begin>end的时候才能停止
        // let mid = begin + Math.floor((end - begin) / 2)
        let mid = Math.floor((begin + end) / 2)
        if (arr[mid] == target) {
            return mid
        } else if (arr[mid] > target) {
            end = mid - 1
        } else if (arr[mid] < target) {
            begin = mid + 1
        }
    }
    return -1
}

const res = binarySearch([1, 3, 8, 9, 14, 99], 14)
console.log(res)
