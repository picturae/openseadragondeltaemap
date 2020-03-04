import { contentSize, targetData } from './_mocks.js'
import { TargetPatch } from '../../src/targetPatch.js'

let patchData = targetData.targets[0].colorPatches[0]
let htmlElement = document.body

test('targetPatch sets the position in a relative fashion', () => {
    const targetPatchInstance = new TargetPatch(
        patchData,
        htmlElement,
        contentSize,
    )
    const styleObject = targetPatchInstance.element.style

    expect(styleObject.left).toMatch(/%$/)
    expect(styleObject.top).toMatch(/%$/)
    expect(styleObject.width).toMatch(/%$/)
    expect(styleObject.height).toMatch(/%$/)
})

test('targetPatch is appended to the targetChart', () => {
    const spyElementAppend = jest.spyOn(htmlElement, 'appendChild')
    const targetPatchInstance = new TargetPatch(
        patchData,
        htmlElement,
        contentSize,
    )

    expect(spyElementAppend).toHaveBeenCalledWith(targetPatchInstance.element)
})
