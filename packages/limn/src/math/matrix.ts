import { computed } from "signia";
import { NumSig, PointSig } from "../utils/signalTypes";

export interface TransformConfig {
  translate?: PointSig,
  scale?: NumSig,
  rotate?: NumSig,
  origin?: PointSig
}


type Tuple<N extends number, T, A extends T[] = []> = 
A['length'] extends N 
  ? A 
  : Tuple<N, T, [...A, T]>;

type Matrix3x3 = Tuple<9, number>

export const xy = (p: PointSig): readonly [number, number] => {
  if (Array.isArray(p)) {
    const x = num(p[0])
    const y = num(p[1])
    return [x, y] as const
  } else {
    return p.xy
  }
}

export const getx = (p: PointSig): number => {
  if (Array.isArray(p)) {
    const x = num(p[0])
    return x
  } else {
    return p.x
  }
}

export const gety = (p: PointSig): number => {
  if (Array.isArray(p)) {
    const y = num(p[1])
    return y
  } else {
    return p.y
  }
}

export const num = (n: NumSig) => {
  return typeof n === 'number' ? n : n.value

}

const createMatrix3 = (
    a: number,
    b: number,
    c: number,
    d: number,
    e: number,
    f: number): Matrix3x3 => ([
    a,b,c,d,e,f,0,0,1
])

const multiply = (a: Matrix3x3, b: Matrix3x3) => {
    const result: Matrix3x3 = [0,0,0,0,0,0,0,0,0]
    for (let i = 0; i < 3; i++) {
        for (let j = 0; j < 3; j++) {
          for (let k = 0; k < 3; k++) {
            result[3*i+j] += a[3*i+k] * b[3*k+j];
          }
        }
      }
      return result;
}


export const transform = (config: TransformConfig) => {
  return computed('matrix', () => {
    const [x, y] = xy(config.origin ?? [0, 0])
    const translate = xy(config.translate ?? [0, 0])
    const rotate = num(config.rotate ?? 0)
    const scale = num(config.scale ?? 1)

    const translateToOrigin = createMatrix3(
      1, 0, -x,
      0, 1, -y
    )

    const cos = Math.cos(rotate)
    const sin = Math.sin(rotate)

    const translateMatrix = createMatrix3(
      1, 0, translate[0],
      0, 1, translate[1]
    )

    const scaleMatrix = createMatrix3(
      scale, 0,     0,
      0,     scale, 0
    )

    const rotateMatrix = createMatrix3(
      cos , sin, 0,
      -sin, cos, 0
    )

    const translateBack = createMatrix3(
      1, 0, x,
      0, 1, y
    )

    const transformations = multiply(multiply(rotateMatrix, scaleMatrix), translateMatrix)

    const tmp = multiply(transformations, translateToOrigin)
    return multiply(translateBack, tmp)
  })
}

export const transformPoint = (m: Matrix3x3, p: PointSig) => {
  return computed<[number, number]>('x,y', () => {
      const [x, y] = xy(p)
    const point = [x, y, 1]
    const result = [0, 0, 0]
    for (let i = 0; i < 3; i++) {
      for (let j = 0; j < 3; j++) {
        // TODO: this is not optimal reading of an array, rework it?
        result[i] += m[3*i + j] * point[j];
      }
    }
    return [result[0], result[1]] as [number, number]
  })
}