import { mockTargetValue1 } from './_plot_mocks'
import plot from '../../src/plot'

describe('test Patch', () => {
  test('exportCsv()', () => {
    const res = plot(mockTargetValue1.targetValues.targets[1].edgePatches);
    expect(res.length).toBeGreaterThan(0);
    expect(res[0].plot).toContain('<svg ');
  });
});
