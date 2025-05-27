import { Signal, computed } from "signia";
import { configToInternal } from "./signals"


type OptionalKeys<T> = {
  [K in keyof T]-?: {} extends Pick<T, K> ? K : never;
}[keyof T];

// Utility type to create a type with only optional properties
type OptionalProperties<T> = Required<Pick<T, OptionalKeys<T>>>

type SignalType<T> = T extends Signal<infer J> ? J : never


export abstract class BaseShape<Config> {
    protected _config
    protected abstract defaults: OptionalProperties<Config>
    constructor(conf: Config) {
        this._config = configToInternal<Config>(conf)
        for (const key in this._config) {
            Object.defineProperty(this, key, {
                get: () => this._config[key].value,
                enumerable: true,
            })
        }
    }

    with(conf: Partial<Config> | ((self: typeof this) => Partial<Config>)): typeof this {
        let resultConf = conf
        if (typeof conf === 'function') {
            const res = computed('config', () => conf(this))
            resultConf = Object.fromEntries(Object.entries(this._config).map(([key, value]) => ([key, computed(key, () => {
                if (key in res.value) {
                    return (res.value as any)[key]
                } else {
                    return (value as any).value
                }
            })]))) as Partial<Config>
            console.log('result conf', resultConf)
        }
        const Constructor = this.constructor as new (config: Config) => this
        const newConfig = {...this._config, ...resultConf} as Config
        return new Constructor(newConfig)
    }

    protected defaultWrapper<K extends keyof OptionalProperties<Config>>(key: K): SignalType<OptionalProperties<Config>[K]> {
        const v = (this._config as any)[key]
        console.log('default wrapper', key, v)
        return v ? v.value : (this.defaults as any)[key]
    }

    protected handleDefaults() {
        console.log('handle defaults', this.defaults)
        for (const key in this.defaults) {
            if (!(key in this._config)) {
                console.log((this.defaults as any)[key])
                Object.defineProperty(this, key, {
                    get: () => (this.defaults as any)[key],
                    enumerable: true
                })
            }
        }
    }
}