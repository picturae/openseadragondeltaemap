window.onload = function() {
    this.viewer = OpenSeadragon({
        id: 'openseadragon',
        prefixUrl:
            'https://cdn.jsdelivr.net/npm/openseadragon@2.4.1/build/openseadragon/images/',
        tileSources: [
            {
                tileSource: tileSource,
            },
        ],
        gestureSettingsMouse: {
            flickEnabled: true,
        },
        animationTime: 0,
        springStiffness: 100,
    })
    /*\ viewsettings, see:
    |*| https://github.com/openseadragon/openseadragon/issues/1078
    |*| http://jsbin.com/hikekaroxa/1/edit?html,js,output
    \*/

    /**
     * @type {DeltaEOptions}
     */
    const options = {
        layout: 'flexible',
    }

    const deltaEMap = this.viewer.deltaEMap(this.viewer, options)
    this.viewer.addHandler('open', function() {
        deltaEMap.render(targetData)
    })

    window.addEventListener('resize', function() {
        deltaEMap.resize()
    })
}
