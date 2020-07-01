/**
 * Select data to display in displayTable
 * @private
 * @param {String} validationData - all available data
 * @returns {String} JSON string
 */
const setData = function(validationData) {
    let usableData = {}
    const usableProps = [
        'name',
        'observed',
        'assessed',
        'reference',
        'validity',
    ]
    for (let [key, value] of Object.entries(validationData)) {
        if (usableProps.includes(key)) {
            usableData[key] = value
        }
    }
    return JSON.stringify(usableData)
}

export { setData }
