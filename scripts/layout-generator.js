const { descendingBy } = require('./utils');
const descendingByWidth = descendingBy('size.width');

class Generator {
    constructor(images, options = {}) {
        this.images = images;
        this._defaults = {
            padding: 10,
        };
        this._options = Object.assign(this._defaults, options);
    }

    getOutput() {
        let positionY = 0;
        const { padding } = this._options;
        const images = this.images
            .sort(descendingByWidth)
            .map(function decoratePosition(image, i, array) {
                const prev = array[i - 1] || {
                    size: { height: 0 },
                };
                positionY = positionY + prev.size.height + padding;
                return {
                    ...image,
                    position: {
                        x: padding,
                        y: positionY,
                    },
                };
            });

        const first = images[0];
        const last = images[images.length - 1];
        return {
            layout: {
                width: first.size.width + 2 * padding,
                height: last.position.y + last.size.height + padding,
            },
            images,
        };
    }
}

exports.create = function (images, options) {
    return new Generator(images, options);
};
