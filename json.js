function isFunction(func) {
    return func && Object.prototype.toString.call(func) === '[object Function]'
}

function isObject(o) {
    return o && Object.prototype.toString.call(o) === '[object Object]'
}

function checkForCircular(obj) {
    const seen = []
    if (typeof obj === 'object') {
        seen.push(obj)
        for (const value of Object.values(obj)) {
            if (typeof value === "object" && value !== null) {
                if (seen.includes(value)) {
                    return "circular"
                }
                seen.push(value)
            }
        }
    }
}

function getSpacing(space) {
    let spacing = space ? (typeof space === 'number' ? (space >= 10 ? 10 : space) : space) : null

    let str = ''

    if (typeof spacing === 'number') {
        for (let i = 0; i < spacing; i++) {
            str += " "
        }
    } else if (typeof spacing === 'string') {
        str = spacing
    }
    return str
}

function jsonStringify(input, replacer, space) {
    const circular = checkForCircular(input)
    if (circular === "circular") {
        return "Converting circular structure to JSON"
    }

    if (input === null || input === undefined || input === Infinity || input === 'NaN' || isFunction(input) || typeof input === 'symbol') {
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
        let res = space ? `[\n` :  "["

        if (replacer && isFunction(replacer)) {
            for (let i = 0, {length} = input; i < length; i++) {
                const result = replacer(i, input[i])
                if (result) {
                    arr.push(result)
                }
            }
        } else {
            arr = input
        }

        for (let i = 0, {length} = arr; i < length; i++) {
            const value = jsonStringify(arr[i])
            if (value === "TypeError: BigInt value can't be serialized in JSON") {
                return value
            }
            const str = getSpacing(space)
            if (str) {
                res += (i ? `, ${str}` : '') + value
            } else {
                res += (i ? ", " : '') + value
            }

        }
        return res + (space ? `\n]` :  "]")
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
                for (const k in input) {
                    if (input.hasOwnProperty(k)) {
                        obj[k] = replacer(k, input[k])
                    }
                }
            }
        } else {
            obj = input
        }


        let res = [];
        for (const k in obj) {
            if (obj.hasOwnProperty(k)) {
                const key = jsonStringify(k)
                const value = jsonStringify(obj[k])

                if (key === "TypeError: BigInt value can't be serialized in JSON" || value === "TypeError: BigInt value can't be serialized in JSON") {
                    return "TypeError: BigInt value can't be serialized in JSON"
                }

                if (key === 'null' || value === 'null') {
                    return "{}"
                }

                res.push(key + ': ' + value)
            }
        }

        const str = getSpacing(space)
        let result
        if (str) {
            result = res.join(`, ${str}`)
        } else {
            result = res.join(', ')
        }

        return (space ? `{\n` :  "{") + result +  (space ? `\n}` :  "}")
    }
}






function jsonParse(input, reviver) {

    function filter(holder, key) {
        let k
        let v
        const value = holder[key]
        for (k in value) {
            if (Object.prototype.hasOwnProperty.call(value, k)) {
                v = filter(value, k)
                if (v) {
                    value[k] = v
                } else {
                    delete value[k]
                }
            }
        }
        return reviver.call(holder, key, value)
    }

    if (input === 'null') {
        return null
    }

    const isBoolean = Boolean(input)
    if (isBoolean) {
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

    const trimmed = input.slice(1,-1)

    const isArray = input[0] === '['
    if (isArray) {
        if (trimmed === '') {
            return []
        }

        const arr = []
        const res = []
        let list
        const nested = trimmed.split('[')

        if (nested.length > 1) {
            let first = nested.shift().split(',').filter(item => item !== ' ')

            const firstIndex = trimmed.indexOf('[')
            const lastIndex = trimmed.lastIndexOf(']')

            const middleString = trimmed.slice(firstIndex, lastIndex + 1)

            arr.push(middleString)

            if (lastIndex + 1 < trimmed.length - 1) {
                const remainingItems = trimmed.slice(lastIndex + 2 ).split(',')
                first = [...first, ...remainingItems]
            }
            list = first

        } else {
            list = trimmed.split(',')
        }

        for (const item of list) {
            if (item.trim() === ',' || item.trim() === '') {
                return "Invalid parse"
            }
            arr.push(jsonParse(item))
        }

        for (const item of arr) {
            res.push(jsonParse(item))
        }

        return res
    }


    const isObj = input[0] === '{'
    if (isObj) {

        if (trimmed === '') {
            return {}
        }

        let obj = {}
        let res = {}
        let list = []
        let nested = trimmed.split('{')

        if (nested.length > 1) {
            let first = nested.shift().split(',')
            const nextKey = first.pop().split(':')[0].trim()

            const firstIndex = trimmed.indexOf('{')
            const lastIndex = trimmed.lastIndexOf('}')
            obj[nextKey] = trimmed.slice(firstIndex, lastIndex + 1)

            if (lastIndex + 1 < trimmed.length - 1) {
                const remainingItems = trimmed.slice(lastIndex + 2 ).split(',')
                first = [...first, ...remainingItems]
            }
            list = [...first]

        } else {
            list = trimmed.split(',')
        }

        for (const item of list) {
            if (item.trim() === ',' || item.trim() === '') {
                return "Invalid parse"
            }
            const temp = item.split(':')
            const key = jsonParse(temp[0])
            obj[key] = jsonParse(temp[1])
        }

        for (const [key, value] of Object.entries(obj)) {
            res[jsonParse(key)] = jsonParse(value)
        }

        if (isFunction(reviver)) {
            res = filter({"": res}, "")
        }
        return res
    }

    if (input.indexOf("'") !== -1) {
        return "Invalid parse"
    }

    return input.trim().split('"').join('')

}
// console.log(jsonParse('{"p": 5}', (key, value) =>
//     typeof value === 'number'
//         ? value * 2
//         : value
// ))
// console.log(jsonParse('{"1": 1, "2": 2, "3": {"4": 4, "5": {"6": 6}}, "7": 7}'))
// console.log(jsonParse('[1, 2, 3, 4, [5, [6]], {"7": "hello"}]'))
