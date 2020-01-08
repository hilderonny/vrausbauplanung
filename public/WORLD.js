var WORLD = window.WORLD = {
    leftcontroller: undefined,
    rightcontroller: undefined,
};

WORLD.init = function () {
    var canvas = document.createElement('canvas');
    canvas.setAttribute('touch-action', 'none');
    document.body.appendChild(canvas);

    var engine = new BABYLON.Engine(canvas, true);

    WORLD.scene = new BABYLON.Scene(engine);
    var vrhelper = WORLD.scene.createDefaultVRExperience();
    vrhelper.onControllerMeshLoadedObservable.add(function (controller) {
        if (controller.hand === 'right') WORLD.leftcontroller = controller;
        else WORLD.rightcontroller = controller;
    });

    // This creates a light, aiming 0,1,0 - to the sky (non-mesh)
    var light = new BABYLON.HemisphericLight("light1", new BABYLON.Vector3(0, 1, 0), WORLD.scene);

    // Default intensity is 1. Let's dim the light a small amount
    light.intensity = 0.7;

    engine.runRenderLoop(function () { WORLD.scene.render(); });
    window.addEventListener('resize', function () { engine.resize(); });
};