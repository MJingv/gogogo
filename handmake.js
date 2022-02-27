//二分查找
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

// const res1 = binarySearch([1, 3, 8, 9, 14, 99], 14)
// console.log(res1)

//二分查找边界

const searchRange = (arr, target) => {
    //找到left/right，求长度
    //arr[left] < target
    //arr[right] > target

    let begin = 0
    let end = arr.length - 1

}

// const res2 = searchRange([1, 3, 8, 9, 14, 14, 14, 99], 14)
// console.log(res2)


//求平方根
const mySqrt = function (x) {
    let begin = 0
    let end = x
    while (begin <= end) {
        let mid = begin + ((end - begin)>> 1)
        if (mid * mid <= x) {
            begin = mid + 1
        } else {
            end = mid - 1
        }
    }

    return end
};
const res = mySqrt(49)
console.log(res)
