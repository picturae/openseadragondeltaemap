const contentSize = {
    x: 1000,
    y: 707.107,
}
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
const targetData = [
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
                stddev: 1.4,
            },
        ],
    },
]

export { contentSize, tiledImage, viewer, targetData }
