const string = 'A quick brown fox jumps over the lazy dog.'

function stringUppercase(str) {
    let newStr = ''
    for (let i = 0; i< str.length; i++) {
        const charCode = str.charCodeAt(i)
        if (charCode >= 97 && charCode <= 122) {
            newStr += String.fromCharCode(charCode - 32)
        } else newStr += str[i]
    }
    return newStr
}

function stringLowerCase(str) {
    let newStr = ''
    for (let i = 0; i < str.length; i++) {
        const charCode = str.charCodeAt(i)
        if (charCode >= 65 && charCode <= 90) {
            newStr += String.fromCharCode(charCode + 32)
        } else newStr += str[i]
    }
    return newStr
}

function stringSlice(str, begin, end) {
    const { length } = str
    let newStr = ''

    begin = begin ? begin : 0
    end = end ? end : length - 1
    const startIndex = begin < 0 ? length + begin : begin
    const endIndex = end < 0 ? length + end : end

    const startSlicingFrom = Math.min(length - 1, startIndex)
    const endSlicingAt = Math.min(length - 1, endIndex)

    for (let i = startSlicingFrom; i < endSlicingAt; i++) {
        newStr += str[i]
    }
    return newStr
}

function stringSubstr(str, begin, count) {
    const { length } = str
    let newStr = ''

    count = count ? count : length -1
    const beginIndex = begin < 0 ? length + begin : begin

    const startFrom = Math.min(length -1, beginIndex)

    const endAt = Math.min(length - 1, startFrom + count)

    for (let i = startFrom; i < endAt; i++) {
        newStr += str[i]
    }
    return newStr
}

function stringIndexOf(str, substr) {
    const {length} = str
    let matchStartIndex = null
    let matchLength = 0

    for (let i = 0; i < length; i++) {
        if (matchStartIndex == null) {
            if (str[i] === substr[0]) {
                matchStartIndex = i
                matchLength++
            }
        } else if (str[i] === substr[matchLength]) {
            matchLength++
        } else {
            matchStartIndex = null
        }

        if (matchLength === substr.length) {
            return matchStartIndex
        }
    }
    return -1
}

function stringTrim(str) {
    const { length } = str
    let newStr = ''

    let startIndex = 0
    for (let i = 0; i < length; i++) {
        if (str[i] === ' ' || str[i] === '\n') {

        } else {
            startIndex = i
            break
        }
    }

    let i = length - startIndex
    let endIndex = length
    while (--i) {
        if (endIndex === ' ' || endIndex === '\n') {

        } else {
            endIndex = i + 1
            break
        }
    }
    newStr += str.slice(startIndex, endIndex)
    return newStr
}

function stringSplit(str, separator) {
    const { length } = str
    const chunks = []
    let lastChuckIndex = -1

    for (let i = 0; i <length; i++) {
        if (str[i] === separator) {
            chunks.push(str.slice(lastChuckIndex + separator.length, i))
            lastChuckIndex = i
        }
    }

    if (lastChuckIndex !== length - 1) {
        chunks.push(str.slice(lastChuckIndex + separator.length, length-1))
    }
    return chunks
}

console.log(stringSplit(string, ' '))
