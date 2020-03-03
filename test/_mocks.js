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
        return {
            x: 1000,
            y: 707.107,
        }
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
    },
]

export { tiledImage, viewer, targetData }
