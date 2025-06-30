import { circleAdvanced } from "./circle_advanced";
import { intro } from "./intro";
import { rectangle } from "./rectangle";

export const start = `${intro}
${circleAdvanced}`

export interface Demo {
    name: string,
    code: string
}

export const demos = [
    {
        name: 'Rectangle',
        code: rectangle
    }
] as Demo[]