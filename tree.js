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

    levelOrder(node = this.root) {
        const res = []
        let level = 0
        const queue = []
        queue.push(node)//当前层的数组
        while (queue.length) {
            let size = queue.length//当前层的数量
            res[level] = []
            while (size--) {
                let cur = queue.shift()//从前面出
                res[level].push(cur.key)
                if (cur.left) {
                    queue.push(cur.left)
                }
                if (cur.right) {
                    queue.push(cur.right)
                }
            }
            level++
        }
        return res
    }

    zigzagLevelOrder(node) {
        if (!node) return []
        const res = []
        let level = 0
        let queue = [node]

        while (queue.length) {
            let size = queue.length
            res[level] = []
            while (size--) {
                let cur = queue.shift()
                res[level].push(cur.key)
                if (cur.left) {
                    queue.push(cur.left)
                }
                if (cur.right) {
                    queue.push(cur.right)
                }
            }
            if (level % 2) {
                res[level].reverse()
            }
            level++
        }
        return res
    }

    rightSideView(node) {
        if (!node) return []
        const res = []
        const queue = [node]

        while (queue.length) {
            let size = queue.length
            res.push(queue[0].key)
            while (size--) {
                let cur = queue.shift()
                if (cur.right) {//先右后左
                    queue.push(cur.right)
                }
                if (cur.left) {
                    queue.push(cur.left)
                }
            }
        }
        return res
    }

    preorderTraversalRecursion(node = this.root) {
        // 中-左-右
        const res = []
        const fun = (tree) => {
            if (!tree) return
            res.push(tree.key)
            if (tree.left) fun(tree.left)
            if (tree.right) fun(tree.right)
        }
        fun(node)
        return res
    }

    preorderTraversal(node = this.root) {
        if (!node) return []
        const res = []
        const tmp = [node]
        while (tmp.length) {
            let cur = tmp.shift()
            res.push(cur.key)
            if (cur.left) tmp.push(cur.left)
            if (cur.right) tmp.push(cur.right)
        }
        return res
    }

    inorderTraversalRecursion(node = this.root) {
        //左-中-右
        if (!node) return []
        const res = []
        const fun = (tree) => {
            if (!tree) return null
            if (tree.left) fun(tree.left)
            res.push(tree.key)
            if (tree.right) fun(tree.right)
        }
        fun(node)
        return res
    }

    inorderTraversal(node = this.root) {
        //左-中-右 记住吧，理解不了
        //stack里放 mid left 先pop左边，再mid，最后right
        const res = []
        const stack = []
        let p = node

        while (p || stack.length) {
            while (p) {
                stack.push(p)
                p = p.left
            }
            let cur = stack.pop()//left
            res.push(cur.key)//mid
            p = cur.right//right
        }
        return res

    }

    postorderTraversalRecursion(node = this.root) {
        //左-中-右
        if (!node) return []
        const res = []
        const fun = (tree) => {
            if (!tree) return null
            if (tree.left) fun(tree.left)
            if (tree.right) fun(tree.right)
            res.push(tree.key)
        }
        fun(node)
        return res
    }

    postorderTraversal(node = this.root) {
        //左-右-中 记住吧，理解不了
        //未被访问过的右孩子
        const res = []
        const stack = []
        let p = node
        let visited = new Set()

        while (p || stack.length) {
            while (p) {
                stack.push(p)
                p = p.left
            }
            let cur = stack[stack.length - 1]
            if (cur.right && !visited.has(cur.right)) {
                p = cur.right
                visited.add(cur.right)
            } else {
                res.push(cur.key)
                stack.pop()
            }
        }
        return res
    }

    maxDepthRecursion(node = this.root) {
        if (!node) return 0
        return Math.max(this.maxDepthRecursion(node.right) + 1, this.maxDepthRecursion(node.left) + 1)
    }

    maxDepth(node = this.root) {
        if (!node) return 0
        let level = 0
        let queue = [node]

        while (queue.length) {
            let size = queue.length
            while (size--) {
                let cur = queue.pop()
                if (cur.left) queue.push(cur.left)
                if (cur.right) queue.push(cur.right)
            }
            level++
        }
        return level
    }
}

const t = new BinarySearchTree()
t.insert(5)
t.insert(1)

t.insert(9)

t.insert(7)
t.insert(17)

const printFn = (val) => console.log(val)
// t.inOrderTraverse(printFn)
// t.min()
// t.max()
// t.search(0)
// t.remove(5)
const l = t.maxDepth(t.root)
// const res = JSON.stringify(l)
console.log(l)


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








