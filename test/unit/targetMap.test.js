import { viewer } from './_mocks'
import { TargetMap } from '../../src/targetMap'

test('targetMap has public methods', () => {
    const targetMapInstance = new TargetMap(viewer)

    expect(typeof targetMapInstance.resize).toBe('function')
    expect(typeof targetMapInstance.render).toBe('function')
})

test('targetMap.resize sets the position in an absolute fashion', () => {
    const targetMapInstance = new TargetMap(viewer)
    targetMapInstance.resize()
    const styleObject = targetMapInstance.element.style

    expect(styleObject.left).toMatch(/px$/)
    expect(styleObject.top).toMatch(/px$/)
    expect(styleObject.width).toMatch(/px$/)
    expect(styleObject.height).toMatch(/px$/)
})

test('targetMap is appended to the html', () => {
    const spyElementAppend = jest.spyOn(viewer.canvas, 'appendChild')
    const targetMapInstance = new TargetMap(viewer)

    expect(spyElementAppend).toHaveBeenCalledWith(targetMapInstance.element)
})
