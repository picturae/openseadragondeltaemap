import { hasOwnProperty } from 'my-lib'

const storage = new WeakMap()

/**
 * Store reference to data for a drawn rectangle
 * @private
 * @param {Object} deltaeElement - HTMLElement
 * @param {Object} userData - all available data for element
 */
const setData = function(deltaeElement, userData) {
    storage.set(deltaeElement, userData)
}

/**
 * Retrieve data for a drawn rectangle
 * @private
 * @param {Object} userElement - HTMLElement
 * @return {Object} allData - all available data for element
 */
const getData = function(deltaeElement) {
    if (storage.has(deltaeElement)) {
        const allData = storage.get(deltaeElement)
        return allData
    }
    return null
}

export { setData, getData }
