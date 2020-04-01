import { contentSize, targetData } from './_mocks'
import { Chart } from '../../src/chart'

let chartData = targetData.targets[0]
let htmlElement = document.body

test('Chart sets the position in a relative fashion', () => {
    const chartInstance = new Chart(
        chartData,
        htmlElement,
        contentSize,
    )
    const styleObject = chartInstance.element.style

    expect(styleObject.left).toMatch(/%$/)
    expect(styleObject.top).toMatch(/%$/)
    expect(styleObject.width).toMatch(/%$/)
    expect(styleObject.height).toMatch(/%$/)
})

test('Chart.element is appended to the Overlay.element', () => {
    const spyElementAppend = jest.spyOn(htmlElement, 'appendChild')
    const chartInstance = new Chart(
        chartData,
        htmlElement,
        contentSize,
    )

    expect(spyElementAppend).toHaveBeenCalledWith(chartInstance.element)
})
