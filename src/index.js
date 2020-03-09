import { TargetMap } from './targetMap'
import './main.scss'

var index = (function() {
    var $ = window.OpenSeadragon

    if (!$) {
        $ = require('openseadragon')
        if (!$) {
            throw new Error('OpenSeadragon is missing.')
        }
    }

    $.Viewer.prototype.targetMap = function() {
        if (!this._targetMap) {
            this._targetMap = new TargetMap(this)
        }

        return this._targetMap
    }
})()

export default index
