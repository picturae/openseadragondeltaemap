import {
    setData,
} from '../../src/functions'

test('setData selects properties for display', () => {
    const displayData = {
        name: 'name',
        metadata: {},
        observed: {},
        assessed: {},
        location: {},
        targets: [],
        colorPatches: [],
        edgePatches: [],
        reference: {},
        validity: {},
    }
    const dataString = setData(displayData)

    expect(typeof dataString).toBe('string')

    expect(dataString).toMatch(/name/)
    expect(dataString).not.toMatch(/metadata/)
    expect(dataString).toMatch(/observed/)
    expect(dataString).toMatch(/assessed/)
    expect(dataString).not.toMatch(/location/)
    expect(dataString).not.toMatch(/targets/)
    expect(dataString).not.toMatch(/colorPatches/)
    expect(dataString).not.toMatch(/edgePatches/)
    expect(dataString).toMatch(/reference/)
    expect(dataString).toMatch(/validity/)
})
