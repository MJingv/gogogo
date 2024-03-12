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
console.log(c, c.house,c.__proto__,Child.prototype)