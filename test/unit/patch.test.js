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
