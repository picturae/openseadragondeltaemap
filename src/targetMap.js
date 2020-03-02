import { isUsableNumber, roundAt } from './functions'

const TargetMap = function(viewer) {
    this.name = 'TargetMap'
    this.element = document.createElement('targetmap')
    this.element.style.position = 'absolute'
    this.element.style.boxShadow = 'inset 0 0 2px 2px blue'

    viewer.canvas.appendChild(this.element)

    this.resize = () => {
        const tiledImage = viewer.world.getItemAt(0)
        if (!tiledImage) return
        const imageBounds = tiledImage.getBounds()

        const leftTop = viewer.viewport.pixelFromPoint(imageBounds.getTopLeft())
        const rightBottom = viewer.viewport.pixelFromPoint(
            imageBounds.getBottomRight(),
        )

        if (!isUsableNumber(leftTop.x, leftTop.y, rightBottom.x, rightBottom.y))
            return

        const left = roundAt(leftTop.x, 3)
        const top = roundAt(leftTop.y, 3)
        const right = roundAt(rightBottom.x, 3)
        const bottom = roundAt(rightBottom.y, 3)

        this.element.style.left = `${left}px`
        this.element.style.top = `${top}px`
        this.element.style.width = `${right - left}px`
        this.element.style.height = `${bottom - top}px`
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
}

export { TargetMap }
