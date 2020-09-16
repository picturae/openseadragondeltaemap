import { deepClone } from 'my-lib'
import { getData } from '../../src/storage'
import { viewer, targetData, badOverlayData } from './_mocks'
import { Overlay } from '../../src/overlay'

// suppress alarming error messages in output
console.error = jest.fn()

describe('Overlay is the main object', function () {
    let theViewer
    let overlayData

    beforeEach(() => {
        // make viewer manipulable
        theViewer = deepClone(viewer)
        overlayData = JSON.parse(JSON.stringify(targetData))
    })

    test('Overlay has public methods', () => {
        const overlayInstance = new Overlay(theViewer)

        expect(typeof overlayInstance.resize).toBe('function')
        expect(typeof overlayInstance.render).toBe('function')
    })

    test('Overlay lets openSeaDragon listen to multiple view changes ', () => {
        const spyViewerAddHandler = jest.spyOn(theViewer, 'addHandler')
        const overlayInstance = new Overlay(theViewer)

        expect(spyViewerAddHandler).toHaveBeenCalledTimes(4)
    })

    test('Overlay.resize sets the position in an absolute fashion', () => {
        const overlayInstance = new Overlay(theViewer)
        overlayInstance.resize()
        const styleObject = overlayInstance.element.style

        expect(styleObject.left).toMatch(/^\d+/)
        expect(styleObject.top).toMatch(/^\d+/)
        expect(styleObject.width).toMatch(/^\d+/)
        expect(styleObject.height).toMatch(/^\d+/)
        expect(styleObject.left).toMatch(/px$/)
        expect(styleObject.top).toMatch(/px$/)
        expect(styleObject.width).toMatch(/px$/)
        expect(styleObject.height).toMatch(/px$/)
    })

    test('Overlay.resize fails when there is no tiled tiledImage', () => {
        theViewer.world.getItemAt = () => null
        const overlayInstance = new Overlay(theViewer)
        overlayInstance.resize()
        const styleObject = overlayInstance.element.style

        expect(styleObject.left).toBe('')
    })

    test('Overlay.resize fails when the tiled image is not ready', () => {
        theViewer.viewport.pixelFromPoint = () => null
        const overlayInstance = new Overlay(theViewer)
        overlayInstance.resize()
        const styleObject = overlayInstance.element.style

        expect(styleObject.left).toBe('')
    })

    test('Overlay.element is appended to the html', () => {
        const spyElementAppend = jest.spyOn(theViewer.canvas, 'appendChild')
        const overlayInstance = new Overlay(theViewer)

        expect(spyElementAppend).toHaveBeenCalledWith(overlayInstance.element)
    })

    test('Overlay renders a dataset with a default name when there is none', () => {
        const overlayInstance = new Overlay(theViewer)
        delete overlayData.name
        overlayInstance.render(overlayData)
        const ourDataset = getData(overlayInstance.element)

        expect(ourDataset).toHaveProperty('location')
        expect(ourDataset.name).toBe('Target Scan')
    })

    test('Overlay renders a className "valid" when the validity flag is positive', () => {
        overlayData.validity = {valid: true}
        const overlayInstance = new Overlay(theViewer)
        overlayInstance.render(overlayData)

        expect(overlayInstance.element.classList).toContain('valid');
        expect(overlayInstance.element.classList).not.toContain('invalid');
    })

    test('Overlay renders a className "invalid" when the validity flag is negative', () => {
        overlayData.validity = {valid: false}
        const overlayInstance = new Overlay(theViewer)
        overlayInstance.render(overlayData)

        expect(overlayInstance.element.classList).not.toContain('valid');
        expect(overlayInstance.element.classList).toContain('invalid');
    })

    test('Overlay renders no dedicated className when the validity flag is missing', () => {
        delete overlayData.validity
        const overlayInstance = new Overlay(theViewer)
        overlayInstance.render(overlayData)

        expect(overlayInstance.element.classList).not.toContain('valid');
        expect(overlayInstance.element.classList).not.toContain('invalid');
    })

    test('Overlay renders at least one new target chart', () => {
        const overlayInstance = new Overlay(theViewer)
        const spyElementAppend = jest.spyOn(overlayInstance.element, 'appendChild')
        overlayInstance.render(overlayData)

        expect(spyElementAppend).toHaveBeenCalled()
    })

    test('Overlay does not render when data are missing', () => {
        const overlayInstance = new Overlay(theViewer)
        const spyConsoleError = jest.spyOn(console, 'error')
        const spyElementAppend = jest.spyOn(overlayInstance.element, 'appendChild')
        overlayInstance.render(badOverlayData)

        expect(spyConsoleError).toHaveBeenCalled()
        expect(spyElementAppend).not.toHaveBeenCalled()
    })
})
