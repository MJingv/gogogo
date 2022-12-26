// 回溯本质是暴力
// 没有思路用回溯

// def backtrack(...):
// for 选择 in 选择列表:
// 做选择
// backtrack(...)
// 撤销选择


// 力扣第 46 题「 全排列」
var permute = function (nums) {
    const len = nums.length
    const res = []
    const path = []
    if (!len) return res

    const helper = (used = {}) => {
        if (path.length === len) res.push(path.slice())
        for (let i = 0; i < len; i++) {
            if (used[nums[i]]) continue
            path.push(nums[i])
            used[nums[i]] = true
            helper(used)
            path.pop()
            used[nums[i]] = false
        }
    }
    helper()
    return res

};
// const res = permute([1, 2, 3])
// console.log(res)

// 力扣第 51 题「 N 皇后」
var solveNQueens = function (n) {

};
const res = solveNQueens(4)
console.log(res)