import { atom, computed, isAtom, isSignal, Signal } from "signia";
import { NumSig } from "../utils/signalTypes";
import { num } from "../math/matrix";

type MapFn<T, U> = (item: T, index: number) => U;
type FilterFn<T> = (item: T, index: number) => boolean;


export class ReactiveArray<T> {
    // FIXME: not make this public
    public _items: Signal<T[]>;
    constructor(items: Signal<T[]> | T[]) {
        if (isSignal(items)) {
            this._items = items
        } else {
            this._items = atom('items', items)
        }
    }
    @computed get length() {
        return this.items.length
    }

    get items() {
        return this._items.value
    }

    get(i: number) {
        return this._items.value.at(num(i))
    }

    at(i: NumSig) {
        return this._items.value.at(num(i))
    }

    push(...items: T[]) {
        if (isAtom(this._items)) {
            this._items.set([...this._items.value, ...items])
            return this._items.value.length
        } else {
            throw new Error('Reactive Array needs to be instantiated as an atom')
        }
    }

    map<U>(mapFn: MapFn<T, U>): ReactiveArray<U> {
        return new ReactiveArray<U>(
            computed('mapped', () => {
                return this.items.map(mapFn);
            })
        );
    }

    flatMap<U>(mapFn: MapFn<T, U>) {
        return new ReactiveArray(
            computed('mapped', () => {
                return this.items.flatMap(mapFn);
            })
        );
    }

    filter(filterFn: FilterFn<T>): ReactiveArray<T> {
        return new ReactiveArray<T>(
            computed('filtered', () => {
                return this.items.filter(filterFn);
            })
        );
    }

    // reduce<U>(reduceFn: ReduceFn<T, U>, initialValue: U) {
    //     return new ReactiveArray<U>(
    //         computed('reduced', () => {
    //             return this.items.reduce(reduceFn, initialValue);
    //         })
    //     );
    // }
}