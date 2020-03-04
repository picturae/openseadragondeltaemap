import { isPrimitive } from './functions'
import { TargetPatch } from '../src/targetPatch.js'

const TargetChart = function(chartData, parentNode, containerSize) {
    this.name = 'TargetChart'
    this.element = document.createElement('targetChart')

    this.element.style.position = 'absolute'
    this.element.style.left = `${(chartData.location.x * 100) /
        containerSize.x}%`
    this.element.style.top = `${(chartData.location.y * 100) /
        containerSize.y}%`
    this.element.style.width = `${(chartData.location.w * 100) /
        containerSize.x}%`
    this.element.style.height = `${(chartData.location.h * 100) /
        containerSize.y}%`
    if (chartData.location.r) {
        if (chartData.location.r === 180) {
            this.element.style.transformOrigin = 'center center'
            const rotate = `rotate(${chartData.location.r}deg)`
            this.element.style.transform = rotate //+ ' ' + translate
        }
    }
    this.element.style.boxShadow = 'inset 0 0 2px 2px darkviolet'
    parentNode.appendChild(this.element)

    let userData = {}
    for (let [key, value] of Object.entries(chartData)) {
        if (isPrimitive(value)) {
            userData[key] = value
        }
    }
    chartData.validity ? (userData.validity = chartData.validity) : null
    this.element.dataset.picturaeTargetmapDisplay = JSON.stringify(userData)

    this.patches = []
    const contentSize = {
        x: chartData.location.w,
        y: chartData.location.h,
    }
    if (chartData.colorPatches) {
        chartData.colorPatches.forEach(patchData => {
            this.patches.push(
                new TargetPatch(patchData, this.element, contentSize),
            )
        })
    }
    if (chartData.edgePatches) {
        chartData.edgePatches.forEach(patchData => {
            this.patches.push(
                new TargetPatch(patchData, this.element, contentSize),
            )
        })
    }
}

export { TargetChart }
