//十进制转二进制
const list = []
//递归
const fn = (n) => {
    const a = Math.floor(n / 2)
    const b = n % 2
    list.push(b)
    if (Math.floor(n / 2) === 0) return list.reverse().join('')
    fn(a)
}
fn(10)
console.log(list.reverse().join(''))
