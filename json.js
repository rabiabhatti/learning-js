function isFunction(func) {
    return func && Object.prototype.toString.call(func) === '[object Function]'
}

function isObject(obj) {
    return obj && Object.prototype.toString.call(obj) === '[object Object]'
}

function checkForCircular(obj) {
    if (!isObject(obj)) {
        return
    }

    const seen = []
    seen.push(obj)
    for (const value of Object.values(obj)) {
        if (isObject(value) && seen.includes(value)) {
            return "circular"
        }
        seen.push(value)
    }
}

function getSpacing(space) {
    let spacing = space ? (typeof space === 'number' ? (space >= 10 ? 10 : space) : space) : null

    if (typeof spacing === 'number') {
        return " ".repeat(spacing)
    }

    if (typeof spacing === 'string') {
        return spacing
        
    }
    return ""
}

const tokenTypes = [
    {
        regexp: /^\s+/,
        create: (value, position) => ({ //whitespace
            type: 'whitespace',
            position,
            raw: value,
            value
        })
    },{
        regexp: /^"(?:[^"\\]|\\.)*"/,
        create: (value, position) => ({ //string
            type: 'string',
            position,
            raw: value,
            value: value
            .slice(1, -1)
            .replace(/\\"/g, '"')
        })
    },{
        regexp: /^(true|false|null)/,
        create: (value, position) => ({ // boolean
            type: 'boolean',
            position,
            raw: value,
            value: value === 'null'
            ? null
            : value === 'true'
        })
    },{
        regexp: /^(-?(?:0|[1-9]\d*)(?:\.\d+)?(?:[eE][+-]?\d+)?)/,
        create: (value, position) => ({ // number
            type: 'number',
            position,
            raw: value,
            value: +value
        })
    },{
        regexp: /^({|}|\[|]|:|,)/,
        create: (value, position) => ({ // punctuation
            type: 'punctuation',
            position,
            raw: value,
            value
        })
    }
    ]
    
    const tokenize = (json, tokens = [],position = { lineNo: 1, column: 1 }) => {
    let firstChar = json[0]
    
    if (!firstChar) {
        return tokens
    }
    
    const [createToken, str] = tokenTypes.reduce((acc, curr) => {
        if (acc) {
            return acc
        }

        const str = match(curr.regexp)
        if (!str) {
            return acc
        }
    
        return [curr.create,str]
    }, null)
    
    const token = createToken(
        str,
        str.length === 1
        ? position
        : { start: position, end: updateColumn(str.length - 1) }
    )
    
    const lines = str.match(/^\n+/g)
    
    if (lines) {
        return tokenize(proceedNext(lines),tokens, { lineNo: position.lineNo + lines.length, column: 1 } )
    }
    
    return next(token)
    
    function updateColumn (column) {
        return {
        lineNo: position.lineNo,
        column: position.column + column
        }
    }
    
    function next (token, nextPosition) {
        return tokenize(
        proceedNext(token.raw),
        tokens.concat([token]),
        nextPosition || updateColumn(token.raw.length)
        )
    }
    
    function match (re) {
        const m = re.exec(json)
        if (!m) return
        const str = m[0]
        return str
    }
    
    function proceedNext(str) {
        return json.slice(str.length)
    }
}

// const obj = { 4 : "Hello World \n", 'nested': {'key2': ['value2', 'three']}, 'last key': 'last value'}
// const arr = [3, 'hello world', 'last', [4, 'world', null, {'key': 'value'}, 'shala'], 'last 2']
// const tokens = tokenize(JSON.stringify(obj)).map(item => item.value)
// console.log(tokens)

