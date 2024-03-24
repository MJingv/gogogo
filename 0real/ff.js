// 按版本号由小到大排序

const compareVersions = (list = []) => {
    const len = list.length
    if (!len) return []
    list = list.map(i => i.split('.').map(Number))
    list.sort((a, b) => {
        const len = Math.max(a.length, b.length)
        for (let i = 0; i < len; i++) {
            const aa = a[i] || 0, bb = b[i] || 0
            if (aa > bb) return 1
            if (aa < bb) return -1
        }
        return 0
    })
    const res = list.map(i => i.join('.'))

    return res

}
// const res = compareVersions(['0.1.1', '2.3.3', '0.320.1', '4.2', '4.3.5', '4.3', '4.5'])


// 拼手气红包


class redPackage {
    constructor(count, money) {
        this.count = count
        this.money = money
        this.remainCount = count
        this.remainMoney = money

    }

    getRemainAmount() {
        if (this.remainCount === 1) {
            this.remainCount--
            return parseFloat(this.remainMoney.toFixed(2))
        }
        const [min, max] = [0.01, this.remainMoney / this.remainCount * 2]
        const tmp = Math.random() * (max - min) + min
        this.remainCount--
        this.remainMoney -= tmp
        return parseFloat(tmp.toFixed(2))
    }

    distribute() {
        const res = []
        for (let i = 0; i < this.count; i++) {
            res.push(this.getRemainAmount())
        }
        return res
    }

}

// const r = new redPackage(5, 10)
// const res = r.distribute()


// 数字转字符串
// 1234567890->1,234,567,890
const toString = (n) => {
    // return n.toLocaleString()
    const s = n.toString().split('').reverse()
    const len = s.length
    const res = []
    for (let i = 0; i < len; i++) {
        if (i && i % 3 === 0) {
            res.push(',')
        }
        res.push(s[i])
    }
    return res.reverse().join('')

}
// const res = toString(1234567890)
// console.log(res)


// 盛最多水的容器
const maxArea1 = (list) => {
    const len = list.length
    if (len <= 2) return
    let max = 0
    for (let i = 0; i < len - 1; i++) {
        for (let j = i + 1; j < len; j++) {
            const tmp = (j - i) * Math.min(list[i], list[j])
            max = Math.max(max, tmp)

        }
    }
    return max

}
const maxArea = (list) => {
    // 双指针
    const len = list.length
    let i = 0, j = len - 1, max = 0
    while (i < j) {
        const tmp = (j - i) * Math.min(list[i], list[j])
        max = Math.max(tmp, max)
        if (list[i] < list[j]) {
            i++
        } else {
            j--
        }
    }
    return max
}
const res = maxArea([1, 8, 6, 2, 5, 4, 8, 3, 7])
console.log(res)

