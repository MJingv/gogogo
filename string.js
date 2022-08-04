//字符串全排列
// abc acb
// bac bca
// cab aba

//入参是待排列的string
//出参是本轮的字符串全排列的数组
const fun = (s = '') => {
    if (!s) return ['']
    if (s.length === 1) return [s]
    const res = []
    for (let i = 0; i < s.length; i++) {
        const first = s[i]
        const left = s.slice(0, i) + s.slice(i + 1)
        const next = fun(left)
        next.map(i => {
            res.push(first + i)
        })
    }
    return new Set(...res)
}
const res = fun('abc')
console.log(res)
