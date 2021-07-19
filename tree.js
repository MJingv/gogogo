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
        return this.minNode(this.root)
    }

    minNode(node) {
        if (node) {
            return node.left ? this.minNode(node.left) : node
        }
    }

    max() {
        return this.maxNode(this.root)
    }

    maxNode(node) {
        if (node) {
            return node.right ? this.maxNode(node.right) : node.key
        }
    }

    search(val) {
        return this.searchNode(this.root, val)
    }

    searchNode(node, val) {
        if (node) {
            if (node.key === val) return true
            return node.key < val ? this.searchNode(node.right, val) : this.searchNode(node.left, val)
        } else {
            return false
        }
    }

    remove(key) {
        this.root = this.removeNode(this.root, key)
    }

    removeNode(node, key) {
        if (!node) {
            return null
        }
        //递归找到要删除的节点
        if (node.key < key) {
            node.right = this.removeNode(node.right, key)
            return node
        }
        if (node.key > key) {
            node.left = this.removeNode(node.left, key)
            return node
        }
        if (node.key === key) {
            //case1:node是叶子节点
            if (!node.left && !node.right) {
                node = null
                return node
            }
            //case2:node有2个节点：用右边最小节点替换node
            if (node.left && node.right) {
                let rightMin = this.minNode(node.right)
                node.key = rightMin.key
                node.right = this.removeNode(node.right, rightMin.key)
                return node

            }
            //case3:node只有1个子节点
            node = node.right ? node.right : node.left
            this.removeNode(node, key)
            return node
        }
    }
}

// const t = new BinarySearchTree()
// t.insert(5)
// t.insert(1)
// t.insert(9)
// t.insert(7)

// const printFn = (val) => console.log(val)
// t.inOrderTraverse(printFn)
// t.min()
// t.max()
// t.search(0)
// t.remove(5)
// const res = JSON.stringify(t)
// console.log(res)

class AVLTree extends BinarySearchTree {
    constructor(compareFn) {
        super(compareFn);
        this.compareFn = compareFn
        this.root = null
    }

    getNodeHeight(node) {
        if (!node) return -1
        return Math.max(this.getNodeHeight(node.left), this.getNodeHeight(node.right)) + 1
    }
}

// const t = new AVLTree()
// t.insert(5)
// t.insert(1)
// t.insert(9)
// t.insert(7)
// t.insert(11)
// t.insert(10)
//
//
// const res = t.getNodeHeight(t.root)
// console.log(res)








