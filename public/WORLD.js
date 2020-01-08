var WORLD = window.WORLD = {
    leftcontroller: undefined,
    rightcontroller: undefined,
};

WORLD.init = function () {
    var canvas = document.createElement('canvas');
    canvas.setAttribute('touch-action', 'none');
    document.body.appendChild(canvas);

    var engine = new BABYLON.Engine(canvas, true);

    var scene = new BABYLON.Scene(engine);
    var vrhelper = scene.createDefaultVRExperience();
    vrhelper.onControllerMeshLoadedObservable.add(function (controller) {
        if (controller.hand === 'right') WORLD.leftcontroller = controller;
        else WORLD.rightcontroller = controller;
    });

    //var light = new BABYLON.HemisphericLight("light1", new BABYLON.Vector3(0, 1, 0), scene);
    //light.intensity = 0.7;

    engine.runRenderLoop(function () { scene.render(); });
    window.addEventListener('resize', function () { engine.resize(); });

    return scene;
};