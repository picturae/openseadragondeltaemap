const { JSDOM } = require('jsdom');

const d3 = require('d3');
// const fs = require('fs');

const drawPlot = (colorsData) => {
  const dom = new JSDOM(`<!DOCTYPE html><body><div id="chart"></div></body></html>`);

  const body = d3.select(dom.window.document.querySelector('#chart'));
  const data = [ ];

  Object.keys(colorsData).forEach((color) => {
    const currentColor = {};
    currentColor.name = color;
    switch (color) {
      case 'R': currentColor.color = "Red";break;
      case 'G': currentColor.color = "Green";break;
      case 'B': currentColor.color = "Blue";break;
      default: currentColor.color = "Yellow";
    }
    currentColor.values = [];
    colorsData[color].MTF_Curve.forEach((plotPoint) => {
      currentColor.values.push({
        x: plotPoint[0],
        y: plotPoint[1]
      });
    })
    data.push(currentColor);
  });

  const width = 300;
  const height = 200;
  const margin = 25;

  const lineOpacity = '0.25';

  /* Scale */
  const xScale = d3
    .scaleLinear()
    .domain(d3.extent(data[0].values, (d) => d.x))
    .range([0, width - margin]);

  const yScale = d3
    .scaleLinear()
    .domain([0, d3.max(data[0].values, (d) => d.y)])
    .range([height - margin, 0]);

  /* Add SVG */
  const svg = body
    .append('svg')
    .attr('xmlns', 'http://www.w3.org/2000/svg')
    .attr('xmlns:xlink', 'http://www.w3.org/1999/xlink')
    .attr('width', width + margin + 'px')
    .attr('height', height + margin + 'px')
    .append('g')
    .attr('transform', `translate(${margin}, ${margin})`);

  /* Add line into SVG */
  const line = d3
    .line()
    .x((d) => xScale(d.x))
    .y((d) => yScale(d.y));

  const lines = svg.append('g').attr('class', 'lines');

  lines
    .selectAll('.line-group')
    .data(data)
    .enter()
    .append('g')
    .attr('class', 'line-group')
    .append('path')
    .attr('class', 'line')
    .attr('d', (d) => line(d.values))
    .style('stroke', (d, i) => d.color)
    .style('stroke-width', 1.5)
    .attr("stroke-linejoin", "round")
    .attr("stroke-linecap", "round")
    .style("mix-blend-mode", "multiply")
    .style('fill', 'none')
    .style('opacity', lineOpacity);

  /* Add Axis into SVG */
  const xAxis = d3.axisBottom(xScale).ticks(10);
  const yAxis = d3.axisLeft(yScale).ticks(10);

  svg
    .append('g')
    .attr('class', 'x axis')
    .attr('transform', `translate(0, ${height - margin})`)
    .call(xAxis);

  svg
    .append('g')
    .attr('class', 'y axis')
    .call(yAxis)
    .append('text')
    .attr('y', 15)
    .attr('transform', 'rotate(-90)')
    .attr('fill', '#000');

    return JSON.stringify(body.html());
}

const plot = (edgePatches) => {
  const result = [];
  edgePatches.forEach((edgePatch) => {
    const edgePlot = {};
    edgePlot.name = edgePatch.name.split('_')[1];
    edgePlot.plot = drawPlot(edgePatch.observed);
    result.push(edgePlot);
  });
  return result;
}

module.exports = plot;
