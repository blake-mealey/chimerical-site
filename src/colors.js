function hexToRgb(hexColor) {
    return [
        parseInt(hexColor.substr(1, 2), 16),
        parseInt(hexColor.substr(3, 2), 16),
        parseInt(hexColor.substr(5, 2), 16)
    ];
}

class Color {
    constructor(hexColor) {
        this._hexColor = hexColor;
        this._rgbColor = hexToRgb(hexColor);
    }

    rgba(opacity = 1) {
        return `rgba(${this._rgbColor.join(`,`)}, ${opacity})`;
    }

    toString() {
        return this._hexColor;
    }
}

export const backgroundColor = new Color('#1E292C');
export const textColor = new Color('#FFFFFF');
export const accentColor = new Color('#FD512B');