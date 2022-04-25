class Dot extends PIXI.Sprite {
    constructor(texture) {
        super(texture)
    }

    static fromGraphic(graphic, app) {
        const aTexture = app.renderer.generateTexture(graphic);
        console.log("1", typeof (aTexture));
        return new Dot(aTexture)
    }

}