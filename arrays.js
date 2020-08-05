const deepArr = ['hello', 'one', ['two', 'three', ['four', ['five']]]]
const deepArr2 = ['hello', ['one', ['two', 'three', ['four', ['five']]]]]
const array1 = ['hello', 'one', 'two', 'three', 'four', 'five']
const array2 = ['hello', 1, 'two', 'three']

function arrayEvery(array, callback) {
    for (let i = 0; i < array.length; i++) {
        const passed = callback(array[i])
        if (!passed) {
            return false
        }
    }
    return true
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
    let newBegin = begin == null ? 0 : begin
    let newEnd = begin == null ? length - 1 : end

    if (newBegin < 0) {
        newBegin = length + newBegin
    }
    if (newEnd < 0) {
        newEnd = length + newEnd
    }

    for (let i = newBegin; i < newEnd; i++) {
        copy[i] = filler
    }

    return copy
}

// console.log(arrayFill(array1, 'world', 1, 3))


function arrayFilter(array, callback) {
    const filtered = []
    for (let i = 0, {length} = array; i < length; i +=1) {
        if (callback(array[i])) {
            filtered.push(array[i])
        }
    }
    return filtered
}

// console.log(arrayFilter(array2, checkForString))

function arrayFind(array, callback) {
    for (let i = 0, {length} = array; i < length; i +=1) {
        if (callback(array[i])) {
            return array[i]
        }
    }
}
// console.log(arrayFind(array1, (item) => item === 'hello'))

function arrayFindIndex(array, callback) {
    for (let i = 0, {length} = array; i < length; i +=1) {
        if (callback(array[i])) {
            return i
        }
    }
    return -1
}
// console.log(arrayFindIndex(array1, (item) => item === 'three'))

function arrayFlat(array, deep = 1) {
    if (deep <= 0) {
        return array.slice()
    }
    return array.reduce((acc, cur) => acc.concat(Array.isArray(cur) ? arrayFlat(cur, deep - 1) : cur), [])
}
// console.log(arrayFlat(deepArr, 2))

function arrayFlatMap(array, callback) {
    return array.reduce((acc, current) => acc.concat(callback(current)), [])
}
// console.log(arrayFlatMap(deepArr2, (item => 'new '+item)))
// console.log(deepArr2.flatMap(item => 'new '+item))

function arrayForEach(arr, callback) {
    for (let i = 0, {length} = arr; i < length; i +=1) {
        callback(arr[i])
    }
}
// arrayForEach(array1, (item => "new " + item))

function arrayIncludes(array, match) {
    for (let i = 0, {length} = array; i < length; i +=1) {
        if (array[i] === match) {
            return true
        }
    }
    return false
}
// console.log(arrayIncludes(array1, 'hello'))

function arrayJoin(array, separator) {
    const newSep = separator ? separator : ','
    if (array.length === 1) {
        return `${array[0]}`
    }
    let str = ''
    for (let i = 0, {length} = array; i < length; i +=1) {
        str += array[i] + `${i === array.length - 1 ? '' : newSep}`
    }
    return str
}
// console.log(arrayJoin(array1, ' & '))

function arrayLastIndexOf(array, element) {
    const startIndex = array.length - 1
    for (let i = startIndex; i >= 0; i--) {
        if (array[i] === element) {
            return i
        }
    }
    return -1
}
// console.log(arrayLastIndexOf([...array1, 'hello'], 'hello'))

function arrayIndexOf(array, element) {
    for (let i = 0, {length} = array; i < length; i +=1) {
        if (array[i] === element) {
            return i
        }
    }
    return -1
}
// console.log(arrayIndexOf(array1, 'three'))

function arrayMap(array, callback) {
    const mapped = []
    for (let i = 0, {length} = array; i < length; i +=1) {
        mapped.push(callback(array[i]))
    }
    return mapped
}
// console.log(arrayMap(array1, (item => 'new ' + item)))

function arrayPop(arr) {
    const last = arr[arr.length -1]
    delete arr[arr.length -1]
    arr.length -= 1
    return last
}
// console.log(arrayPop(array1))

function arrayPush(array, element) {
    array[array.length] = element
    return array.length
}
// console.log(arrayPush(array1, 'world'))

function arrayReverse(arr) {
    const {length} = arr
    const iterations = Math.floor(length / 2)

    for (let i = 0; i < iterations; i +=1) {
        const first = arr[i]
        arr[i] = arr[length - 1 - i]
        arr[length - 1 -i] = first
    }
    return arr
}
// console.log(arrayReverse(array1))

function arrayShift(array) {
    const { length } = array

    if (length) {
        const first = array[0]
        for (let i = 1; i < length; i += 1) {
            array[i - 1] = array[i]
        }
        delete array[length -1]
        array.length -= 1
        return first
    }
}
// console.log(arrayShift(array1))

function arraySlice(arr, begin, end) {
    const { length } = arr
    let newBegin = begin == null ? 0 : begin
    let newEnd = end == null ? length - 1 : end

    if (newBegin < 0) {
        newBegin = length + newBegin
    }

    if (newEnd < 0) {
        newEnd = length + end
    } else if (newEnd > length) {
        newEnd = length
    }

    if (begin >= length) {
        return []
    }
    const sliced = []
    for (let i = newBegin; i < newEnd; i++) {
        sliced.push(arr[i])
    }
    return sliced
}
// console.log(arraySlice(array1, 0, -5))


function arraySome(arr, callback) {
    for (let i = 0, {length} = arr; i < length; i += 1) {
        if (callback(arr[i])) {
            return true
        }
    }
    return false
}
// console.log(arraySome(array1, (item => item.length > 4)))

function arrayUnshift(arr, ...items) {
    const {length} = arr
    const itemsLength = items.length
    let j = 0
    for (let i = length; i <= length + itemsLength ; i += 1) {
        if (j < itemsLength) {
            arr[i] = items[j]
            j += 1
        }

        const existedItem =  arr[i]
        if (i < itemsLength) {
            arr.length += 1
            arr[i] = items[i]
            arr[i + itemsLength] = existedItem
        }
    }
    return arr
}
console.log(arrayUnshift(array1, 'world','test'))

function arraySplice(arr, begin, count, ...items) {
    const { length } = arr
    let newBegin = begin == null ? 0 : begin
    let newCount = count == null ? length - begin : count

    if (newBegin < 0) {
        newBegin = length + newBegin
    }
    if (newCount <= 0) {
        newCount = 0
    }

    const start = arr.slice(0, newBegin)
    const deleted = arr.slice(newBegin, newBegin + newCount)
    const last = arr.slice(newBegin + newCount, length)
    arr = start.concat(items.concat(last))

    return deleted
}
// console.log(arraySplice(array1, 2, 2, 'hello', 'world', '1'))

function arrayReduce(array, callback, initialValue) {
    let result = initialValue == null ? array[0] : initialValue
    let i = initialValue == null ? 1 : 0

    for (i, {length} = array; i < length; i += 1) {
        result = callback(result, array[i])
    }
    return result
}
// console.log(arrayReduce(array1, ((acc, cur) => acc + " " + cur)))

function arrayRightReduce(array, callback, initialValue) {
    const {length} = array
    let result = initialValue == null ? array[0] : initialValue
    let i = initialValue == null ? length - 1  : length - 2

    for (i; i >= 0; i -= 1) {
        result = callback(result, array[i])
    }
    return result
}

// console.log(arrayRightReduce(array1, ((acc, cur) => acc + " " + cur), 2))
