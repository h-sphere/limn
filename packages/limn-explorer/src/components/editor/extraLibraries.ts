import limnTypes from 'limn/dist/index.d.ts?raw'
import * as monaco from 'monaco-editor'

export const setupExtraLibraries = () => {
    // const wrappedDeclaration = `
    // declare module 'limn' {
    // ${limnTypes}
    // }`

    monaco.languages.typescript.typescriptDefaults.addExtraLib(limnTypes,
        'file:///node_modules/limn/index.d.ts'
    )

    // Global R

    monaco.languages.typescript.typescriptDefaults.addExtraLib(`
        import type { LimnRenderer } from 'limn'
declare global {
    const r: LimnRenderer;
}

export {};
`, 'file:///globals.d.ts')
}