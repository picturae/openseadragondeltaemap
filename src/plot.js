import * as d3 from 'd3'

/** Build SVG graph into DisplayTable
 * @param {object} edgeList - array of objects with R, G, B and Lum properties
 * @param {string} parentQuery - css selector for parentNode
 * @param {string} heading - heading
 * @return {boolean} succes
 */
const drawPlot = (edgeList, parentQuery, heading) => {
    const body = d3.select(parentQuery)
    const sfrList = []

    edgeList.forEach(edgeData => {
        Object.keys(edgeData).forEach(channel => {
            const sfrChannel = {}
            sfrChannel.name = channel
            switch (channel) {
                case 'R':
                    sfrChannel.color = 'Red'
                    break
                case 'G':
                    sfrChannel.color = 'Green'
                    break
                case 'B':
                    sfrChannel.color = 'Blue'
                    break
                case 'Lum':
                    sfrChannel.color = 'Yellow'
                    break
            }

            if (!sfrChannel.color || !edgeData[channel].MTF_Curve) return

            sfrChannel.values = []
            edgeData[channel].MTF_Curve.forEach(plotPoint => {
                sfrChannel.values.push({
                    x: plotPoint[0],
                    y: plotPoint[1],
                })
            })

            if (!sfrChannel.values.length) return

            sfrList.push(sfrChannel)
        })
    })

    if (!sfrList.length) return false

    const width = 300
    const height = 200
    const margin = 25

    const lineOpacity = '0.25'

    /* Scale */
    const xScale = d3
        .scaleLinear()
        .domain(d3.extent(sfrList[0].values, d => d.x))
        .range([0, width - margin])

    const yScale = d3
        .scaleLinear()
        .domain([0, d3.max(sfrList[0].values, d => d.y)])
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
        .text(heading)

    /* Add line into SVG */
    const line = d3
        .line()
        .x(d => xScale(d.x))
        .y(d => yScale(d.y))

    const lines = svg.append('g').attr('class', 'lines')

    lines
        .selectAll('.line-group')
        .data(sfrList)
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

    return true
}

export { drawPlot }
