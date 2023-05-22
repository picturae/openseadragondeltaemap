import {
    isAttachedToDom,
    isPrimitive,
    hasOwnProperty,
    roundAtDigits,
} from 'my-lib'
import transformCase from 'transform-case'
import { BREAK, INAPT, DISPLAY_CLASSNAME } from './constants'
import { getData } from './storage'
import { buildGraph } from './edgeGraph'

/**
 * Serialise the values
 * @param {any} value
 * @returns {string} html string
 */
const readableValue = value => {
    if (value === null || value === undefined) {
        return value
    }

    if (typeof value === 'boolean') {
        let bool = `<deltaeboolean class="${
            value ? 'valid' : 'invalid'
        }"></deltaeboolean>`
        return bool
    }

    if (isPrimitive(value)) {
        // preserve zero's, NaN's but not empty strings
        if (value === 0) value = '0'
        if (typeof value === 'number') {
            value = roundAtDigits(value, 5)
        }
        return String(value)
    }

    if (Array.isArray(value)) {
        if (!value.length || value.length > 8) return null

        const areAllPrimitives = value.every(vitem => isPrimitive(vitem))
        if (areAllPrimitives) return value.join(', ') + BREAK

        let fragment = ''
        value.forEach(vitem => {
            const formattedValue = readableValue(vitem)
            if (!INAPT(formattedValue)) {
                const endBreak = formattedValue.endsWith(BREAK)
                fragment += endBreak ? formattedValue : formattedValue + BREAK
            }
        })
        return fragment
    }

    if (typeof value === 'object') {
        let fragment = ''
        for (let [property, content] of Object.entries(value)) {
            let line = ''
            const readableCnt = readableValue(content)
            const humanTitle = transformCase(property).humanTitle()
            if (typeof content === 'boolean') {
                line = `${readableCnt} ${humanTitle}${BREAK}`
            } else if (!INAPT(readableCnt)) {
                line = `${humanTitle}: ${readableCnt}${BREAK}`
            }
            if (line) fragment += line
        }
        return fragment
    }
}

/**
 * Serialise grouped data
 * @param {string} groupName
 * @param {object} groupData
 * @returns {string} html string
 */
const dataBody = (groupName, groupData) => {
    let body = `<tbody class="deltaemap-${groupName}" data-name="${groupName}">`
    for (let [key, value] of Object.entries(groupData)) {
        if (!['cutoff_frequency', 'hsf'].includes(key)) {
            let row = ''
            // '\u0394' === '&Delta;' === '&#916;'
            // '\u03bc' === '&mu;' === '&#956;'
            let label = key
                .replace(/(m|M)eanDelta/, '\u03bc\u0394')
                .replace(/^mean(?!$)/, '\u03bc')
                .replace(/(d|D)elta/, '\u0394')
                .replace(/(s|S)td(d|D)ev/, 'SD')
            label = transformCase(label, {
                preserve: [
                    /(\u03bc\u0394)\w{1}/g,
                    /(\u03bc)\w+/g,
                    /(\u0394)\w{1}/g,
                ],
                delimitNumberLetter: false,
            }).humanTitle()
            const className = transformCase(key).paramCase()
            const formattedValue = readableValue(value)
            if (!INAPT(formattedValue)) {
                // leave out unapplicable properties
                row = `<tr class="${className}"><th>${label}</th><td>${formattedValue}</td></tr>`
            }
            if (row) body += row
        }
    }
    body += '</tbody>'
    return body
}

/**
 * Serialise server data
 * @param {object} event mouseEnterEvent
 * @param {object} table htmlElement
 * @param {string} targetData dataSet string
 * @returns {string} html string
 */
