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
// const res = eraseOverlapIntervals([[1,100],[11,22],[1,11],[2,12]])
// console.log(res)


// 452. 用最少数量的箭引爆气球
var findMinArrowShots = function (points) {
    const len=points.length
    if (!len) return 0
    points.sort((a, b) => {
        return a[1] - b[1]
    })
    let res=1
    let end = points[0][1]
    for (let i = 1; i < len; i++) {
        if (end < points[i][0]) {
            end = points[i][1]
            res++
        }
    }
    return res
};
const res = findMinArrowShots([[10, 16], [2, 8], [1, 6], [7, 12]])
console.log(res)