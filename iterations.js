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

const arrayValues = {
    array: ['a', 'b', 'c', 'd'],
    [Symbol.iterator]: function () {
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
};

// for (const value of arrayValues) {
//     console.log(value)
// }

const arrayKeys = {
    array: ['a', 'b', 'c', 'd'],
    [Symbol.iterator]: function () {
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
};

// for (const value of arrayKeys) {
//     console.log(value)
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
        this.length = 0;
        this.store = {};

        if (typeof data !== "undefined") {
            data.forEach((item) => {
                this.add(item);
            });
        }
    }

    add(input) {
        const symbol = Symbol.for(input);

        if (this.store.hasOwnProperty(symbol)) {
            return;
        } else {
            this.store[symbol] = input;
            this.length++;
        }
    }

    has(input) {
        return this.store.hasOwnProperty(Symbol.for(input));
    }

    clear() {
        this.length = 0;
        this.store = {};
    }

    delete(input) {
        const symbol = Symbol.for(input);
        if (this.store.hasOwnProperty(symbol)) {
            this.length--;
            delete this.store[symbol];
        }
    }

    size() {
        return this.length;
    }

    values() {
        return this[Symbol.iterator]();
    }

    [Symbol.iterator]() {
        const keys = Object.getOwnPropertySymbols(this.store);

        return {
            next: () => {
                if (keys.length) {
                    return { value: this.store[keys.pop()], done: false };
                }
                return { value: undefined, done: true };
            },
        };
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
        let found
        for (let i = 0, {length} = Object.keys(this.data); i < length; i += 1) {
            const item = Object.keys(this.data)[i]
            if (item === key) {
                found = this.data[key]
                break
            }
        }
        if (!found) {
            this.data[key] = value
        }
        return this
    }

    has (key) {
        for (let i = 0, {length} = Object.keys(this.data); i < length; i += 1) {
            const item = Object.keys(this.data)[i]
            if (item === key) {
                return true
            }
        }
        return false;

    }

    get (key) {
        for (let i = 0, {length} = Object.keys(this.data); i < length; i += 1) {
            const item = Object.keys(this.data)[i]
            if (item === key) {
                return this.data[key]
            }
        }
    }

    clear () {
        for (let i = 0, {length} = Object.keys(this.data); i < length; i += 1) {
            delete this.data[i]
        }
        return this
    }

    delete (key) {
        for (let i = 0, {length} = Object.keys(this.data); i < length; i += 1) {
            const item = this.data[i]
            if (item === key) {
                const value = this.data[key]
                delete this.data[key]
                return value
            }
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
        for (let i = 0, {length} = Object.keys(this.cache); i < length; i += 1) {
            const item = Object.keys(this.cache)[i]
            if (item === key) {
                const value = this.cache[key].value
                this.remove(key)
                this.write(key, value)
                return value
            }
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
        if (this.currentLength >= this.TotalLength) {
            this.remove(this.tail.key)
        }
    }

    clear() {
        this.head = null;
        this.tail = null;
        this.currentLength = 0;

        for (let i = 0, {length} = Object.keys(this.cache); i < length; i += 1) {
            delete this.cache[i]
        }
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
lruCache.write(0, 'hello')
lruCache.write(1, 'world')
lruCache.write(2, 'test')
lruCache.write(3, 'test2')
lruCache.remove(3)
lruCache.write(4, 'test3')
lruCache.write(5, 'test4')
lruCache.write(6, 'test5')

// console.log(lruCache)
for (const item of lruCache) {
    console.log(item)
}
