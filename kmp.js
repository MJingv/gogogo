// https://www.zhihu.com/question/21923021
// KMP算法是一种字符串匹配算法，可以在 O(n+m) 的时间复杂度内实现两个字符串的匹配
// next[i]代表0～i中前k字符串等于后k字符串最大k值，k不能i+1（自己等于自己无意义）
// 前缀对齐后缀可以减少重复比较次数


const BF = (s, p) => {
    if (!s.length || !p.length) return -1
    let i = 0, j = 0
    while (i < s.length && j < p.length) {
        if (s[i] === p[j]) {
            i++
            j++
        } else {
            i = i - j + 1
            j = 0
        }
    }
    if (j === p.length) {
        return i - p.length
    } else {
        return -1
    }


}

const S = 'a229djlkabc'
const P = 'abc'
const res = BF(S, P)
console.log(res)
