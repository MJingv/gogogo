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
// const res = maxArea([1, 8, 6, 2, 5, 4, 8, 3, 7])


// 将一个数组转成树状结构
const arr2tree = (arr) => {
    const map = {}
    const res = []
    for (let item of arr) {
        map[item.id] = {...item, children: []}
    }

    for (let item of arr) {
        if (item.parentId) {
            map[item.parentId].children.push(map[item.id])
        } else {
            res.push(map[item.id])
        }
    }


    return res
}


const arr = [{id: 1, name: 'Node 1', parentId: null}, {id: 2, name: 'Node 2', parentId: 1}, {
    id: 3,
    name: 'Node 3',
    parentId: 1
}, {id: 4, name: 'Node 4', parentId: 2}, {id: 5, name: 'Node 5', parentId: 2}, {id: 6, name: 'Node 6', parentId: 3},];
// const res = JSON.stringify(arr2tree(arr))


//  同步sleep方法

class LazyLog {
    log(s) {
        console.log(s)
        return this
    }

    sleep(delay) {
        let now = Date.now()
        while (Date.now() - now < delay) {

        }
        return this

    }
}

// (new LazyLog()).log(1).sleep(2000).log(222)


// z字打印矩阵
function printZMatrix(matrix) {
    const result = [];
    const rows = matrix.length;
    const cols = matrix[0].length;
    let row = 0;
    let col = 0;
    let direction = 1;

    while (result.length < rows * cols) {
        result.push(matrix[row][col]);

        if (direction === 1) {
            if (col === 0 || row === rows - 1) {
                direction = -1;
                if (row === rows - 1) {
                    col++;
                } else {
                    row++;
                }
            } else {
                row++;
                col--;
            }
        } else {
            if (row === 0 || col === cols - 1) {
                direction = 1;
                if (col === cols - 1) {
                    row++;
                } else {
                    col++;
                }
            } else {
                row--;
                col++;
            }
        }
    }

    return result;
}


// 示例矩阵
const matrix = [[1, 2, 3], [4, 5, 6], [7, 8, 9]];

// const res = printZMatrix(matrix) //[1, 2, 4, 7, 5, 3, 6, 8, 9]


// 大数相加


// 查询有序数组中数字最后一次出现的位置
const findLast = (list, target) => {
    const len = list.length;
    let [i, j] = [0, len - 1]
    let res = -1
    while (i <= j) {
        const p = Math.floor((i + j) / 2)
        const mid = list[p]
        if (mid === target) {
            // todo 记住
            if (p === len - 1 || list[p + 1] !== target) {
                return p
            } else {
                j = p + 1
            }
        } else if (mid < target) {
            i = mid + 1

        } else if (mid > target) {
            j = mid - 1

        }
    }
    return res

}
const res = findLast([1, 2, 2, 4, 6, 7, 7, 7, 8, 1000], 7)
console.log(res)


// 实时搜索框组件
