import * as d3 from 'd3'

/** Build SVG graph into DisplayTable
 * @param {object} colorsData - object with R, G, B and Lum properties
 * @param {string} parentQuery - css selector for parentNode
 * @param {string} title - heading
 */
const drawPlot = (colorsData, parentQuery, title) => {
    const body = d3.select(parentQuery)
    const data = []

    Object.keys(colorsData).forEach(color => {
        const currentColor = {}
        currentColor.name = color
        switch (color) {
            case 'R':
                currentColor.color = 'Red'
                break
            case 'G':
                currentColor.color = 'Green'
                break
            case 'B':
                currentColor.color = 'Blue'
                break
            case 'Lum':
                currentColor.color = 'Yellow'
                break
        }
        currentColor.values = []
        colorsData[color].MTF_Curve.forEach(plotPoint => {
            currentColor.values.push({
                x: plotPoint[0],
                y: plotPoint[1],
            })
        })
        data.push(currentColor)
    })

    const width = 300
    const height = 200
    const margin = 25

    const lineOpacity = '0.25'

    /* Scale */
    const xScale = d3
        .scaleLinear()
        .domain(d3.extent(data[0].values, d => d.x))
        .range([0, width - margin])

    const yScale = d3
        .scaleLinear()
        .domain([0, d3.max(data[0].values, d => d.y)])
        .range([height - margin, 0])

    /* Add SVG */
    const svg = body
        .append('svg')
        .attr('xmlns', 'http://www.w3.org/2000/svg')
        .attr('xmlns:xlink', 'http://www.w3.org/1999/xlink')
        .attr('width', width + margin + 'px')
        .attr('height', height + margin + 'px')
        .append('g')
        .attr('transform', `translate(${margin}, ${margin})`)

    svg.append('text')
        .attr('x', width * 0.05)
        .attr('y', height * 0.1 - margin)
        .attr('style', 'font: caption')
        .text(title)

    /* Add line into SVG */
    const line = d3
        .line()
        .x(d => xScale(d.x))
        .y(d => yScale(d.y))

    const lines = svg.append('g').attr('class', 'lines')

    lines
        .selectAll('.line-group')
        .data(data)
        .enter()
        .append('g')
        .attr('class', 'line-group')
        .append('path')
        .attr('class', 'line')
        .attr('d', d => line(d.values))
        .style('stroke', d => d.color)
        .style('stroke-width', 1.5)
        .attr('stroke-linejoin', 'round')
        .attr('stroke-linecap', 'round')
        .style('mix-blend-mode', 'multiply')
        .style('fill', 'none')
        .style('opacity', lineOpacity)

    /* Add Axis into SVG */
    const xAxis = d3.axisBottom(xScale).ticks(10)
    const yAxis = d3.axisLeft(yScale).ticks(10)

    svg.append('g')
        .attr('class', 'x axis')
        .attr('transform', `translate(0, ${height - margin})`)
        .call(xAxis)

    svg.append('g')
        .attr('class', 'y axis')
        .call(yAxis)
        .append('text')
        .attr('y', 15)
        .attr('transform', 'rotate(-90)')
        .attr('fill', '#000')
}

const plotCurve = (edgePatch, parentQuery, heading) => {
    drawPlot(edgePatch, parentQuery, heading)
}

export { plotCurve }
