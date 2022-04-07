//闭包
// https://juejin.cn/post/7078468365999669261
// 闭包是干什么的？闭包是为创建函数的私有变量，且这个变量不会随着函数执行完毕被垃圾回收，变量的生命周期得到延长
// 闭包是指内部函数引用外部函数的变量的集合

const flower = () => {
    let money = 100
    return () => money
}

const fun = flower()
console.log(fun())
