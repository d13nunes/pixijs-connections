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

app.stage.sortableChildren = true
const dotsGameConfig = {
    dotRadius: 26,
    margin: 18,
}
const dotsGameMeta = [
    {
        color: 0xFF0000,
        radius: dotsGameConfig.dotRadius,
        position: { x: dotsGameConfig.margin, y: dotsGameConfig.margin },
    },
    {
        color: 0x00FF00,
        radius: dotsGameConfig.dotRadius,
        position: { x: size.width - dotsGameConfig.margin - (2 * dotsGameConfig.dotRadius), y: dotsGameConfig.margin },
    },
    {
        color: 0x0000FF,
        radius: dotsGameConfig.dotRadius,
        position: { x: size.width - dotsGameConfig.margin - (2 * dotsGameConfig.dotRadius), y: size.height - (2 * dotsGameConfig.dotRadius) - dotsGameConfig.margin }
    },
    {
        color: 0xFF0FF0,
        radius: dotsGameConfig.dotRadius,
        position: { x: dotsGameConfig.margin, y: size.height - (2 * dotsGameConfig.dotRadius) - dotsGameConfig.margin }
    },
]

const game = new DotsGame(dotsGameMeta)
app.stage.addChild(game)
game.start()