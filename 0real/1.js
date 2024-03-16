class ListNode {
    constructor(val, next = null) {
        this.val = val
        this.next = next
    }
}

const l5 = new ListNode(5)
const l4 = new ListNode(4, l5)
const l3 = new ListNode(3, l4)
const l2 = new ListNode(2, l3)
const l1 = new ListNode(1, l2)


function TreeNode(val, left, right) {
    this.val = (val === undefined ? 0 : val)
    this.left = (left === undefined ? null : left)
    this.right = (right === undefined ? null : right)
}

const t1 = new TreeNode(1)
const t0 = new TreeNode(0)
t1.left = t0
// t0.left = new TreeNode(0)
const t3 = new TreeNode(3)
t3.left = new TreeNode(2)
t3.right = new TreeNode(4)
t1.right = t3


// 失败重试，200ms试一次，500ms试一次，不行就返回失败
const retry = (promise, n, delay) => new Promise((res, rej) => {
    const fn = (n) => {
        promise.then(r => res(r)).catch(e => {
            console.log(n)
            if (n <= 0) {
                rej(e)
            } else {
                setTimeout(() => {
                    fn(n - 1)
                }, delay * Math.pow(2, n))
            }
        })
    }
    fn(n)
})

// const p = new Promise((res, rej) => {
//     setTimeout(() => {
//         const sucRadio = Math.random()
//         console.log(sucRadio, '-sucRadio')
//         if (sucRadio - 1 >= 0.5) {
//             res('suc')
//         } else {
//             rej('fail')
//         }
//     }, 3000)
// })
//

// retry(p, 3, 200).then(res => console.log(res)).catch(e => console.log(e))


// 找出字符串中连续重复次数最多的字符，输出该字符开始结束位置和该字符
const findStr = (s) => {
    const len = s.length
    if (!len) return
    if (len === 1) return [0, 0, s]
    let i = 0, j = 1

    let max = 1, start = 0, char = ''
    while (i < len && j < len && i < j) {
        if (s[i] === s[j]) {
            const curLen = j - i + 1
            if (curLen > max) {
                max = curLen
                start = i
                char = s[i]
            }
            j++
        } else {
            i = j
            j++
        }
    }
    return {max, start, end: start + max, char}

}
// const res = findStr('fjalsdfffjfkljjjjjjlsfalfffs')

// 写个group函数，入参是数组，返回对象{odd:[1,3],even:[2,4]}

const array = [0, 1, 2, 3, 4]
const ruleFn = (item, index, array) => item % 2 === 0 ? 'even' : 'odd'

Array.prototype.group = function (fn, ...arg) {
    console.log(this)
    const res = {odd: [], even: []}
    this.forEach((item) => {
        const r = fn(item)
        if (r === 'odd') res.odd.push(item)
        if (r === 'even') res.even.push(item)
    })
    return res
}

// const res = array.group(ruleFn)


// 计算乘积除当前项
// 入参 [1,2,3,4] 出参 [24,12,8,6]

const fn = (list = []) => {
    const len = list.length
    if (!len) return []
    const n = list.reduce((a, b) => a * b)
    const res = []
    list.forEach(item => res.push(n / item))
    return res
}
// const res = fn([1, 2, 3, 4])


// 10s连续输入，每隔2s响应一次
// 老是忘记
const throttle = function (fn, delay = 2000) {
    let pre = null
    return (...arg) => {
        const now = Date.now()
        if (now - pre > delay) {
            fn.apply(this, arg)
            pre = now
        }
    }

}

// lastpromise 想不出来
const lastPromise = (promise) => {

};
// const p1 = new Promise((res, rej) => setTimeout(() => {
//     res('suc')
// }, 1000))
// const l1 = lastPromise(p1)

// l1.then(res => console.log(111, res)) //无返回
// l1.then(res => console.log(222, res)) //无返回
// l1.then(res => console.log(333, res)) //有返回


// flat

const flat = (list = [], res = []) => {
    // 方法一 list.flat()
    // return list.flat(1)
    // 方法二 ...
    // const len = list.length
    // const res = []
    // list.forEach(item => {
    //     if (Array.isArray(item)) {
    //         res.push(...item)
    //     } else {
    //         res.push(item)
    //     }
    // })
    // 方法三 递归
    list.forEach(item => {
        if (Array.isArray(item)) {
            flat(item, res)
        } else {
            res.push(item)

        }
    })
    return res

}
// const res = flat([1, 2, 3, [4, 5]])


// 实现get方法
const get = (obj, s) => {
    if (!s) return obj
    const list = s.split('.')
    const len = list.length
    let cur = obj
    for (let i = 0; i < len; i++) {
        cur = cur[list[i]]
    }
    return cur
}
const obj = {a: {b: {c: 2}}}
// const res = get(obj, 'a.b.c')

const fen = (list = [], n) => {
    const len = list.length
    if (!n || !len) return list
    const res = []
    let i = 0
    while (i < len) {
        const tmp = list.slice(i, i + 2)
        res.push(tmp)
        i += 2
    }
    return res
}
// const res = fen([1, 2, 3, 4, 5], 2)

// lodash.get
const myGet = (obj, path = '', def) => {
    const list = path.split('.')
    const len = list.length
    let res = ''
    for (let i = 0; i < len; i++) {
        res = obj[list[i]]
    }
    return res || def
}

