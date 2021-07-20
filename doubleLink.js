import {Node, LinkList} from './link'

class DoublyNode extends Node {
    constructor(element, next, prev) {
        super(element, next);
        this.prev = undefined
    }
}

class DoublyLinkList extends LinkList {
    constructor() {
        super()
        this.tail = undefined
    }






}
