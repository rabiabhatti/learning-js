const deepArr = ['hello', 'one', ['two', 'three', ['four', ['five']]]]
const deepArr2 = ['hello', ['one', ['two', 'three', ['four', ['five']]]]]
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
    const copy = array.slice()
    if (end === 0) {
        return copy
    }
    begin = begin == null ? 0 : begin
    end = begin == null ? length - 1 : end

    begin = begin < 0 ? length + begin : begin
    end = end < 0 ? length + end : end


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

function arrayFind(array, callback) {
    let found = undefined
    for (let i = 0; i < array.length; i++) {
        const res = callback(array[i])
        if (res) {
            found = array[i]
            break
        }
    }
    return found
}
// console.log(arrayFind(array1, (item) => item === 'hello'))

function arrayFindIndex(array, callback) {
    let index = -1
    for (let i = 0; i < array.length; i++) {
        const res = callback(array[i])
        if (res) {
            index = i
            break
        }
    }
    return index
}
// console.log(arrayFindIndex(array1, (item) => item === 'three'))

function arrayFlat(array, deep) {
    if (deep <= 0) {
        return array.slice()
    } else {
        return array.reduce((acc, cur) => acc.concat(Array.isArray(cur) ? arrayFlat(cur, deep - 1) : cur), [])
    }
}
// console.log(arrayFlat(deepArr, 2))

function arrayFlatMap(array, callback) {
    return array.reduce((acc, current) => acc.concat(callback(current)), [])
}
// console.log(arrayFlatMap(deepArr2, (item => 'new '+item)))
// console.log(deepArr2.flatMap(item => 'new '+item))

function arrayForEach(arr, callback) {
    for (let i = 0; i <arr.length; i++) {
        callback(arr[i])
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
    const startIndex = array.length - 1
    for (let i = startIndex; i >= 0; i--) {
        if (array[i] === element) {
            index = i
            break
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
    delete arr[arr.length -1]
    arr = arr.filter(Boolean)
    return last
}
// console.log(arrayPop(array1))

function arrayPush(array, element) {
    array[array.length] = element
    return array.length
}
// console.log(arrayPush(array1, 'world'))

function arrayReverse(arr) {
    let reversed = []
    for (let i = arr.length - 1; i >= 0; i--) {
        reversed = reversed.concat(arr[i])
    }
    return reversed
}
// console.log(arrayReverse(array1))

function arrayShift(array) {
    if (!array.length) {
        return undefined
    } else {
        const first = array[0]
        delete array[0]
        array = array.filter(Boolean)
        return first
    }
}
// console.log(arrayShift(array1))

function arraySlice(arr, begin, end) {
    const sliced = []

    begin = begin == null ? 0 : begin
    end = end == null ? arr.length - 1 : end

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
    return items.concat(arr)
}
// console.log(arrayUnshift(array1, 'world','test'))

function arraySplice(arr, begin, count, ...items) {

    begin = begin == null ? 0 : begin
    count = count == null ? arr.length - begin : count

    begin = begin < 0 ? arr.length + begin : begin
    count = count <= 0 ? 0 : count

    const start = arr.slice(0, begin)
    const deleted = arr.slice(begin, begin + count)
    const last = arr.slice(begin + count, arr.length)
    arr = start.concat(items.concat(last))

    return deleted
}
// console.log(arraySplice(array1, 2, 2, 'hello', 'world', '1'))

function arrayReduce(array, callback, initialValue) {
    let result = initialValue == null ? array[0] : initialValue
    let i = initialValue == null ? 1 : 0
    for (i; i < array.length; i++) {
        result = callback(result, array[i])
    }
    return result
}
// console.log(arrayReduce(array1, ((acc, cur) => acc + " " + cur)))

function arrayRightReduce(array, callback, initialValue) {
    let result = initialValue == null ? array[0] : initialValue
    let i = initialValue == null ? array.length - 1  : array.length - 2
    for (i; i >= 0; i--) {
        result = callback(result, array[i])
    }
    return result
}

// console.log(arrayRightReduce(array1, ((acc, cur) => acc + " " + cur), 2))
