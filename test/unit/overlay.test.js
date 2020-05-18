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

test('Overlay renders a dataset with a default name when there is none', () => {
    const overlayInstance = new Overlay(viewer)
    delete targetData.data.name
    overlayInstance.render(targetData)
    const ourDataset = overlayInstance.element.dataset.picturaeDeltaemapDisplay

    expect(JSON.parse(ourDataset).name).toBe('Target Scan');
})

test('Overlay renders a className "valid" when the validity flag is positive', () => {
    const overlayInstance = new Overlay(viewer)
    targetData.data.validity.valid = true
    overlayInstance.render(targetData)
    const classList = overlayInstance.element.classList

    expect(classList).toContain('valid');
})

test('Overlay renders a className "invalid" when the validity flag is negative', () => {
    const overlayInstance = new Overlay(viewer)
    targetData.data.validity.valid = false
    overlayInstance.render(targetData)
    const classList = overlayInstance.element.classList

    expect(classList).toContain('invalid');
})

test('Overlay renders at least one new target chart', () => {
    const overlayInstance = new Overlay(viewer)
    const spyElementAppend = jest.spyOn(overlayInstance.element, 'appendChild')
    overlayInstance.render(targetData)

    expect(spyElementAppend).toHaveBeenCalled()
})
