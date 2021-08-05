//躲不过的promise

//retry
const test = new Promise((res, rej) => {
    setTimeout(() => rej(111), 1000)
})

const retry = (p, delay, times) => new Promise((res, rej) => {
    if (times) {
        times--
        p.catch((e) => {
            console.log(e,times, '---')
            setTimeout(() => retry(p, delay, times), delay)
        })
    } else {
        rej('no choice')
    }
})

retry(test, 3000, 5)
