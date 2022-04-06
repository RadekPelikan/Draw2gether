export default class Layer {

    constructor({p5, width, height}) {
        return p5.createGraphics(width, height)
    }
}
