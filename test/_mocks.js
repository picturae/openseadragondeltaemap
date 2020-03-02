const tiledImage = {
    getBounds: () => {
        return {
            getTopLeft: () => {
                return { x: 0.5, y: 0.5 }
            },
            getBottomRight: () => {
                return { x: 5, y: 5 }
            },
        }
    },
}
const viewer = {
    addHandler: () => {},
    canvas: {
        appendChild: () => {},
    },
    viewport: {
        pixelFromPoint: args => {
            return args
        },
    },
    world: {
        getItemAt: () => {
            return tiledImage
        },
    },
}

export { tiledImage, viewer }
