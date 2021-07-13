// 二叉搜索树：左小右大

class Node {
    constructor(key) {
        this.key = key
        this.left = null
        this.right = null
    }
}

class BinarySearchTree {
    constructor() {
        this.root = null
    }

    insert(key) {
        if (this.root === null) {
            this.root = new Node(key)
        } else {
            this.insertNode(this.root, key)
        }
    }

    insertNode(node, key) {
        if (node.key < key) {
            node.right ? this.insertNode(node.right, key) : node.right = new Node(key)
        } else {
            node.left ? this.insertNode(node.left, key) : node.left = new Node(key)
        }
    }

    inOrderTraverseNode(node, fn) {
        if (node) {
            this.inOrderTraverseNode(node.left, fn)
            fn(node.key)
            this.inOrderTraverseNode(node.right, fn)
        }
    }

    inOrderTraverse(fn) {
        //访问者模式
        this.inOrderTraverseNode(this.root, fn)
    }

    min() {
        this.minNode(this.root)
    }

    minNode(node) {
        if (node) {
            node.left ? this.minNode(node.left) : console.log(node.key)
        }
    }

    max() {
        this.maxNode(this.root)
    }

    maxNode(node) {
        if (node) {
            node.right ? this.maxNode(node.right):console.log(node.key)
        }
    }
}

const t = new BinarySearchTree()
t.insert(5)
t.insert(1)
t.insert(9)
t.insert(7)
t.insert(0)
t.insert(11)

const printFn = (val) => console.log(val)
// t.inOrderTraverse(printFn)
// t.min()
const res = t.max()
console.log(res)
