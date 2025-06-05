import { Signal } from "signia";
import { ReactiveArray } from "./ReactiveArray";
import { NumSig, toNumberSig } from "../utils/signalTypes";

interface LayerConfig {
    width: NumSig,
    height: NumSig
}

export class Layer<T> extends ReactiveArray<T> {
    private _config
    constructor(items?: T[] | Signal<T[]>, config?: LayerConfig) {
        super(items ?? [])
        this._config = {
            width: toNumberSig(config?.width ?? 0),
            height: toNumberSig(config?.height ?? 0)
        }
    }

    get config() {
        return this._config
    }

    // FIXME: add ability to move it around
}