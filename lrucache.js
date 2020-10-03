// LRU cache

class LRUCache {
    constructor(TotalLength = 5) {
        this.currentLength = 0
        this.TotalLength = TotalLength
        this.cache = []
    }

    write (input) {
        const index = this.cache.indexOf(input)
        if (index === -1) {
            this.checkTotalLength()
        }
        this.remove(input)
        this.cache.unshift(input)
        this.currentLength++
    }

    read (input) {
        this.remove(input)
        this.cache.unshift(input)
        this.currentLength++
    }

    remove(input) {
        const index = this.cache.indexOf(input)

        if (index > -1) {
            const cacheCopy = this.cache.slice()
            cacheCopy.splice(index, 1)
            this.cache = cacheCopy
            this.currentLength--
        }
    }

    checkTotalLength () {
        if (this.currentLength >= this.TotalLength) {
            this.cache.pop()
        }
    }

    clear() {
        this.cache = [];
        this.currentLength = 0;
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
lruCache.write('index 0')
lruCache.write( 'index 1')
lruCache.write( 'index 2')
lruCache.write('index 3')
lruCache.remove('index 2')
lruCache.write( 'index 4')
lruCache.write('index 3')
lruCache.write('index 5')
lruCache.write('index 6')
lruCache.write('index 5')
lruCache.read('index 4')

console.log(lruCache.cache)
for (const item of lruCache.cache) {
    console.log(item)
}
