const sizeOf = require('image-size');
const admin = require('admin-check');
const pressAnyKey = require('press-any-key');

const logIfError = (error) => error && console.log(error);

const extensionWith = (nameList) => (fileName) =>
    nameList.some((name) => fileName.endsWith(`.${name}`));

const getByKey = (keyString) => (object) => {
    try {
        return keyString.split('.').reduce((o, key) => o[key] || {}, object);
    } catch (_) {
        return undefined;
    }
};

const descendingBy = (key) => (a, b) => getByKey(key)(b) - getByKey(key)(a);

const wrapImgWithSize = (path) => (file) => ({
    fullPath: `${path}${file}`,
    fileName: file.replace(/\.[^.]+$/, ''),
    size: sizeOf(`${path}${file}`),
});

const tipIfNotAdmin = async (msg) => {
    if (!(await admin.check())) {
        return await pressAnyKey(msg);
    }
};

exports.logIfError = logIfError;
exports.extensionWith = extensionWith;
exports.getByKey = getByKey;
exports.descendingBy = descendingBy;
exports.wrapImgWithSize = wrapImgWithSize;
exports.tipIfNotAdmin = tipIfNotAdmin;
