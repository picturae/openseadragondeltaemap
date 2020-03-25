import { DisplayTable } from '../../src/displayTable'

let htmlElement = document.body

test('displayTable listens to events', () => {
    const spyEventListener = jest.spyOn(htmlElement, 'addEventListener')
    new DisplayTable(htmlElement)

    expect(spyEventListener).toHaveBeenCalledWith('mouseover', expect.any(Function))
    expect(spyEventListener).toHaveBeenCalledWith('mousemove', expect.any(Function))
})
