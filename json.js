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
                    return "Converting circular structure to JSON"
                }
                seen.push(value)
            }
        }
    }
}

function jsonStringify(input, replacer, space) {
    const circular = checkForCircular(input)
    if (circular === "Converting circular structure to JSON") {
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
        let res = "["
        for (let i = 0, {length} = input; i < length; i++) {
            const value = jsonStringify(input[i])
            if (value === "TypeError: BigInt value can't be serialized in JSON") {
                return value
            }
            res += (i ? ', ' : '') + value
        }
        return res + "]"
    }

    if ( input instanceof Set || input instanceof Map || input instanceof WeakSet || input instanceof WeakMap) {
        return "{}"
    }

    if (typeof input === 'object' || isObject(input)) {

        if (typeof input.toJSON === 'function') {
            return jsonStringify(input.toJSON())
        }

        let res = [];
        for (const k in input) {
            if (input.hasOwnProperty(k)) {
                const key = jsonStringify(k)
                const value = jsonStringify(input[k])

                if (key === "TypeError: BigInt value can't be serialized in JSON" || value === "TypeError: BigInt value can't be serialized in JSON") {
                    return "TypeError: BigInt value can't be serialized in JSON"
                }

                if (key === 'null' || value === 'null') {
                    return "{}"
                }

                res.push(key + ': ' + value)
            }
        }

        return '{' + res.join(', ') + '}';
    }
}

// console.log(jsonStringify([new Number(3), new String('false'), new Boolean(false), new Array()]))
// console.log(jsonStringify([10, undefined, function(){}, Symbol('')]))
// console.log(jsonStringify({x: 2n}))

// const circularReference = {otherData: 123};
// circularReference.myself = circularReference;
// console.log(jsonStringify(circularReference))
