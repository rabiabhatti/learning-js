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

    if (typeof input === 'number' || input instanceof Number) {
        return isFinite(input) ? input.toString() : "null"
    }

    if (typeof input === 'string' || input instanceof String) {
        return `"${input}"`
    }

    if (Array.isArray(input) || input instanceof Array) {
        let arr = []
        let returnValue = space ? `[\n` : "["

        if (replacer && isFunction(replacer)) {
            for (let i = 0, { length } = input; i < length; i++) {
                const replacerResult = replacer(i, input[i])
                if (replacerResult) {
                    arr.push(replacerResult)
                }
            }
        } else {
            arr = input
        }

        for (let i = 0, { length } = arr; i < length; i++) {
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
        return returnValue + (space ? `\n]` : "]")
    }

    if (input instanceof Set || input instanceof Map || input instanceof WeakSet || input instanceof WeakMap) {
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

        return (space ? `{\n` : "{") + result + (space ? `\n}` : "}")
    }
}

function matchRegex(regex, string) {
    const matched = regex.exec(string)

    if (!matched) {
        return
    }

    return matched[0]
}

const tokenTypes = [
    {
        regexp: /^\s+/,
        create: (value, position) => ({
            type: 'whitespace',
            position,
            raw: value,
            value
        })
    }, {
        regexp: /^"(?:[^"\\]|\\.)*"/,
        create: (value, position) => ({
            type: 'string',
            position,
            raw: value,
            value: value
                .slice(1, -1)
                .replace(/\\"/g, '"')
        })
    }, {
        regexp: /^(true|false|null)/,
        create: (value, position) => ({
            type: 'boolean',
            position,
            raw: value,
            value: value === 'null'
                ? null
                : value === 'true'
        })
    }, {
        regexp: /^(-?(?:0|[1-9]\d*)(?:\.\d+)?(?:[eE][+-]?\d+)?)/,
        create: (value, position) => ({
            type: 'number',
            position,
            raw: value,
            value: +value
        })
    }, {
        regexp: /^({|}|\[|]|:|,)/,
        create: (value, position) => ({
            type: 'punctuation',
            position,
            raw: value,
            value
        })
    }
]

const tokenize = (json, tokens = [], position = { row: 1, column: 1 }) => {

    if (!json[0]) {
        return tokens
    }

    const [createToken, matched] = tokenTypes.reduce((acc, curr) => {
        if (acc) {
            return acc
        }

        const matched = matchRegex(curr.regexp, json)
        if (!matched) {
            return acc
        }

        return [curr.create, matched]
    }, null)

    const token = createToken(
        matched,
        matched.length === 1
            ? position
            : { start: position, end: updateColumn(matched.length - 1) }
    )

    const lines = matched.match(/^\n+/g, json)

    if (lines) {
        const newPosition = { row: position.row + lines.length, column: 1 }
        return tokenize(advance(lines), tokens, newPosition)
    }

    return next(token)

    function updateColumn(column) {
        return {
            row: position.row,
            column: position.column + column
        }
    }

    function next(token, nextPosition) {
        const newPosition = nextPosition || updateColumn(token.raw.length)
        const newTokens = tokens.concat([token])

        return tokenize(advance(token.raw), newTokens, newPosition)
    }

    function advance(str) {
        return json.slice(str.length)
    }
}

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

    if (input.indexOf("'") !== -1 || input === '"') {
        return "Invalid parse"
    }

    const tokens = tokenize(input).map(item => item.value)
    
    if (tokens.length === 1) {
        return tokens[0]
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
// console.log(jsonParse(JSON.stringify({"p": 5}), (key, value) =>
//     typeof value === 'number'
//         ? value * 2
//         : value
// ))
// console.log(jsonParse('{"1": 1, "2": 2, "3": {"4": 4, "5": {"6": 6}}, "7": 7}'))
// const string = JSON.stringify([1,[5, [6]], {"key": "value"}, 'last'])
const string = JSON.stringify({ "1": 1, "2": 2, true: { "4": 4, "5": { "6": [6, 'hello'] } }, "7": null })
// const string = JSON.stringify('log the current property name, the last is ""')
console.log(jsonParse(string))
// console.log(JSON.parse(string))

