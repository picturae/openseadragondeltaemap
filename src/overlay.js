import { isUsableNumber, hasOwnProperty, roundAtDecimals } from 'my-lib'
import { setData } from './functions'
import { Chart } from './chart'
import { DisplayTable } from './displayTable'

const Overlay = function(viewer) {
    this.name = 'Overlay'
    this.element = document.createElement('deltaeoverlay')

    viewer.canvas.appendChild(this.element)

    this.resize = () => {
        this.tiledImage = viewer.world.getItemAt(0)
        if (!this.tiledImage) return
        const imageBounds = this.tiledImage.getBounds()
        const leftTop = viewer.viewport.pixelFromPoint(imageBounds.getTopLeft())
        const rightBottom = viewer.viewport.pixelFromPoint(
            imageBounds.getBottomRight(),
        )

        if (!isUsableNumber(leftTop.x, leftTop.y, rightBottom.x, rightBottom.y))
            return

        const precision = 4
        const box = {
            left: roundAtDecimals(leftTop.x, precision),
            top: roundAtDecimals(leftTop.y, precision),
            width: roundAtDecimals(rightBottom.x - leftTop.x, precision),
            height: roundAtDecimals(rightBottom.y - leftTop.y, precision),
        }

        this.element.style.left = `${box.left}px`
        this.element.style.top = `${box.top}px`
        this.element.style.width = `${box.width}px`
        this.element.style.height = `${box.height}px`
    }

    viewer.addHandler('animation', () => {
        this.resize()
    })
    viewer.addHandler('open', () => {
        this.resize()
    })
    viewer.addHandler('rotate', () => {
        this.resize()
    })
    viewer.addHandler('resize', () => {
        this.resize()
    })

    this.resize()

    this.charts = []
    this.render = jsonData => {
        this.element.innerHTML = ''
        if (!jsonData.name) jsonData.name = 'Target Scan'

        if (
            !jsonData ||
            !jsonData.location ||
            !jsonData.validity ||
            !jsonData.targets ||
            !jsonData.observed ||
            !jsonData.assessed
        ) {
            console.error(
                `Bad DeltaE Targetscan data, for ${jsonData.name}`,
                jsonData,
            )
            return
        }

        this.element.dataset.picturaeDeltaemapDisplay = setData(jsonData)

        if (jsonData.validity && hasOwnProperty(jsonData.validity, 'valid')) {
            const isValid = jsonData.validity.valid
            this.element.classList.add(isValid ? 'valid' : 'invalid')
        }

        // const contentSize = this.tiledImage.contentSize()
        // if (
        //     contentSize.x !== jsonData.location.w ||
        //     contentSize.y !== jsonData.location.h
        // ) {
        //     console.warn(
        //         'DeltaE Mapping: Size loaded image differs from report',
        //     )
        // }

        jsonData.targets.forEach(chartData => {
            this.charts.push(
                new Chart(chartData, this.element, jsonData.location),
            )
        })
    }
    new DisplayTable(this.element)
}

export { Overlay }
