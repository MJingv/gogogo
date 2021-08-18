//继承
function Parent() {
    this.name = 'p'

}

Parent.prototype.say = function () {
    console.log(this.name, '---p')
}


function Child() {
    Parent.call(this)
    this.name = 'c'
}

Child.prototype = Object.create(Parent.prototype)
Child.prototype.constructor = Child

const c = new Child()
console.log(c.say())


const formate = (obj) => {
    let res = []
    for (let i in obj) {
        res.push(`${i}=${obj[i]}`)
    }
    return res.join('&')

}
