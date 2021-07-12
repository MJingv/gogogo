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
        }
        this.insertNode(this.root, key)
    }

    insertNode(node, key) {
        if (node.key < key) {
            node.right ? this.insertNode(node.right, key) : node.right = new Node(key)
        } else {
            node.left ? this.insertNode(node.left, key) : node.left = new Node(key)
        }

    }
}

const t = new BinarySearchTree()
t.insert(5)
t.insert(1)
t.insert(9)
t.insert(7)
console.log(JSON.stringify(t))
