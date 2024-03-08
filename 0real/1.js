// 失败重试，200ms试一次，500ms试一次，不行就返回失败
const retry = (promise, n, delay) => new Promise((res, rej) => {
    const fn = (n) => {
        promise.then(r => res(r)).catch(e => {
            console.log(n)
            if (n <= 0) {
                rej(e)
            } else {
                setTimeout(() => {
                    fn(n - 1)
                }, delay * Math.pow(2, n))
            }
        })
    }
    fn(n)
})

// const p = new Promise((res, rej) => {
//     setTimeout(() => {
//         const sucRadio = Math.random()
//         console.log(sucRadio, '-sucRadio')
//         if (sucRadio - 1 >= 0.5) {
//             res('suc')
//         } else {
//             rej('fail')
//         }
//     }, 3000)
// })
//

// retry(p, 3, 200).then(res => console.log(res)).catch(e => console.log(e))


// 找出字符串中连续重复次数最多的字符，输出该字符开始结束位置和该字符
const findStr = (s) => {
    const len = s.length
    if (!len) return
    if (len === 1) return [0, 0, s]
    let i = 0, j = 1

    let max = 1, start = 0, char = ''
    while (i < len && j < len && i < j) {
        if (s[i] === s[j]) {
            const curLen = j - i + 1
            if (curLen > max) {
                max = curLen
                start = i
                char = s[i]
            }
            j++
        } else {
            i = j
            j++
        }
    }
    return {max, start, end: start + max, char}

}
// const res = findStr('fjalsdfffjfkljjjjjjlsfalfffs')

// 写个group函数，入参是数组，返回对象{odd:[1,3],even:[2,4]}

const array = [0, 1, 2, 3, 4]
const ruleFn = (item, index, array) => item % 2 === 0 ? 'even' : 'odd'

Array.prototype.group = function (fn, ...arg) {
    console.log(this)
    const res = {odd: [], even: []}
    this.forEach((item) => {
        const r = fn(item)
        if (r === 'odd') res.odd.push(item)
        if (r === 'even') res.even.push(item)
    })
    return res
}

// const res = array.group(ruleFn)


// 计算乘积除当前项
// 入参 [1,2,3,4] 出参 [24,12,8,6]

const fn = (list = []) => {
    const len = list.length
    if (!len) return []
    const n = list.reduce((a, b) => a * b)
    const res = []
    list.forEach(item => res.push(n / item))
    return res
}
// const res = fn([1, 2, 3, 4])


// 10s连续输入，每隔2s响应一次
// 老是忘记
const throttle = function (fn, delay = 2000) {
    let pre = null
    return (...arg) => {
        const now = Date.now()
        if (now - pre > delay) {
            fn.apply(this, arg)
            pre = now
        }
    }

}

// lastpromise 想不出来
const lastPromise = (promise) => {

};
const p1 = new Promise((res, rej) => setTimeout(() => {
    res('suc')
}, 1000))
const l1 = lastPromise(p1)

l1.then(res => console.log(111, res)) //无返回
l1.then(res => console.log(222, res)) //无返回
l1.then(res => console.log(333, res)) //有返回

