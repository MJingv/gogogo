let res = 0

//********* 1.阶乘 *********
const fn = (n) => {
    //终止条件
    if (n === 1) return 1
    //按当前计算
    return fn(n - 1) * n
}
res = fn(5)//120
console.log(res)

//优化--尾递归
const fn1 = (n, sum = 1) => {
    if (n === 1) return sum
    return fn1(n - 1, n * sum)
}
res = fn1(5)//120
console.log(res)
