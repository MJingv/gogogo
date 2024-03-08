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
const res = findStr('fjalsdfffjfkljjjjjjlsfalfffs')
console.log(res)