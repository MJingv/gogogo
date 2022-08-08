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


const myPow = (x, n) => {
    if (n === 0) return 1 //output
    if (n < 0) {
        return 1 / myPow(x, -n)
    }
    if (n & 1) {//奇数
        return myPow(x, n - 1) * x
    }

    return myPow(x * x, n / 2) //偶数

}
// const res = myPow(0.00001, 2147483647)


// 剑指 Offer 38. 字符串的排列
const permutation = (s = []) => {
    if (s.length === 0) return ['']
    if (s.length === 1) return [s]
    const res = []

    for (let i = 0; i < s.length; i++) {
        const chart = s[i]
        const newStr = s.slice(0, i) + s.slice(i + 1)
        const list = permutation(newStr)
        list.map(i => {
            res.push(chart + i)
        })
    }

    return [...new Set(res)] //去重
}
const res = permutation('abcd')
console.log(res)
