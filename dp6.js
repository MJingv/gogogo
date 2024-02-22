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


// 面试题 17.23 最大黑方阵
// 返回一个数组 [r, c, size] ，其中 r, c 分别代表子方阵左上角的行号和列号，size 是子方阵的边长。若有多个满足条件的子方阵，返回 r 最小的，若 r 相同，返回 c 最小的子方阵。若无满足条件的子方阵，返回空数组。
var findSquare = function (matrix) {
    // 看不懂
    const [m, n] = [matrix.length, matrix[0].length]


};
// 输入: [ [1,0,1], [0,0,1], [0,0,1] ] 输出: [1,0,2] 解释: 输入中 0 代表黑色，1 代表白色，标粗的元素即为满足条件的最大子方阵
// const res = findSquare([[1, 0, 1], [0, 0, 1], [0, 0, 1]])
// console.log(res)

// 887 鸡蛋掉落
// 给你 k 枚相同的鸡蛋，并可以使用一栋从第 1 层到第 n 层共有 n 层楼的建筑。
// 请你计算并返回要确定 f 确切的值 的 最小操作次数 是多少？
// 输入：k = 2, n = 6 输出：3
var superEggDrop = function (k, n) {
    let res = Infinity
    const memo = Array(k + 1).fill(Infinity).map(i => Array(n + 1).fill(Infinity))
    const help = (K, N) => {
        if (K === 1) return N //只有一个鸡蛋，最多n次
        if (N === 0) return 0
        if (memo[K][N]) return memo[K][N]
        for (let i = 1; i <= n; i++) {
            res = Math.min(res, Math.max(help(K, N - i), help(K - 1, i - 1)) + 1)
            console.log(res)
        }
        memo[K][N] = res
        return res
    }
    // console.log(memo)
    return help(k, n)
};
const res = superEggDrop(2, 6)
console.log(res)
