/**
 * @typedef DeltaEOptions
 * @property {"tabular" | "flexible"} [layout="tabular"] The layout of the floating infobox.
 */

import { Overlay } from './overlay'
import './main.scss'
;(function() {
    let $ = window.OpenSeadragon

    if (!$) {
        $ = require('openseadragon')
        if (!$) {
            throw new Error('OpenSeadragon is missing.')
        }
    }

    /**
     * @name deltaEMap
     * @memberof OpenSeadragon.Viewer
     * @param {OpenSeadragon.Viewer} viewer
     * @param {DeltaEOptions} options
     * @returns {Overlay}
     */
    $.Viewer.prototype.deltaEMap = function(viewer, options) {
        if (!this._deltaEMap) {
            this._deltaEMap = new Overlay(viewer, options)
        }

        return this._deltaEMap
    }
})()
