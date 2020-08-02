const deepArr = ['hello', 'one', ['two', 'three', ['four', ['five']]]]
const deepArr2 = ['hello', 'one', ['two', 'three', ['four', ['five']]]]
const array1 = ['hello', 'one', 'two', 'three', 'four', 'five']
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
// console.log(arrayFlat(deepArr, 3))


function arrayFlatMap(array, callback) {
    const flattened = helperFlat(array, 1)
    const mapped = []

    for (let i = 0; i < flattened.length; i++) {
        mapped.push(callback(flattened[i]))
    }
    return mapped.reverse()
}
// console.log(arrayFlatMap(deepArr, (item => 'new '+item)))
// console.log(deepArr2.flatMap(item => 'new '+item))

function arrayForEach(arr, callback) {
    for (let i = 0; i <arr.length; i++) {
        console.log(callback(arr[i]))
    }
    return undefined
}
// arrayForEach(array1, (item => "new " + item))

function arrayIncludes(array, match) {
    let includes = false
    for (let i = 0; i < array.length; i++) {
        if (array[i] === match) {
            includes = true
            break
        }
    }
    return includes
}
// console.log(arrayIncludes(array1, 'hello'))

function arrayJoin(array, separator) {
    separator = separator ? separator : ','
    let str = ''
    if (array.length === 1) {
        return `${array[0]}`
    } else {
        for (let i = 0; i < array.length; i++) {
            str += array[i] + `${i === array.length - 1 ? '' : separator}`
        }
    }
    return str
}
// console.log(arrayJoin(array1, ' & '))

function arrayLastIndexOf(array, element) {
    let index = -1
    for (let i = 0; i < array.length; i++) {
        if (array[i] === element) {
            index = i
        }
    }
    return index
}
// console.log(arrayLastIndexOf([...array1, 'hello'], 'hello'))

function arrayIndexOf(array, element) {
    let index = -1
    for (let i = 0; i < array.length; i++) {
        if (array[i] === element) {
            index = i
            break
        }
    }
    return index
}
// console.log(arrayIndexOf(array1, 'three'))

function arrayMap(array, callback) {
    const mapped = []
    for (let i = 0; i < array.length; i++) {
        mapped.push(callback(array[i]))
    }
    return mapped
}

// console.log(arrayMap(array1, (item => 'new ' + item)))

function arrayPop(arr) {
    const last = arr[arr.length -1]
    arr = arr.slice(0, arr.length - 1)
    return last
}
// console.log(arrayPop(array1))

function arrayPush(array, element) {
    array =  [...array, element]
    return array.length
}
// console.log(arrayPush(array1, 'world'))

function arrayReverse(arr) {
    const sliced = arr.slice()
    const reversed = []
    for (let i = 0; i < arr.length; i++) {
        const last = sliced.pop()
        reversed.push(last)
    }
    return reversed
}
// console.log(arrayReverse(array1))

function arrayShift(array) {
    if (!array.length) {
        return undefined
    } else {
        const first = array[0]
        array = array.slice(1)
        return first
    }
}
// console.log(arrayShift(array1))

function arraySlice(arr, begin, end) {
    const sliced = []

    begin = begin ? begin : 0
    end = end ? end : arr.length - 1

    begin = begin < 0 ? arr.length + begin : begin
    end = end < 0 ? arr.length + end : (end > arr.length ? arr.length : end)

    if (begin >= arr.length) {
        return []
    } else {
        for (let i = begin; i < end; i++) {
            sliced.push(arr[i])
        }
    }

    return sliced
}
// console.log(arraySlice(array1, 0, -5))


function arraySome(arr, callback) {
    let test = false
    for (let i = 0; i < arr.length; i++) {
        const res = callback(arr[i])
        if (res) {
            test = true
            break
        }
    }
    return test
}
// console.log(arraySome(array1, (item => item.length > 4)))

function arrayUnshift(arr, ...items) {
    let result = []
    items.forEach(item => result = [item, ...result])
    return [...result, ...arr]
}
// console.log(arrayUnshift(array1, 'world','test'))

function arraySplice(arr, begin, count, ...items) {
    begin = begin ? begin : 0
    count = count ? count : arr.length - begin

    begin = begin < 0 ? arr.length + begin : begin
    count = count <= 0 ? 0 : count

    const start = arr.slice(0, begin)
    const deleted = arr.slice(begin, begin + count)
    const last = arr.slice(begin + count, arr.length)
    arr = [...start, ...items, ...last]

    return deleted
}
// console.log(arraySplice(array1, 2, 2, 'hello', 'world', '1'))

function arrayReduce(array, callback, initialValue) {
    const begin = initialValue ? initialValue : array[0]
    let result
    let i = initialValue ? 0 : 1
    for (i; i < array.length; i++) {
        const start = result ? result : begin
        result = callback(start, array[i])
    }
    return result
}

// console.log(arrayReduce(array1, ((acc, cur) => acc + " " + cur)))
