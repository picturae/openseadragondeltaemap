import { getData } from '../../src/storage'
import { contentSize, targetData, badChartData } from './_mocks'
import { Chart } from '../../src/chart'

// suppress alarming messages in output and make call to function testable
console.warn = jest.fn()

// target-chart part of jsonData
let chartData = targetData.targets[0]
let htmlElement = document.body

test('Chart sets the position in a relative fashion', () => {
    const chartInstance = new Chart(
        chartData,
        htmlElement,
        contentSize,
    )
    const styleObject = chartInstance.element.style

    expect(styleObject.left).toMatch(/^\d+/)
    expect(styleObject.top).toMatch(/^\d+/)
    expect(styleObject.width).toMatch(/^\d+/)
    expect(styleObject.height).toMatch(/^\d+/)
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

test('Chart renders stored data', () => {
    const chartInstance = new Chart(
        chartData,
        htmlElement,
        contentSize,
    )
    const ourDataset = getData(chartInstance.element)

    expect(ourDataset).toHaveProperty('location')
})

test('Chart renders a className "valid" when the validity flag is positive', () => {
    const chartValidData = JSON.parse(JSON.stringify(chartData))
    chartValidData.validity = {valid: true}
    const chartInstance = new Chart(
        chartValidData,
        htmlElement,
        contentSize,
    )

    expect(chartInstance.element.classList).toContain('valid');
    expect(chartInstance.element.classList).not.toContain('invalid');
})

test('Chart renders a className "invalid" when the validity flag is negative', () => {
    const chartInvalidData = JSON.parse(JSON.stringify(chartData))
    chartInvalidData.validity = {valid: false}
    const chartInstance = new Chart(
        chartInvalidData,
        htmlElement,
        contentSize,
    )

    expect(chartInstance.element.classList).not.toContain('valid');
    expect(chartInstance.element.classList).toContain('invalid');
})

test('Chart renders no dedicated className when the validity flag is missing', () => {
    const chartNoValidationData = JSON.parse(JSON.stringify(chartData))
    delete chartNoValidationData.validity
    const chartInstance = new Chart(
        chartNoValidationData,
        htmlElement,
        contentSize,
    )

    expect(chartInstance.element.classList).not.toContain('valid');
    expect(chartInstance.element.classList).not.toContain('invalid');
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

test('Chart does not render when data are missing', () => {
    const spyConsoleWarn = jest.spyOn(console, 'warn')
    const spyElementAppend = jest.spyOn(htmlElement, 'appendChild')
    const chartInstance = new Chart(
        badChartData,
        htmlElement,
        contentSize,
    )

    expect(spyConsoleWarn).toHaveBeenCalledWith(
        'Bad DeltaE Targetchart data', expect.any(String), expect.any(Object)
    )
    expect(spyElementAppend).not.toHaveBeenCalledWith(chartInstance.element)
})

test('Chart can be rotated 180 deg', () => {
    const chartInstance = new Chart(
        chartData,
        htmlElement,
        contentSize,
    )

    expect(chartInstance.element.style.transform).toBe('rotate(180deg)')
})
