import { hasOwnProperty, isUsableNumber } from 'my-lib'
import { setData } from './storage'
import { Patch } from '../src/patch'

const Chart = function(chartData, parentNode, containerSize, index, viewer) {
    this.name = 'Chart'
    this.element = document.createElement('deltaechart')
    this.element.classList.remove('active-target')
    const targetElement = this.element

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

    this.element.onclick = function() {
        if (!targetElement.classList.contains('active-target')) {
            viewer.viewport.goHome(true)
            targetElement.classList.add('active-target')

            const rect = viewer.viewport.imageToViewportRectangle(
                chartData.location.x,
                chartData.location.y,
                chartData.location.w,
                chartData.location.h,
            )
            const largestSide =
                rect.width > rect.height ? rect.width : rect.height
            let zoomLevel = 0

            if (largestSide >= 0.115 && largestSide <= 0.135) {
                zoomLevel = 3.6
            } else if (largestSide > 0.135 && largestSide <= 0.45) {
                zoomLevel = 1.4
            }

            // Convert that to viewport coordinates, the lingua franca of OpenSeadragon coordinates.
            var viewportPoint = viewer.viewport.imageToViewportCoordinates(
                chartData.location.x + chartData.location.w / 2,
                chartData.location.y + chartData.location.h / 2,
            )

            if (viewer.viewport.getZoom() < 2.5) {
                viewer.viewport.panTo(viewportPoint)
                viewer.viewport.zoomTo(zoomLevel)
            }
        }
    }

    parentNode.appendChild(this.element)

    let parentElementForPatches = this.element
    if (chartData.location.r && isUsableNumber(chartData.location.r)) {
        let patchContainer = document.createElement('div')
        patchContainer.style.width = `100%`
        patchContainer.style.height = `100%`
        patchContainer.style.transformOrigin = 'center center'

        let transform = `rotate(${chartData.location.r}deg)`
        if (chartData.location.r === 90) {
            transform = 'scaleY(-1)'
        } else if (chartData.location.r === 270) {
            transform = 'scaleX(-1)'
        }

        patchContainer.style.transform = transform
        this.element.appendChild(patchContainer)
        parentElementForPatches = patchContainer
    }

    setData(this.element, chartData)

    if (chartData.validity && hasOwnProperty(chartData.validity, 'valid')) {
        const isValid = chartData.validity.valid
        this.element.classList.add(isValid ? 'valid' : 'invalid')
    }

    this.patches = []
    const contentSize = {
        w: chartData.location.w,
        h: chartData.location.h,
    }
    if (chartData.colorPatches) {
        chartData.colorPatches.forEach(patchData => {
            patchData.patchType = 'colorPatch'
            patchData.targetName = chartData.targetName
            this.patches.push(
                new Patch(
                    patchData,
                    parentElementForPatches,
                    contentSize,
                    chartData.location.r,
                ),
            )
        })
    }
    if (chartData.edgePatches) {
        chartData.edgePatches.forEach(patchData => {
            patchData.patchType = 'edgePatch'
            patchData.targetName = chartData.targetName
            this.patches.push(
                new Patch(
                    patchData,
                    parentElementForPatches,
                    contentSize,
                    chartData.location.r,
                ),
            )
        })
    }
}

export { Chart }
