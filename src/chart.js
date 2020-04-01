import { hasOwnProperty } from './functions'
import { Patch } from '../src/patch'

const Chart = function(chartData, parentNode, containerSize) {
    this.name = 'Chart'
    this.element = document.createElement('deltaechart')

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
    parentNode.appendChild(this.element)

    let userData = {}
    for (let [key, value] of Object.entries(chartData)) {
        if (
            !(
                key === 'location' ||
                key === 'colorPatches' ||
                key === 'edgePatches'
            )
        ) {
            userData[key] = value
        }
    }
    this.element.dataset.picturaeDeltaemapDisplay = JSON.stringify(userData)

    if (userData.validity && hasOwnProperty(userData.validity, 'valid')) {
        const isValid = userData.validity.valid
        this.element.classList.add(isValid ? 'valid' : 'invalid')
    }

    this.patches = []
    const contentSize = {
        x: chartData.location.w,
        y: chartData.location.h,
    }
    if (chartData.colorPatches) {
        chartData.colorPatches.forEach(patchData => {
            patchData.patchType = 'color'
            this.patches.push(new Patch(patchData, this.element, contentSize))
        })
    }
    // if (chartData.edgePatches) {
    //     chartData.edgePatches.forEach(patchData => {
    //         patchData.patchType = 'edge'
    //         this.patches.push(
    //             new Patch(patchData, this.element, contentSize),
    //         )
    //     })
    // }
}

export { Chart }
