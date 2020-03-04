import { isPrimitive } from './functions'

const TargetPatch = function(patchData, parentNode, containerSize) {
    this.name = 'TargetPatch'
    this.element = document.createElement('targetPatch')

    this.element.style.position = 'absolute'
    this.element.style.left = `${(patchData.location.x * 100) /
        containerSize.x}%`
    this.element.style.top = `${(patchData.location.y * 100) /
        containerSize.y}%`
    this.element.style.width = `${(patchData.location.w * 100) /
        containerSize.x}%`
    this.element.style.height = `${(patchData.location.h * 100) /
        containerSize.y}%`

    this.element.style.boxShadow = 'inset 0 0 2px 2px orange'
    parentNode.appendChild(this.element)

    let userData = {}
    for (let [key, value] of Object.entries(patchData)) {
        if (isPrimitive(value)) {
            userData[key] = value
        }
    }
    patchData.reference ? (userData.reference = patchData.reference) : null
    patchData.validity ? (userData.validity = patchData.validity) : null
    this.element.dataset.picturaeTargetmapDisplay = JSON.stringify(userData)
}

export { TargetPatch }
