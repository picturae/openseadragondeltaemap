import { extent, max, range } from 'd3-array'
import { axisBottom, axisLeft } from 'd3-axis'
import { select, selectAll } from 'd3-selection'
import { scaleLinear } from 'd3-scale'
import { line } from 'd3-shape'
// 10 circular dependencies, module 63.079 bytes

// import * as d3 from 'd3'
// 19 circular dependencies, module 79.514 bytes

// group methods in a code-compatible object
const d3 = {
    // d3-array
    extent: extent,
    max: max,
    range: range,

    // d3-array
    axisBottom: axisBottom,
    axisLeft: axisLeft,

    // d3-selection
    select: select,
    selectAll: selectAll,
    // ==> append, attr, domain, style, text, data, enter,

    // d3-scale
    scaleLinear: scaleLinear,

    //d3-shape
    line: line,
    // ==> x, y,
}

/** Build SVG graph into DisplayTable
 * @param {object} edgeList - array of objects with R, G, B and Lum properties
 * @param {string} parentQuery - css selector for parentNode
 * @param {string} heading - heading
 * @return {boolean || undefined} succes
 */
const drawPlot = (edgeList, parentQuery, heading) => {
    const body = d3.select(parentQuery)
    const sfrList = []
    let halfSampling = 0.5
    let cutoff_frequency = 0.8
    edgeList.forEach(edgeData => {
        if (typeof edgeData !== 'object') return
        if (edgeData.cutoff_frequency) {
            cutoff_frequency = edgeData.cutoff_frequency
        }
        if (edgeData.hsf) {
            halfSampling = edgeData.hsf
        }
        Object.keys(edgeData).forEach(channel => {
            const sfrChannel = {}
            sfrChannel.name = channel
            switch (channel) {
                case 'R':
                    sfrChannel.color = 'red'
                    break
                case 'G':
                    sfrChannel.color = 'green'
                    break
                case 'B':
                    sfrChannel.color = 'blue'
                    break
                case 'Lum':
                    sfrChannel.color = 'black'
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

    const width = 400
    const height = 200
    const margin = 40
    const graphWidth = width - margin
    const graphHeight = height - margin
    const docWidth = width + margin
    const docHeight = height + margin

    /* Scale */
    const xScale = d3
        .scaleLinear()
        .domain([0, cutoff_frequency])
        //.domain([0, d3.max(sfrList[0].values, d => d.x)])
        .clamp(true)
        .range([0, graphWidth])

    const yScale = d3
        .scaleLinear()
        .domain([0, d3.max(sfrList[0].values, d => d.y)])
        .range([graphHeight, 0])

    /* Add SVG */
    const svg = body
        .append('svg')
        .attr('xmlns', 'http://www.w3.org/2000/svg')
        .attr('xmlns:xlink', 'http://www.w3.org/1999/xlink')
        .attr('width', docWidth + 'px')
        .attr('height', docHeight + 'px')
        .attr('viewBox', `0 0 ${docWidth} ${docHeight}`)
        .attr('preserveAspectRatio', 'xMidYMid meet')
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
        .selectAll('path')
        .data(sfrList)
        .enter()
        .append('path')
        .attr('class', d => 'line ' + d.color)
        .attr('d', d => line(d.values))

    /* Add Axis into SVG */
    const xAxis = d3.axisBottom(xScale).ticks(10)
    const yAxis = d3.axisLeft(yScale).ticks(10)

    svg.append('g')
        .attr('class', 'x axis')
        .attr('transform', `translate(0, ${graphHeight})`)
        .call(xAxis)

    // text label for the x axis
    svg.append('text')
        .attr('transform', `translate(0, ${height - margin})`)
        .attr('x', width / 2 - 10)
        .attr('y', margin - 10) // Relative to the x axis.
        .style('text-anchor', 'middle')
        .text('Frequency, cy/mm')

    // text label for the y axis
    svg.append('text')
        .attr('transform', 'rotate(-90)')
        .attr('y', 0 - margin)
        .attr('x', 0 - height / 2 + 10)
        .attr('dy', '1em')
        .style('text-anchor', 'middle')
        .text('SFR')

    svg.append('g')
        .attr('class', 'y axis')
        .call(yAxis)
        .append('text')
        .attr('y', 15)
        .attr('transform', 'rotate(-90)')
        .attr('fill', '#000')

    const halfSampling = 0.5
    const data2 = [
        {
            x: halfSampling,
            y: 0,
        },
        {
            x: halfSampling,
            y: 0.05,
        },
    ]

    svg.append('path')
        .datum(data2)
        .attr('class', 'line black')
        .attr('d', line)

    svg.append('text')
        .attr('text-anchor', 'end')
        .attr(
            'transform',
            `translate(${xScale(halfSampling * 0.95)}, ${yScale(0.05)})`,
        )
        .text('Half-sampling')

    svg.append('line')
        .style('stroke', 'black')
        .attr('x1', xScale(halfSampling))
        .attr('y1', yScale(0))
        .attr('x2', xScale(halfSampling))
        .attr('y2', yScale(0.1))

    return true
}

export { drawPlot }
