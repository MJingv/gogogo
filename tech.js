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
const res = isStraight([4, 4, 1, 2, 5])
console.log(res)
