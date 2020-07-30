/*
str.to{Upper,Lower}Case
str.slice
str.substr
str.indexOf
str.includes
str.trim{start,End,}
str.split
 */

const string = 'A quick brown fox jumps over the lazy dog.'

function strToUpperCase(str) {
    let newStr = ''

    for (let i = 0, {length} = str; i < length; i += 1) {
        const charCode = str.charCodeAt(i)
        if (charCode >= 97 && charCode <= 122) {
            newStr += String.fromCharCode(charCode - 32)
        } else {
            newStr += str[i]
        }
    }

    return newStr
}

console.log('upper case', strToUpperCase(string))

function strToLowerCase(str) {
    let newStr = ''

    for (let i = 0, {length} = str; i < length; i += 1) {
        const charCode = str.charCodeAt(i)
        if (charCode >= 65 && charCode <= 90) {
            newStr += String.fromCharCode(charCode + 32)
        } else {
            newStr += str[i]
        }
    }

    return newStr
}

console.log('lower case', strToLowerCase(string))

function strSlice(str, index, endIndex) {
    const {length} = str

    if (typeof endIndex == 'undefined') {
        endIndex = length - 1
    }

    const indexToUse = index < 0 ? length - index : index
    const endIndexToUse = endIndex < 0 ? length - endIndex : endIndex

    let newStr = ''

    const startingPoint = Math.min(length - 1, indexToUse)
    const endingPoint = Math.min(length - 1, endIndexToUse)

    for (let i = startingPoint; i < endingPoint; i += 1) {
        newStr += str[i]
    }

    return newStr
}

console.log('strSlice', strSlice(string, 0, -1))

function strSubstr(str, startIndex, count) {
    const {length} = str

    const startIndexToUse = startIndex < 0 ? length - startIndex : startIndex

    const startingPoint = Math.min(length - 1, startIndexToUse)
    const endingPoint = Math.min(length - 1, startingPoint + count)

    let newStr = ''
    for (let i = startingPoint; i < endingPoint; i += 1) {
        newStr += str[i]
    }

    return newStr
}

console.log('strSubstr', strSubstr(string, 0, 4))

function strIndexOf(str, substr) {
    let matchStartIndex = null
    let matchLength = 0

    for (let i = 0, {length} = str; i < length; i+= 1) {
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

console.log('strIndexOf', strIndexOf(string, 'quick'))

function strIncludes(str, substr) {
    let matchStartIndex = null
    let matchLength = 0

    for (let i = 0, {length} = str; i < length; i+= 1) {
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
            return true
        }
    }

    return false
}

function strTrim(str) {
    let newStr = ''

    // Trim from the beginning
    let contentIndexStart = 0
    for (let i = 0, {length} = str; i < length; i+= 1) {
        if (str[i] === ' ' || str[i] === '\n') {
            // Do nothing
        } else {
            contentIndexStart = i
            break
        }
    }

    // Trim from the end
    let i = str.length - contentIndexStart
    let contentIndexEnd = str.length
    while (i--) {
        if (str[i] === ' ' || str[i] === '\n') {
            // Do nothing
        } else {
            contentIndexEnd = i + 1
            break
        }
    }
    newStr += str.slice(contentIndexStart, contentIndexEnd)

    return newStr
}

console.log('strTrim', JSON.stringify(strTrim(`   ${string}    `)))

function strTrimStart(str) {
    // Trim from the beginning
    let contentIndexStart = 0
    for (let i = 0, {length} = str; i < length; i+= 1) {
        if (str[i] === ' ' || str[i] === '\n') {
            // Do nothing
        } else {
            contentIndexStart = i
            break
        }
    }

    return str.slice(contentIndexStart)
}

console.log('strTrimStart', JSON.stringify(strTrimStart(`    ${string}`)))

function strTrimEnd(str) {
    // Trim from the end
    let i = str.length
    let contentIndexEnd = str.length
    while (i--) {
        if (str[i] === ' ' || str[i] === '\n') {
            // Do nothing
        } else {
            contentIndexEnd = i + 1
            break
        }
    }
    return str.slice(0, contentIndexEnd)
}

console.log('strTrimEnd', JSON.stringify(strTrimEnd(`${string}    `)))

function strSplit(str, character) {
    const chunks = []
    let lastChunkIndex = -1

    for (let i = 0, {length} = str; i < length; i += 1) {
        if (str[i] === character) {
            chunks.push(str.slice(lastChunkIndex + character.length, i))
            lastChunkIndex = i
        }
    }

    if (lastChunkIndex !== str.length - 1) {
        chunks.push(str.slice(lastChunkIndex + character.length, str.length -1 ))
    }

    return chunks
}

console.log('strSplit', strSplit(string, ' '))
