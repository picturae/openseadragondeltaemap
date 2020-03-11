import { isUsableNumber, hasOwnProperty, roundAt } from './functions'
import { TargetChart } from './targetChart'
import { DisplayTable } from './displayTable'

const TargetMap = function(viewer) {
    this.name = 'TargetMap'
    this.element = document.createElement('targetmap')

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
    this.render = json => {
        let userData = {}
        for (let [key, value] of Object.entries(json)) {
            if (!(key === 'targets')) {
                userData[key] = value
            }
        }
        this.element.dataset.picturaeTargetmapDisplay = JSON.stringify(userData)

        if (userData.validity && hasOwnProperty(userData.validity, 'valid')) {
            const isValid = userData.validity.valid
            this.element.classList.add(isValid ? 'valid' : 'invalid')
        }

        json.targets.forEach(chartData => {
            this.charts.push(
                new TargetChart(
                    chartData,
                    this.element,
                    this.tiledImage.getContentSize(),
                ),
            )
        })
    }
    new DisplayTable(document.body)
}

export { TargetMap }
