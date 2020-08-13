[![Build Status](https://travis-ci.com/ovanderzee/OpenSeadragonDeltaEMap.svg?branch=master)](https://travis-ci.com/ovanderzee/OpenSeadragonDeltaEMap)
[![Coverage Status](https://coveralls.io/repos/github/picturae/OpenSeadragonDeltaEMap/badge.svg?branch=master)](https://coveralls.io/github/picturae/OpenSeadragonDeltaEMap?branch=master)

# OpenSeadragonDeltaEMap

This plugin helps evaluating a targetscan using DeltaE criteria.
For input it takes a DeltaE-compliant JSON holding
the target coordinates, size,
expected and measured colour data
etcetera.
The observed and assessed data are projected
in an overlay tied to the mouse-postion.

## Install

Install the package as npm package. Provided are
a umd-formatted file in the dist folder to require or just read
and an es-module in the module folder to import.
In both folders there is a stylesheet.

## Usage

When installed as node module,
and openSeadragon is opened,
this plugin is available in the viewer as 'deltaEMap'.

With the traditional view settings OpenSeadragon,
on panning or resizing,
the overlay and the image will not move in the same way.
To have a coherent view
resolute view settings are recommended
as shown below.

Recommended setup:

    const viewer = OpenSeadragon({
        id: ...,
        prefixUrl: ...,
        tileSources: [...],
        gestureSettingsMouse: {
            flickEnabled: true,
        },
        animationTime: 0,
        springStiffness: 100,
    })

Instantiate overlay:

    viewer.addHandler('open', function () {
        $http.get(deltaEEndPoint + imageId)
            .then(function(response) {
                const deltaEMapping = viewer.deltaEMap(viewer);
                deltaEMapping.render(response.data);
            })
            .catch(function() {
                console.error('Error while fetching or processing DeltaE data.');
            });
    })

When critical data are missing,
the plugin will warn or error in the console.

## Demo

.../openseadragondeltaemap/demo/demo.html
JSON with SFR data available through fileselector hidden under navigations icons
