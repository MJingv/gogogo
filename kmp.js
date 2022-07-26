// https://www.zhihu.com/question/21923021
// KMP算法是一种字符串匹配算法，可以在 O(n+m) 的时间复杂度内实现两个字符串的匹配
// next[i]代表0～i中前k字符串等于后k字符串最大k值，k不能i+1（自己等于自己无意义）
// 前缀对齐后缀可以减少重复比较次数
// http://www.ruanyifeng.com/blog/2013/05/Knuth%E2%80%93Morris%E2%80%93Pratt_algorithm.html

//暴力求解
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
        return i - j
    } else {
        return -1
    }
}


const getNext = (p) => {
    if (!p.length) return []
    const res = new Array(p.length).fill(0)
    res[0] = -1
    let i = 0, k = 1, n = 0
    while (k < p.length && i < p.length) {
        if (p[i] === p[k]) {
            res[k] = ++n
            i++
        } else {
            k++
        }
    }
    return res
}


const kmp = (s, p) => {
    const next = getNext(p)
    // 移动位数 = 已匹配的字符数 - 对应的部分匹配值
    let i = 0, j = 0;
    while (i < s.length && j < p.length) {
        if (s[i] === p[j] || j === -1) {
            i++;
            j++
        } else {
            j = next[j]
        }
    }
    if (j === p.length) {
        return i - j
    } else {
        return -1
    }
}


const S = 'a229djlkabcabcab'
const P = 'abcab'
// const res = BF(S, P)
const res = getNext(P)
const res1 = kmp(S, P)

console.log(res, res1)
