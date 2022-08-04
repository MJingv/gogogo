//字符串全排列
// abc acb
// bac bca
// cab aba

//入参是待排列的string
//出参是本次的字符串数组
const fun = (str = '') => {
    if (!str.length) return ['']
    if (str.length === 1) return [str] //结束条件
    const res = []
    for (let i = 0; i < str.length; i++) {
        const first = str[i]
        const left = str.slice(0, i) + str.slice(i + 1)
        const next = fun(left)
        next.map(i => {
            res.push(first + i)
        })
    }
    return res
}

const res = fun('abc')
console.log(res)

