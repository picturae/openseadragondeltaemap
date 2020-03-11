import { hasOwnProperty } from './functions'

const TargetPatch = function(patchData, parentNode, containerSize) {
    this.name = 'TargetPatch'
    this.element = document.createElement('targetPatch')

    this.element.style.left = `${(patchData.location.x * 100) /
        containerSize.x}%`
    this.element.style.top = `${(patchData.location.y * 100) /
        containerSize.y}%`
    this.element.style.width = `${(patchData.location.w * 100) /
        containerSize.x}%`
    this.element.style.height = `${(patchData.location.h * 100) /
        containerSize.y}%`
    parentNode.appendChild(this.element)

    let userData = {}
    for (let [key, value] of Object.entries(patchData)) {
        if (!(key === 'location')) {
            userData[key] = value
        }
    }
    this.element.dataset.picturaeTargetmapDisplay = JSON.stringify(userData)

    if (userData.validity && hasOwnProperty(userData.validity, 'valid')) {
        const isValid = userData.validity.valid
        this.element.classList.add(isValid ? 'valid' : 'invalid')
    }
}

export { TargetPatch }
