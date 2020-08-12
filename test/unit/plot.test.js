import { mockTargetValue1 } from './_plot_mocks'
import { plotCurve } from '../../src/plot'

describe('plotting SFR should', () => {
    test('render a SVG image with heading', () => {
        const element = document.body
        const subject = 'Signal Fuzz Ratio'
        const edgeData = mockTargetValue1.targetValues.targets[1].edgePatches[1].observed
        plotCurve(edgeData, 'body', subject)

        expect(element.innerHTML).toContain('<svg');
        expect(element.innerHTML).toContain(subject);
    })
})
