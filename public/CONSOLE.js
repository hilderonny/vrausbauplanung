var CONSOLE = window.CONSOLE = {};

function texttostring(text) {
    if (text === undefined) return 'undefined';
    if (text === null) return 'null';
    if (typeof (text) === 'object') return JSON.stringify(text);
    if (typeof (text) !== 'string') return text.toString();
    return text;
}

function addcharacter(linearray, character, columns, rows) {
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

CONSOLE.createinstance = function (scene, width, height, columns, rows) {
    var plane = BABYLON.MeshBuilder.CreatePlane('CONSOLE', { width: width, height: height }, scene);
    var advancedTexture = BABYLON.GUI.AdvancedDynamicTexture.CreateForMesh(plane, width * 100, height * 100);
    var rect = new BABYLON.GUI.Rectangle();
    rect.background = 'black';
    advancedTexture.addControl(rect);
    var style = advancedTexture.createStyle();
    style.fontSize = (width / columns * 164) + 'px';
    style.fontFamily = "Courier New";
    CONSOLE.textblock = new BABYLON.GUI.TextBlock();
    CONSOLE.textblock.textHorizontalAlignment = BABYLON.GUI.Control.HORIZONTAL_ALIGNMENT_LEFT;
    CONSOLE.textblock.textVerticalAlignment = BABYLON.GUI.Control.VERTICAL_ALIGNMENT_TOP;
    CONSOLE.textblock.textWrapping = false;
    CONSOLE.textblock.text = 'C:\>';
    CONSOLE.textblock.color = "lightgreen";
    CONSOLE.textblock.style = style;
    CONSOLE.textblock.paddingLeft = CONSOLE.textblock.paddingRight = width / 4;
    advancedTexture.addControl(CONSOLE.textblock);
    var lines = [];
    plane.write = function (text) {
        var str = texttostring(text);
        for (var i = 0; i < str.length; i++) {
            addcharacter(lines, str[i], columns, rows);
        }
        CONSOLE.textblock.text = lines.join('\n');
    };
    return plane;
};
