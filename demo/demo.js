
window.onload = function() {

    const tileSource = {
        "@context" : "http://iiif.io/api/image/2/context.json",
        "@id" : "https://pixel-test.picturae.com:3000/iiif/b/1/5e42abd23145fe003641f41b/7/4/5e5e6b3bbbdd9f0036947247",
        "protocol" : "http://iiif.io/api/image",
        "width" : 8688,
        "height" : 5792,
        "sizes" : [
             { "width" : 135, "height" : 90 },
             { "width" : 271, "height" : 181 },
             { "width" : 543, "height" : 362 },
             { "width" : 1086, "height" : 724 },
             { "width" : 2172, "height" : 1448 },
             { "width" : 4344, "height" : 2896 }
        ],
        "tiles" : [
             { "width" : 256, "height" : 256, "scaleFactors" : [ 1, 2, 4, 8, 16, 32, 64 ] }
        ],
        "profile" : [
             "http://iiif.io/api/image/2/level1.json",
             { "formats" : [ "jpg" ],
                 "qualities" : [ "native","color","gray","bitonal" ],
                 "supports" : ["regionByPct","regionSquare","sizeByForcedWh","sizeByWh","sizeAboveFull","rotationBy90s","mirroring"],
                 "maxWidth" : 5000,
                 "maxHeight" : 5000
             }
        ]
    }

    this.viewer = OpenSeadragon({
        id: "openseadragon",
        prefixUrl: "https://cdn.jsdelivr.net/npm/openseadragon@2.4.1/build/openseadragon/images/",
        tileSources: [{
            tileSource: tileSource
        }],
        gestureSettingsMouse: {
            flickEnabled: true,
        },
        zoomPerScroll: 1.5,
    });
    /*\ viewsettings, see:
    |*| https://github.com/openseadragon/openseadragon/issues/1078
    |*| http://jsbin.com/hikekaroxa/1/edit?html,js,output
    \*/

    const targetMap = this.viewer.targetMap();

    const fileInput = document.querySelector('input[type=file]')

    fileInput.addEventListener('input', function() {
        loadLocalJSON( this, targetMap.render )
        this.value = ''
    });

    window.addEventListener('resize', function() {
        targetMap.resize();
    });

    if (location.search === '?demo') {
        document.body.classList.add('demo');
    }

};
