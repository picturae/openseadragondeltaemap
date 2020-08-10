import { targetData } from './_mocks'
import { hasOwnProperty } from 'my-lib'
import { DisplayTable, renderData, dataBody, readableValue, INAPT } from '../../src/displayTable'

describe('displayTable events', function () {
    let htmlElement

    beforeEach(() => {
        htmlElement = document.body
    })

    test('should listen to the mouse', () => {
        const spyEventListener = jest.spyOn(htmlElement, 'addEventListener')
        new DisplayTable(htmlElement)

        expect(spyEventListener).toHaveBeenCalledWith('mouseover', expect.any(Function))
        expect(spyEventListener).toHaveBeenCalledWith('mousemove', expect.any(Function))
    })

    test('should not break openseadragon interaction', () => {
        const spyEventListener = jest.spyOn(htmlElement, 'addEventListener')
        new DisplayTable(htmlElement)

        expect(spyEventListener).not.toHaveBeenCalledWith('click', expect.any(Function))
        expect(spyEventListener).not.toHaveBeenCalledWith('scroll', expect.any(Function))
    })
})

describe('renderData function', function () {
    let userData

    let bodyHtml = deltaemapElement => {
        switch (deltaemapElement) {
            case 'deltaeoverlay':
                userData = targetData
                break
            case 'deltaechart':
                userData = targetData.targets[0]
                break
            case 'deltaepatch':
                userData = targetData.targets[0].colorPatches[0]
                break
        }
        return `
            <div class="openseadragon">
                <canvas />
                <${deltaemapElement} data-picturae-deltaemap-display="${JSON.stringify(userData)}" />
                <table />
            </div>
        `
    }

    test('should present the overlay', () => {
        document.body.innerHTML = bodyHtml('deltaeoverlay')
        const deltaemap = document.querySelector('deltaeoverlay')
        const table = document.querySelector('table')

        const event = {target: deltaemap}
        renderData(event, table, JSON.stringify(userData))
        // console.log('overlay', table.outerHTML)

        expect(table.classList).toContain('deltaemap-overlay')
        expect(table.classList).toContain('invalid')
        expect(table.querySelector('caption').textContent).toContain('Test Target Scan')
    })

    test('should present a chart', () => {
        document.body.innerHTML = bodyHtml('deltaechart')
        const deltaemap = document.querySelector('deltaechart')
        const table = document.querySelector('table')

        const event = {target: deltaemap}
        renderData(event, table, JSON.stringify(userData))
        // console.log('chart', table.outerHTML)

        expect(table.classList).toContain('deltaemap-chart')
        expect(table.classList).toContain('valid')
        expect(table.querySelector('caption').textContent).toContain('Scan Test Color Chart')
    })

    test('should present a patch', () => {
        document.body.innerHTML = bodyHtml('deltaepatch')
        const deltaemap = document.querySelector('deltaepatch')
        const table = document.querySelector('table')

        const event = {target: deltaemap}
        renderData(event, table, JSON.stringify(userData))

        expect(table.classList).toContain('deltaemap-patch')
        expect(table.classList).toContain('invalid')
        expect(table.querySelector('caption').textContent).toContain('C1')
        expect(table.querySelector('caption').innerHTML).toContain('background: rgb(')
    })
})

describe('dataBody function', function () {

    const groupName = 'assessed'
    const groupData = targetData[groupName]
    const groupHTMLString = dataBody(groupName, groupData)

    test('should present grouped data in an html string', () => {
        document.body.innerHTML = `<table>${groupHTMLString}</table>`
        const groupElement = document.querySelector('tbody')

        expect(groupElement.className).toBe(`deltaemap-${groupName}`)
    })

    // test('should render readable labels, derived from data', () => {
    //
    //     expect(groupData).toHaveProperty('meanDeltaE76T')
    //     expect(groupHTMLString).toContain('μΔE 76T')
    // })

    test('should not represent unapplicable data', () => {
        // colorAccuracy shown:
        expect(groupData).toHaveProperty('colorAccuracy')
        expect(groupData.colorAccuracy).toHaveProperty('Total Noise')
        expect(groupHTMLString).toContain('Color Accuracy')
        // spatialAccuracy not shown; all values null:
        expect(groupData).toHaveProperty('spatialAccuracy')
        expect(groupData.spatialAccuracy).toHaveProperty('Oversharpening')
        expect(groupHTMLString).not.toContain('Spatial Accuracy')
    })

})

describe('readableValue function', function () {

    const testObject = {
        valueUndefined: undefined,
        valueNull: null,
        booleanFalse: false,
        booleanTrue: true,
        numericNaN: NaN,
        numericInfinity: Infinity,
        numericZero: 0,
        numericDecimal: 3.14159,
        stringNone: '',
        stringLengthy: '\'O sole mio',
        arrayEmpty: [],
        arrayLengthy: [1, 2, 3],
        objectEmpty: {},
        objectTrivial: {
            a: null,
            b: undefined,
        },
        objectRelevant: {
            a: 1,
            b: 'b',
        },
    }
    const testJson = JSON.stringify(testObject)
    const parsedJson = JSON.parse(testJson)

    /**
     * Prevent false negatives
     * Return true or false for a property with a html-break or not
     * Return name string for property unknown to the testObject
     * @param {string} property of testObject
     * @returns {boolean | string}
     */
    const isBool4PassedOrNot = key => {
        if ( !hasOwnProperty(parsedJson, key) ) return key
        const dataHTML = readableValue(parsedJson[key])
        return !INAPT(dataHTML)
    }

    test('should present applicable values in an html string', () => {
        // typeof string: not treated
        // false: not applicable
        // true: applicable
        expect(isBool4PassedOrNot('valueUndefined')).toBe('valueUndefined')
        expect(isBool4PassedOrNot('valueNull')).toBe(false)
        expect(isBool4PassedOrNot('booleanFalse')).toBe(true)
        expect(isBool4PassedOrNot('booleanTrue')).toBe(true)
        expect(isBool4PassedOrNot('numericNaN')).toBe(false)
        expect(isBool4PassedOrNot('numericInfinity')).toBe(false)
        expect(isBool4PassedOrNot('numericZero')).toBe(true)
        expect(isBool4PassedOrNot('numericDecimal')).toBe(true)
        expect(isBool4PassedOrNot('stringNone')).toBe(false)
        expect(isBool4PassedOrNot('stringLengthy')).toBe(true)
        expect(isBool4PassedOrNot('arrayEmpty')).toBe(false) // caught by dataBody
        expect(isBool4PassedOrNot('arrayLengthy')).toBe(true)
        expect(isBool4PassedOrNot('objectEmpty')).toBe(false) // caught by dataBody
        expect(isBool4PassedOrNot('objectTrivial')).toBe(false) // caught by dataBody
        expect(isBool4PassedOrNot('objectRelevant')).toBe(true)
    })
})
