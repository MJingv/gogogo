// 二分查找
// 力扣第 704 题「 二分查找」

// 等于闭区间
const search = (nums, target) => {
    const len = nums.length
    let [left, right] = [0, len - 1] //注意左右闭合
    while (left <= right) { //注意是等于，因为左右是闭合区间
        const mid = (left + right) >> 1
        if (nums[mid] === target) {
            return mid
        } else if (nums[mid] > target) {
            right = mid - 1
        } else if (nums[mid] < target) {
            left = mid + 1
        }
    }
    return -1
};

const searchLeft = (nums, target) => {
    const len = nums.length
    let [left, right] = [0, len - 1]
    while (left <= right) {
        const mid = (left + right) >> 1
        if (nums[mid] === target) {
            right = mid - 1
        } else if (nums[mid] > target) {
            right = mid - 1
        } else if (nums[mid] < target) {
            left = mid + 1
        }
    }
    return left
}
const searchRight = (nums, target) => {
    const len = nums.length
    let [left, right] = [0, len - 1]
    while (left <= right) {
        const mid = (right + left) >> 1
        if (nums[mid] === target) {
            left = mid + 1
        } else if (nums[mid] > target) {
            right = mid - 1

        } else if (nums[mid] < target) {
            left = mid + 1
        }
    }
    return right
}

// const res = searchRight([0, 0, 1, 1, 1, 2, 2, 3, 5], 1)
// console.log(res)

var minEatingSpeed = function (piles, h) {
    const len = piles.length
    if (h < len) return -1
    if (h === len) return Math.max(...piles)
    const min = Math.min(...piles)
    const max = Math.max(...piles)
    let res = max
    for (let i = max; i >= min; i--) {
        let sum = 0
        for (let j = 0; j < len; j++) {
            sum += Math.ceil(piles[j] / i)
        }
        if (sum <= h) res = Math.min(res, i)
    }
    return res
};
const res = minEatingSpeed([30, 11, 23, 4, 20], 6)//输出：23

console.log(res)