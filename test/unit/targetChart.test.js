import { contentSize, targetData } from './_mocks.js'
import { TargetChart } from '../../src/targetChart.js'

let chartData = targetData.targets[0]
let htmlElement = document.body

test('targetChart sets the position in a relative fashion', () => {
    const targetChartInstance = new TargetChart(
        chartData,
        htmlElement,
        contentSize,
    )
    const styleObject = targetChartInstance.element.style

    expect(styleObject.left).toMatch(/%$/)
    expect(styleObject.top).toMatch(/%$/)
    expect(styleObject.width).toMatch(/%$/)
    expect(styleObject.height).toMatch(/%$/)
})

test('targetChart is appended to the targetMap', () => {
    const spyElementAppend = jest.spyOn(htmlElement, 'appendChild')
    const targetChartInstance = new TargetChart(
        chartData,
        htmlElement,
        contentSize,
    )

    expect(spyElementAppend).toHaveBeenCalledWith(targetChartInstance.element)
})
