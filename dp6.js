// 638 大礼包
// 给你一个整数数组 price 表示物品价格，其中 price[i] 是第 i 件物品的价格。另有一个整数数组 needs 表示购物清单，其中 needs[i] 是需要购买第 i 件物品的数量。
var shoppingOffers = function (price, special, needs) {
    // 放弃
    let res = 0
    const dp = Array().fill(0)
    for (let i = 0; i < needs.length; i++) {
        res += needs[i] * price[i]
    }
    return res

};
// const res = shoppingOffers([2, 5], [[3, 0, 5], [1, 2, 10]], [3, 2])
// console.log(res)
// 输入：price = [2,5], special = [[3,0,5],[1,2,10]], needs = [3,2] 输出：14

// 788 旋转数字
// 现在我们有一个正整数 N, 计算从 1 到 N 中有多少个数 X 是好数？
// 018不是 2569是 108不会影响
var rotatedDigits = function (n) {
    // 看不懂啊
    let res = 0
    const valid = [2, 5, 6, 9]
    for (let i = 2; i <= n; i++) {
        const list = String(n).split('')
        for (let i = 0; i < list.length; i++) {
            valid.includes(Number(list[i]))
        }
    }

};
// const res = rotatedDigits(10)
// console.log(res)