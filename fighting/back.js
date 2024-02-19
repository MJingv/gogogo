// 回溯专题
// 回溯算法是在遍历「树枝」，DFS 算法是在遍历「节点」

// result = []
// def backtrack(路径, 选择列表):
// if 满足结束条件:
// result.add(路径)
// return
//
// for 选择 in 选择列表:
// 做选择
// backtrack(路径, 选择列表)
// 撤销选择


// 46. 全排列
// 给定一个不含重复数字的数组 nums ，返回其 所有可能的全排列 。你可以 按任意顺序 返回答案。
var permute = function (nums) {
    const len = nums.length
    if (!len) return []
    if (len === 1) return [nums]
    const res = []
    let path = []
    const helper = (used = {}) => {
        if (path.length === len) {
            res.push(path.slice()) //注意是slice，push当前的值
            return
        }
        for (let i = 0; i < len; i++) {
            if (!used[i]) {
                path.push(nums[i])
                used[i] = true
                helper(used)
                path.pop()
                used[i] = false
            }
        }
    }
    helper()

    return res

};
// const res = permute([1, 2, 3])// 输出：[[1,2,3],[1,3,2],[2,1,3],[2,3,1],[3,1,2],[3,2,1]]


// 47. 全排列 II
// 给定一个可包含重复数字的序列 nums ，按任意顺序 返回所有不重复的全排列
// 输入：nums = [1,1,2] 输出： [[1,1,2], [1,2,1], [2,1,1]]
var permuteUnique = function (nums) {
    const len = nums.length
    const [path, res] = [[], []]
    nums.sort()
    const helper = (used = {}) => {
        if (path.length === len) return res.push(path.slice())

        for (let i = 0; i < len; i++) {
            if (used[i]) continue
            if (i > 0 && nums[i - 1] === nums[i] && !used[i - 1]) continue
            path.push(nums[i])
            used[i] = true
            helper(used)
            path.pop()
            used[i] = false
        }

    }

    helper()

    return res

};
const res = permuteUnique([1, 1, 2])


// 剑指 Offer II 083. 没有重复元素集合的全排列
// 51. N 皇后
// 52. N皇后 II


console.log(res)