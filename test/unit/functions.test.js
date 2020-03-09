import {
        camelCaseToTitle,
        isAttachedToDom,
        isPrimitive,
        isUsableNumber,
        roundAt
    } from '../../src/functions.js'

test('roundAt rounds 1.005 to 1.01', () => {
    expect(roundAt(1.005, 2)).toBe(1.01)
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

test('camelCaseToTitle splits a camel string in human readable text', () => {
    expect(camelCaseToTitle('hallo')).toBe('Hallo')
    expect(camelCaseToTitle('HelloIMustBeGoing')).toBe('Hello IMust Be Going')
    expect(camelCaseToTitle('innerHTML')).toBe('Inner HTML')
    expect(camelCaseToTitle('meineÜbung')).toBe('Meine Übung')
    expect(camelCaseToTitle('meanDeltaECMC')).toBe('Mean Delta ECMC')
    expect(camelCaseToTitle('meanDeltaECMC', {preserve: ['DeltaE']})).toBe('Mean DeltaE CMC')
    expect(camelCaseToTitle('meanDeltaECMC', {preserve: ['DeltaE', 'CMC']})).toBe('Mean DeltaE CMC')
    expect(camelCaseToTitle('meanDeltaECMC', {replace: {'DeltaE': '∆E'}})).toBe('Mean ∆E CMC')
})
