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
            value = roundAtDigits(value, 2)
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
            } else if (!readableCnt) {
                line = `${humanTitle}: N/A${BREAK}`
            }
            if (line && !['MTF_Curve', 'MTFHNYQ', 'MTFNYQ'].includes(property))
                fragment += line
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
        if (!['cutoff_frequency', 'hsf'].includes(key) && value != null) {
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
            if (groupName === 'Fadgi remarks') {
                let star = `<meter class="average-rating average-rating-zero" min="0" max="4" value="0" title="0 out of 4 stars"></meter>`
                if (value === 4) {
                    star = `<meter class="average-rating average-rating-four" min="0" max="4" value="4" title="4 out of 4 stars"></meter>`
                } else if (value === 3) {
                    star = `<meter class="average-rating average-rating-three" min="0" max="4" value="3" title="3 out of 4 stars"></meter>`
                } else if (value === 2) {
                    star = `<meter class="average-rating average-rating-two" min="0" max="4" value="2" title="2 out of 4 stars"></meter>`
                } else if (value === 1) {
                    star = `<meter class="average-rating average-rating-one" min="0" max="4" value="1" title="1 out of 54 stars"></meter>`
                }
                row = `<tr class="${className}"><th>${label}</th><td>${star}</td></tr>`
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

    if (userData.guideline) {
        table.innerHTML += `<p>
            <span class='bold'>Guideline</span> - ${userData.guideline}
        </p>`
    }

    if (userData.barcode) {
        table.innerHTML += `<tbody class="deltaemap-barcode" data-name="barcode">
            <tr>
              <th>Barcode</th> <td>${userData.barcode}</td>
            </tr>
            <tr>
              <th>Matched</th> <td>${userData.barcodeFound ? 'Yes' : 'No'}</td>
            </tr>
        </tbody>`
    }

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
    if (userData.fadgiStarsForColor) {
        table.innerHTML += dataBody(
            'Fadgi remarks',
            userData.fadgiStarsForColor,
        )
    }
    if (userData.fadgiStarsForSpatial) {
        table.innerHTML += dataBody(
            'Fadgi remarks',
            userData.fadgiStarsForSpatial,
        )
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
        buildGraph(
            userData.edgePatches,
            table,
            DISPLAY_CLASSNAME,
            userData.horizontalData,
            userData.verticalData,
        )
    }
    if (userData.observed.Lum && userData.observed.Lum.MTF_Curve) {
        // targetPatch - one patch
        buildGraph([userData], table, DISPLAY_CLASSNAME)
    }
}

/**
 * Code for handling the infobox showing information about the location the mouse is correctly pointing at.
 * @param mainElement {HTMLElement} The main DeltaE overlay element.
 * @param options {DeltaEOptions} Configuration options.
 * @constructor
 */
const DisplayTable = function(mainElement, options) {
    const eventRoot = document.body
    const docRoot = document.documentElement
    const displayRoot = mainElement.parentNode
    const table = document.createElement('table')

    this.name = 'DisplayTable'
    this.element = table

    const tableOptions = Object.assign({ layout: 'tabular' }, options)

    table.classList.add(
        DISPLAY_CLASSNAME,
        tableOptions.layout === 'flexible' ? 'flexible' : 'tabular',
    )

    /**
     * Update the table with new data
     * @param {MouseEvent} event Mouse event from the event handler.
     */
    const targetEnter = event => {
        const targetData = getData(event.target)

        if (targetData) {
            renderData(event, table, targetData)

            if (!isAttachedToDom(table)) {
                displayRoot.appendChild(table)
            }
        }
    }

    /**
     * Remove table from DOM when needed
     */
    const targetLeave = () => {
        if (isAttachedToDom(table)) {
            displayRoot.removeChild(table)
        }
    }

    /**
     * Handles changing the target the mouse is currently pointing at.
     * @param {MouseEvent} event Mouse event from the event handler.
     */
    const targetChange = event => {
        event.stopPropagation()
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
    }

    /**
     * Handles moving the infobox to where the mouse is pointing.
     * @param {MouseEvent} event Mouse event from the event handler.
     */
    const targetHover = event => {
        event.stopPropagation()
        const offPointer = 16

        table.style.right = 'auto'
        table.style.bottom = 'auto'
        if (
            event.clientX + table.clientWidth + offPointer <
            docRoot.clientWidth
        ) {
            table.style.left = `${event.clientX + offPointer}px`
        } else {
            table.style.left = `${event.clientX - table.clientWidth / 2}px`
        }

        if (
            event.clientY + table.clientHeight + offPointer <
            docRoot.clientHeight
        ) {
            table.style.top = `${event.clientY + offPointer + 10}px`
        } else {
            let top = event.clientY - table.clientHeight - offPointer
            if (top < 0) top = 0
            table.style.top = `${top}px`
        }
    }

    eventRoot.addEventListener('mouseover', targetChange)
    eventRoot.addEventListener('mousemove', targetHover)
}

export { DisplayTable, renderData, dataBody, readableValue, INAPT }
