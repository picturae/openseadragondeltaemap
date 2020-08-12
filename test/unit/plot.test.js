import { mockTargetValue1 } from './_plot_mocks'
import { drawPlot } from '../../src/plot'

describe('plotting SFR should', () => {
    test('render a SVG image with heading', () => {
        const element = document.body
        const subject = 'Signal Fuzz Ratio'
        const edgeData = mockTargetValue1.targetValues.targets[1].edgePatches[1].observed
        drawPlot([edgeData], 'body', subject)

        expect(element.innerHTML).toContain('<svg');
        expect(element.innerHTML).toContain(subject);
    })

    test('return true for successfull rendering', () => {
        const subject = 'Split Frame Rendering'
        const edgeData = mockTargetValue1.targetValues.targets[1].edgePatches[1].observed
        const drawDone = drawPlot([edgeData], 'body', subject)

        expect(drawDone).toBeTruthy();
    })

    test('return falswe for fruitless rendering', () => {
        const subject = 'System-Fault-Risk'
        const edgeData = mockTargetValue1.targetValues.targets[0].edgePatches[0].observed
        const drawDone = drawPlot([edgeData], 'body', subject)

        expect(drawDone).toBeFalsy();
    })

})
