export default class KEYBOARD extends BABYLON.AbstractMesh {

    constructor(name, scene, keymap) {
        super(name, scene);
        this.keymap = keymap || KEYBOARD.DEFAULT_KEYMAP;
        this.guimanager = new BABYLON.GUI.GUI3DManager(scene);
        for (var i = 0; i < this.keymap.length; i++) {
            this.addbutton(this.keymap[i]);
        }
    }

    addbutton(config) {
        var button = new BABYLON.GUI.HolographicButton();
        this.guimanager.addControl(button);
        button.linkToTransformNode(this);
        button.position.x = config.x;
        button.position.y = config.y;
        button.scaling.x = config.w || 1;
        button.scaling.y = config.h || 1;
        button.onPointerUpObservable.add(() => {
            if (this.eventhandler) this.eventhandler(config);
        });
        var textblock = new BABYLON.GUI.TextBlock();
        textblock.text = config.k;
        textblock.color = 'white';
        textblock.fontSize = 80;
        button.content = textblock;
    }

    seteventhandler(handler) {
        this.eventhandler = handler
    }

}

KEYBOARD.DEFAULT_KEYMAP = [
    { k: 'ESC', w: 1, x:  0.0, y: 6 },
    { k: 'F1' , w: 1, x:  2.0, y: 6 },
    { k: 'F2' , w: 1, x:  3.0, y: 6 },
    { k: 'F3' , w: 1, x:  4.0, y: 6 },
    { k: 'F4' , w: 1, x:  5.0, y: 6 },
    { k: 'F5' , w: 1, x:  6.5, y: 6 },
    { k: 'F6' , w: 1, x:  7.5, y: 6 },
    { k: 'F7' , w: 1, x:  8.5, y: 6 },
    { k: 'F8' , w: 1, x:  9.5, y: 6 },
    { k: 'F9' , w: 1, x: 11.0, y: 6 },
    { k: 'F10', w: 1, x: 12.0, y: 6 },
    { k: 'F11', w: 1, x: 13.0, y: 6 },
    { k: 'F12', w: 1, x: 14.0, y: 6 },

    { k: '^', w: 1, x:  0.0, y: 4 },
    { k: '1', w: 1, x:  1.0, y: 4 },
    { k: '2', w: 1, x:  2.0, y: 4 },
    { k: '3', w: 1, x:  3.0, y: 4 },
    { k: '4', w: 1, x:  4.0, y: 4 },
    { k: '5', w: 1, x:  5.0, y: 4 },
    { k: '6', w: 1, x:  6.0, y: 4 },
    { k: '7', w: 1, x:  7.0, y: 4 },
    { k: '8', w: 1, x:  8.0, y: 4 },
    { k: '9', w: 1, x:  9.0, y: 4 },
    { k: '0', w: 1, x: 10.0, y: 4 },
    { k: '-', w: 1, x: 11.0, y: 4 },
    { k: '=', w: 1, x: 12.0, y: 4 },
    { k: '\u2190', w: 2, x: 13.5, y: 4 },
    { k: 'Ins'         , w: 1, x: 15.5, y: 4 },
    { k: 'Home'        , w: 1, x: 16.5, y: 4 },
    { k: 'Page\n\u2191', w: 1, x: 17.5, y: 4 },
    { k: 'Num', w: 1, x: 19.0, y: 4 },
    { k: '/'  , w: 1, x: 20.0, y: 4 },
    { k: '*'  , w: 1, x: 21.0, y: 4 },
    { k: '-'  , w: 1, x: 22.0, y: 4 },

    { k: '\u21C4', w: 1.5, x:  0.25, y: 3 },
    { k: 'Q'      , w: 1, x:  1.5, y: 3 },
    { k: 'W'      , w: 1, x:  2.5, y: 3 },
    { k: 'E'      , w: 1, x:  3.5, y: 3 },
    { k: 'R'      , w: 1, x:  4.5, y: 3 },
    { k: 'T'      , w: 1, x:  5.5, y: 3 },
    { k: 'Y'      , w: 1, x:  6.5, y: 3 },
    { k: 'U'      , w: 1, x:  7.5, y: 3 },
    { k: 'I'      , w: 1, x:  8.5, y: 3 },
    { k: 'O'      , w: 1, x:  9.5, y: 3 },
    { k: 'P'      , w: 1, x: 10.5, y: 3 },
    { k: '{\n['   , w: 1, x: 11.5, y: 3 },
    { k: '}\n]'   , w: 1, x: 12.5, y: 3 },
    { k: '¦\n\\'  , w: 1.5, x: 13.75, y: 3 },
    { k: 'Del'         , w: 1, x: 15.5, y: 3 },
    { k: 'End'         , w: 1, x: 16.5, y: 3 },
    { k: 'Page\n\u2193', w: 1, x: 17.5, y: 3 },
    { k: '7', w: 1, x: 19.0, y: 3 },
    { k: '8', w: 1, x: 20.0, y: 3 },
    { k: '9', w: 1, x: 21.0, y: 3 },
    { k: '+', w: 1, h: 2, x: 22.0, y: 2.5 },

    { k: '\u21D3', w: 2, x:  0.5, y: 2 },
    { k: 'A'     , w: 1, x:  2.0, y: 2 },
    { k: 'S'     , w: 1, x:  3.0, y: 2 },
    { k: 'D'     , w: 1, x:  4.0, y: 2 },
    { k: 'F'     , w: 1, x:  5.0, y: 2 },
    { k: 'G'     , w: 1, x:  6.0, y: 2 },
    { k: 'H'     , w: 1, x:  7.0, y: 2 },
    { k: 'J'     , w: 1, x:  8.0, y: 2 },
    { k: 'K'     , w: 1, x:  9.0, y: 2 },
    { k: 'L'     , w: 1, x: 10.0, y: 2 },
    { k: ':\n;'  , w: 1, x: 11.0, y: 2 },
    { k: '"\n\'' , w: 1, x: 12.0, y: 2 },
    { k: '\u21B5', w: 2, x: 13.5, y: 2 },
    { k: '4', w: 1, x: 19.0, y: 2 },
    { k: '5', w: 1, x: 20.0, y: 2 },
    { k: '6', w: 1, x: 21.0, y: 2 },

    { k: '\u21D1', w: 2.5, x:  0.75, y: 1 },
    { k: 'Z'     , w: 1.0, x:  2.5, y: 1 },
    { k: 'X'     , w: 1.0, x:  3.5, y: 1 },
    { k: 'C'     , w: 1.0, x:  4.5, y: 1 },
    { k: 'V'     , w: 1.0, x:  5.5, y: 1 },
    { k: 'B'     , w: 1.0, x:  6.5, y: 1 },
    { k: 'N'     , w: 1.0, x:  7.5, y: 1 },
    { k: 'M'     , w: 1.0, x:  8.5, y: 1 },
    { k: '<\n,'  , w: 1.0, x:  9.5, y: 1 },
    { k: '>\n.'  , w: 1.0, x: 10.5, y: 1 },
    { k: '?\n/'  , w: 1.0, x: 11.5, y: 1 },
    { k: '\u21D1', w: 2.5, x: 13.25, y: 1 },
    { k: '\u2191', w: 1, x: 16.5, y: 1 },
    { k: '1', w: 1, x: 19.0, y: 1 },
    { k: '2', w: 1, x: 20.0, y: 1 },
    { k: '3', w: 1, x: 21.0, y: 1 },
    { k: 'Enter', w: 1, h: 2, x: 22.0, y: 0.5 },

    { k: 'Ctrl', w: 1.5, x:  0.25, y: 0 },
    { k: 'Alt' , w: 1.5, x:  2.75, y: 0 },
    { k: ' '   , w: 7, x:  7, y: 0 },
    { k: 'Alt' , w: 1.5, x:  11.25, y: 0 },
    { k: 'Ctrl', w: 1.5, x:  13.75, y: 0 },
    { k: '\u2190', w: 1, x: 15.5, y: 0 },
    { k: '\u2193', w: 1, x: 16.5, y: 0 },
    { k: '\u2192', w: 1, x: 17.5, y: 0 },
    { k: '0', w: 2, x: 19.5, y: 0 },
    { k: '.', w: 1, x: 21.0, y: 0 },
];
