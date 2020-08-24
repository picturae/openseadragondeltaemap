const targetData = {
    metadata: {
        Exif: {
            Image: {
                ImageWidth: '10312',
                ImageLength: '7744',
                Make: 'Leaf',
                Model: 'Aptus-II 12R',
            },
            Photo: {
                ISOSpeedRatings: '',
                ShutterSpeedValue: '',
                FocalLength: '',
            },
        },
        Xmp: { photoshop: { ICCProfile: '' } },
    },
    observed: { ppi: 0, bitdepth: 8, colorProfile: 'Adobe RGB (1998)' },
    location: { x: 0, y: 0, w: 10312, h: 7744 },
    targets: [
        {
            name: 'White sheet (Uniformity)',
            type: 'UNIFORMITY',
            location: { x: 0, y: 0, w: 10313, h: 7745, r: 0 },
            observed: { ppi: 0 },
            colorPatches: [
                {
                    name: 'Top_Left',
                    location: { x: 774, y: 774, w: 514, h: 514 },
                    observed: {
                        RGB: [89.13, 112.17, 77.39],
                        Lab: [43.98, -19.77, 17.22],
                        'rmsNoise(RGBY)': [40.68, 52.25, 38.53, 49.11],
                        mean: 101.43,
                        stddev: 47.65,
                        snr: 2.13,
                    },
                },
                {
                    name: 'Top_Right',
                    location: { x: 9025, y: 774, w: 514, h: 514 },
                    observed: {
                        RGB: [79.72, 99.41, 68.71],
                        Lab: [38.98, -17.57, 15.81],
                        'rmsNoise(RGBY)': [18.81, 23.68, 17.95, 22.35],
                        mean: 90.13,
                        stddev: 21.74,
                        snr: 4.15,
                    },
                },
                {
                    name: 'Center',
                    location: { x: 4899, y: 3615, w: 514, h: 514 },
                    observed: {
                        RGB: [114.67, 147.31, 104.38],
                        Lab: [57.05, -25.18, 19.04],
                        'rmsNoise(RGBY)': [52.46, 66.58, 52.17, 62.86],
                        mean: 132.8,
                        stddev: 61.16,
                        snr: 2.17,
                    },
                },
                {
                    name: 'Bottom_Left',
                    location: { x: 774, y: 6457, w: 514, h: 514 },
                    observed: {
                        RGB: [103.52, 132.31, 92.89],
                        Lab: [51.55, -23.08, 18.2],
                        'rmsNoise(RGBY)': [46.59, 59.88, 45.91, 56.38],
                        mean: 119.34,
                        stddev: 54.76,
                        snr: 2.18,
                    },
                },
                {
                    name: 'Bottom_Right',
                    location: { x: 9025, y: 6457, w: 514, h: 514 },
                    observed: {
                        RGB: [99.45, 128, 86.87],
                        Lab: [49.81, -23.41, 19.49],
                        'rmsNoise(RGBY)': [37.87, 48.09, 37.09, 45.37],
                        mean: 114.91,
                        stddev: 44.12,
                        snr: 2.6,
                    },
                },
            ],
            edgePatches: [],
        },
    ],
    color: 'color',
    validity: { valid: true, message: '', hasInvalidPatch: false, warning: [] },
    assessed: {
        colorAccuracy: {
            'Color Encoding Error (∆E1976)': null,
            'Individual Patch Error (∆E1976)': null,
            'Total Noise': null,
            'Illuminance Uniformity': null,
        },
        spatialAccuracy: {
            'SFR High Frequency': null,
            'SFR Mid Frequency': null,
            Oversharpening: null,
            'Color Channel Misregistration': null,
        },
    },
}
