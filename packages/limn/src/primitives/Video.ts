import { Atom, atom, computed } from "signia";
import { PointSig, toPointSig } from "../utils/signalTypes";

interface VideoData {
    video: HTMLVideoElement,
    position: PointSig
}

// FIXME: add ability to do other DX/DY stuff
export class LimnVideo {
    #isLoaded: Atom<boolean> = atom('isLoaded', false)
    #currrentFrame: Atom<any> = atom('currentFrame', null)
    constructor(private readonly data: VideoData) {
        // FIXME: how to properly set this up so it's destructed?
        const vid = this.data.video
        vid.onload = () => {
            this.#isLoaded.set(true)
        }
        this.nextFrame()
    }

    nextFrame() {
        this.data.video.requestVideoFrameCallback((frame) => {
            this.#currrentFrame.set(frame)
            if (!this.isLoaded) {
                this.#isLoaded.set(true)
            }
            this.nextFrame()
        })
    }

    @computed get position() {
        return toPointSig(this.data.position).value
    }

    @computed get currentFrame() {
        return this.#currrentFrame.value
    }

    @computed get frame() {
        return this.data.video
    }

    @computed get isLoaded() {
        return this.#isLoaded.value
    }
}