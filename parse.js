function tokenizer(string) {
    const tokens = []
    let startString = null
    let startBoolean = null
    let startNull = null
    let startNumber = null
    
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

        if (isNaN(+currentValue) && startNumber !== null) {
            tokens.push(+startNumber)

            startNumber = null
        }

        // String
        if (startString !== null) {
            if (currentValue === '"') {
                tokens.push(startString)
                startString = null
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
            tokens.push(currentValue)
            continue
        }

        // Boolean
        if (startBoolean !== null ) {
            if (bool.includes(currentValue)) {
                startBoolean += currentValue

                if (startBoolean === 'true' || startBoolean === 'false') {
                    tokens.push(startBoolean === 'true')
                    startBoolean = null
                }
                continue
            }
        }

        if (currentValue === 't' || currentValue === 'f') {
            startBoolean = currentValue
            continue
        } 


        // Null check
        if (startNull !== null && nullValue.includes(currentValue)) {
            startNull += currentValue

            if (startNull === 'null') {
                tokens.push(null)
                startNull = null
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
            startNumber = startNumber === null ? currentValue : startNumber + currentValue
            continue
        }

    }

    return tokens.filter(item => item !== '')
}

// const string = JSON.stringify(false)
// const string = JSON.stringify('log the current property name, the last is ""')
const string = JSON.stringify([1,[5, [6]], {"key": "value"}, 'last'])
// const string = JSON.stringify({ "1": -12, "2": true, "key": { "4": false, "5": { "6": [6, "hello"] } }, "7": null })
console.log(tokenizer(string))
// console.log(string)