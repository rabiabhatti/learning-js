// LRU cache

class LRUCache {
    constructor(length = 5) {
        this.head = null
    }

    write (key, value) {
        if (this.head ===  null) {
            const node = {
                key,
                value,
                head: null,
                tail: null
            }
            this.head = node
        } else {
            const cache = this.head
            const node = {
                key,
                value,
            }
            this.head = node
            cache.head = node
            this.head.tail = cache
        }
    }

    read (input) {

    }

    remove(input) {

    }

    checkTotalLength () {

    }

    clear() {
        this.head = null
    }

    size () {
        return this.currentLength
    }



    *[Symbol.iterator]() {
        let index = 0;
        return {
            next: () => {
                if (this.currentLength < this.TotalLength) {
                    return {value: this.cache[index++], done: false}
                } else {
                    return {value: undefined, done: true}
                }
            }
        }
    }
}


const lruCache = new LRUCache(5)
lruCache.write(0, 'index 0')
lruCache.write(1, 'index 1')
lruCache.write(2, 'index 2')
lruCache.write(3, 'index 3')

console.log(lruCache.head)
// for (const item of lruCache.cache) {
//     console.log(item)
// }
