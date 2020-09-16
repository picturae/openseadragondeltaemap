// example (chart size)
const contentSize = {
    w: 1000,
    h: 707.107,
}

// openseadragon representation for the tiled Image
const tiledImage = {
    getBounds: () => {
        return {
            x: 0,
            y: 0,
            width: 1,
            height: 0.707107,
            degrees: 0,
            getTopLeft: () => {
                return { x: 0, y: 0 }
            },
            getBottomRight: () => {
                return { x: 1, y: 0.707107 }
            },
        }
    },
    getContentSize: () => {
        return contentSize
    },
}

// openseadragon viewer instance
const viewer = {
    addHandler: () => {},
    canvas: {
        appendChild: () => {},
    },
    viewport: {
        _containerInnerSize: { x: 864, y: 642 },
        getZoom: () => {
            return 1.41421
        },
        pixelFromPoint: args => {
            return { x: args.x * 850, y: args.y * 850 }
        },
    },
    world: {
        getItemAt: () => {
            return tiledImage
        },
    },
}

// useable json from the backend
const targetData = {
    validity: {
        hasInvalidPatch: true,
        message: ["Target(s) did not pass all guidelines"],
        valid: false,
        warning: [],
    },
    name: 'Test Target Scan',
    targets: [
        {
            name: 'Scan Test Color Chart',
            location: { x: 3210, y: 25, w: 2354, h: 253, r: 180 },
            observed: { ppi: 300 },
            colorPatches: [
                {
                    name: "C1",
                    location: { x: 105, y: 90, w: 36, h: 36 },
                    observed: {
                        RGB: [185.11, 62.99, 53.05],
                        Lab: [48.41, 61.83, 46.98],
                        mean: 98.53,
                        stddev: 1.4,
                        snr: 70.36
                    },
                    assessed: {
                        deltaE76: 13.38,
                        deltaE94T: 6.19,
                        deltaE94G: 6.19,
                        deltaE2000: 6.97,
                        deltaECMC: 6.19,
                        deltaL: 2.41
                    },
                    reference: { Lab: [46, 64, 34] },

                },
            ],
            edgePatches: [
                {
                    name: "Vertical",
                    location: { x: 1153, y: 95, w: 48, h: 64 },
                    observed: {
                        R: {
                            MTF10: 0,
                            MTF50: 0.5,
                            MTFMAX: 1,
                            MTF_Curve: [
                                [0, 1],
                                [0.1, 0.9],
                                [0.2, 0.8],
                                [0.3, 0.7],
                                [0.4, 0.6],
                                [0.5, 0.5],
                                [0.6, 0.4],
                                [0.7, 0.3],
                                [0.8, 0.2],
                                [0.9, 0.1],
                                [1, 0]
                            ],
                        },
                        G: {
                            MTF10: 0,
                            MTF50: 0.5,
                            MTFMAX: 1,
                            MTF_Curve: [
                                [0, 1],
                                [0.1, 0.9],
                                [0.2, 0.8],
                                [0.3, 0.7],
                                [0.4, 0.6],
                                [0.5, 0.5],
                                [0.6, 0.4],
                                [0.7, 0.3],
                                [0.8, 0.2],
                                [0.9, 0.1],
                                [1, 0]
                            ],
                        },
                        B: {
                            MTF10: 0,
                            MTF50: 0.5,
                            MTFMAX: 1,
                            MTF_Curve: [
                                [0, 1],
                                [0.1, 0.9],
                                [0.2, 0.8],
                                [0.3, 0.7],
                                [0.4, 0.6],
                                [0.5, 0.5],
                                [0.6, 0.4],
                                [0.7, 0.3],
                                [0.8, 0.2],
                                [0.9, 0.1],
                                [1, 0]
                            ],
                        },
                        "Lum" : {
                            MTF10: 0,
                            MTF50: 0.5,
                            MTFMAX: 1,
                            MTF_Curve: [
                                [0, 1],
                                [0.1, 0.9],
                                [0.2, 0.8],
                                [0.3, 0.7],
                                [0.4, 0.6],
                                [0.5, 0.5],
                                [0.6, 0.4],
                                [0.7, 0.3],
                                [0.8, 0.2],
                                [0.9, 0.1],
                                [1, 0]
                            ],
                        }
                    },
                    assessed: {},
                    validity: {},
                },
                {
                    name: "Horizontal",
                    location: { x: 1145, y: 103, w: 64, h: 48 },
                    observed: {
                        R: {
                          MTF10: 0,
                          MTF50: 0.5,
                          MTFMAX: 1,
                          MTF_Curve: [
                              [0, 1],
                              [0.1, 0.9],
                              [0.2, 0.8],
                              [0.3, 0.7],
                              [0.4, 0.6],
                              [0.5, 0.5],
                              [0.6, 0.4],
                              [0.7, 0.3],
                              [0.8, 0.2],
                              [0.9, 0.1],
                              [1, 0]
                          ],

                        },
                        G: {
                            MTF10: 0,
                            MTF50: 0.5,
                            MTFMAX: 1,
                            MTF_Curve: [
                                [0, 1],
                                [0.1, 0.9],
                                [0.2, 0.8],
                                [0.3, 0.7],
                                [0.4, 0.6],
                                [0.5, 0.5],
                                [0.6, 0.4],
                                [0.7, 0.3],
                                [0.8, 0.2],
                                [0.9, 0.1],
                                [1, 0]
                            ],

                        },
                        B: {
                            MTF10: 0,
                            MTF50: 0.5,
                            MTFMAX: 1,
                            MTF_Curve: [
                                [0, 1],
                                [0.1, 0.9],
                                [0.2, 0.8],
                                [0.3, 0.7],
                                [0.4, 0.6],
                                [0.5, 0.5],
                                [0.6, 0.4],
                                [0.7, 0.3],
                                [0.8, 0.2],
                                [0.9, 0.1],
                                [1, 0]
                            ],
                        },
                        "Lum" : {
                            MTF10: 0,
                            MTF50: 0.5,
                            MTFMAX: 1,
                            MTF_Curve: [
                                [0, 1],
                                [0.1, 0.9],
                                [0.2, 0.8],
                                [0.3, 0.7],
                                [0.4, 0.6],
                                [0.5, 0.5],
                                [0.6, 0.4],
                                [0.7, 0.3],
                                [0.8, 0.2],
                                [0.9, 0.1],
                                [1, 0]
                            ],
                        }
                    },
                    assessed: {},
                    validity: {},
                }
            ],
            assessed: {},
            validity: {valid: true},
        },
    ],
    location: { x: 0, y: 0, w: 6000, h: 4000 },
    observed: {
        ppi: 300,
        bitdepth: 8,
        colorProfile: "eciRGB v2",
    },
    assessed: {
        meanDeltaE76: 8.06,
        meanDeltaE94G: 6.13,
        meanDeltaE94T: 6.13,
        meanDeltaE2000: 5.14,
        meanDeltaECMC: 4.09,
        meanDeltaL: 5.53,
        meanStdDev: 1.57,
        colorAccuracy: {
            "Color Encoding Error (∆E1976)": false,
            "Illuminance Uniformity": true,
            "Individual Patch Error (∆E1976)": false,
            "Total Noise": true,
        },
        spatialAccuracy: {
            "Color Channel Misregistration": null,
            "Oversharpening": null,
            "SFR High Frequency": null,
            "SFR Mid Frequency": null,
        },
    },
}

const badOverlayData = {
    validity: {},
    observed: {},
    assessed: {},
}

const badChartData = {
    observed: { ppi: 300 },
    colorPatches: [],
    assessed: {},
    validity: {},
}

const badPatchData = {
    name: "C1",
    location: { x: 105, y: 90, w: 36, h: 36 },
    reference: { Lab: [46, 64, 34] },
    validity: {
        valid: false,
        message: ["∆E1976 13.38 above 10"],
        invalidPatch: true
    }
}

export {
    contentSize,
    tiledImage,
    viewer,
    targetData,
    badOverlayData,
    badChartData,
    badPatchData,
}
