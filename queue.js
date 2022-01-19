// 完全平方数
// 输入: n = 12 输出: 3
// 解释: 12 = 4 + 4 + 4.
// LeetCode第279题 无权图 BFS 遍历

const numSquares = (n) => {

}
// const res = numSquares(12)
// console.log(res)
//

// 单词接龙


//滑动窗口最大值
// LeetCode第239题
// 输入: nums = [1,3,-1,-3,5,3,6,7], 和 k = 3
// 输出: [3,3,5,5,6,7]
// 解释:
//
//     滑动窗口的位置              最大值
// ---------------              -----
//[1  3  -1] -3  5  3  6  7       3
// 1 [3  -1  -3] 5  3  6  7       3
// 1  3 [-1  -3  5] 3  6  7       5
// 1  3  -1 [-3  5  3] 6  7       5
// 1  3  -1  -3 [5  3  6] 7       6
// 1  3  -1  -3  5 [3  6  7]      7

const maxSlidingWindow = (nums = [], k = 0) => {
    if (!nums.length || !k) return []
    const res = []
    const window = []//当前窗口下标

    for (let i = 0; i < nums.length; i++) { //i是指针，遍历一遍
        if (window[0] && window[0] <= i - k) {
            window.shift()//删除滑动窗口之外（前）的
        }
        while (nums[window[window.length - 1]] < nums[i]) {
            window.pop()
        }
        window.push(i)
        if (i >= k - 1) {
            res.push(nums[window[0]])

        }
        console.log(window)
    }


    return res
}

const res = maxSlidingWindow([1, 3, -1, -3, 5, 3, 6, 7], 3)
console.log(res)
