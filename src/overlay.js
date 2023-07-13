import { isUsableNumber, hasOwnProperty, roundAtDigits } from 'my-lib'
import { setData } from './storage'
import { Chart } from './chart'
import { DisplayTable } from './displayTable'

const Overlay = function(viewer, options) {
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

        const areGoodData =
            leftTop &&
            rightBottom &&
            isUsableNumber(leftTop.x, leftTop.y, rightBottom.x, rightBottom.y)
        if (!areGoodData) return

        const roundSize = 5
        const box = {
            left: roundAtDigits(leftTop.x, roundSize),
            top: roundAtDigits(leftTop.y, roundSize),
            width: roundAtDigits(rightBottom.x - leftTop.x, roundSize),
            height: roundAtDigits(rightBottom.y - leftTop.y, roundSize),
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
            !jsonData.targets ||
            !jsonData.observed
        ) {
            console.error(
                'Bad DeltaE Targetscan data',
                `for ${jsonData.name}`,
                jsonData,
            )
            return
        }

        setData(this.element, jsonData)

        if (jsonData.validity && hasOwnProperty(jsonData.validity, 'valid')) {
            const isValid = jsonData.validity.valid
            this.element.classList.add(isValid ? 'valid' : 'invalid')
        }

        const contentSize = this.tiledImage.getContentSize()
        const servedAspect = roundAtDigits(contentSize.x / contentSize.y, 5)
        const measuredAspect = roundAtDigits(
            jsonData.location.w / jsonData.location.h,
            5,
        )
        if (servedAspect !== measuredAspect) {
            console.warn(
                'Aspectratio served image differs from DeltaE measurements',
                `(served: ${contentSize}, measured: ${jsonData.location})`,
            )
        }

        jsonData.targets.forEach((chartData, index) => {
            this.charts.push(
                new Chart(chartData, this.element, jsonData.location, index),
            )
        })
    }
    new DisplayTable(this.element, options)
}

export { Overlay }
