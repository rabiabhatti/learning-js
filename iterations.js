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


