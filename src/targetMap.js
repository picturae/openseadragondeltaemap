import { isUsableNumber, roundAt } from './functions'
import { TargetChart } from './targetChart'

const TargetMap = function(viewer) {
    this.name = 'TargetMap'
    this.element = document.createElement('targetmap')
    this.element.style.position = 'absolute'
    this.element.style.boxShadow = 'inset 0 0 2px 2px blue'

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
        json.forEach(result => {
            this.charts.push(
                new TargetChart(result, this.element, this.tiledImage),
            )
        })
    }
}

export { TargetMap }
