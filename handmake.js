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
        let mid = begin + ((end - begin) >> 1)
        if (mid * mid <= x) {
            begin = mid + 1
        } else {
            end = mid - 1
        }
    }

    return end
};
// const res = mySqrt(49)
// console.log(res)

const isSubsequence = function (s, t) {
//双指针
    let i = 0, j = 0

    while (i < s.length && j < t.length) {
        if (s[i] === t[j]) i++
        j++
    }
    return i === s.length

};

// const res = isSubsequence('abc', 'kjlajlkbjlfdjc')
// console.log(res)


const minArray = function (numbers) {
    //旋转数组的最小数字
    // 双指针
    let i = 0, j = numbers.length - 1
    while (i <= j) {
        if (numbers[i] <= numbers[j]) {
            j--
        } else {
            i++
        }

    }
    return numbers[i]
};
// const res = minArray([4, 5, 1, 2, 3])
// console.log(res)

const twoSum = function (numbers, target) {
    //双指针
    let i = 1, j = numbers.length
    while (i < j) {
        if (numbers[i - 1] + numbers[j - 1] === target) {
            return [i, j]

        } else if (numbers[i - 1] + numbers[j - 1] > target) {
            j--
        } else {
            i++
        }
    }
    return []

}
const twoSum2 = function (numbers, target) {
    //二分法
    // i 0-> numbers.length
    // begin 为 i
    // end 为 i右边

    for (let i = 0; i < numbers.length; i++) {
        let end = numbers.length - 1
        let begin = i + 1

        let key = target - numbers[i]
        while (begin <= end) {

            let mid = begin + ((end - begin) >> 1)
            if (numbers[mid] === key) {
                return [i + 1, mid + 1]

            } else if (numbers[mid] < key) {
                begin = mid + 1

            } else {
                end = mid - 1
            }
        }
    }
    return []
}
// const res = twoSum2([1, 2, 3, 4, 4, 9, 56, 90], 8)//[4,5]
// console.log(res)

const findPeakElement = (nums) => {
    //跟谁比
    //可二分并缩小范围
    if (!nums || !nums.length) return -1
    let begin = 0
    let end = nums.length - 1
    while (begin < end) {
        let mid = begin + ((end - begin) >> 1)
        if (nums[mid] > nums[mid + 1]) {
            end = mid
        } else {
            begin = mid + 1
        }
    }
    return begin

}
// const res = findPeakElement([1, 2])
// console.log(res)

const lengthOfLIS = function (nums) {
  //动态规划再做把

};
const res = lengthOfLIS([0, 1, 0, 3, 2, 3])
console.log(res)
