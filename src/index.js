import { isAttachedToDom, isPrimitive } from './functions'
import { TargetMap } from './targetMap'

var index = (function() {
    var $ = window.OpenSeadragon

    if (!$) {
        $ = require('openseadragon')
        if (!$) {
            throw new Error('OpenSeadragon is missing.')
        }
    }

    const table = document.createElement('table')
    table.className = 'picturae-targetmap-display'
    table.style.font = 'caption'
    table.style.position = 'fixed'
    table.style.background = '#cccc'
    table.style.borderRadius = '0 0 .5em .5em'
    table.style.color = '#000'
    table.style.padding = '.5em'
    table.style.bottom = '.5em'
    table.style.right = '.5em'

    const targetEnter = function(event) {
        const targetValidation = event.target.dataset.picturaeTargetmapDisplay
        if (targetValidation) {
            table.innerHTML = ''
            const validationData = JSON.parse(targetValidation)
            let color = ''
            if (
                validationData.patchType &&
                validationData.patchType === 'color'
            ) {
                if (
                    isPrimitive(validationData.R) &&
                    isPrimitive(validationData.G) &&
                    isPrimitive(validationData.B)
                ) {
                    color = `<targetColor style="display: inline-block;
                      background: rgb(${validationData.R}, ${validationData.G}, ${validationData.B});
                  width: .75em; height: .75em"/>`
                }
            }
            table.innerHTML += `<caption
                style="background: #cccc; border-radius: 0.5em 0.5em 0 0; padding: 0.5em; font-weight: bold;"
            >
                ${validationData.name} ${color}
            </caption>`
            for (let [key, value] of Object.entries(validationData)) {
                let row = ''
                if (isPrimitive(value) && key !== 'name') {
                    row = `<tr><th>${key}</th><td>${value}</td></tr>`
                }
                if (row) table.innerHTML += row
            }
            if (!isAttachedToDom(table)) document.body.appendChild(table)
        }
    }
    const targetLeave = function(event) {
        table.innerHTML = ''
        if (isAttachedToDom(table)) document.body.removeChild(table)
    }

    $.Viewer.prototype.targetMap = function() {
        if (!this._targetMap) {
            this._targetMap = new TargetMap(this)
        }

        this._targetMap.element.addEventListener('mouseover', function(event) {
            const enter = event.target.tagName ? event.target.tagName || '' : ''
            const leave = event.relatedTarget
                ? event.relatedTarget.tagName || ''
                : ''
            if (enter === 'TARGETCHART' || enter === 'TARGETPATCH') {
                targetEnter(event)
            } else {
                targetLeave(event)
            }
            event.stopPropagation()
        })

        this._targetMap.element.addEventListener('mousemove', function(event) {
            if (event.clientX / document.body.clientWidth < 0.5) {
                table.style.left = `${event.clientX + 16}px`
                table.style.right = 'auto'
            } else {
                table.style.left = 'auto'
                table.style.right = `${document.body.clientWidth -
                    event.clientX +
                    16}px`
            }
            const yFraction = event.clientY / document.body.clientHeight
            if (yFraction < 0.333) {
                table.style.top = `${event.clientY + 16}px`
                table.style.bottom = 'auto'
            } else if (yFraction < 0.666) {
                table.style.top = `${(document.body.clientHeight -
                    table.clientHeight) /
                    2}px`
                table.style.bottom = 'auto'
            } else {
                table.style.top = 'auto'
                table.style.bottom = `${document.body.clientHeight -
                    event.clientY +
                    16}px`
            }
            event.stopPropagation()
        })

        return this._targetMap
    }
})()

export default index
