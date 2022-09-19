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
var minEatingSpeed2 = function (piles, h) {
    const len = piles.length
    const max = Math.max(...piles)
    let [left, right, res] = [1, max, max]
    const getTime = (speed) => {
        let sum = 0
        for (let i = 0; i < len; i++) {
            sum += Math.ceil(piles[i] / speed) //注意注意ceil
        }
        return sum
    }
    while (left <= right) {
        const mid = (left + right) >> 1
        const time = getTime(mid)
        if (time > h) {
            //时间太长完不成，加速
            left = mid + 1
        } else {
            res = mid //暂存
            right = mid - 1
        }
    }
    return res
}
// 输入：piles = [30,11,23,4,20], h = 6 输出：23
// const res = minEatingSpeed2([30, 11, 23, 4, 20], 6)//输出：23
// console.log(res)

// 1011. 在 D 天内送达包裹的能力
// 输入：weights = [1,2,3,4,5,6,7,8,9,10], days = 5 输出：15 解释： 船舶最低载重 15 就能够在 5 天内送达所有包裹，如下所示： 第 1 天：1, 2, 3, 4, 5 第 2 天：6, 7 第 3 天：8 第 4 天：9 第 5 天：10 请注意
var shipWithinDays = function (weights, days) {
    //还是有问题，算了，，，，
    const max = Math.max(...weights)
    const sum = weights.reduce((a, b) => a + b)
    let [left, right, res] = [max, sum, 0]
    const getDay = (limit) => {
        let [sum, list] = [0, []]
        for (let w of weights) {
            if (w + sum <= limit) {
                sum += w
            } else if (w + sum > limit) {
                list.push(sum)
                sum = w
            }
        }
        list.push(sum)
        return list.length
    }


    while (left <= right) {
        const mid = (left + right) >> 1
        const time = getDay(mid)
        if (time === days) {
            res = mid
            return mid
        } else if (time > days) {
            left = mid + 1
        } else if (time < days) {
            res = mid
            right = mid - 1
        }
    }
    return res

};
const res = shipWithinDays([1, 2, 3, 4, 5, 6, 7, 8, 9, 10], 1)


// 输入：weights = [3,2,2,4,1,4], days = 3 输出：6
// 输入：weights = [1,2,3,1,1], days = 4 输出：3
// 输入：weights = [1,2,3,4,5,6,7,8,9,10], days = 5 输出：15
// 解答失败: 测试用例:[1,2,3,4,5,6,7,8,9,10] 1 测试结果:0 期望结果:55 stdout:
console.log(res)


