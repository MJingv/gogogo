//节流
const throttle = (fn, delay) => {
    let last = null
    return () => {
        const now = new Date()
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
        if (timer) clearTimeout(timer)
        timer = setTimeout(() => {
            fn()
        }, delay)
    }
}
