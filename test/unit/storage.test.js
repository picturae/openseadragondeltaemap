import {
    setData, getData, getUserData
} from '../../src/storage'

describe('storage keeps data with individual HTML-elements', () => {

    let htmlElement
    let allData

    beforeEach(() => {
        allData = {
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
        htmlElement = document.body
    })

    test(`setData writes the data accompanied by the element
            getData reads these`, () => {

        const before = getData (htmlElement)

        expect(before).toBe(null)

        setData(htmlElement, allData)

        const after = getData (htmlElement)

        expect(after).toBe(allData)
    })


    test('storage stores references to the data', () => {

        const before = getData (htmlElement)

        expect(typeof before.location).toBe('object')

        delete before.location

        const after = getData (htmlElement)

        expect(typeof before.location).toBe('undefined')

    })

    // test('setData selects properties for display', () => {
    //
    //     const dataString = setData(displayData)
    //
    //     expect(typeof dataString).toBe('string')
    //
    //     expect(dataString).toMatch(/name/)
    //     expect(dataString).not.toMatch(/metadata/)
    //     expect(dataString).toMatch(/observed/)
    //     expect(dataString).toMatch(/assessed/)
    //     expect(dataString).not.toMatch(/location/)
    //     expect(dataString).not.toMatch(/targets/)
    //     expect(dataString).not.toMatch(/colorPatches/)
    //     expect(dataString).not.toMatch(/edgePatches/)
    //     expect(dataString).toMatch(/reference/)
    //     expect(dataString).toMatch(/validity/)
    // })

})
