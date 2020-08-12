import {
    isAttachedToDom,
    isPrimitive,
    hasOwnProperty,
    roundAtDigits,
} from 'my-lib'
import transformCase from 'transform-case'
import { getData } from './storage'
import { plotCurve } from './plot'

const BREAK = '<br/>'
const INAPT = content => ['', null, undefined].includes(content)
const DISPLAY_CLASSNAME = 'picturae-deltaemap-display'

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
        let row = ''
        // '\u0394' === '&Delta;' === '&#916;'
        // '\u03bc' === '&mu;' === '&#956;'
        let label = key
            .replace(/(m|M)eanDelta/, '\u03bc\u0394')
            .replace(/^mean(?!$)/, '\u03bc')
            .replace(/(d|D)elta/, '\u0394')
        label = transformCase(label, {
            preserve: [/(\u03bc\u0394)\w{1}/g, /(\u03bc)/g, /(\u0394)\w{1}/g],
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
    if (userData.observed && userData.observed.RGB) {
        let color = `rgb(${userData.observed.RGB.join()})`
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
    if (userData.validity) {
        if (hasOwnProperty(userData.validity, 'valid')) {
            const isValid = userData.validity.valid
            table.classList.remove('valid', 'invalid')
            table.classList.add(isValid ? 'valid' : 'invalid')
        }
        table.innerHTML += dataBody('validity', userData.validity)
    }
    if (userData.observed.Lum) {
        const tbodySelector = 'tbody.deltaemap-observed'
        const tbody = table.querySelector(tbodySelector)
        const subject = 'Spatial Frequency Response'
        const rowClassName = transformCase(subject).paramCase()
        const row = `<tr class="${rowClassName}"><th>${subject}</th><td></td></tr>`
        tbody.innerHTML += row

        const selector = `table.${DISPLAY_CLASSNAME} ${tbodySelector} tr.${rowClassName} td`
        plotCurve(userData.observed, selector, subject)
    }
}

const DisplayTable = function(mainElement) {
    this.name = 'DisplayTable'
    const eventRoot = document.body
    const docRoot = document.documentElement
    const displayRoot = mainElement.parentNode
    const table = document.createElement('table')
    this.element = table
    table.className = DISPLAY_CLASSNAME

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

    eventRoot.addEventListener('mouseover', function(event) {
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
    })

    eventRoot.addEventListener('mousemove', function(event) {
        const offPointer = 16

        if (event.clientX / docRoot.clientWidth < 0.5) {
            table.style.left = `${event.clientX + offPointer}px`
            table.style.right = 'auto'
        } else {
            table.style.left = 'auto'
            table.style.right = `${docRoot.clientWidth -
                event.clientX +
                offPointer}px`
        }

        const ySpace = (docRoot.clientHeight - table.clientHeight) / 2

        if (event.clientY < ySpace - offPointer) {
            table.style.top = `${event.clientY + offPointer}px`
            table.style.bottom = 'auto'
        } else if (event.clientY < ySpace + offPointer + table.clientHeight) {
            table.style.top = `${ySpace}px`
            table.style.bottom = 'auto'
        } else {
            table.style.top = 'auto'
            table.style.bottom = `${docRoot.clientHeight -
                event.clientY +
                offPointer}px`
        }
        event.stopPropagation()
    })
}

export { DisplayTable, renderData, dataBody, readableValue, INAPT }
