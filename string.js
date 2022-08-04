//字符串全排列
// abc acb
// bac bca
// cab aba

const fun = (str = '') => {
    if (!str) return []
    if (str.length === 1) return [str]
    const res = []
    str.split('').map((item, index) => {
        const first = item
        const left = str.slice(0, index) + str.slice(index + 1)//剔除固定的字符
        const next = fun(left)
        next.map(i => {
            res.push(first + i)
        })
    })
    return res
}

const res = fun('abc')
console.log(res)

