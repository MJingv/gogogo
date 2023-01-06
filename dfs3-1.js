// 排列（元素无重可复选）
const fun = (nums) => {
    const len = nums.length
    const [path, res] = [[], []]

    const helper = () => {
        if (path.length === len) return res.push([...path])
        for (let i = 0; i < len; i++) {
            path.push(nums[i])
            helper()
            path.pop()
        }
    }

    helper()
    return res
}
const res = fun([1, 2, 3])
console.log(res)


// 力扣第 78 题「 子集」
// 力扣第 90 题「 子集 II」

// 46 题「 全排列」
// 47 题「 全排列 II」

// 力扣第 77 题「 组合」
// 力扣第 39 题「 组合总和」
// 力扣第 40 题「 组合总和 II」
