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
 * @returns {boolean} boolean - true when the node is onscreen -- not removed
 */
const isAttachedToDom = function(elm) {
    return (
        elm &&
        (elm.getRootNode() instanceof Document ||
            elm.getRootNode() instanceof ShadowRoot)
    )
}

export { isUsableNumber, roundAt, isPrimitive, isAttachedToDom }
