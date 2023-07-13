import { hasOwnProperty, isUsableNumber } from 'my-lib'
import { setData } from './storage'
import { Patch } from '../src/patch'
import HystModal from 'HystModal'

const Chart = function(chartData, parentNode, containerSize, index) {
    this.name = 'Chart'
    this.element = document.createElement('deltaechart')

    if (!chartData.name) chartData.name = 'unnamed targetchart'
    if (!chartData || !chartData.location || !chartData.observed) {
        console.warn(
            'Bad DeltaE Targetchart data',
            `for ${chartData.name}`,
            chartData,
        )
        return
    }

    this.element.style.left = `${(chartData.location.x * 100) /
        containerSize.w}%`
    this.element.style.top = `${(chartData.location.y * 100) /
        containerSize.h}%`
    this.element.style.width = `${(chartData.location.w * 100) /
        containerSize.w}%`
    this.element.style.height = `${(chartData.location.h * 100) /
        containerSize.h}%`
    if (chartData.location.r && isUsableNumber(chartData.location.r)) {
        this.element.style.transformOrigin = 'center center'
        const rotate = `rotate(${chartData.location.r}deg)`
        this.element.style.transform = rotate
    }

    const myModal = new HystModal({
        linkAttributeName: 'data-hystmodal',
    })
    myModal.init()

    this.element.onclick = function() {
        console.log('Open modal target')
        myModal.open(`target-image-${index}`)
    }

    parentNode.appendChild(this.element)

    setData(this.element, chartData)

    if (chartData.validity && hasOwnProperty(chartData.validity, 'valid')) {
        const isValid = chartData.validity.valid
        this.element.classList.add(isValid ? 'valid' : 'invalid')
    }

    // Add modal html for target
    parentNode.insertAdjacentHTML(
        'afterend',
        `<div class="hystmodal" id="target-modal-${index}" aria-hidden="true">
        <div class="hystmodal__wrap">
            <div class="hystmodal__window" role="dialog" aria-modal="true">
                <button data-hystclose class="hystmodal__close">X</button>
                <img src='${chartData.image}' id='target-image-${index}' />
            </div>
        </div>
    </div>`,
    )

    this.element = document.getElementById(`target-image-${index}`)

    this.patches = []
    const contentSize = {
        w: chartData.location.w,
        h: chartData.location.h,
    }
    if (chartData.colorPatches) {
        chartData.colorPatches.forEach(patchData => {
            patchData.patchType = 'colorPatch'
            patchData.targetName = chartData.targetName
            this.patches.push(new Patch(patchData, this.element, contentSize))
        })
    }
    if (chartData.edgePatches) {
        chartData.edgePatches.forEach(patchData => {
            patchData.patchType = 'edgePatch'
            patchData.targetName = chartData.targetName
            this.patches.push(new Patch(patchData, this.element, contentSize))
        })
    }
}

export { Chart }
