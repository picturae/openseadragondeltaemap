window.onload = function() {
    const tileSource = {
        type: 'legacy-image-pyramid',
        levels: [
            {
                url: './pyramid/demo.eighth.jpg',
                width: 1086,
                height: 724,
            },
            {
                url: './pyramid/demo.quarter.jpg',
                width: 2172,
                height: 1448,
            },
            {
                url: './pyramid/demo.half.jpg',
                width: 4344,
                height: 2896,
            },
            {
                url: './pyramid/demo.jpg',
                width: 8688,
                height: 5792,
            },
        ],
    }

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

    const deltaEMap = this.viewer.deltaEMap(this.viewer)

    const fileInput = document.querySelector('input[type=file]')

    fileInput.addEventListener('input', function() {
        loadLocalJSON(this, deltaEMap.render)
        this.value = ''
    })

    window.addEventListener('resize', function() {
        deltaEMap.resize()
    })
}
