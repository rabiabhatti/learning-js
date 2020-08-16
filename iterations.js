const arr = ['a', 'b', 'c', 'd'];

let iteratorIndex = 0

function symbolIterator(arr) {
    return {
        next: () => {
            let obj
            if (iteratorIndex < arr.length) {
                obj = {
                    value: arr[iteratorIndex],
                    done: false
                }
                iteratorIndex += 1
            } else {
                obj = {
                    value: undefined,
                    done: true
                }
            }
            return obj
        }
    }
}

const iterator = symbolIterator(arr)
// console.log(iterator.next())
// console.log(iterator.next())
// console.log(iterator.next())
// console.log(iterator.next())
// console.log(iterator.next())

for (const value of iterator) {
    console.log(value)
}