// const res = myGet({a: {obj: {cc: 1}}}, 'a.obj.cc', 1)

// 二叉树最大深度
const maxDepth = (root) => {
    if (!root) return 0
    const left = maxDepth(root.left)
    const right = maxDepth(root.right)
    if (left && right) return Math.max(left, right) + 1
    if (!left || !right) return (left || right) + 1

}
// const res = maxDepth(t1)

// 岛屿最大面积
var maxAreaOfIsland = function (grid) {
    // 用过设置为海水
    const [m, n] = [grid.length, grid[0].length]
    let res = 0
    const helper = (i, j) => {
        if (i < 0 || i >= m || j < 0 || j >= n || grid[i][j] === 0) return 0
        grid[i][j] = 0

        return helper(i + 1, j) + helper(i - 1, j) + helper(i, j + 1) + helper(i, j - 1) + 1
    }
    for (let i = 0; i < m; i++) {
        for (let j = 0; j < n; j++) {
            if (grid[i][j] === 1) {
                res = Math.max(res, helper(i, j))
            }
        }
    }
    return res


};
// const res = maxAreaOfIsland([[0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 0, 0, 0], [0, 1, 1, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0], [0, 1, 0, 0, 1, 1, 0, 0, 1, 0, 1, 0, 0], [0, 1, 0, 0, 1, 1, 0, 0, 1, 1, 1, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0], [0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0]])

// 5最长回文子串

var longestPalindrome = function (s) {
    const len = s.length
    if (len <= 1) return s
    const dp = Array(len).fill(0).map(() => Array(len).fill(false))
    for (let i = 0; i < len; i++) dp[i][i] = true
    let start = 0, max = 1
    for (let j = 1; j < len; j++) {
        for (let i = 0; i < j; i++) { //注意遍历方式
            if (s[i] === s[j]) {
                if (j - i < 3 || dp[i + 1][j - 1]) { //注意条件
                    dp[i][j] = true

                    if (j - i + 1 > max) {
                        start = i
                        max = j - i + 1
                    }
                }
            }
        }
    }
    return s.slice(start, start + max)


};
// const res = longestPalindrome('cbbd')

// 最大子数组和
// 连续子数组
var maxSubArray = function (nums) {
    const len = nums.length
    if (!len) return
    const dp = Array(len).fill(-Infinity)
    dp[0] = nums[0]
    let res = nums[0]
    for (let i = 1; i < len; i++) {
        dp[i] = Math.max(nums[i], nums[i] + dp[i - 1])
        res = Math.max(res, dp[i])

    }
    return res
};
// const res = maxSubArray([-2, 1, -3, 4, -1, 2, 1, -5, 4])

// k个一组反转链表
var reverseKGroup = function (head, k) {
    if (!head) return head
    const reverse = (a, b) => {
        // [a,b)
        let cur = a, pre = null
        while (cur !== b) {
            const next = cur.next
            cur.next = pre
            pre = cur
            cur = next
        }
        return pre
    }
    let a = head, b = head
    for (let i = 0; i < k; i++) {
        if (!b) return head
        b = b.next
    }
    const h = reverse(a, b)
    a.next = reverseKGroup(b, k)
    return h
};
// const res = JSON.stringify(reverseKGroup(l1, 2))

const reverse = (head) => {
    if (!head) return null
    let cur = head, pre = null
    while (cur) {
        const next = cur.next
        cur.next = pre
        pre = cur
        cur = next
    }
    return pre
}

const reverseN = (head, n) => {
    if (!head) return head
    let next = null
    const helper = (head, n) => {
        if (n === 1) {
            next = head.next
            return head
        }
        const h = helper(head.next, n - 1)
        head.next.next = head
        head.next = null
        return h
    }
    return helper(head, n)
}

const reverseBetween = (head, m, n) => {
    if (!head) return null
    const reverseN = (head, n) => {
        if (!head) return head
        let next = null
        const helper = (head, n) => {
            if (n === 1) {
                next = head.next
                return head
            }

            const h = helper(head.next, n - 1)
            head.next.next = head
            head.next = next
            return h
        }

        return helper(head, n)
    }
    if (m === 1) return reverseN(head, n)
    head.next = reverseBetween(head.next, m - 1, n - 1)
    return head
}


// 21 合并两个有序链表
var mergeTwoLists1 = function (list1, list2) {
    // 难理解
    if (!list1 && !list2) return null
    if (!list1) return list2
    if (!list2) return list1
    if (list1.val < list2.val) {
        list1.next = mergeTwoLists(list1.next, list2)
        return list1
    } else {
        list2.next = mergeTwoLists(list2.next, list1)
        return list2
    }
    return mergeTwoLists(list1, list2)
}
var mergeTwoLists = function (list1, list2) {
    let p1 = list1, p2 = list2, dummy = new ListNode(-1)
    let p = dummy
    while (p1 && p2) {
        if (p1.val < p2.val) {
            p.next = p1
            p1 = p1.next
        } else {
            p.next = p2
            p2 = p2.next
        }
        p = p.next
    }
    if (p1) p.next = p1
    if (p2) p.next = p2


    return dummy.next
}

const res = JSON.stringify(mergeTwoLists(l1, l3))
console.log(res)