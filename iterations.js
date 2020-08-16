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
console.log('iterator', iterator.next())
console.log('iterator', iterator.next())
console.log('iterator', iterator.next())
console.log('iterator', iterator.next())
console.log('iterator', iterator.next())

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

for (const val of values) {
    console.log(val);
}
