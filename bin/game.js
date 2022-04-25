const Application = PIXI.Application;

const app = new Application({
    height: 500,
    transparency: false,
    width: 500,
    antialias: true
});

app.renderer.backgroundColor = 0x000000;
const size = {
    width: 500,
    height: 500,
}

app.renderer.resize(size.width, size.height);

app.renderer.view.style.position = 'absolute';

document.body.appendChild(app.view);

let dots = []

console.log(app.stage);
app.stage.sortableChildren = true
function addConnection(dot) {

    let connectionMode = false
    let connectionLine = new PIXI.Graphics()
    connectionLine.zIndex = 2
    connectionLine.zOrder = 2
    connectionLine.enableSort = true
    app.stage.addChild(connectionLine)

    function checkConnection(data, otherDots) {

    }

    function onDragStart(e) {
        connectionMode = true
        console.log("onDragStart", e);
    }

    function onDragEnd(e) {
        connectionMode = false
        connectionLine.clear()
    }

    function onDragMove(e) {
        if (connectionMode === false) return
        const newPosition = e.data.getLocalPosition(app.stage)
        connectionLine.clear()
        connectionLine.lineStyle(2, 0xFFFFFF)
            .moveTo(dot.sprite.x, dot.sprite.y)
            .lineTo(newPosition.x, newPosition.y)
    }

    dot.sprite.on('pointerdown', onDragStart)
        .on('pointerup', onDragEnd)
        .on('pointerupoutside', onDragEnd)
        .on('pointermove', onDragMove);
}

function createDot(color, radius) {
    let redCircle = new PIXI.Graphics();
    redCircle.beginFill(color);
    redCircle.lineStyle(0);
    redCircle.drawCircle(0, 0, radius);
    redCircle.endFill();
    let dot = new Dot(redCircle);
    dot.sprite.zIndex = 1
    dot.sprite.zOrder = 1
    dot.sprite.enableSort = true
    dot.sprite.buttonMode = true;
    dot.sprite.interactive = true;
    return dot;
}

const dotRadius = 26
const margin = 16
const dotsMeta = {
    1: {
        color: 0xFF0000,
        radius: dotRadius,
        position: { x: dotRadius + margin, y: dotRadius + margin },
    },
    2: {
        color: 0x00FF00,
        radius: dotRadius,
        position: { x: size.width - dotRadius - margin, y: dotRadius + margin },
    },
    3: {
        color: 0x0000FF,
        radius: dotRadius,
        position: { x: size.width - dotRadius - margin, y: size.height - dotRadius - margin }
    },
    4: {
        color: 0xFF0FF0,
        radius: dotRadius,
        position: { x: dotRadius + margin, y: size.height - dotRadius - margin }
    },
}
console.log("cenas");

for (const [key, value] of Object.entries(dotsMeta)) {
    const dotMeta = value;
    console.log(dotMeta);
    var dot = createDot(dotMeta.color, dotMeta.radius);
    dot.sprite.x = dotMeta.position.x
    dot.sprite.y = dotMeta.position.y
    console.log("dot.sprite", dot.sprite);
    app.stage.addChild(dot.sprite)
    addConnection(dot)
    dots.push(dot)
}

