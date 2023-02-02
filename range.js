// 1288 删除被覆盖区间
// 输入：intervals = [[1,4],[3,6],[2,8]] 输出：2 解释：区间 [3,6] 被区间 [2,8] 覆盖，所以它被删除了。
// 请你返回列表中剩余区间的数目。
var removeCoveredIntervals = function (intervals) {
    const len = intervals.length
    // 按start排序
    intervals.sort((a, b) => {
        if (a[0] === b[0]) return b[1] - a[1]
        return a[0] - b[0]
    })
    let [left, right, res] = [intervals[0][0], intervals[0][1], 0]
    // 3个case
    for (let i = 1; i < len; i++) {
        const [l, r] = [intervals[i][0], intervals[i][1]]

        if (r <= right && l >= left) {
            // 重合
            res++
        }
        if (l <= right && r >= right) {
            // 部分重合
            right = r
        }
        if (l > right) { // 不等 看清楚边界
            // 不相交
            left = l
            right = r
        }
    }

    return len - res
};
// const res = removeCoveredIntervals([[1, 2], [1, 4], [3, 4]])
// console.log(res)

// 力扣第 56 题 区间合并问题
// 输入：intervals = [[1,3],[2,6],[8,10],[15,18]] 输出：[[1,6],[8,10],[15,18]]
var merge = function (intervals) {
    const len = intervals.length
    intervals.sort((a, b) => a[0] - b[0])
    const res = [intervals[0]]
    let [left, right] = [intervals[0][0], intervals[0][1]]
    for (let i = 1; i < len; i++) {
        const [l, r] = [intervals[i][0], intervals[i][1]]
        if (l > right) {
            // 不重合
            left = l
            right = r
            res.push(intervals[i])
        }
        if (l <= right && r >= right) {
            // 重合
            left = l
            right = r
            res[res.length - 1][1] = r
        }
    }
    return res
};
const res = merge([[1, 3], [2, 6], [15, 18], [8, 10]])
console.log(res)