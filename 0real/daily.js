function Father(name) {
    this.name = name || 'father'
    this.money = 1000
}

Father.prototype.house = 10

function Child(name) {
    Father.call(this)
    this.name = name || 'child'
}

Child.prototype = Object.create(Father.prototype)
Child.prototype.constructor = Child

const f = new Father('f')
const c = new Child('c')
// console.log(c, c.house, c.__proto__, Child.prototype)

const useState = (initVal) => {
    let state = initVal
    const setState = (newVal) => {
        state = newVal
        // render()
    }
    return [state, setState]
}

const [count, setCount] = useState(0)
// console.log(count);
// setCount(1)
// console.log(count)