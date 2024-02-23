// string转int
const f1 = (s) => {
    const num = Number(s)
    if (isNaN(num)) {
        throw new Error('invalid input')
    }
    if (num > Number.MAX_SAFE_INTEGER) {
        throw new Error('overflow')
    }
    if (num < Number.MIN_SAFE_INTEGER) {
        throw new Error('underflow')
    }
    return num
}
// const res = f1('fjaljf002=,.z1jf0?]J03')

// 输入一个int数组，找到和最小的子数组，输出子数组的开始，结束、和
const f2 = (nums = []) => {


}
// const res = f2([1, -2, 3, -4, 5])


// n个节点的二叉树

class TreeNode {
    constructor(val, left, right) {
        this.val = val
        this.left = left || null
        this.right = right || null
    }
}


var generateTrees = function (n) {
    if (n === 0) return []

    const helper = (start, end) => {
        const res = []

        if (start > end) {
            res.push(null)
            return res
        }
        for (let i = start; i <= end; i++) {
            // i是root
            const leftTrees = helper(start, i - 1)
            const rightTrees = helper(i + 1, end)

            for (let left of leftTrees) {
                for (let right of rightTrees) {
                    const node = new TreeNode(i)
                    node.left = left
                    node.right = right
                    res.push(node)
                }
            }
        }
        return res

    }
    return helper(1, n)

};
const res = JSON.stringify(generateTrees(4))

// 抢红包

console.log(res)