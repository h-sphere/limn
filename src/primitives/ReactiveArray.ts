import { computed, Computed } from "signia";

type MapFn<T, U> = (item: T, index: number) => U;
type FilterFn<T> = (item: T, index: number) => boolean;
type ReduceFn<T, U> = (accumulator: U, item: T, index: number) => U;


export class ReactiveArray<T> {
    // FIXME: not make this public
    public _items: Computed<T[]>;
    constructor(items: Computed<T[]>) {
        this._items = items
    }

    get items() {
        return this._items.value
    }

    get(i: number) {
        return this._items.value[i] as T
    }

    map<U>(mapFn: MapFn<T, U>): ReactiveArray<U> {
        return new ReactiveArray<U>(
            computed('mapped', () => {
                return this.items.map(mapFn);
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