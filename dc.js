// 241 题「 为运算表达式设计优先级」
// 输入：expression = "2*3-4*5" 输出：[-34,-14,-10,-10,10]
var diffWaysToCompute = function (expression) {
    const len = expression.length
    if (len === 1) return [expression]
    if (/^\d+$/g.test(expression)) {
        return [Number(expression)];
    }
    const res = []
    const helper = () => {
        for (let i = 0; i < len; i++) {
            const c = expression[i]
            if (c === '+' || c === '-' || c === '*') {
                // 分
                const left = diffWaysToCompute(expression.slice(0, i))
                const right = diffWaysToCompute(expression.slice(i + 1))
                // 治
                for (let a of left) {
                    for (let b of right) {
                        if (c === '+') {
                            res.push(a + b)
                        }
                        if (c === '-') {
                            res.push(a - b)
                        }
                        if (c === '*') {
                            res.push(a * b)
                        }
                    }
                }
            }

        }
    }

    helper()
    return res
};
const diffWaysToCompute2 = (str) => {
    const len = str.length
    if (len === 1) return [str]
    if (/^\d+$/g.test(str)) return [str]


}
const res = diffWaysToCompute2('2*3-4*5')
console.log(res)
