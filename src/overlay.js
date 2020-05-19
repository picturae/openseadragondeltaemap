import { isUsableNumber, hasOwnProperty, roundAt } from './functions'
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
            left: roundAt(leftTop.x, precision),
            top: roundAt(leftTop.y, precision),
            width: roundAt(rightBottom.x - leftTop.x, precision),
            height: roundAt(rightBottom.y - leftTop.y, precision),
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
        if (
            !jsonData ||
            !jsonData.validity ||
            !jsonData.targets ||
            !jsonData.assessed
        ) {
            console.error('Bad DeltaE JSON')
            return
        }

        if (!jsonData.name) jsonData.name = 'Target Scan'
        let userData = {}
        for (let [key, value] of Object.entries(jsonData)) {
            if (!(key === 'targets')) {
                userData[key] = value
            }
        }
        this.element.dataset.picturaeDeltaemapDisplay = JSON.stringify(userData)

        if (userData.validity && hasOwnProperty(userData.validity, 'valid')) {
            const isValid = userData.validity.valid
            this.element.classList.add(isValid ? 'valid' : 'invalid')
        }

        jsonData.targets.forEach(chartData => {
            this.charts.push(
                new Chart(
                    chartData,
                    this.element,
                    this.tiledImage.getContentSize(),
                ),
            )
        })
    }
    new DisplayTable(this.element)
}

export { Overlay }
