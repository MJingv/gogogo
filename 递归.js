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


//********* 1.斐波那契 *********
const fn2 = (n) => {
    if (n === 0) return 0
    if (n === 1 || n === 2) return 1
    return fn2(n - 1) + fn2(n - 2)
}
res = fn2(9)
console.log(res, 'fn2')

//优化--记忆memo
const list = [0, 1, 1]
const fn3 = (n) => {
    if (list[n]) return list[n]
    return fn3(n - 1) + fn3(n - 2)
}
res = fn3(9)
console.log(res, 'fn3')
