// 341. 扁平化嵌套列表迭代器
const fn = (arr) => {
    const len = arr.length
    if (!len) return []
    const res = []

    const helper = (list = []) => {
        if (!list.length) return
        for (let i = 0; i < len; i++) {
            if (Number.isInteger(list[i])) {
                res.push(list[i])
            } else {
                helper(list[i])
            }
        }
    }
    helper(arr)
    return res
}
const res = fn([[1, 1], 2, [1, 1]])
console.log(res)

// 输入：nestedList = [[1,1],2,[1,1]] 输出：[1,1,2,1,1]