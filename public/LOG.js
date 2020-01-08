var LOG = window.LOG = {};

LOG.createinstance = function(width, height, columns, rows) {
    var plane = BABYLON.MeshBuilder.CreatePlane('LOG', { width: width, height: height }, WORLD.scene);
    var advancedTexture = BABYLON.GUI.AdvancedDynamicTexture.CreateForMesh(plane, width * 100, height * 100);
    var rect = new BABYLON.GUI.Rectangle();
    rect.background = 'black';
    advancedTexture.addControl(rect);
    var style = advancedTexture.createStyle();
    // Monospace has relation 1:0.55
    style.fontSize = (width / columns * 181) + 'px';
    style.fontFamily = "Monospace";
    // See https://www.babylonjs-playground.com/#1CABMS#28
    LOG.textblock = new BABYLON.GUI.TextBlock();
    LOG.textblock.textHorizontalAlignment = BABYLON.GUI.Control.HORIZONTAL_ALIGNMENT_LEFT;
    LOG.textblock.textVerticalAlignment = BABYLON.GUI.Control.VERTICAL_ALIGNMENT_TOP;
    LOG.textblock.textWrapping = false;
    var text = "";
    for (var j = 0; j < 20; j++) {
        for (var i = 0; i < columns; i++) {
            text += (i % 10);
        }
        text += "\n";
    }
    LOG.textblock.text = text;
    LOG.textblock.color = "lightgreen";
    LOG.textblock.style = style;
    LOG.textblock.paddingLeft = LOG.textblock.paddingRight = width / 4;
    advancedTexture.addControl(LOG.textblock);
    var lines = [];
    plane.log = function(text) {
        if (text === undefined) text = 'undefined';
        if (text === null) text = null;
        if (typeof(text) === 'object') text = JSON.stringify(text);
        if (typeof(text) !== 'string') text = text.toString();
        lines.push(text);
        if (lines.length > rows) lines.splice(0, 1);
        LOG.textblock.text = lines.join('\n');
    };
    return plane;
};