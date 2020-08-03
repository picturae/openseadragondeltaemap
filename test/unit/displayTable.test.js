import { DisplayTable } from '../../src/displayTable'

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
