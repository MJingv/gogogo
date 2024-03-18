// promise并发
const fn = (list, max) => {
    const len = list.length
    return new Promise((res, rej) => {
        const resList = []
        let cur = 0

        const helper = (task, i) => {
            cur++
            task().then(r => {
                resList[i] = r
            }).catch(e => {
                rej(e)
            }).finally(() => {
                cur--
                if (i < len) {
                    helper(list[i + 1], i + 1)
                } else if (resList.length === len) {
                    res(resList)
                }
            })
        }

        for (let i = 0; i < len && i < max; i++) {
            helper(list[i], i)
        }
    })


}
const t1 = (val) => new Promise(r => setTimeout(() => console.log(val + '----'), 100))
const task = [() => t1(1), () => t1(2), () => t1(3)]
fn(task, 2).then(res => console.log(res)).catch(e => console.log(e))