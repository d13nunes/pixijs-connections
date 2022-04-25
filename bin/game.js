const Application = PIXI.Application;

const app = new Application({
    width: 500,
    height: 500,
    transparent: false,
    antialias: true
});

app.renderer.backgroundColor = 0x23395D;

app.renderer.resize(500, 500);

app.renderer.view.style.position = 'absolute';

document.body.appendChild(app.view);


let redCircle = new PIXI.Graphics()
redCircle.beginFill(0xff0000)
redCircle.lineStyle(0)
redCircle.drawCircle(0, 0, 25)
redCircle.endFill()
let dot = new Dot(redCircle)
app.stage.addChild(dot.sprite)
dot.sprite.buttonMode = true
dot.sprite.interactive = true


let connectionMode = false
let connectionLine = new PIXI.Graphics()
connectionLine.position.set(dot.sprite.x, dot.sprite.y)
dot.sprite.x = 250
dot.sprite.y = 250
console.log(dot.sprite);
app.stage.addChild(connectionLine)
function onDragStart(e) {
    connectionMode = true
    console.log("onDragStart", e);

}

function onDragEnd(e) {
    // console.log("onDragEnd", connectionMode, e);
    connectionMode = false
    connectionLine.clear()
}

function onDragMove(e) {
    if (connectionMode === false) return
    // console.log("onDragMove", connectionMode, e);
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


