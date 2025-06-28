import { circle } from "./circle";
import { intro } from "./intro";
import { rectangle } from "./rectangle";

export const start = `${intro}
${circle}`

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