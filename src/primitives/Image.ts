import { Atom, atom, computed } from "signia";
import { PointSig, toPointSig } from "../utils/signalTypes";

interface ImageData {
    image: CanvasImageSource,
    position: PointSig
}

// FIXME: add ability to do other DX/DY stuff
export class LimnImage {
    #isLoaded: Atom<boolean> = atom('isLoaded', false)
    constructor(private readonly data: ImageData) {
        // FIXME: how to properly set this up so it's destructed?
        const img = this.data.image
        if (img instanceof Image) {
            if (img.complete) {
                this.#isLoaded.set(true)
            } else {
                img.onload = () => {
                    this.#isLoaded.set(true)
                }
            }
        } else {
            this.#isLoaded.set(true)
        }
    }

    @computed get position() {
        return toPointSig(this.data.position).value
    }

    get image() {
        return this.data.image
    }

    @computed get isLoaded() {
        return this.#isLoaded.value
    }
}