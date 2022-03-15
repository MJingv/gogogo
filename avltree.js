class AVLTree extends BinarySearchTree {
    constructor(compareFn) {
        super(compareFn);
        this.compareFn = comparFn
        this.root = null
    }

    getNodeHeight(node) {
        if (!node) return -1
        return Math.max(this.getNodeHeight(node.left), this.getNodeHeight(node.right)) + 1
    }
}

const t = new AVLTree()
t.insert(5)
t.insert(1)
t.insert(9)
t.insert(7)
t.insert(11)
t.insert(10)



const res = t.getNodeHeight(t.root)
console.log(res)
