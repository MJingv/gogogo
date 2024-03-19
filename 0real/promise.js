// promise并发
const fn = (list, max) => {
    const len = list.length
    const set = new Set(list)
    list = [...set] //简单去重
    const resList = []
    let i = 0, cur = 0

    return new Promise((res, rej) => {
        const helper = (task) => {
            const curIndex = i
            cur++
            i++
            task().then(r => {
                resList[curIndex] = r
            }).catch(e => {
                rej(e)
            }).finally(() => {
                cur--
                if (i < len) {
                    helper(list[i])
                } else if (cur === 0) {
                    res(resList)
                }
            })
        }
        const next = () => {
            if (cur >= max || i >= len) return
            helper(list[i])
            next()
        }
        next()
    })

}
// const t1 = (val) => new Promise(r => setTimeout(() => console.log(val + '----'), 100))
// const task = [() => t1(1), () => t1(2), () => t1(1)]
// fn(task, 3).then(res => console.log(res)).catch(e => console.log(e))

