function _texttostring(text) {
    if (text === undefined) return 'undefined';
    if (text === null) return 'null';
    if (typeof (text) === 'object') return JSON.stringify(text);
    if (typeof (text) !== 'string') return text.toString();
    return text;
}

function _addcharacter(linearray, character, columns, rows) {
    if (linearray.length < 1) linearray.push('');
    var lastline = linearray.pop();
    if (character === '\n') {
        linearray.push(lastline);
        lastline = '';
    } else {
        var pos = lastline.length;
        if (pos >= columns) {
            linearray.push(lastline);
            lastline = '';
        }
        lastline += character;
    }
    if (linearray.length >= rows - 1) linearray.splice(0, 1);
    linearray.push(lastline);
}

export function createinstance(scene, color) {
    var columns = 80;
    var rows = 25;
    var factor = 20;
    var whfac = 49;
    // {width: 4, height: 2.5510204081632653}
    var options = { width: columns / factor, height: rows * 100 / factor / whfac };
    var plane = BABYLON.MeshBuilder.CreatePlane('CONSOLE', options, scene);
    var advancedTexture = BABYLON.GUI.AdvancedDynamicTexture.CreateForMesh(plane, columns * factor, rows * factor / whfac * 90);
    var rect = new BABYLON.GUI.Rectangle();
    rect.background = 'black';
    advancedTexture.addControl(rect);
    var style = advancedTexture.createStyle();
    style.fontSize = (columns * factor / whfac) + 'px';
    style.fontFamily = "Courier New";
    var textblock = new BABYLON.GUI.TextBlock();
    textblock.textHorizontalAlignment = BABYLON.GUI.Control.HORIZONTAL_ALIGNMENT_LEFT;
    textblock.textVerticalAlignment = BABYLON.GUI.Control.VERTICAL_ALIGNMENT_TOP;
    textblock.textWrapping = false;
    textblock.text = 'C:\>';
    textblock.color = color;
    textblock.style = style;
    //textblock.paddingLeft = textblock.paddingRight = width / 4;
    advancedTexture.addControl(textblock);
    var lines = [];
    plane.write = function (text) {
        var str = _texttostring(text);
        for (var i = 0; i < str.length; i++) {
            _addcharacter(lines, str[i], columns, rows);
        }
        textblock.text = lines.join('\n');
    };
    return plane;
};