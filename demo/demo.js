
window.onload = function() {

    const tileSource = {
        "@context":"http://iiif.io/api/image/2/context.json",
        "@id":"https://mmc-rkd-api.memorix.nl/api/images/RKD_FOLDER_63959_0007_V/preview",
        "protocol":"http://iiif.io/api/image",
        "width":3442,
        "height":2426,
        "sizes":[{"width":215,"height":151},{"width":430,"height":303},{"width":860,"height":606},{"width":1721,"height":1213}],
        "tiles":[{"width":256,"height":256,"scaleFactors":[1,2,4,8,16]}],
        "profile":[
            "http://iiif.io/api/image/2/level1.json",
            {
                "formats":["jpg"],
                "qualities":["native","color","gray"],
                "supports":["regionByPct","regionSquare","sizeByForcedWh","sizeByWh","sizeAboveFull","rotationBy90s","mirroring"]
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

    window.addEventListener('resize', function() {
        targetMap.resize();
    });

};
