var CONSOLE = window.CONSOLE = {};

function texttostring(text) {
    if (text === undefined) return 'undefined';
    if (text === null) return 'null';
    if (typeof(text) === 'object') return JSON.stringify(text);
    if (typeof(text) !== 'string') return text.toString();
    return text;
}

CONSOLE.createinstance = function(width, height, columns, rows) {
    var plane = BABYLON.MeshBuilder.CreatePlane('CONSOLE', { width: width, height: height }, WORLD.scene);
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
    var colpos = 0;
    var currentline = '';
    var lines = [];
    plane.write = function(text) {
        var str = texttostring(text);
        for (var i = 0; i < str.length; i++, colpos++) {
            var c = str[i];
            if ((c === '\n') || (colpos >= columns)) {
                lines.push(currentline);
                if (lines.length >= rows) lines.splice(0, 1);
                currentline = '';
                colpos = 0;
            }
            if (c !== '\n') currentline += c;
        }
        CONSOLE.textblock.text = lines.join('\n') + '\n' + currentline;
    };
    return plane;
};