class LRUCache {
    constructor(totalLength = 5) {
        this.currentLength = 0
        this.totalLength = totalLength
        this.head = null
        this.tail = null
    }

    write (key, value) {

        if (!this.head) {
            const node = {
                key,
                value,
                next: null,
                prev: null
            }
            this.head = node
            this.tail = node
            this.currentLength++
        } else {
            this.remove(key)
            this.makeNewHead(key, value)
        }
    }

    read (key) {
        const found = this.checkForExisting(key)

        if (found) {
            const value = found.value
            this.remove(key)
            this.makeNewHead(key, value)
        }
    }

    remove(key) {
        const node = this.checkForExisting(key)

        if (node) {
            if (node.prev !== null) {
                node.prev.next = node.next
            } else {
                this.head = node.next
            }

            if (node.next !== null) {
                node.next.prev = node.prev
            } else {
                this.tail = node.prev
            }
            this.currentLength--
        }
    }

    makeNewHead (key, value) {
        const node = {
            key,
            value,
            next: this.head,
            prev: null
        }
        this.head.prev = node
        this.head = node
        this.currentLength++
        this.checkTotalLength()
    }

    checkForExisting(key) {
        let node = this.head
        let found
        if (node.next) {
            do {
                if (key === node.key) {
                    found = node
                    break
                }
                node = node.next
            } while (node.next !== null)
        }

        return found
    }

    checkTotalLength () {
        if (this.currentLength >= this.totalLength) {
            this.remove(this.tail.key)
        }
    }

    clear() {
        this.head = null;
        this.tail = null;
        this.currentLength = 0;
    }

    size () {
        return this.currentLength
    }

    *[Symbol.iterator]() {
        let node = this.head;
        while (node) {
            yield node;
            node = node.next;
        }
    }
}


const lruCache = new LRUCache(5)
lruCache.write('0', 'index 0')
lruCache.write('1', 'index 1')
lruCache.write('2', 'index 2')
lruCache.write('3', 'index 3')
lruCache.remove('3')
lruCache.write('4', 'index 4')
lruCache.write('5', 'index 5')
lruCache.write('6', 'index 6')
lruCache.write('7', 'index 7')
lruCache.read('5')

console.log(lruCache.head)
// for (const item of lruCache) {
//     console.log(item)
// }
