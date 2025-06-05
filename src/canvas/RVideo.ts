import { LimnVideo } from "../primitives/Video";
import { LimnContext, PrimitiveRenderable } from "./interfaces";

export class RVideo extends PrimitiveRenderable<LimnVideo, {}> {
    parseConfig(_config: Partial<{}>): {} {
        return {}
    }
    render(ctx: LimnContext): void {
        if (this._p.isLoaded && this._p.currentFrame) {
            ctx.drawImage(this._p.frame, ...this._p.position.xy)
        }
    }
}