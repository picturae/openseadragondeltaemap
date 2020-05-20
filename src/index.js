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

    $.Viewer.prototype.deltaEMap = function(viewer) {
        if (!this._deltaEMap) {
            this._deltaEMap = new Overlay(viewer)
        }

        return this._deltaEMap
    }
})()

export default index
