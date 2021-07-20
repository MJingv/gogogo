// 二叉堆
// - 完全二叉树
// - 最大/小树，父恒大/小于子
const defaultCompareFn = (a, b) => a === b
const swap = (array, a, b) => {
    const tmp = array[a]
    array[a] = array[b]
    array[b] = tmp
}

class MinHeap {
    constructor(compareFn = defaultCompareFn) {
        this.compareFn = compareFn
        this.heap = []
    }

    getLeftIndex(index) {
        return 2 * index + 1
    }

    getRightIndex(index) {
        return 2 * index + 2
    }

    getParentIndex(index) {
        return index === 0 ? undefined : Math.floor((index - 1) / 2)
    }

    siftUp(index) {
        const pIndex = this.getParentIndex(index)
        if (pIndex === undefined) return
        if (this.heap[pIndex] > this.heap[index]) {
            swap(this.heap, pIndex, index)
            this.siftUp(pIndex)
        }
    }

    insert(val) {
        if (!val) return false
        this.heap.push(val)
        this.siftUp(this.heap.length - 1)
        return true
    }

    size() {
        return this.heap.length
    }

    isEmpty() {
        return this.heap.length === 0
    }

    findMin() {
        return this.isEmpty() ? undefined : this.heap[0]
    }

    extract() {
        //移除根元素
        if (this.isEmpty()) {
            return undefined
        }
        if (this.size() === 1) {
            this.heap.shift()
        }
        const node = this.heap.shift()
        const tail = this.heap.pop()
        this.heap.unshift(tail)
        this.siftDown(0)
        return node
    }

    siftDown(index) {
        while (index < this.size()) {
            let right = this.getRightIndex(index)
            let left = this.getLeftIndex(index)
            if (this.heap[index] > this.heap[right]) {
                swap(this.heap, index, right)
                index = this.heap.right
            } else {
                swap(this.heap, index, left)
                index = this.heap.left
            }
        }

    }
    findMin() {

    }
}

const h = new MinHeap()
h.insert(2)
h.insert(3)
h.insert(4)
h.insert(5)
h.insert(1)

h.extract(0)
console.log(h)

