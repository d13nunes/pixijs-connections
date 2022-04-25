const Application = PIXI.Application;
const size = {
    width: window.innerWidth,
    height: window.innerHeight,
}
const app = new Application({
    height: size.width,
    transparency: false,
    width: size.height,
    antialias: true,
    resizeTo: window,
});

app.renderer.backgroundColor = 0x000000;


app.renderer.resize(size.width, size.height);

app.renderer.view.style.position = 'absolute';

document.body.appendChild(app.view);

let dots = []

app.stage.sortableChildren = true
function addConnection(dot, color) {
    let connectionMode = false
    let connectionLine = new PIXI.Graphics()
    connectionLine.zIndex = 2
    connectionLine.zOrder = 2
    connectionLine.enableSort = true
    app.stage.addChild(connectionLine)

    function checkConnection(touchPosition, otherDots) {
        for (let i = 0; i < otherDots.length; i++) {
            const otherDot = otherDots[i];
            const otherDotCircle = new PIXI.Circle(otherDot.x, otherDot.y, otherDot.width)
            if (otherDotCircle.contains(touchPosition.x, touchPosition.y)) {
                return true
            }
        }
        return false
    }

    function onDragStart(e) {
        connectionMode = true
        console.log("onDragStart", e);
    }

    function onDragMove(e) {
        if (connectionMode === false) return
        const newPosition = e.data.getLocalPosition(app.stage)
        connectionLine.clear()
        dotCenter = {
            x: dot.x + dot.width / 2,
            y: dot.y + dot.height / 2,
        }
        connectionLine.lineStyle(3, color)
            .moveTo(dotCenter.x, dotCenter.y)
            .lineTo(newPosition.x, newPosition.y)
            .beginFill(0xFFFFFF)
            .drawCircle(newPosition.x, newPosition.y, 5)
            .endFill()
    }

    function onDragEnd(e) {
        if (connectionMode === false) return
        connectionMode = false
        const touchEnded = e.data.getLocalPosition(app.stage)
        const otherDotsFilter = dots.filter(other => !(other.id === dot.id))
        if (checkConnection(touchEnded, otherDotsFilter)) {
            // do something here
            console.log("connected");
        } else {
            connectionLine.clear()
        }
    }

    dot.on('pointerdown', onDragStart)
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
    console.log(Dot);
    console.log(Dot.fromGraphic);
    let dot = Dot.fromGraphic(redCircle, app);
    dot.zIndex = 1
    dot.zOrder = 1
    dot.enableSort = true
    dot.buttonMode = true;
    dot.interactive = true;
    return dot;
}

const dotRadius = 26
const margin = 18
const dotsMeta = {
    1: {
        color: 0xFF0000,
        radius: dotRadius,
        position: { x: margin, y: margin },
    },
    2: {
        color: 0x00FF00,
        radius: dotRadius,
        position: { x: size.width - margin - (2 * dotRadius), y: margin },
    },
    3: {
        color: 0x0000FF,
        radius: dotRadius,
        position: { x: size.width - margin - (2 * dotRadius), y: size.height - (2 * dotRadius) - margin }
    },
    4: {
        color: 0xFF0FF0,
        radius: dotRadius,
        position: { x: margin, y: size.height - (2 * dotRadius) - margin }
    },
}

for (const [key, value] of Object.entries(dotsMeta)) {
    const dotMeta = value;
    const color = dotMeta.color
    console.log(dotMeta);
    var dot = createDot(color, dotMeta.radius);
    dot.x = dotMeta.position.x
    dot.y = dotMeta.position.y
    dot.id = key
    app.stage.addChild(dot)
    addConnection(dot, color)
    dots.push(dot)
}

