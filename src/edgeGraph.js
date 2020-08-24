import transformCase from 'transform-case'
import { DISPLAY_CLASSNAME } from './constants'
import { drawPlot } from './plot'

/**
 * Attach plot of edgeData to observed data
 * @param {object} edgePatches - array of patchData
 * @param {object} table - html elememt to attach plot to
 */
const buildGraph = (edgePatches, table, DISPLAY_CLASSNAME) => {
    const tbodySelector = 'tbody.deltaemap-observed'
    const tbody = table.querySelector(tbodySelector)
    const subject = 'Spatial Frequency Response' // reflected in stylesheet
    const rowClassName = transformCase(subject).paramCase()

    const row = `<tr class="${rowClassName}"><th>${subject}</th></tr>`
    tbody.innerHTML += row
    const tr = tbody.lastElementChild
    const rowSelector = `table.${DISPLAY_CLASSNAME} ${tbodySelector} tr.${rowClassName}`

    /**
     * Attach cell to the row
     * @private
     * @param {object} edgeData - array of R,G,B,Lum objects
     * @param {object} table - html elememt to attach plot to
     */
    const edgeGraph = (edgeData, cellClass, subject) => {
        const cell = document.createElement('td')
        cell.className = cellClass
        tr.appendChild(cell)
        const cellSelector = `${rowSelector} td.${cellClass}`
        const drawDone = drawPlot(edgeData, cellSelector, subject)

        if (!drawDone) {
            // d3 needs to work 'live' in the DOM
            tr.removeChild(cell)
        }
    }

    if (edgePatches.length > 1) {
        // the edgepatches of a targetChart

        let verticalEdges = edgePatches.map(patch => {
            const isVertical = patch.name.toLowerCase().includes('vertical')
            if (isVertical) return patch.observed
        })
        let horizontalEdges = edgePatches.map(patch => {
            const isHorizontal = patch.name.toLowerCase().includes('horizontal')
            if (isHorizontal) return patch.observed
        })

        if (horizontalEdges.length && verticalEdges.length) {
            edgeGraph(verticalEdges, 'vertical-sfr', 'Vertical SFR')
            edgeGraph(horizontalEdges, 'horizontal-sfr', 'Horizontal SFR')
        } else {
            const observations = edgePatches.map(patch => patch.observed)
            edgeGraph(observations, 'combined-sfr', 'Combined SFR')
        }
    } else {
        // a single edgepatch
        const observed = edgePatches[0].observed
        edgeGraph([observed], 'observed-sfr', subject)
    }

    const drawDone = tr.querySelectorAll('td')
    if (drawDone.length > 1) {
        tr.setAttribute('rowspan', drawDone.length + 1)
    } else if (!drawDone.length) {
        // d3 needs to work 'live' in the DOM
        tbody.removeChild(tr)
    }
}

export { buildGraph }
