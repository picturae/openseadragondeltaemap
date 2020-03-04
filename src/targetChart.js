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
    this.element.style.boxShadow = 'inset 0 0 2px 2px darkviolet'
    parentNode.appendChild(this.element)

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
