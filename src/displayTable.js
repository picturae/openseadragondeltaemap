import { camelCaseToTitle, isAttachedToDom, isPrimitive } from './functions.js'

const DisplayTable = function(targetImage) {
    this.name = 'DisplayTable'
    const root = document.body
    const table = document.createElement('table')
    this.element = table
    table.className = 'picturae-targetmap-display'

    const targetEnter = function(event) {
        const targetValidation = event.target.dataset.picturaeTargetmapDisplay
        if (targetValidation) {
            table.innerHTML = ''
            const validationData = JSON.parse(targetValidation)
            let colorSquare = ''
            if (
                validationData.patchType &&
                validationData.patchType === 'color'
            ) {
                let color = `rgb(${validationData.R}, ${validationData.G}, ${validationData.B})`
                colorSquare = `<targetColor style="background: ${color};"/>`
            }
            table.innerHTML += `<caption>
                ${validationData.name} ${colorSquare}
            </caption>`
            for (let [key, value] of Object.entries(validationData)) {
                let row = ''
                if (isPrimitive(value) && key !== 'name') {
                    row = `<tr><th>${camelCaseToTitle(key, {
                        replace: {
                            deltaE: '&Delta;E',
                            DeltaE: '&Delta;E',
                            deltaL: '&Delta;L',
                            DeltaL: '&Delta;L',
                        },
                    })}</th><td>${value}</td></tr>`
                }
                if (row) table.innerHTML += row
            }
            if (!isAttachedToDom(table)) root.appendChild(table)
        }
    }

    const targetLeave = function() {
        if (isAttachedToDom(table)) root.removeChild(table)
    }

    targetImage.addEventListener('mouseover', function(event) {
        const enter = event.target.tagName ? event.target.tagName || '' : ''
        if (enter === 'TARGETCHART' || enter === 'TARGETPATCH') {
            targetEnter(event)
        } else {
            targetLeave(event)
        }
        event.stopPropagation()
    })

    targetImage.addEventListener('mousemove', function(event) {
        if (event.clientX / root.clientWidth < 0.5) {
            table.style.left = `${event.clientX + 16}px`
            table.style.right = 'auto'
        } else {
            table.style.left = 'auto'
            table.style.right = `${root.clientWidth - event.clientX + 16}px`
        }
        const yFraction = event.clientY / root.clientHeight
        if (yFraction < 0.333) {
            table.style.top = `${event.clientY + 16}px`
            table.style.bottom = 'auto'
        } else if (yFraction < 0.666) {
            table.style.top = `${(root.clientHeight - table.clientHeight) /
                2}px`
            table.style.bottom = 'auto'
        } else {
            table.style.top = 'auto'
            table.style.bottom = `${root.clientHeight - event.clientY + 16}px`
        }
        event.stopPropagation()
    })
}

export { DisplayTable }
