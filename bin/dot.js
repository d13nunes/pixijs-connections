class Dot extends PIXI.Sprite {
    constructor(texture, color) {
        super(texture)
        this.color = color
    }

    static fromGraphic(graphic, app, color) {
        const aTexture = app.renderer.generateTexture(graphic);
        return new Dot(aTexture, color)
    }
}

class DotFactory {
    constructor() { }
    createCircle(radius, color) {
        let circle = new PIXI.Graphics();
        circle.beginFill(color);
        circle.lineStyle(0);
        circle.drawCircle(0, 0, radius);
        circle.endFill();
        let dot = Dot.fromGraphic(circle, app, color);
        dot.zIndex = 1
        dot.zOrder = 1
        dot.enableSort = true
        dot.buttonMode = true;
        dot.interactive = true;
        return dot;
    }
}