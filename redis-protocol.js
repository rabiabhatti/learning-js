function encode(input) {
    if (!input) {
        return '$-1\r\n'
    }

    const length = input.length

    if (typeof input === 'string') {
        return '$' + length + '\r\n' + input + '\r\n'
    }

    if (Number.isInteger(input)) {
        return ':' + input + '\r\n'
    }

    if ( Array.isArray(input)) {
      let res = '*' + length + '\r\n'

      for (let i = 0; i < length; i++) {
          const currValue = input[i]
          res += encode(currValue)
      }

      return res
    }

    throw new Error('-ERR unknown input\r\n')
  }
  
//   console.log(JSON.stringify(encode(['set', 'key', 'value', ['nested']])))

  
function decode(str, index = 0) {
    const type = str[index]
    const whitespaceIndex = str.indexOf('\r\n', index)
    
    const length = parseInt(str.slice(index + 1, whitespaceIndex), 10)

    if (type === '*') { // Array
      const value = []
      index = whitespaceIndex + 2

      for (let i = 0; i < length; i++) {
        const entry = decode(str, index)
        value.push(entry.value)
        index = entry.index
      }

      return { value, index }
    } 

    if (type === '$') { // Bulk Strings
        let value = null
        index = whitespaceIndex + 2

        if (length !== -1) {
            value = str.substr(index, length)
            index = index + length + 2
        }

        return { value, index }
    }

    if (type === '+') { // Simple String
      const value = str.slice(index + 1, whitespaceIndex)
      index = whitespaceIndex + 2

      return { value, index}
    }

    if (type === ':') { // Integer
      const value = parseInt(str.slice(index + 1, whitespaceIndex), 10)
      index = whitespaceIndex + 2

      return { value, index}
    }
    
    if (type === '-') { // Error
      const value = str.slice(index + 1, whitespaceIndex)
      throw new Error(value)
    }

    throw new Error('invalid Input')
}

console.log(decode('*5\r\n:1\r\n:2\r\n:3\r\n:4\r\n$6\r\nfoobar\r\n').value)
