//递归gogogo
// 条件
// 1。终止条件
// 2。调自己

// 21. 合并两个有序链表
const mergeTwoLists = function (list1, list2) {


};
// 输入：l1 = [1,2,4], l2 = [1,3,4]
// 输出：[1,1,2,3,4,4]
// const res = mergeTwoLists([1, 2, 4], [1, 3, 4])


// 「剑指 Offer 64. 求1+2+…+n」
const sumNums = (n) => {
    return n && sumNums(n - 1) + n
}
// const res = sumNums(3)


// 「剑指 Offer 16. 数值的整数次方」
// 实现 pow(x, n) ，即计算 x 的 n 次幂函数（即，xn）。不得使用库函数，同时不需要考虑大数问题。

// 输入：x = 2.00000, n = -2
// 输出：0.25000
// 解释：2-2 = 1/22 = 1/4 = 0.25


const pow = (x, n) => {
    if (n === 0) return 1
    if (n < 0) {
        return 1 / pow(x, -n)
    }
    if (n & 1) {//奇数
        return pow(x, n - 1) * x
    }
    //偶数
    return pow(x * x, n / 2)
}
const res = pow(2.00000, 4)
console.log(res)