function createObj(params) {
    const obj = {}
    let tokens = params.slice()
    tokens.reduce((acc, curr) => {

        if (curr === '}') {
            return obj
        }
        if (curr === ',') {
            return 
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

        if (acc.indexOf(':') !== -1 ) {
            obj[acc[0]] = curr
            return []
        }

        if (curr === ':') {
            return [acc, curr]
        }

    }, null)
    return obj
}

function createArray(params) {
    const arr = []
    let tokens = params.slice()

    for (let i = 0, {length} = tokens; i < length; i++) {
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






function jsonStringify(input, replacer, space) {
    const circular = checkForCircular(input)
    if (circular === "circular") {
        return "Converting circular structure to JSON"
    }

    if (input == null || input === Infinity || input === 'NaN' || isFunction(input) || typeof input === 'symbol') {
        return "null"
    }

    if (typeof input === 'bigint') {
        return "TypeError: BigInt value can't be serialized in JSON"
    }

    if (typeof input === 'boolean' || input instanceof Boolean) {
        return input.toString()
    }

    if (typeof  input === 'number' || input instanceof Number) {
        return isFinite(input) ? input.toString() : "null"
    }

    if (typeof input === 'string' || input instanceof String) {
        return `"${input}"`
    }

    if (Array.isArray(input) || input instanceof Array) {
        let arr = []
        let returnValue = space ? `[\n` :  "["

        if (replacer && isFunction(replacer)) {
            for (let i = 0, {length} = input; i < length; i++) {
                const replacerResult = replacer(i, input[i])
                if (replacerResult) {
                    arr.push(replacerResult)
                }
            }
        } else {
            arr = input
        }

        for (let i = 0, {length} = arr; i < length; i++) {
            const stringed = jsonStringify(arr[i])
            if (stringed === "TypeError: BigInt value can't be serialized in JSON") {
                return stringed
            }

            const spacing = getSpacing(space)
            if (spacing) {
                returnValue += (i ? `,${spacing}` : '') + stringed
            } else {
                returnValue += (i ? "," : '') + stringed
            }

        }
        return returnValue + (space ? `\n]` :  "]")
    }

    if ( input instanceof Set || input instanceof Map || input instanceof WeakSet || input instanceof WeakMap) {
        return "{}"
    }

    if (typeof input === 'object' || isObject(input)) {

        if (typeof input.toJSON === 'function') {
            return jsonStringify(input.toJSON())
        }

        let obj = {}

        if (replacer) {
            if (Array.isArray(replacer)) {
                for (const item of replacer) {
                    obj[item] = input[item]
                }
            } else if (isFunction(replacer)) {
                for (const key in input) {
                    if (!input.hasOwnProperty(key)) {
                        continue
                    }

                    const result = replacer(replacer(key, input[key]))
                    if (result) {
                        obj[key] = result
                    }
                }
            }
        } else {
            obj = input
        }


        let arr = [];
        for (const item in obj) {
            if (!input.hasOwnProperty(item)) {
                continue
            }

            const key = jsonStringify(item)
            const value = jsonStringify(obj[item])

            if (key === "TypeError: BigInt value can't be serialized in JSON" || value === "TypeError: BigInt value can't be serialized in JSON") {
                return "TypeError: BigInt value can't be serialized in JSON"
            }

            if (key === 'null' || value === 'null') {
                return "{}"
            }

            arr.push(key + ':' + value)
        }

        const spacing = getSpacing(space)
        const result = spacing ? arr.join(`,${spacing}`) : arr.join(',')

        return (space ? `{\n` :  "{") + result +  (space ? `\n}` :  "}")
    }
}






function jsonParse(input, reviver) {

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

    if (input === 'null') {
        return null
    }

    if (input.indexOf("'") !== -1) {
        return "Invalid parse"
    }

    if (Boolean(input)) {
        if (input === 'true') {
            return true
        }
        if (input === 'false') {
            return false
        }
    }

    const number = Number(input)
    if (!isNaN(number)) {
        return number
    }

    if (input[0] === '[') {
        const trimmed = input.slice(1,-1)

        if (trimmed === '') {
            return []
        }

        const tokens = tokenize(input).map(item => item.value)

        return createArray(tokens.slice(1))

    }

    if (input[0] === '{') {
        const trimmed = input.slice(1,-1)
        if (trimmed === '') {
            return {}
        }

        const tokens = tokenize(input).map(item => item.value)

        let obj = createObj(tokens.slice(1))

        if (isFunction(reviver)) {
            obj = filter({"": obj}, "")
        }

        return obj
    }

    return input.trim().split('"').join('')

}
// console.log(jsonParse(JSON.stringify({"p": 5}), (key, value) =>
//     typeof value === 'number'
//         ? value * 2
//         : value
// ))
// console.log(jsonParse('{"1": 1, "2": 2, "3": {"4": 4, "5": {"6": 6}}, "7": 7}'))
// const string = JSON.stringify([1,[5, [6]], {"key": "value"}, 'last'])
// const string = JSON.stringify({"1": 1, "2": 2, true: {"4": 4, "5": {"6": [6, 'hello']}}, "7": null})
// console.log(jsonParse(string))

