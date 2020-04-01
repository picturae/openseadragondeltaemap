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

    $.Viewer.prototype.deltaEMap = function() {
        if (!this._deltaEMap) {
            this._deltaEMap = new Overlay(this)
        }

        return this._deltaEMap
    }
})()

export default index
