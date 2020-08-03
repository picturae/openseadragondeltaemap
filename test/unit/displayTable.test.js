import { targetData } from './_mocks'
import { DisplayTable, renderData, dataBody } from '../../src/displayTable'

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

    test('should render readable labels, derived from data', () => {

        expect(groupData).toHaveProperty('meanDeltaE2000')
        expect(groupHTMLString).toContain('Mean ΔE 2000')
    })

})
