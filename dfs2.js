// 力扣第 46 题「 全排列」
var permute = function (nums) {
    const len = nums.length
    const res = []
    const path = []
    if (!len) return res

    const backtrack = (used) => {
        if (path.length === len) {
            return res.push(path.slice())
        }
        for (let i = 0; i < len; i++) {
            if (used.get(nums[i])) continue
            path.push(nums[i])
            used.set(nums[i], true)
            backtrack(used)
            used.set(nums[i], false)
            path.pop()
        }
    }
    const used = new Map()
    backtrack(used)
    return res

};
const res = permute([1, 2, 3])
console.log(res)