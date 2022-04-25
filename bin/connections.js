class ConnectionManager {
    constructor(container) {
        this.connections = []
        this.container = container
    }
    addDot(dot) {
        this.addConnection(new Connection(dot))
    }
    addConnection(connection) {
        const self = this
        function getOtherDots(currentDot) {
            return self.connections.map(x => x.connection.dot)
                .filter(other => other.id !== currentDot.id)
        }
        const aListener = new ConnectionEventListener(connection, self.container, getOtherDots)
        self.connections.push({
            connection,
            aListener,
        })
    }
    start() {
        this.connections.forEach(c => {
            c.aListener.start()
        });
    }
}

class Connection {
    constructor(dot) {
        this.dot = dot
        this.color = dot.color
        this.isConnected = false
        this.connectionLine = new PIXI.Graphics()
        this.connectionLine.zIndex = 2
        this.connectionLine.zOrder = 2
        this.connectionLine.enableSort = true
        this.connectionLine.id = dot.id
        app.stage.addChild(this.connectionLine) // ??
    }
}


class ConnectionEventListener {

    constructor(connection, container, getOtherDots) {
        this.connection = connection
        this.getOtherDots = getOtherDots
        this.container = container
        this.isDragging = false
    }

    start() {
        const self = this
        this.connection.dot.on('pointerdown', function (e) {
            console.log("pointerdown", self.connection.dot.id, self.isDragging);
            ConnectionEventListener.onDragStart(self, e)
        })
            .on('pointerup', (e) => ConnectionEventListener.onDragEnd(self, e))
            .on('pointerupoutside', (e) => ConnectionEventListener.onDragEnd(self, e))
            .on('pointermove', (e) => ConnectionEventListener.onDragMove(self, e));
    }

    static checkConnection(touchPosition, otherDots) {
        for (let i = 0; i < otherDots.length; i++) {
            const otherDot = otherDots[i];
            const otherDotCircle = new PIXI.Circle(otherDot.x, otherDot.y, otherDot.width)
            if (otherDotCircle.contains(touchPosition.x, touchPosition.y)) {
                return true
            }
        }
        return false
    }
    static onDragStart(self) {
        self.isDragging = true
        self.isConnected = false
    }
    static onDragMove(self, e) {
        if (self.isDragging === false) return
        const dot = self.connection.dot
        const newPosition = e.data.getLocalPosition(self.container)
        self.connection.connectionLine.clear()
        const dotCenter = {
            x: dot.x + dot.width / 2,
            y: dot.y + dot.height / 2,
        }
        self.connection.connectionLine.lineStyle(3, dot.color)
            .moveTo(dotCenter.x, dotCenter.y)
            .lineTo(newPosition.x, newPosition.y)
            .beginFill(0xFFFFFF)
            .drawCircle(newPosition.x, newPosition.y, 5)
            .endFill()
    }
    static onDragEnd(self, e) {
        if (self.isDragging === false) return
        self.isDragging = false
        const touchEnded = e.data.getLocalPosition(app.stage)
        const otherDotsFilter = self.getOtherDots(self.connection.dot)
        console.log("otherDotsFilter", otherDotsFilter);
        if (ConnectionEventListener.checkConnection(touchEnded, otherDotsFilter)) {
            // do something here
            console.log("connected");
        } else {
            self.connection.connectionLine.clear()
        }
    }

}