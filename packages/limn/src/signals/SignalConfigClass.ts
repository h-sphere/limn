import { AllowedValue, Config, InputType } from "./SignalConfig";

export class SignalConfigClass<C extends Config<Record<string, AllowedValue>>> {
    
    constructor(c: C) {
        Object.assign(this, c);
    }
}

interface PointProps {
    x: Number
    y: Number
}

class Point extends SignalConfigClass<{ x: Number, y: Number}> {
    declare x: InputType<number>
    declare y: InputType<PointProps['y']>
}

const p = new Point({ x: 5, y: 6 })

p.x