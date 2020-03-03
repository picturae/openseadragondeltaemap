const TargetChart = function(chartData, parentNode, tiledImage) {
    this.name = 'TargetChart'
    const imageDimensions = tiledImage.getContentSize()
    this.element = document.createElement('targetChart')
    this.element.style.position = 'absolute'
    this.element.style.left = `${(chartData.location.x * 100) /
        imageDimensions.x}%`
    this.element.style.top = `${(chartData.location.y * 100) /
        imageDimensions.y}%`
    this.element.style.width = `${(chartData.location.w * 100) /
        imageDimensions.x}%`
    this.element.style.height = `${(chartData.location.h * 100) /
        imageDimensions.y}%`
    this.element.style.boxShadow = 'inset 0 0 2px 2px darkviolet'
    parentNode.appendChild(this.element)
}

export { TargetChart }
