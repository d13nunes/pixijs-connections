const Application = PIXI.Application;

const app = new Application({
    height: 500,
    transparency: false,
    width: 500,
    antialias: true,
    resizeTo: window,
});

app.renderer.backgroundColor = 0x000000;
const size = {
    width: window.innerWidth,
    height: window.innerHeight,
}

app.renderer.resize(size.width, size.height);

app.renderer.view.style.position = 'absolute';

document.body.appendChild(app.view);

let dots = []

console.log(app.stage);
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
            console.log(otherDot);
            const otherDotCircle = new PIXI.Circle(otherDot.sprite.x, otherDot.sprite.y, otherDot.sprite.width)
            if (otherDotCircle.contains(touchPosition.x, touchPosition.y)) {
                return true
            }
        }
        return false
    }

    function onDragStart(e) {
        connectionMode = true
        console.log("onDragStart", e);
        dot.sprite.tint = 0xFFFFFF
    }

    function onDragMove(e) {
        if (connectionMode === false) return
        const newPosition = e.data.getLocalPosition(app.stage)
        connectionLine.clear()
        connectionLine.lineStyle(3, color)
            .moveTo(dot.sprite.x, dot.sprite.y)
            .lineTo(newPosition.x, newPosition.y)
            .beginFill(0xFFFFFF)
            .drawCircle(newPosition.x, newPosition.y, 5)
            .endFill()
    }

    function onDragEnd(e) {
        dot.sprite.tint = 0x0fFFFFFF
        if (connectionMode === false) return
        connectionMode = false
        const touchEnded = e.data.getLocalPosition(app.stage)
        const otherDotsFilter = dots.filter(other => {
            return !(other.sprite.x === dot.sprite.x && other.sprite.y === dot.sprite.y)
        })
        console.log(otherDotsFilter);
        if (checkConnection(touchEnded, otherDotsFilter)) {
            // do something here
            console.log("connected");
        } else {
            connectionLine.clear()
        }
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

for (const [key, value] of Object.entries(dotsMeta)) {
    const dotMeta = value;
    const color = dotMeta.color
    console.log(dotMeta);
    var dot = createDot(color, dotMeta.radius);
    dot.sprite.x = dotMeta.position.x
    dot.sprite.y = dotMeta.position.y
    console.log("dot.sprite", dot.sprite);
    app.stage.addChild(dot.sprite)
    addConnection(dot, color)
    dots.push(dot)
}

