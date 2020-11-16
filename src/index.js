import { Overlay } from './overlay'
import './main.scss'

var index = (function() {
    var $ = window.OpenSeadragon

    if (!$) {
        $ = require('openseadragon')
        if (!$) {
            throw new Error('OpenSeadragon is missing.')
        }
    }

    $.Viewer.prototype.deltaEMap = function(viewer, options) {
        if (!this._deltaEMap) {
            this._deltaEMap = new Overlay(viewer, options)
        }

        return this._deltaEMap
    }
})()

export default index
