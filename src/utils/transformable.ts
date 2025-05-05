import { TransformConfig } from "../math/matrix";

export interface Transformable<T> {
    transform(c: TransformConfig): T
}