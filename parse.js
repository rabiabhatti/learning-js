function isFunction(func) {
    return func && Object.prototype.toString.call(func) === '[object Function]'
}

function tokenizer(string) {
    const tokens = []
    let startString = false
    let startBoolean = false
    let startNull = false
    let startNumber = false

    const punctuation = [',', ':', '[', ']', '{', '}']
    const bool = ['r', 'u', 'e', 'a', 'l', 's', 'e']
    const nullValue = ['u', 'l', 'l']

    for (let i = 0, {length} = string; i < length; i++) {
        const currentValue = string[i]

        if (!currentValue) {
            break
        }

        if (currentValue === "'") {
            throw new Error('Invalid parse')
        }

        // The number is complete so add it to tokens
        if (isNaN(+currentValue) && startNumber) {
            tokens.push(+startNumber)

            startNumber = false
        }

        // String
        if (startString !== false) {
            if (currentValue === '"' && startString[startString.length - 1] !== "\\") {
                tokens.push(startString)
                startString = false
                continue
            }

            startString += currentValue
            continue
        }

        if (currentValue === '"') {
            startString = ""
            continue
        }


        // Punctuation
        if (punctuation.includes(currentValue)) {

            // Check for two commas in row
            if (currentValue === ',' && tokens[tokens.length - 1] === ',') {
                throw new Error('Invalid parse')
            }

            tokens.push(currentValue)
            continue
        }

        // Boolean
        if (!!startBoolean && bool.includes(currentValue) ) {
            startBoolean += currentValue

            if (startBoolean === 'true' || startBoolean === 'false') {
                tokens.push(startBoolean === 'true')
                startBoolean = false
            }
            continue
        }

        if (currentValue === 't' || currentValue === 'f') {
            startBoolean = currentValue
            continue
        } 


        // Null check
        if (!!startNull && nullValue.includes(currentValue)) {
            startNull += currentValue

            if (startNull === 'null') {
                tokens.push(null)
                startNull = false
            } 
            continue

        } 
        
        if (currentValue === 'n') {
            startNull = currentValue
            continue
        }

        
        // Number
        if (currentValue === '-') {
            startNumber = currentValue
            continue
        }

        if (!isNaN(+currentValue)) {
            startNumber = !startNumber ? currentValue : startNumber + currentValue
            continue
        }

    }

    return tokens.filter(item => item !== '')
}

// const string = JSON.stringify(false)
// const string = JSON.stringify('log the current property name, the last is ""')
// const string = JSON.stringify([1,[5, [6]], {"key": "value 3"}, 'last'])
const string = JSON.stringify({ "1": -12, "2": true, "key": { "4": false, "5": { "6": [6, "hello"] } }, "7": null })

function createObj(params) {
    const obj = {}
    let tokens = params.slice()
    tokens.reduce((acc, curr) => {

        if (curr === '}') {
            return obj
        }
        if (curr === ',') {
            return acc
        }

        if (curr === '{') {

            const startingBraceIndex = tokens.indexOf(curr)
            const nestedObjTokens = tokens.slice(startingBraceIndex, tokens.length - 1)
            const lastClosingBraceIndex = nestedObjTokens.lastIndexOf('}')

            const objTokens = nestedObjTokens.slice(1, lastClosingBraceIndex + 1)
            curr = createObj(objTokens)

            tokens.splice(startingBraceIndex, objTokens.length + 1)

        } else if (curr === '[') {

            const startingBraketIndex = tokens.indexOf(curr)
            const nestedArrTokens = tokens.slice(startingBraketIndex, tokens.length - 1)
            const lastClosingBraceIndex = nestedArrTokens.lastIndexOf(']')

            const arrTokens = nestedArrTokens.slice(1, lastClosingBraceIndex + 1)
            curr = createArray(arrTokens)

            tokens.splice(startingBraketIndex, arrTokens.length + 1)
        }

        if (!acc || !acc.length) {
            return curr
        }

        if (acc.indexOf(':') !== -1) {
            obj[acc[0]] = curr
            return []
        }

        if (curr === ':') {
            return [acc, curr]
        }

    }, null)
    return obj
}

function createArray(arg) {
    const arr = []
    let tokens = arg.slice()

    for (let i = 0, { length } = tokens; i < length; i++) {
        const value = tokens[i]
        if (value === ']') {
            break;
        }

        if (value === ',') {
            continue
        }

        if (value === '[') {
            const copyTokens = tokens.slice(i, tokens.length - 1)

            const lastClosingBraketIndex = copyTokens.lastIndexOf(']')
            const nestedArrTokens = copyTokens.slice(1, lastClosingBraketIndex + 1)

            const nestedArr = createArray(nestedArrTokens)
            arr.push(nestedArr)

            tokens.splice(i, nestedArrTokens.length + 1)

        } else if (value === '{') {
            const copyTokens = tokens.slice(i, tokens.length - 1)

            const lastClosingBraceIndex = copyTokens.lastIndexOf('}')
            const objTokens = copyTokens.slice(1, lastClosingBraceIndex + 1)

            const obj = createObj(objTokens)
            arr.push(obj)

            tokens.splice(i, objTokens.length + 1)

        } else {
            arr.push(value)
        }
    }
    return arr.filter(item => item !== undefined)
}


function parse(input, reviver) {

    function filter(holder, key) {
        let keyHolder
        let valueHolder
        const value = holder[key]
        for (keyHolder in value) {
            if (Object.prototype.hasOwnProperty.call(value, keyHolder)) {
                valueHolder = filter(value, keyHolder)
                if (valueHolder) {
                    value[keyHolder] = valueHolder
                } else {
                    delete value[keyHolder]
                }
            }
        }
        return reviver.call(holder, key, value)
    }

    if (input.indexOf("'") !== -1 || input === '"') {
        return "Invalid parse"
    }

    if (input === '""') {
        return ''
    }

    const tokens = tokenizer(input)

    if (tokens.length === 1) {
        return tokens[0].replace(/\\/g, '')
    }

    if (tokens[0] === '[') {
        return createArray(tokens.slice(1))
    }

    if (tokens[0] === '{') {
        let obj = createObj(tokens.slice(1))

        if (isFunction(reviver)) {
            obj = filter({ "": obj }, "")
        }

        return obj
    }
}

console.log(parse(string))
// console.log(JSON.parse(JSON.stringify('')))