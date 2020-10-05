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


function arrayValues(array) {
    let index = 0;
    const {length} = array

    return {
        [Symbol.iterator]: function () {
            return {
                next: () => {
                    if (index < length) {
                        return {value: array[index++], done: false}
                    } else {
                        return {value: undefined, done: true}
                    }
                }
            }
        }
    }
}
const values = arrayValues(arr)

// for (const value of values) {
//     console.log(value)
// }

function arrayKeys(array) {
    let index = 0;
    const {length} = array

    return {
        [Symbol.iterator]: function () {

            return {
                next: () => {
                    if (index < length) {
                        return {value: index++, done: false}
                    } else {
                        return {value: undefined, done: true}
                    }
                }
            }
        }
    }
};

const keys = arrayKeys(arr)

// for (const value of keys) {
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
        newEnd = length - 1
    }

    if (newTarget >= length) {
        return arr.slice()
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

const set = new CustomSet(["hello", "hello", "test"])
set.add('world')
// console.log(set.has('world'))
// console.log(set.delete('hello'))
// console.log(set)
// for (const v of set) {
//     console.log(v);
// }


class CustomMap {
    constructor(data) {
        this.length = 0
        this.store = {}

        if (typeof data !== 'undefined') {
            Object.keys(data).forEach(key => this.set(key, data[key]))
        }
    }

    set (key, value) {
        const symbol = Symbol.for(key);

        if (this.store.hasOwnProperty(symbol)) {
            return;
        } else {
            this.store[symbol] = {key, value};
            this.length++;
        }
    }

    has (key) {
        return this.store.hasOwnProperty(Symbol.for(key))
    }

    get (key) {
        const symbol = Symbol.for(key);
        const found = this.store.hasOwnProperty(symbol);

        if (found) {
            return this.store[symbol]
        }
    }

    clear () {
        this.store = {}
        this.length = 0
    }

    delete (key) {
        const symbol = Symbol.for(key);
        const found = this.store.hasOwnProperty(symbol);

        if (found) {
            const value = this.store[symbol]
            delete this.store[symbol]
            this.length--
            return value
        }
        return false
    }

    size () {
        return this.length
    }

    [Symbol.iterator]() {
        let index = 0;
        const keys = Object.getOwnPropertySymbols(this.store);

        return {
            next: () => {
                if (index < keys.length) {
                    return {value: this.store[keys[index++]], done: false}
                } else {
                    return {done: true}
                }
            }
        }
    }
}

const map = new CustomMap({'hello': "world", 'hello': "world3", 'some': "thing"})
map.set('new', 'property')
// console.log(map.has('hello'))
// console.log(map.get('hello'))
// console.log(map)
// for (const item of map) {
//     console.log(item)
// }

