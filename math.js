function convertToNumber(input) {
    if (input === -0 || input === 0) {
        return input
    }

    if (input === undefined || isNaN(input)) {
        return NaN
    }

    let newInput = Number(input)

    if (isNaN(newInput)) {
        return NaN
    }

    if (newInput !== 0) {
        return newInput
    }

    return 0
}


function mathTrunc(input) {
    const number = convertToNumber(input)

    if (typeof number === 'number') {
        return number - (number%1)
    }

    return NaN
}
// console.log(mathTrunc(-4.13))

function mathAbs(input) {
    if (!input || input === '' || (Array.isArray(input) && !input.length)) {
        return 0
    }

    let number = Array.isArray(input) && input.length === 1 ? input[0] : input
    number = convertToNumber(number)

    if (typeof number === 'number') {
        if (number < 0) {
            number = -1*number
        }
        return number
    }
    return NaN
}
// console.log(mathAbs([-3.5346546]))
// console.log(mathAbs('-1'))


function mathCeil(input) {
    if (!input) {
        return 0
    }

    let number = Array.isArray(input) && input.length === 1 ? input[0] : input
    number = convertToNumber(number)

    if (typeof number === 'number') {
        const int = mathTrunc(number);
        const decimal = mathAbs(number - int)
        if (decimal > 0) {
            if (number < 0) {
                return int
            }
            return int + 1
        }

        return number
    }

    return NaN
}
// console.log(mathCeil([-7.94]))
// console.log(mathCeil(null))


function mathFloor(input) {
    if (!input) {
        return 0
    }

    let number = Array.isArray(input) && input.length === 1 ? input[0] : input
    number = convertToNumber(number)

    if (typeof number === 'number') {
        const int = mathTrunc(number);
        if (number < 0) {
            return int - 1
        }

        return int
    }

    return NaN
}
// console.log(mathFloor([-5.05]))
// console.log(mathFloor(null))


function mathRound(input) {
    if (!input) {
        return 0
    }

    let number = Array.isArray(input) && input.length === 1 ? input[0] : input
    number = convertToNumber(number)

    if (typeof number === 'number') {
        const int = mathTrunc(number);
        const decimal = mathAbs(number - int)
        if (decimal > 0) {
            if (number < 0) {
                return decimal > 0.5 ? int - 1 : int
            }
            return decimal >= 0.5 ? int + 1 : int
        }

        return number
    }

    return NaN
}

// console.log(mathRound(20.49))
// console.log(mathRound(20.5))
// console.log(mathRound(42))
// console.log(mathRound(-5.95))
// console.log(mathRound(-5.5))
// console.log(mathRound(-5.05))

function mathMin(args) {
    if (!args) {
        return Infinity
    }

    let result = NaN

    args.reduce((acc, curr) => {
        const accumulator = convertToNumber(acc)
        const currentValue = convertToNumber(curr)

        if ((!isNaN(currentValue) && isNaN(accumulator)) || currentValue < accumulator) {
            result = currentValue
        } else if(!isNaN(accumulator)) {
            result = accumulator
        }
        return result
    })

    return result
}
// console.log(mathMin([0, 'fs1', 2, '3dsa', 100, 'fsdf', -10]))
// console.log(mathMin([-11, 2, -3, -4.45346]))

function mathMax(args) {
    if (!args) {
        return -Infinity
    }

    let result = NaN

    args.reduce((acc, curr) => {
        const accumulator = convertToNumber(acc)
        const currentValue = convertToNumber(curr)
        if ((!isNaN(currentValue) && isNaN(accumulator)) || currentValue > accumulator) {
            result = currentValue
        } else if(!isNaN(accumulator)) {
            result = accumulator
        }
        return result
    })

    return result
}
// console.log(mathMax(['fs1', 2, '3dsa', 100, 'fsdf', 30, '700']))
// console.log(mathMax([3, 123, -454, 546]))

function mathSign(input) {
    let number = Array.isArray(input) && input.length === 1 ? input[0] : input
    number = convertToNumber(number)

    if (typeof number === 'number') {

        if (input > 0) {
            return 1
        }

        if (input < 0) {
            return -1
        }

        return input
    }

    return NaN
}

// console.log(mathSign(-0))
// console.log(mathSign(19))
