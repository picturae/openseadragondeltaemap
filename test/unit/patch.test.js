import { contentSize, targetData } from './_mocks'
import { Patch } from '../../src/patch'

// target-patch part of jsonData
let patchData = targetData.targets[0].colorPatches[0]
let htmlElement = document.body

test('Patch sets the position in a relative fashion', () => {
    const patchInstance = new Patch(
        patchData,
        htmlElement,
        contentSize,
    )

    const styleObject = patchInstance.element.style

    expect(styleObject.left).toMatch(/^\d+/)
    expect(styleObject.top).toMatch(/^\d+/)
    expect(styleObject.width).toMatch(/^\d+/)
    expect(styleObject.height).toMatch(/^\d+/)
    expect(styleObject.left).toMatch(/%$/)
    expect(styleObject.top).toMatch(/%$/)
    expect(styleObject.width).toMatch(/%$/)
    expect(styleObject.height).toMatch(/%$/)
})

test('Patch.element is appended to the Chart.element', () => {
    const spyElementAppend = jest.spyOn(htmlElement, 'appendChild')
    const patchInstance = new Patch(
        patchData,
        htmlElement,
        contentSize,
    )

    expect(spyElementAppend).toHaveBeenCalledWith(patchInstance.element)
})

test('Patch renders a dataset', () => {
    const patchInstance = new Patch(
        patchData,
        htmlElement,
        contentSize,
    )
    const ourDataset = patchInstance.element.dataset

    expect(ourDataset).toHaveProperty('picturaeDeltaemapDisplay');
})

test('Patch renders a className "valid" when the validity flag is positive', () => {
    const patchValidData = patchData
    patchValidData.validity.valid = true
    const patchInstance = new Patch(
        patchValidData,
        htmlElement,
        contentSize,
    )
    expect(patchInstance.element.classList).toContain('valid');
})

test('Patch renders a className "invalid" when the validity flag is negative', () => {
    const patchInvalidData = patchData
    patchInvalidData.validity.valid = false
    const patchInstance = new Patch(
        patchInvalidData,
        htmlElement,
        contentSize,
    )

    expect(patchInstance.element.classList).toContain('invalid');
})
