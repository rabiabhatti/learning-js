function mathAbs(input) {
    if (!input || input === '' || (Array.isArray(input) && !input.length)) {
        return 0
    }

    if (typeof input === 'number' || (Array.isArray(input) && input.length === 1)) {
        let newInput = Array.isArray(input) ? input[0] : input
        if (newInput < 0) {
            newInput = -1*newInput
        }
        return newInput
    }
    return 'NaN'
}
// console.log(mathAbs([-3.5346546]))


function mathCeil(input) {
    if (!input) {
        return 0
    }

    if (typeof input === 'number' || (Array.isArray(input) && input.length === 1)) {
        let number = Array.isArray(input) ? input[0] : input
        const int = parseInt(number);
        const decimal = mathAbs(number - int)
        if (decimal > 0) {
            if (number < 0) {
                return int
            }
            return int + 1
        }

        return number
    }

    return 'NaN'
}
// console.log(mathCeil([-7.004]))
// console.log(mathCeil(null))


function mathFloor(input) {
    if (!input) {
        return 0
    }

    if (typeof input === 'number' || (Array.isArray(input) && input.length === 1)) {
        let number = Array.isArray(input) ? input[0] : input
        const int = parseInt(number);
        if (number < 0) {
            return int - 1
        }

        return int
    }

    return 'NaN'
}
// console.log(mathFloor([5.05]))
// console.log(mathFloor(null))


function mathRound(input) {
    if (!input) {
        return 0
    }

    if (typeof input === 'number' || (Array.isArray(input) && input.length === 1)) {
        let number = Array.isArray(input) ? input[0] : input
        const int = parseInt(number);
        const decimal = mathAbs(number - int)
        if (decimal > 0) {
            if (number < 0) {
                return decimal > 0.5 ? int - 1 : int
            }
            return decimal >= 0.5 ? int + 1 : int
        }

        return number
    }

    return 'NaN'
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

    let min = args[0]

    for (let i = 1, {length} = args; i < length; i++) {
        if (args[i] < min) {
            min = args[i]
        }
    }

    return min
}

// console.log(mathMin([-11, 2, -3, -4.45346]))

function mathMax(args) {
    if (!args) {
        return -Infinity
    }

    let max = args[0]

    for (let i = 1, {length} = args; i < length; i++) {
        if (args[i] > max) {
            max = args[i]
        }
    }

    return max
}
console.log(mathMax([3, 123, -454, 546]))
