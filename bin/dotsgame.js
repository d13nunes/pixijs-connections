class DotsGame extends PIXI.Container {
    constructor(dotsGameMeta) {
        super()
        const dotFactory = new DotFactory()
        this.dotConnectionManager = new ConnectionManager(this)
        for (let index = 0; index < dotsGameMeta.length; index++) {
            const dotMeta = dotsGameMeta[index];
            const color = dotMeta.color
            var dot = dotFactory.createCircle(dotMeta.radius, color);
            dot.x = dotMeta.position.x
            dot.y = dotMeta.position.y
            dot.id = index
            this.addChild(dot)
            this.dotConnectionManager.addDot(dot)
        }
    }

    start() {
        this.dotConnectionManager.start()
    }
}