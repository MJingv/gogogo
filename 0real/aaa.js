const isValid = (s = '') => {
    const len = s.length
    const stack = []

    for (let c of s) {
        if (c === '(') {
            stack.push(')')
        } else if (c === '[') {
            stack.push(']')
        } else if (c === '{') {
            stack.push('}')
        } else {
            const tmp = stack.pop()
            if (tmp !== c) return false
        }
    }
    return true
}
const res = isValid('[()}]')
console.log(res)
