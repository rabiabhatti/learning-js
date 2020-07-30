const array1 = ['hello', 'one', ['two', 'three', ['four', ['five']]]]
const array2 = ['hello', 1, 'two', 'three']

function arrayEvery(array, callback) {
    let passed = true
    for (let i = 0; i < array.length; i++) {
        passed = callback(array[i])
        if (!passed) {
            break
        }
    }
    return passed
}
const checkForString = item => typeof item === 'string'

// console.log(arrayEvery(array1, checkForString))
// console.log(arrayEvery(array2, checkForString))

function arrayFill(array, filler, begin, end) {
    const { length } = array

    begin = begin ? begin : 0
    end = end ? end : length - 1

    begin = begin < 0 ? length + begin : begin
    end = end < 0 ? length + end : end

    const copy = array.slice()

    for (let i = begin; i < end; i++) {
        copy[i] = filler
    }

    return copy
}

// console.log(arrayFill(array1, 'world', 1, 3))


function arrayFilter(array, callback) {
    const filtered = []
    for (let i = 0; i < array.length; i++) {
        const response = callback(array[i])
        if (response) filtered.push(array[i])
    }
    return filtered
}

// console.log(arrayFilter(array2, checkForString))

function arrayFind(array, query) {
    let found = undefined
    for (let i = 0; i < array.length; i++) {
        if (array[i] === query) {
            found = array[i]
            break
        }
    }
    return found
}

// console.log(arrayFind(array1, 'hello'))
// console.log(arrayFind(array1, 'world'))

function arrayFindIndex(array, query) {
    let index = -1
    for (let i = 0; i < array.length; i++) {
        if (array[i] === query) {
            index = i
            break
        }
    }
    return index
}
// console.log(arrayFindIndex(array1, 'three'))

function helperFlat(arr, deep) {
    let f = []

    if (deep <= 1) {
        return arr.reverse()
    } else {
        for (let i = 1; i <= deep; i++) {
            const last = arr.pop()
            if (Array.isArray(last)) {
                f = f.concat(helperFlat(last, deep - 1))
            } else {
                f = f.concat(last)
            }
        }
        return f
    }
}

function arrayFlat(array, deep) {
    let flattened = []
    const arr = array.slice()

    if (deep > array.length) {
        return arr
    } else {
        for (let i = 0; i < array.length; i++) {
            const last = arr.pop()
            if (Array.isArray(last)) {
                flattened = flattened.concat(helperFlat(last, deep))
            } else flattened = flattened.concat(last)
        }

        return flattened.reverse()
    }
}

console.log(arrayFlat(array1, 3))
