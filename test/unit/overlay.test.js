import { viewer , targetData} from './_mocks'
import { Overlay } from '../../src/overlay'

test('Overlay has public methods', () => {
    const overlayInstance = new Overlay(viewer)

    expect(typeof overlayInstance.resize).toBe('function')
    expect(typeof overlayInstance.render).toBe('function')
})

test('Overlay.resize sets the position in an absolute fashion', () => {
    const overlayInstance = new Overlay(viewer)
    overlayInstance.resize()
    const styleObject = overlayInstance.element.style

    expect(styleObject.left).toMatch(/px$/)
    expect(styleObject.top).toMatch(/px$/)
    expect(styleObject.width).toMatch(/px$/)
    expect(styleObject.height).toMatch(/px$/)
})

test('Overlay.element is appended to the html', () => {
    const spyElementAppend = jest.spyOn(viewer.canvas, 'appendChild')
    const overlayInstance = new Overlay(viewer)

    expect(spyElementAppend).toHaveBeenCalledWith(overlayInstance.element)
})
