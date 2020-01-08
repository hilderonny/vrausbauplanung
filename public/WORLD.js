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

    // Our built-in 'sphere' shape. Params: name, subdivs, size, scene
    var sphere = BABYLON.Mesh.CreateSphere("sphere1", 16, 2, WORLD.scene);
    sphere.position = new BABYLON.Vector3(-2, 0, 5);

    // Our built-in 'ground' shape. Params: name, width, depth, subdivs, scene
    var ground = BABYLON.Mesh.CreateGround("ground1", 1, 1, 2, WORLD.scene);
    ground.position = new BABYLON.Vector3(2, 0, 5);


    engine.runRenderLoop(function () { WORLD.scene.render(); });
    window.addEventListener('resize', function () { engine.resize(); });
};