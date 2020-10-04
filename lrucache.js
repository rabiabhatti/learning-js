// LRU cache

class LRUCache {
    constructor(length = 5) {
        this.head = null
    }

    write (key, value) {
        if (this.head ===  null) {
            this.head = {
                key,
                value,
                head: null,
                tail: null
            }
        } else {
            this.writeNewNode(key, value)
        }
    }

    read (key) {

    }

    checkForExisting(key) {
        if (this.head.tail) {
            let node = this.head
            do {
                // console.log('hello', key, node.key)
                if (key === node.key) {
                    // console.log('key === node.key',  node.tail.head)
                    // const prevHead = node.head
                    // console.log('prevHead', node.head)
                    node.head = node.tail
                    node.tail.head = node.head.head
                    break
                }
                node = node.tail
            } while (node.tail !== null)
        }
    }

    writeNewNode(key, value) {
        this.checkForExisting(key)
        const cache = this.head
        const node = {
            key,
            value,
        }
        this.head = node
        cache.head = node
        this.head.tail = cache
        this.head.head = node
    }

    clear() {
        this.head = null
    }
}


const lruCache = new LRUCache(5)
lruCache.write(0, 'index 0')
lruCache.write(1, 'index 1')
lruCache.write(2, 'index 2')
lruCache.write(2, 'index 2')
lruCache.write(3, 'index 3')

console.log(lruCache.head)

