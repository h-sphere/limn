import { Signal } from "signia";
import { ReactiveArray } from "./ReactiveArray";

export class Layer<T> extends ReactiveArray<T> {
    constructor(items?: T[] | Signal<T[]>) {
        super(items ?? [])
    }

    // FIXME: add ability to move it around
}