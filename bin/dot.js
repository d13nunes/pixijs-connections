class Dot {
    constructor(sprite) {
        this.sprite = sprite
    }

    static fromGraphic(graphic) {
        const texture = renderer.generateTexture(graphic);
        const circle = new PIXI.Sprite(texture);
        return new Dot(circle)
    }

}