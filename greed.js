// 贪心
// 每一步都做出一个局部最优的选择，最终的结果就是全局最优。注意哦，这是一种特殊性质，其实只有一部分问题拥有这个性质。


// 435. 无重叠区间
// 给定一个区间的集合 intervals ，其中 intervals[i] = [starti, endi] 。返回 需要移除区间的最小数量，使剩余区间互不重叠 。
// 输入: intervals = [[1,2],[2,3],[3,4],[1,3]] 输出: 1 解释: 移除 [1,3] 后，剩下的区间没有重叠。
var eraseOverlapIntervals = function (intervals) {
    const len = intervals.length
    if (!len) return 0

    let res = 0 //移除res个
    const endUp = intervals.sort((a, b) => a[1] > b[1])
    let end = endUp[0][1]

    for (let i = 1; i < len; i++) {
        if (endUp[i][0] < end) {
            res++
        } else {
            end = intervals[i][1]
        }
    }

    return res

};

const eraseOverlapIntervals1 = (intervals) => {
    const len = intervals.length
    if (!len) return 0

    let res = 0 //移除res个
    intervals.sort((a, b) => a[1] - b[1])
    let end = intervals[0][1]

    for (let i = 1; i < len; i++) {
        if (intervals[i][0] < end) {
            res++
        } else {
            end = intervals[i][1]
        }
    }

    return res
}

// const res = eraseOverlapIntervals1([[1, 100], [11, 22], [1, 11], [2, 12]])
// console.log(res)


// 452. 用最少数量的箭引爆气球
var findMinArrowShots = function (points) {
    const len = points.length
    if (!len) return 0
    points.sort((a, b) => {
        return a[1] - b[1]
    })
    let res = 1
    let end = points[0][1]
    for (let i = 1; i < len; i++) {
        if (end < points[i][0]) {
            end = points[i][1]
            res++
        }
    }
    return res
};
// const res = findMinArrowShots([[10, 16], [2, 8], [1, 6], [7, 12]])
// console.log(res)

// 55. 跳跃游戏
var canJump = function (nums) {
    const len = nums.length
    if (!len) return true
    let farthest = 0
    for (let i = 0; i < len - 1; i++) {
        farthest = Math.max(farthest, i + nums[i])
        if (farthest <= i) {
            return false
        }
    }
    return farthest >= len - 1


};
// const res = canJump([3, 2, 1, 0, 4])
// console.log(res)

// 45. 跳跃游戏 II
// 输入: nums = [2,3,1,1,4] 输出: 2
var jump = function (nums) {
    const len = nums.length
    if (!len) return
    let farthest = 0
    let res = 0, end = 0
    for (let i = 0; i < len - 1; i++) {
        farthest = Math.max(nums[i] + i, farthest)
        if (end === i) {
            res++
            end = farthest
        }
    }
    return res

};
// const res = jump([2, 3, 1, 1, 4])
// console.log(res)


// 1024. 视频拼接
// 输入：clips = [[0,2],[4,6],[8,10],[1,9],[1,5],[5,9]], time = 10 输出：3
var videoStitching = function (clips, time) {
    const len = clips.length
    if (!len || !time) return -1
    clips.sort((a, b) => a[0] - b[0])
    if (clips[0][0] !== 0) return -1
    let res = 0, curEnd = 0, nextEnd = 0, i = 0
    while (i < len && clips[i][0] <= curEnd) {
        while (i < len && clips[i][0] <= curEnd) {
            nextEnd = Math.max(nextEnd, clips[i][1])
            i++
        }
        res++
        curEnd = nextEnd
        if (curEnd >= time) {
            return res
        }
    }
    return -1

};
// const res = videoStitching([[0, 2], [4, 6], [8, 10], [1, 9], [1, 5], [5, 9]], 10)
// console.log(res)

// 输入：s = "abc", t = "ahbgdc"
var isSubsequence = function (s, t) {
    if (!s) return true
    if (!t) return false
    let j = 0

    for (let i = 0; i < t.length; i++) {
        if (t[i] === s[j]) {
            j++
        }
    }
    if (j === s.length) return true
    return false


};
// const res = isSubsequence('abc', 'ahbgd')
// console.log(res)

// 402. 移掉K位数字
// 输入：num = "1432219", k = 3
var removeKdigits = function (num, k) {
    const len = num.length
    if (k >= len) return '0'
    const stack = []
    for (let c of num) {
        while (k && stack[stack.length - 1] > c) {
            stack.pop()
            k--
        }
        if (!stack.length && c === '0') continue
        stack.push(c)
    }
    k && stack.splice(-k)
    return stack.join('')

};
// const res = removeKdigits('1432219', 3)
// console.log(res)

// 134. 加油站
// 输入: gas = [1,2,3,4,5], cost = [3,4,5,1,2] 输出: 3
var canCompleteCircuit = function (gas, cost) {
    const len = gas.length
    if (!len) return -1
    let res = 0, i = 0, sum = 0, cur = 0
    while (i < len) {
        sum += gas[i] - cost[i]
        cur += gas[i] - cost[i]
        if (cur < 0) {
            cur = 0
            res = i + 1
        }
        i++
    }
    return sum >= 0 ? res : -1

};
// const res = canCompleteCircuit([5, 1, 2, 3, 4], [4, 4, 1, 5, 1])
// console.log(res)


// 738. 单调递增的数字
// 输入: n = 332 输出: 299
var monotoneIncreasingDigits = function (n) {
    if (n < 10) return n
    const l = n.toString().split('')
    const len = l.length
    for (let i = 0; i < len - 1; i++) {
        if (l[i + 1] < l[i]) {
            l[i]--
            for (let j = i + 1; j < len; j++) {
                l[j] = 9
            }
            i = -1 //巧啊
        }

    }
    return l.join('')

};
// const res = monotoneIncreasingDigits(332)
// console.log(res)

// 1658. 将 x 减到 0 的最小操作数
// 求 和为sum - x 的最长子数组
var minOperations = function (nums, x) {
    const len = nums.length
    const target = nums.reduce((a, b) => a + b) - x
    let l = 0, r = 0, cur = 0, max = 0
    while (r < len) {
        cur += nums[r]
        while (cur > target) {
            cur -= nums[l++]
        }
        if (cur === target) {
            max = Math.max(max, l - r + 1)
        }
        r++

    }
    return max ? len - max : -1
};
// 输入：nums = [3,2,20,1,1,3], x = 10 输出：5
// const res = minOperations([3, 2, 20, 1, 1, 3], 10)
// console.log(res)


// 881. 救生艇
// 输入：people = [3,2,2,1], limit = 3 输出：3 解释：3 艘船分别载 (1, 2), (2) 和 (3)
var numRescueBoats = function (people, limit) {
    const len = people.length
    people.sort((a, b) => a - b)
    let i = 0, j = len - 1, res = 0
    while (i <= j) {
        if (people[i] + people[j] <= limit) {
            i++
            j--
            res++
        } else {
            j--
            res++
        }

    }
    return res
};
const res = numRescueBoats([7, 8], 8)
console.log(res)