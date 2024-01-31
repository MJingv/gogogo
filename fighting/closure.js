// 闭包不可替代的case
// 1.私有变量
// 2.节流防抖
// 3.异步

const createCounter = () => {
    // 1.私有变量
    let counter = 0
    return () => counter++
}
const counter = createCounter()
// console.log(counter())
// console.log(counter())
// console.log(counter())


const throttle = (fn, delay) => {
    // 间隔1000ms执行
    let last = 0
    return (...args) => {
        let now = new Date()
        if (now - last > delay) {
            fn.apply(this, args)
            last = now
        }
    }
}
const test = throttle(() => console.log(999), 5000)
window.addEventListener('scroll', test)
window.removeEventListener('scroll', test)
setTimeout(() => {
    throttle(() => console.log(1111), 500)
}, 2000)


const debounce = (fn, delay) => {
    let timer = null
    return (...args) => {
        clearTimeout(timer)
        timer = setTimeout(() => {
            fn.apply(args)
        }, delay)
    }
}





