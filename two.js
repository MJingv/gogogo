const mySqrt = (x) => {
    if (x < 0) return null
    if (x === 1 || x === 2 || x === 3) return 1
    let low = 1, high = Math.floor(x / 2) + 1//可能不需要+1
    let res = -1
    while (low <= high) {
        let mid = low + Math.floor((high - low) / 2)
        if (mid * mid <= x) {
            low = mid + 1
            res = mid
        } else {
            high = mid - 1
        }
    }
    return res
};
const res1 = mySqrt(24)

const searchInsert = (nums, target) => {
    if (!nums.length || !target) return -1
    let low = 0, high = nums.length - 1, res = nums.length
    while (low <= high) {
        let mid = low + Math.floor((high - low) / 2)
        let cur = nums[mid]
        if (cur === target) {
            res = mid
        } else if (cur < target) {
            low = mid + 1
        } else {
            high = low - 1
        }
    }
    return res
};
const res = searchInsert([1, 3, 5, 6, 9, 12], 19)


console.log(res)
