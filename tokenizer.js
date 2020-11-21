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
        this.result = [] 
        this.length = jsonString.length
    }

    start() {
        if (this.index >= this.length) {
            return
        }

        let currChar = this.jsonString[this.index]
        let charCode = this.jsonString.charCodeAt(this.index)

        if (currChar === '"') {
            const str = this.createString()
            return str
        }

        if (charCode === 43 || charCode === 45 || (charCode >= 48 && charCode <= 57)) {
            const number = this.createNumber()
            return number
        }

    }

    createString() {
        let value = ''
        for (value, this.index++; this.index < this.length;) {
        
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

                        value += unescapes[character]
                        this.index++
                        break

                    case 'u':
                        let stringStartIndex = ++this.index

                        for (let position = this.index + 4; this.index < position; this.index++) {
                            let charCode = this.jsonString.charCodeAt(this.index)
                            // A valid sequence comprises four hexdigits (case-
                            // insensitive) that form a single hexadecimal value.
                            if (!((charCode >= 48 && charCode <= 57) || (charCode >= 97 && charCode <= 102) || (charCode >= 65 && charCode <= 70))) {
                                return abort('Invalid Unicode escape sequence.')
                            }
                        }
                        // Revive the escaped character.
                        value += String.fromCharCode('0x' + this.jsonString.slice(stringStartIndex, this.index))
                        break

                    default:
                        return abort('Invalid escape sequence.')
                }
            } else {
                
                if (character === '"') {
                    // An unescaped double-quote character marks the end of the string
                    break
                }

                let stringStartIndex = this.index
                
                let charCode = this.jsonString.charCodeAt(this.index)
                while (charCode >= 32 && charCode !== 92 && charCode !== 34) {
                    charCode = this.jsonString.charCodeAt(++this.index)
                }

                value += this.jsonString.slice(stringStartIndex, this.index)
            }
        }

        let currChar = this.jsonString[this.index]
        if (currChar === '"') {
            this.index++
            return value
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

    proceed(index) {
        this.index += index
    }

}

const tokenizer = new Tokenizer(JSON.stringify(-10.3))
console.log(tokenizer.start())