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


async function asyncPool(limit, array, iteratorFn) {
    const ret = [];
    const executing = [];
    for (const item of array) {
        const p = iteratorFn(item);
        ret.push(p);
        if (limit <= array.length) {
            const e = p.then(() => {
                console.log('正在运行' + executing.length)
                executing.splice(executing.indexOf(e), 1)
            });
            executing.push(e);
            if (executing.length >= limit) {
                await Promise.race(executing);
            }
        }
    }
    return Promise.all(ret);
}


const timeout = (i) => {
    console.log('开始' + i);

    return new Promise((resolve) => setTimeout(() => {
        resolve(i);
        console.log('结束' + i);
    }, 1000 + Math.random() * 1000));
};

let urls = Array(10).fill(0).map((v, i) => i)
console.log(urls);
(async () => {
    const res = await asyncPool(3, urls, timeout);
    console.log(res);
})()


const pool = async (max, arr) => {
    const cur = [], list = []
    for (const item of arr) {
        list.push(item)
        if (max <= arr.length) {
            const p = item.then(() => {
                cur.splice(cur.indexOf(p), 1)
            })
            cur.push(p)
            if (cur.length >= max) {
                await Promise.race(cur)
            }
        }
    }

    return Promise.all(list)
}


const fn1 = (max, arr) => new Promise((res, rej) => {
    const list = []
    let index = 0, cur = 0
    const helper = () => {
        const curIndex = index
        index++
        cur++
        arr[curIndex].then((res) => {
            list[curIndex] = res
        }).catch(e => {
            rej(e)
        }).finally(() => {
            cur--
            if (index < arr.length) {
                helper()
            } else if (cur === 0) {
                res(list)
            }
        })

    }

    const next = () => {
        if (cur >= max || index >= arr.length) return
        helper()
        next()
    }

    next()
})
