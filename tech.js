// 剑指 Offer 61. 扑克牌中的顺子
// 从若干副扑克牌中随机抽 5 张牌，判断是不是一个顺子，即这5张牌是不是连续的。2～10为数字本身，A为1，J为11，Q为12，K为13，而大、小王为 0 ，可以看成任意数字。A 不能视为 14。
const isStraight = (nums) => {
    const len = nums.length
    if (!len) return
    const set = new Set()
    let [min, max] = [14, 0] //初始化！（重要）
    for (let i = 0; i < len; i++) {
        const cur = nums[i]
        if (cur === 0) continue
        max = Math.max(max, cur)
        min = Math.min(min, cur)
        if (set.has(cur)) {
            return false
        } else {
            set.add(cur)
        }
    }
    return max - min < 5
}
// const res = isStraight([4, 4, 1, 2, 5])
// console.log(res)

// 剑指 Offer 17. 打印从1到最大的n位数
// 输入数字 n，按顺序打印出从 1 到最大的 n 位十进制数。比如输入 3，则打印出 1、2、3 一直到最大的 3 位数 999。
// 输入: n = 1
// 输出: [1,2,3,4,5,6,7,8,9]
const printNumbers = (n) => {
    if (!n) return []
    const res = [], max = 10 ** n
    for (let i = 1; i < max; i++) {
        res.push(i)
    }
    return res
}

const res = printNumbers(1)
console.log(res)
