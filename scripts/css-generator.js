const template = `{{selectors}} {
{{declarations}}
}`;

class Generator {
    constructor(options = {}) {
        this._raw = '';
        this._lineBreak = '\n';
        this._defaults = {
            spaces: 4,
        };
        this._options = Object.assign(this._defaults, options);
    }

    getOutput() {
        return this._raw.trim();
    }

    addRule(selectors, declarationList) {
        const lineBreak = this._lineBreak;
        const space = this._defaults.spaces;
        const indentation = new Array(space).fill(' ').join('');

        selectors = Array.isArray(selectors) ? selectors : [selectors];
        selectors = selectors.join(`,${lineBreak}`);

        const declarations = Object.keys(declarationList)
            .map((key) => {
                const property = key.toString().trim();
                const value = declarationList[key]
                    ? declarationList[key].toString().trim()
                    : '';
                return `${indentation}${property}: ${value};`;
            })
            .join(lineBreak);

        this._raw += template
            .replace('{{selectors}}', selectors)
            .replace('{{declarations}}', declarations);
        this._raw += lineBreak;
        this._raw += lineBreak;

        return this;
    }
}

exports.create = function (options) {
    return new Generator(options);
};
