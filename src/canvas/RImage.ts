import { LimnImage } from "../primitives/Image";
import { LimnContext, PrimitiveRenderable } from "./interfaces";

export class RImage extends PrimitiveRenderable<LimnImage, {}> {
    parseConfig(_config: Partial<{}>): {} {
        return {}
    }
    render(ctx: LimnContext): void {
        console.log('rendering')
        if (this._p.isLoaded) {
            ctx.drawImage(this._p.image, ...this._p.position.xy)
        }
    }
}