const renderData = (event, table, userData) => {
    // process element charatistics
    table.innerHTML = ''
    table.classList.remove(
        'deltaemap-overlay',
        'deltaemap-chart',
        'deltaemap-patch',
    )
    const className = event.target.tagName
        .toLowerCase()
        .replace('deltae', 'deltaemap-')
    table.classList.add(className)

    // process element data
    let colorSquare = ''
    const rgbSource = userData.observed.RGB || userData.observed.RGBY
    if (userData.observed && rgbSource) {
        const color = `rgb(${rgbSource[0]},${rgbSource[1]},${rgbSource[2]})`
        colorSquare = `<deltaecolor style="background: ${color};"></deltaecolor>`
    }
    table.innerHTML += `<caption>
        ${userData.name} ${colorSquare}
    </caption>`

    // display the following data in the following order
    if (userData.assessed) {
        table.innerHTML += dataBody('assessed', userData.assessed)
    }
    if (userData.observed) {
        table.innerHTML += dataBody('observed', userData.observed)
    }
    if (userData.reference) {
        table.innerHTML += dataBody('reference', userData.reference)
    }
    // clear validity no matter what
    table.classList.remove('valid', 'invalid')
    if (userData.validity) {
        if (hasOwnProperty(userData.validity, 'valid')) {
            if (userData.validity.valid === true) {
                table.classList.add('valid')
            }
            if (userData.validity.valid === false) {
                table.classList.add('invalid')
            }
        }
        table.innerHTML += dataBody('validity', userData.validity)
    }
    if (userData.edgePatches && userData.edgePatches.length) {
        // a targetChart - multiple patches
        buildGraph(userData.edgePatches, table, DISPLAY_CLASSNAME)
    }
    if (userData.observed.Lum && userData.observed.Lum.MTF_Curve) {
        // targetPatch - one patch
        buildGraph([userData], table, DISPLAY_CLASSNAME)
    }
}

const DisplayTable = function(mainElement, options) {
    this.name = 'DisplayTable'
    const eventRoot = document.body
    const docRoot = document.documentElement
    const displayRoot = mainElement.parentNode
    const table = document.createElement('table')
    this.element = table
    const tableOptions = Object.assign({ layout: 'tabular' }, options)
    table.classList.add(
        DISPLAY_CLASSNAME,
        tableOptions.layout === 'flexible' ? 'flexible' : 'tabular',
    )

    /**
     * Update the table with new data
     * @param {object} event
     */
    const targetEnter = function(event) {
        const targetData = getData(event.target)
        if (targetData) {
            renderData(event, table, targetData)
            if (!isAttachedToDom(table)) displayRoot.appendChild(table)
        }
    }

    /**
     * Remove table from DOM when needed
     */
    const targetLeave = function() {
        if (isAttachedToDom(table)) displayRoot.removeChild(table)
    }

    const targetChange = function(event) {
        const enter = event.target
        if (
            enter.tagName === 'DELTAEOVERLAY' ||
            enter.tagName === 'DELTAECHART' ||
            enter.tagName === 'DELTAEPATCH'
        ) {
            targetEnter(event)
        } else if (!table.contains(enter)) {
            targetLeave(event)
        }
        event.stopPropagation()
    }

    const targetHover = function(event) {
        const offPointer = 16

        if (event.clientX / docRoot.clientWidth < 0.5) {
            table.style.left = 'auto'
            table.style.right = `${offPointer}px`
        } else {
            table.style.left = `${offPointer}px`
            table.style.right = 'auto'
        }

        const ySpace = (docRoot.clientHeight - table.clientHeight) / 2

        if (event.clientY < ySpace - offPointer) {
            table.style.top = 'auto'
            table.style.bottom = `${offPointer}px`
        } else if (event.clientY < ySpace + offPointer + table.clientHeight) {
            table.style.top = `${ySpace}px`
            table.style.bottom = 'auto'
        } else {
            table.style.top = `${offPointer}px`
            table.style.bottom = 'auto'
        }
        event.stopPropagation()
    }

    let targetChangeTimeout
    eventRoot.addEventListener('mouseover', function(event) {
        if (targetChangeTimeout) {
            clearTimeout(targetChangeTimeout)
        }
        targetChangeTimeout = setTimeout(function() {
            targetChange(event)
        }, 150)
    })

    eventRoot.addEventListener('mousemove', targetHover)
}

export { DisplayTable, renderData, dataBody, readableValue, INAPT }
