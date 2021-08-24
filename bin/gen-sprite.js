#!/usr/bin/env node
(async () => {
    const imageFactory = require('images');
    const fs = require('fs');
    const {
        extensionWith,
        logIfError,
        wrapImgWithSize,
        tipIfNotAdmin,
    } = require('../scripts/utils');
    const cssGen = require('../scripts/css-generator');
    const layoutGen = require('../scripts/layout-generator');
    const args = require('minimist')(process.argv.slice(2));

    const defaultArgs = {
        src: null,
        padding: 10,
        spaces: 4,
        prefix: 'sprite',
        cssOutput: './output.css',
        spriteOutput: null,
    };
    const { src, padding, spaces, prefix, cssOutput, spriteOutput } =
        Object.assign(defaultArgs, args);

    await tipIfNotAdmin(
        'You are not running this application as administrator.\nIt will cause an error message, but will not affect the result.\nPress any key to exit...'
    );

    if (!src) {
        console.log(
            'please set parameter "src" to define the image folder path.'
        );
        return;
    }

    const targetImages = fs
        .readdirSync(src)
        .filter(extensionWith(['png']))
        .map(wrapImgWithSize(src));

    const { layout, images } = layoutGen
        .create(targetImages, { padding })
        .getOutput();

    const baseImg = imageFactory(layout.width, layout.height);

    images.forEach((img) => {
        baseImg.draw(
            imageFactory(img.fullPath),
            img.position.x,
            img.position.y
        );
    });

    const base64 = spriteOutput
        ? baseImg.save(spriteOutput)
        : baseImg.toBuffer('png').toString('base64');
    const css = cssGen.create({ spaces });

    images.forEach((img) => {
        css.addRule(`.${prefix}__${img.fileName}`, {
            width: `${img.size.width}px`,
            height: `${img.size.height}px`,
            'background-position': `-${img.position.x}px -${img.position.y}px`,
        });
    });

    css.addRule(`.${prefix}`, {
        'background-image': spriteOutput
            ? `url(${spriteOutput})`
            : `url("data:image/png;base64,${base64}")`,
    });

    fs.writeFile(cssOutput, css.getOutput(), logIfError);
})();
