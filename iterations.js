const arr = ['a', 'b', 'c', 'd'];

function symbolIterator(array) {
    let index = 0;

    return {
        next: () => {
            if (index < array.length) {
                return {value: array[index++], done: false}
            } else {
                return {done: true}
            }
        }
    }
}

const iterator = symbolIterator(arr);
// console.log('iterator', iterator.next())
// console.log('iterator', iterator.next())
// console.log('iterator', iterator.next())
// console.log('iterator', iterator.next())
// console.log('iterator', iterator.next())

class ArrayValues {
    constructor(array) {
        this.array = array;
    }

    [Symbol.iterator]() {
        let index = 0;

        return {
            next: () => {
                if (index < this.array.length) {
                    return {value: this.array[index++], done: false}
                } else {
                    return {done: true}
                }
            }
        }
    }
}
const values = new ArrayValues(arr)

// for (const val of values) {
//     console.log(val);
// }


class ArrayKeys {
    constructor(array) {
        this.array = array;
    }

    [Symbol.iterator]() {
        let index = 0;

        return {
            next: () => {
                if (index < this.array.length) {
                    return {value: index++, done: false}
                } else {
                    return {done: true}
                }
            }
        }
    }
}
const keys = new ArrayKeys(arr)

// for (const val of keys) {
//     console.log(val);
// }

function arrayCopyWithin(arr, target, begin, end) {
    const { length } = arr

    if (target == null) {
        return arr
    }

    let newTarget = target
    let newBegin = begin == null ? 0 : begin
    let newEnd = end == null ? length - 1 : end

    if (target < 0) {
        newTarget = length + target
    }

    if (newBegin < 0) {
        newBegin = length + newBegin
    }

    if (newEnd < 0) {
        newEnd = length + end
    } else if (newEnd > length) {
        newEnd = length
    }

    if (newTarget >= length) {
        return arr
    }

    const sliced = arr.slice(newBegin, newEnd)
    let slicedIndex = 0

    const targetEnd = newTarget + sliced.length

    for (let i = newTarget; i < targetEnd; i += 1) {
        arr[i] = sliced[slicedIndex]
        if (slicedIndex < sliced.length) {
            slicedIndex += 1
        }
    }
    return arr
}


// console.log(arrayCopyWithin(arr, 1, -4))
class CustomSet {
    constructor(data) {
        this.data = data;
    }

    add (input) {
        const found = this.data.find(item => item === input)
        if (!found) {
            this.data.push(input)
        }
        return this
    }

    has (input) {
        const found = this.data.find(item => item === input)
        return !!found;
    }

    clear () {
        while (this.data.length > 0) {
            this.data.pop();
        }
        return this
    }

    delete (input) {
        const index = this.data.indexOf(input)
        if (index !== -1) {
            const found = this.data[index]
            this.data.splice(index, 1)
            return found
        }
        return false
    }

    size () {
        return this.data.length
    }

    [Symbol.iterator]() {
        let index = 0;

        return {
            next: () => {
                if (index < this.data.length) {
                    return {value: this.data[index++], done: false}
                } else {
                    return {done: true}
                }
            }
        }
    }
}

const set = new CustomSet(["hello", "test"])
set.add('world')
// console.log(set.has('world'))
// console.log(set.delete('hello'))
// for (const v of set) {
//     console.log(v);
// }


class CustomMap {
    constructor(data) {
        this.data = data;
    }

    set (key, value) {
        const found = Object.keys(this.data).find(item => item === key)
        if (!found) {
            this.data[key] = value
        }
        return this
    }

    has (key) {
        const found =  Object.keys(this.data).find(item => item === key)
        return !!found;

    }

    get (key) {
        const found =  Object.keys(this.data).find(item => item === key)
        if (found) {
            return this.data[key]
        }
    }

    clear () {
        Object.keys(this.data).forEach(key => {
            delete this.data[key]
        })
        return this
    }

    delete (key) {
        const found = Object.keys(this.data).find(item => item === key)
        if (found) {
            delete this.data[key]
            return true
        }
        return false
    }

    size () {
        return Object.keys(this.data).length
    }

    [Symbol.iterator]() {
        let index = 0;
        const keys = Object.keys(this.data)

        return {
            next: () => {
                if (index < Object.keys(this.data).length) {
                    return {value: [keys[index], this.data[keys[index++]]], done: false}
                } else {
                    return {done: true}
                }
            }
        }
    }
}

const map = new CustomMap({'hello': "world", 'some': "thing"})
map.set('new', 'property')
// console.log(map.has('hello'))
// console.log(map)
// for (const [key, value] of map) {
//     console.log(`${key}: ${value}`)
// }


// LRU cache

class Node {
    constructor(key, value, next = null, prev = null) {
        this.key = key
        this.value = value
        this.next = next
        this.prev = prev
    }
}

class LRUCache {
    constructor(TotalLength = 5) {
        this.currentLength = 0
        this.TotalLength = TotalLength
        this.cache = {}
        this.head = null
        this.tail = null
    }

    write (key, value) {
        this.checkTotalLength()

        if (!this.head) {
            this.head = new Node(key, value)
            this.tail = new Node(key, value)
        } else {
            const node = new Node(key, value, this.head)
            this.head.prev = node
            this.head = node
        }

        this.cache[key] = this.head
        this.currentLength += 1
    }

    read (key) {
        if (this.cache[key]) {
            const value = this.cache[key].value

            this.remove(key)
            this.write(key, value)

            return value
        }
    }

    remove(key) {
        const node = this.cache[key]

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

        delete this.cache[key]

        this.currentLength -= 1
    }

    checkTotalLength () {
            if (this.currentLength === this.TotalLength) {
                this.remove(this.tail.key)
            }
    }

    clear() {
        this.head = null;
        this.tail = null;
        this.currentLength = 0;
        this.cache = {};
    }
}


const lruCache = new LRUCache(5)
lruCache.write(0, 'hello')
lruCache.write(1, 'world')
lruCache.write(2, 'test')
lruCache.write(3, 'test2')
lruCache.remove(3)
lruCache.write(4, 'test3')
lruCache.write(5, 'test4')
lruCache.write(6, 'test5')

console.log(lruCache)
