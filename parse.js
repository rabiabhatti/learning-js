function isFunction(func) {
    return func && Object.prototype.toString.call(func) === '[object Function]'
}

function tokenizer(string) {
    const jsonStarters = ['{', '[', '"', 'n', 't', 'f', '-']
    const firstChar = string[0]

    if (!jsonStarters.includes(firstChar) && isNaN(+firstChar)) {
        throw new Error('Invalid parse')
    }
    
    const tokens = []
    let openString = false
    let openBoolean = false
    let openNull = false
    let openNumber = false

    let stringValue
    let boolValue
    let nullValue 
    let numberValue

    const punctuation = [',', ':', '[', ']', '{', '}']
    const bool = ['r', 'u', 'e', 'a', 'l', 's', 'e']
    const nullTokens = ['u', 'l', 'l']

    for (let i = 0, {length} = string; i < length; i++) {
        const currentValue = string[i]

        if (!currentValue) {
            break
        }

        let prevValue = i ? string[i - 1] : null

        // The number is complete so add it to tokens
        if (openNumber && isNaN(+currentValue)) {
            tokens.push(+numberValue)

            openNumber = false
        }

        // String
        if (openString) {
            if (currentValue === '"' && stringValue[stringValue.length - 1] !== "\\") {
                tokens.push(stringValue)
                openString = false
                continue
            }

            stringValue += currentValue
            continue
        }
        if (currentValue === '"' && !openNumber && !openBoolean && !openNull) {
            stringValue = ""
            openString = true
            continue
        }


        // Punctuation
        if (punctuation.includes(currentValue) && !openString && !openBoolean && !openNull) {

            // Check for two commas in row
            if (currentValue === ',' && tokens[tokens.length - 1] === ',') {
                throw new Error('Invalid parse')
            }

            tokens.push(currentValue)
            continue
        }

        // Boolean
        if ((currentValue === 't' || currentValue === 'f') && !openString && !openNumber && !openNull) {
            boolValue = currentValue
            openBoolean = true
            continue
        } 

        if (openBoolean) {
            if (!bool.includes(currentValue)) {
                throw new Error('Invalid parse')
            }

            boolValue += currentValue

            if (boolValue === 'true' || boolValue === 'false') {
                tokens.push(boolValue === 'true')
                openBoolean = false
            }
            continue
        }


        // Null check
        if (currentValue === 'n' && !openString && !openNumber && !openBoolean) {
            nullValue = currentValue
            openNull = true
            continue
        } 

        if (openNull) {
            if (!nullTokens.includes(currentValue)) {
                throw new Error('Invalid parse')
            }

            nullValue += currentValue

            if (nullValue === 'null') {
                
                tokens.push(null)
                openNull = false
            } 
            continue
        } 
        
        // Number
        const isNumber = !isNaN(+currentValue)
        
        if ((currentValue === '-' || isNumber) && !openString && !openNull && !openBoolean) {
            numberValue = !openNumber ? currentValue : numberValue + currentValue
            openNumber = true
            continue
        }
        
        throw new Error('Invalid parse')
    }

    return tokens.filter(item => item !== '')
}

// const string = JSON.stringify(false)
// const string = JSON.stringify('log the current property name, the last is ""')
const string = JSON.stringify([1,[5, [6]], {"key": "value 3"}, "last"])
// const string = JSON.stringify({ "1": -12, "2": true, "key": { "4": false, "5": { "6": [6, "hello"] } }, "7": null })

function createObj(args) {
    const obj = {}
    let tokens = args.slice()

    tokens.reduce((acc, curr, index) => {

        if (curr === '}') {
            return obj
        }

        if (curr === ',') {
            return acc
        }

        if (curr === '{') { // Check for nested object

            const nestedObjTokens = tokens.slice(index, tokens.length - 1)
            const lastClosingBraceIndex = nestedObjTokens.lastIndexOf('}')

            const nestedObj = nestedObjTokens.slice(1, lastClosingBraceIndex + 1)

            curr = createObj(nestedObj)

            tokens.splice(index, nestedObj.length + 1)

        } else if (curr === '[') { // Check for array

            const nestedArrTokens = tokens.slice(index, tokens.length - 1)
            const lastClosingBraceIndex = nestedArrTokens.lastIndexOf(']')

            const arrTokens = nestedArrTokens.slice(1, lastClosingBraceIndex + 1)
            curr = createArray(arrTokens)

            tokens.splice(index, arrTokens.length + 1)
        }

        if (!acc || !acc.length) {
            return curr
        }

        if (acc.indexOf(':') !== -1) {
            const key = acc[0]
            obj[key] = curr
            return []
        }

        if (curr === ':') {
            return [acc, curr]
        }

    }, null)

    return obj
}

function createArray(args) {
    const arr = []
    let tokens = args.slice()

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

    // Strings, boolean, null
    if (tokens.length === 1) {
        return tokens[0].replace(/\\/g, '')
    }

    // Arrays
    if (tokens[0] === '[') {
        return createArray(tokens.slice(1))
    }

    // Objects
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