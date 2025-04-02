[![Build Status](https://travis-ci.org/picturae/OpenSeadragonDeltaEMap.svg?branch=master)](https://travis-ci.org/picturae/OpenSeadragonDeltaEMap)
[![Coverage Status](https://coveralls.io/repos/github/picturae/openseadragondeltaemap/badge.svg?branch=master)](https://coveralls.io/github/picturae/openseadragondeltaemap?branch=master)

# OpenSeadragonDeltaEMap

This plugin helps to evaluate a targetscan using DeltaE criteria.
For input, it takes a DeltaE-compliant JSON holding
the target coordinates, size,
expected and measured colour data
etcetera.
The observed and assessed data are projected
in an overlay tied to the mouse-position.

## Install

Install the package as npm package. Provided are
an umd-formatted file in the dist folder to require or just read
and an es-module in the module folder to import.
In both folders there is a stylesheet.

As of version 2.0.0, this package is manually tested to work with OpenSeadragon 5.0.1. It might work with earlier
versions (notably 3.0.0 and up), but that is not guaranteed.

## Usage

When installed as node module,
and OpenSeadragon is opened,
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

You can view a demo by cloning this repository and serving the root of the project using an HTTP server. After that you
can navigate to '/demo/demo.html' to view two examples.
