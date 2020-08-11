import { hasOwnProperty } from 'my-lib'

const storage = new WeakMap()
const userKeys = ['name', 'observed', 'assessed', 'reference', 'validity']

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

/**
 * Retrieve user consumable data for a drawn rectangle
 * @private
 * @param {Object} userElement - HTMLElement
 * @return {Object} userData - all available data
 */
const getUserData = function(deltaeElement) {
    if (storage.has(deltaeElement)) {
        const allData = storage.get(deltaeElement)
        const userData = {}
        userKeys.forEach(key => {
            if (hasOwnProperty(allData, key)) userData[key] = allData[key]
        })
        return userData
    }
    return null
}

export { setData, getData, getUserData }
