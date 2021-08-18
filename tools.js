//节流
const throttle = (fn, delay) => {
    let last = null
    return () => {
        let now = new Date()
        if (now - last > delay) {
            fn()
            last = now
        }
    }
}

//防抖
const debounce = (fn, delay) => {
    let timer = null
    return () => {
        clearTimeout(timer)
        timer = setTimeout(fn, delay)
    }
}

//判断类型相等
const isEqual = (a, b) => {
    const tf = (x) => ({}).toString.call(x).match(/\[object (\w+)\]/)[1]
    const everyK=(func)=>Object.keys(a).every(func)

    switch (tf(a)) {
        case 'Array':
            return a.length === b.length && everyK(i => isEqual(a.sort()[i], b.sort()[i]))
        case 'Object':
            return Object.keys(a).length === Object.keys(b).length && everyK(i => isEqual(a[i], b[i]))
        default:
            return a === b
    }
}
const res = isEqual([1], [1])
console.log(res, 111)
