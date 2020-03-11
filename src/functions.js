/**
 * Test for values with which calculations can be done
 * @private
 * @param {arguments} anonymus - one or more values to test
 * @returns {boolean} is a useable number
 */
const isUsableNumber = function() {
    let isUsable = Boolean(arguments.length)
    Array.from(arguments).forEach(value => {
        isUsable =
            isUsable && typeof value === 'number' && Number.isFinite(value)
    })
    return isUsable
}

/**
 * Round at decimals
 * @private
 * @param {number} number - any number to round
 * @param {number} decimals - number of decimals to round at
 * @returns {number} the rounded number
 */
const roundAt = function(number, decimals) {
    // https://www.jacklmoore.com/notes/rounding-in-javascript/
    return Number(Math.round(number + 'e' + decimals) + 'e-' + decimals)
}

/**
 * Check for primitives
 * @private
 * @param {any} value - any value to check
 * @returns {boolean} is a primitive
 */
const isPrimitive = function(value) {
    return (
        typeof value === 'string' ||
        typeof value === 'number' ||
        typeof value === 'boolean'
    )
}

/**
 * Check for the node being inside the DOM
 * @private
 * @param {Node} node
 * @returns {Boolean} true when the node is onscreen -- not removed
 */
const isAttachedToDom = function(elm) {
    return (
        elm &&
        (elm.getRootNode() instanceof Document ||
            elm.getRootNode() instanceof ShadowRoot)
    )
}

/**
 * Transform a camelcase object-key to title
 * @private
 * @param {String} camel
 * @param {Object} options -
      @param {Array} preserve - [keep1, keep2]
      @param {Object} replace - {toReplace1: replacement1, toReplace2: replacement2}
 * @returns {String} title - sequence of capitalised words
 */
const camelCaseToTitle = function(camel, options = {}) {
    if (!options.preserve) options.preserve = []
    if (!options.replace) options.replace = {}
    if (!options.seperator) options.seperator = ' '
    // const isLetter = char => {
    //     return char.toLowerCase() !== char.toUpperCase()
    // }
    const isCapital = char => {
        return char === char.toUpperCase() && char !== char.toLowerCase()
    }
    const isSmall = char => {
        return char === char.toLowerCase() && char !== char.toUpperCase()
    }
    const trimSeperator = line => {
        const leading = new RegExp('^' + options.seperator)
        const trailing = new RegExp(options.seperator + '$')
        const doubling = new RegExp(options.seperator + options.seperator, 'g')
        return line
            .replace(leading, '')
            .replace(trailing, '')
            .replace(doubling, options.seperator)
    }

    /* Put seperator before each concatenated word
     * @param {String} line
     * @returns {String} phrase of seperated words
     */
    const seperateString = line => {
        let phrase = line[0]
        for (let i = 1; i < line.length; i++) {
            if (isSmall(line[i - 1]) && isCapital(line[i]))
                phrase += options.seperator
            phrase += line[i]
        }
        return phrase
    }

    /* Apply options before placing seperators
     * @param {String} line
     * @returns {Array} sequence of words
     */
    const seperate = line => {
        if (options.preserve.length) {
            options.preserve.forEach(preserve => {
                options.replace[preserve] = preserve
            })
        }

        if (options.replace && JSON.stringify(options.replace) !== '{}') {
            for (let [key, value] of Object.entries(options.replace)) {
                line = line.replace(
                    new RegExp(key, 'g'),
                    options.seperator + value + options.seperator,
                )
                // recall strings to preserve
                if (!options.preserve.includes(value))
                    options.preserve.push(value)
            }
        }

        line = trimSeperator(line)

        let strings = line.trim().split(options.seperator)
        strings = strings.map(str =>
            options.preserve.includes(str) ? str : seperateString(str),
        )

        return strings.flat()
    }

    camel = camel.trim()
    let words = seperate(camel)
    let titleWords = words.map(word =>
        options.preserve.includes(word)
            ? word
            : word.substr(0, 1).toUpperCase() + word.substr(1),
    )
    return titleWords.join(options.seperator)
}

/**
 * Check for existence of property in object
 * @private
 * @param {Object} object
 * @param {String} prop
 * @returns {Boolean} hasIt - object has that own property
 */
const hasOwnProperty = function(object, prop) {
    const hasIt = Object.prototype.hasOwnProperty.call(object, prop)
    return hasIt
}

export {
    isUsableNumber,
    roundAt,
    isPrimitive,
    isAttachedToDom,
    camelCaseToTitle,
    hasOwnProperty,
}
