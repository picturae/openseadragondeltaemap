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

// the json received from the backend
const targetData = {
    validity: {},
    targets: [
        {
            location: { x: 3210, y: 25, w: 2354, h: 253 },
            colorPatches: [
                {
                    name: 'C1',
                    location: { x: 105, y: 90, w: 36, h: 36 },
                    R: 185.11,
                    G: 62.99,
                    B: 53.05,
                    L: 48.41,
                    a: 61.83,
                    b: 46.98,
                    mean: 98.53,
                    stddev: 1.39,
                    deltaE76: 13.38,
                    deltaE94T: 6.19,
                    deltaE94G: 6.19,
                    deltaE2000: 6.97,
                    deltaECMC: 6.19,
                    deltaL: 2.41,
                    validity: { valid: true },
                },
            ],
            validity: {},
        },
    ],
    location: { x: 0, y: 0, w: 6000, h: 4000 },
    observed: {},
    assessed: {},
}

export { contentSize, tiledImage, viewer, targetData }
