import { TargetMap } from '../src/targetMap.js'
import { tiledImage, viewer } from './_mocks.js'

let targetMapInstance

beforeAll(() => {
    targetMapInstance = new TargetMap(viewer)
})

test('targetMap has public methods', () => {
    expect(typeof targetMapInstance.resize).toBe('function')
})

test('targetMap.resize sets the position of the main element', () => {
    targetMapInstance.resize()
    const styleObject = targetMapInstance.element.style
    expect(styleObject.left).toBeTruthy()
    expect(styleObject.top).toBeTruthy()
    expect(styleObject.width).toBeTruthy()
    expect(styleObject.height).toBeTruthy()
})
