import { hasOwnProperty } from 'my-lib'
import { setData } from './storage'

const Patch = function(patchData, parentNode, containerSize) {
    this.name = 'Patch'
    this.element = document.createElement('deltaepatch')

    if (!patchData.name) patchData.name = 'unnamed patch'

    if (!patchData || !patchData.location || !patchData.observed) {
        console.warn(
            'Bad DeltaE Patch data',
            `for ${patchData.name} of ${patchData.targetName}`,
            patchData,
        )
        return
    }

    this.element.style.left = `${(patchData.location.x * 100) /
        containerSize.w}%`
    this.element.style.top = `${(patchData.location.y * 100) /
        containerSize.h}%`
    this.element.style.width = `${(patchData.location.w * 100) /
        containerSize.w}%`
    this.element.style.height = `${(patchData.location.h * 100) /
        containerSize.h}%`
    parentNode.appendChild(this.element)

    setData(this.element, patchData)

    if (patchData.validity && hasOwnProperty(patchData.validity, 'valid')) {
        const isValid = patchData.validity.valid
        this.element.classList.add(isValid ? 'valid' : 'invalid')
    }
}

export { Patch }
