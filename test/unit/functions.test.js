import {
    isAttachedToDom,
    isPrimitive,
    isUsableNumber,
    roundAt,
    setData,
} from '../../src/functions'

test('roundAt rounds 1.005 to 1.01', () => {
    expect(roundAt(1.005, 2)).toBe(1.01)
    expect(roundAt(-1.005, 2)).toBe(-1.00)
})

test(`roundAt defaults to zero when the absolute number
        is smaller than the required precision`, () => {
    expect(roundAt(1.2e-34, 2)).toBe(0)
    expect(roundAt(-1.2e-34, 2)).toBe(0)
})

test('isUsableNumber tests for numbers', () => {
    expect(isUsableNumber(74524)).toBe(true)
    expect(isUsableNumber(3.4e-34)).toBe(true)
    expect(isUsableNumber(0)).toBe(true)
    expect(
        isUsableNumber(
            -3210374564590128345611235677537829309.3456478980891286553928745,
        ),
    ).toBe(true)
})

test('isUsableNumber tests for numbers outside the decimal base', () => {
    expect(isUsableNumber(0b1)).toBe(true)
    expect(isUsableNumber(0o7)).toBe(true)
    expect(isUsableNumber(0xf)).toBe(true)
})

test('isUsableNumber declines special cases', () => {
    expect(isUsableNumber(Infinity)).toBe(false)
    expect(isUsableNumber(-Infinity)).toBe(false)
    expect(isUsableNumber(NaN)).toBe(false)
    expect(isUsableNumber(null)).toBe(false)
    expect(isUsableNumber(undefined)).toBe(false)
})

test('isUsableNumber declines primitives evaluating to numbers', () => {
    expect(isUsableNumber('1634')).toBe(false)
    expect(isUsableNumber('')).toBe(false)
    expect(isUsableNumber(true)).toBe(false)
    expect(isUsableNumber(false)).toBe(false)
})

test('isUsableNumber declines objects evaluating to numbers', () => {
    expect(isUsableNumber(new Date())).toBe(false)
    expect(isUsableNumber([])).toBe(false)
    expect(isUsableNumber([undefined])).toBe(false)
    expect(isUsableNumber([3])).toBe(false)
})

test('isUsableNumber tests zero or more values', () => {
    expect(isUsableNumber()).toBe(false)
    expect(isUsableNumber(1, 2, 3)).toBe(true)
    expect(isUsableNumber(5, 'x')).toBe(false)
    expect(isUsableNumber(undefined, NaN)).toBe(false)
})

test('isPrimitive tests an object-member being a primitive', () => {
    let testObject = {
      aBoolean: true,
      aString: 'yep',
      aNaN: NaN,
      aNull: null,
      aNumber: 3.14,
      anUndefined: undefined,
      anArray: [1,2,3],
      anObject: {a: 1, b: 'b'},
      aFunction: () => {},
      aDate: new Date(),
      aDateString: Date(),
      aSyombol: Symbol('alpha')
    }

    expect(isPrimitive(testObject.aBoolean)).toBe(true)
    expect(isPrimitive(testObject.aString)).toBe(true)
    expect(isPrimitive(testObject.aNaN)).toBe(true)
    expect(isPrimitive(testObject.aNull)).toBe(false)
    expect(isPrimitive(testObject.aNumber)).toBe(true)
    expect(isPrimitive(testObject.anUndefined)).toBe(false)
    expect(isPrimitive(testObject.anArray)).toBe(false)
    expect(isPrimitive(testObject.anObject)).toBe(false)
    expect(isPrimitive(testObject.aFunction)).toBe(false)
    expect(isPrimitive(testObject.aDate)).toBe(false)
    expect(isPrimitive(testObject.aDateString)).toBe(true)
    expect(isPrimitive(testObject.aSyombol)).toBe(false)
})

test('isAttachedToDom tests an html-element being inside the DOM', () => {
    // beware, the ShadowRoot has been mocked
    let newElement = document.createElement('div')
    expect(isAttachedToDom(newElement)).toBe(false)

    document.body.appendChild(newElement)

    expect(isAttachedToDom(newElement)).toBe(true)

    document.body.removeChild(newElement)

    expect(isAttachedToDom(newElement)).toBe(false)
})

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
