function abort (message) {
    throw new Error(`Parsing error: ${message}`)
}
  
const unescapes = {
    '\\': '\\',
    '"': '"',
    '/': '/',
    'b': '\b',
    't': '\t',
    'n': '\n',
    'f': '\f',
    'r': '\r'
}

class Tokenizer {
    constructor (jsonString) {
        this.index = 0
        this.jsonString = jsonString
        this.result
        this.length = jsonString.length
    }

    createDataType() {
        if (this.index >= this.length) {
            return
        }

        let currChar = this.jsonString[this.index]
        let charCode = this.jsonString.charCodeAt(this.index)

        if (currChar === '"') {
            return this.createString()
        }

        if (charCode === 43 || charCode === 45 || (charCode >= 48 && charCode <= 57)) { // 43 for - and 45 for + sign
            return this.createNumber()
        }

        if (currChar === 'n' || currChar === 't' || currChar === 'f') {
            return this.createBoolAndNull()
        }

        if (currChar === '[') {
            console.log('hello')
            return this.createArray()
        }

        if (currChar === '{') {
            return this.createObject()
        }

    }

    createString() {
        let result = ''

        for (result, this.index++; this.index < this.length;) {
        
            let character = this.jsonString[this.index]

            let charCode = this.jsonString.charCodeAt(this.index)
            
            if (charCode < 32) {
                return abort('Unescaped ASCII control characters are not permitted.')
            }

            if (character === '\\') {
                
                character = this.jsonString[++this.index]
            
                switch (character) {
                    case '\\':
                    case '"':
                    case '/':
                    case 'b':
                    case 't':
                    case 'n':
                    case 'f':
                    case 'r':

                        result += unescapes[character]
                        this.index++
                        break

                    case 'u':
                        let hexaStartIndex = ++this.index

                        for (let position = this.index + 4; this.index < position; this.index++) {
                            let charCode = this.jsonString.charCodeAt(this.index)
                            // A valid sequence comprises four hexadigits (case-
                            // insensitive) that form a single hexadecimal value.
                            if (!((charCode >= 48 && charCode <= 57) || (charCode >= 97 && charCode <= 102) || (charCode >= 65 && charCode <= 70))) {
                                return abort('Invalid Unicode escape sequence.')
                            }
                        }
                        // Revive the escaped character.
                        result += String.fromCharCode('0x' + this.jsonString.slice(hexaStartIndex, this.index))
                        break

                    default:
                        return abort('Invalid escape sequence.')
                }
            } else {
                
                if (character === '"') {
                    // An unescaped double-quote character marks the end of the string
                    break
                }

                const stringStartIndex = this.index
                
                let charCode = this.jsonString.charCodeAt(this.index)
                while (charCode >= 32 && charCode !== 92 && charCode !== 34) { // 92 for \ and 34 for "
                    charCode = this.jsonString.charCodeAt(++this.index)
                }

                result += this.jsonString.slice(stringStartIndex, this.index)
            }
        }

        const currChar = this.jsonString[this.index]
        if (currChar === '"') {
            this.index++
            return result
        }

        return abort('Unterminated string.')
    }


    createNumber () {
        const stringNumberIndex = this.index
        let currChar = this.jsonString[this.index]

        if (currChar === '-') {
            this.index++
        }

        let charCode = this.jsonString.charCodeAt(this.index)

        if (charCode >= 48 && charCode <= 57) {
            
            const nextFigure = this.jsonString.charCodeAt(this.index + 1)
            if (charCode === 48 && (nextFigure >= 48 && nextFigure <= 57)) {
                return abort('Illegal octal literal.')
            }

            
            for (; this.index < this.length && ((charCode = this.jsonString.charCodeAt(this.index)), charCode >= 48 && charCode <= 57); this.index++) {
                // Do nothing because index already incremented
            }

             // Parse the decimal
            if (charCode === 46) {
                let fractionalIndex = ++this.index
                for (; fractionalIndex < this.length && ((charCode = this.jsonString.charCodeAt(fractionalIndex)), charCode >= 48 && charCode <= 57); fractionalIndex++);
                if (fractionalIndex === this.index) {
                    return abort('Illegal trailing decimal.')
                }
                this.index = fractionalIndex
            }

            const numberString = this.jsonString.slice(stringNumberIndex, this.index)

            return +numberString

        }
    }


    createBoolAndNull () {
        const firstFourChars = this.jsonString.slice(this.index, this.index + 4)

        if (firstFourChars === 'true') {
            this.index += 4
            return true
        }
        
        if (firstFourChars === 'fals' && this.jsonString[this.index + 4] === 'e') {
            this.index += 5
            return false
        }

        if (firstFourChars === 'null') {
            this.index += 4
            return null
        }

        return abort('Unrecognized token.')
    }

    createArray() {
        const arr = []
        this.index++
        const stringArrayIndex = this.index

        for (stringArrayIndex; this.index < this.length;) {
            let currChar = this.jsonString[this.index]

            if (currChar === ',') {
                this.index++
                continue
            }

            if (currChar === ']') {
                break
            }

            const dataType = this.createDataType()
            arr.push(dataType)
        }

        let currChar = this.jsonString[this.index]
        if (currChar === ']') {
                return arr
        }
        return abort('Unterminated array.')
    }

    createObject () {
        const obj = {}
        let isKey = true
        let key = null
        this.index++
        const stringObjectIndex = this.index

        for (stringObjectIndex; this.index < this.length;) {
            let currChar = this.jsonString[this.index]

            if (currChar === ',') {
                this.index++
                continue
            }

            if (currChar === ':') {
                isKey = false
                this.index++
                continue
            }

            if (currChar === '}') {
                break
            }

            const dataType = this.createDataType()
            if (isKey) {
                obj[dataType] = null
                key = dataType
            } else {
                obj[key] = dataType
                key = null
                isKey = true
            }
        }

        let currChar = this.jsonString[this.index]
        if (currChar === '}') {
                return obj
        }
        return abort('Unterminated object.')
    }

}

const tokenizer = new Tokenizer(JSON.stringify({key: 'value', 3.14: -3.14, 'hello': ['hello']}))
// const tokenizer = new Tokenizer(JSON.stringify(['key', 'value', 3.14 -3.14, 'hello', ['hello']]))
console.log(tokenizer.createDataType())