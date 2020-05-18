import { contentSize, targetData } from './_mocks'
import { Chart } from '../../src/chart'

let chartData = targetData.data.targets[0]
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

test('Chart renders a dataset', () => {
    const chartInstance = new Chart(
        chartData,
        htmlElement,
        contentSize,
    )
    const ourDataset = chartInstance.element.dataset

    expect(ourDataset).toHaveProperty('picturaeDeltaemapDisplay');
})

test('Chart renders a className "valid" when the validity flag is positive', () => {
    const chartValidData = chartData
    chartValidData.validity.valid = true
    const chartInstance = new Chart(
        chartValidData,
        htmlElement,
        contentSize,
    )
    expect(chartInstance.element.classList).toContain('valid');
})

test('Chart renders a className "invalid" when the validity flag is negative', () => {
    const chartInvalidData = chartData
    chartInvalidData.validity.valid = false
    const chartInstance = new Chart(
        chartInvalidData,
        htmlElement,
        contentSize,
    )

    expect(chartInstance.element.classList).toContain('invalid');
})

test('Chart renders at least one new target patch', () => {
    const chartInstance = new Chart(
        chartData,
        htmlElement,
        contentSize,
    )
    const childNodes = chartInstance.element.childNodes

    expect(childNodes[0].tagName).toBe('DELTAEPATCH')
})
