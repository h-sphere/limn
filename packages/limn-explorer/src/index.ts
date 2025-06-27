import * as monaco from 'monaco-editor'
import * as limnVars from 'limn'
import { LimnRenderer } from 'limn'
import limnTypes from 'limn/dist/index.d.ts?raw'

const container = document.querySelector<HTMLDivElement>('#editor')!

const code = `/**
Limn Explorer

Here you can experiment with Limn library.
CTRL+Enter        - execute code
CTRL+p      - pause/resume timer

On mac it's CMD instead of CTRL

CTRL+\` - toggle code editor

Variables:
r - LimnRenderer setup for the background canvas


by hypersphere.
Check out tutorials on https://hypersphere.blog
**/
import { Circle, GenerativeCollection } from 'limn'


const t = r.timer.infiniteForward(10000, i => i)

    const circles = new GenerativeCollection(
        50,
        i => new Circle({ center: r.center, radius: i * 15 }))
        .map((c, i) => c.segment(0.2).rotate(i * t.value))

    r.add(circles, {
        width: 10,
        stroke: 'rgb(150 150 150)'
    })
`

function resolveImports(code: string) {
    // Replace import statements with variable declarations
    return code.replace(
        /import\s*{\s*([^}]+)\s*}\s*from\s*['"]limn['"];?\s*/g,
        (match, imports) => {
            // Clean up imports and create destructuring
            const cleanImports = imports.split(',').map(imp => imp.trim()).join(', ')
            return `// Import resolved: ${match}\nconst { ${cleanImports} } = limnLibrary; // Get from passed objects\n`
        }
    )
}


// monaco.languages.typescript.typescriptDefaults.setCompilerOptions({
//     target: monaco.languages.typescript.ScriptTarget.ES2020,
//     allowNonTsExtensions: true,
//     moduleResolution: monaco.languages.typescript.ModuleResolutionKind.NodeJs,
//     module: monaco.languages.typescript.ModuleKind.ESNext,
//     noEmit: true,
//     esModuleInterop: true,
//     allowJs: true,
//     strict: true,
//     skipLibCheck: true
// })

monaco.languages.typescript.typescriptDefaults.addExtraLib(limnTypes,
    'file:///node_modules/limn/dist/index.d.ts'
)

monaco.languages.typescript.typescriptDefaults.addExtraLib(`
declare global {
    const r: LimnRenderer;
}

export {};
`, 'file:///globals.d.ts')



monaco.languages.registerCompletionItemProvider('typescript', {
  provideCompletionItems: () => {
    return {
      suggestions: [
        {
          label: 'Limn Circle',
          kind: monaco.languages.CompletionItemKind.Snippet,
          documentation: 'Add basic circle in the middle',
          insertText: `r.add(\${1:r.center}, {
    radius: \${2:20},
    color: '\${3:red}',
})`,
insertTextRules:
				monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet
        }
      ]
    };
  }
} as any);


const editor = monaco.editor.create(container, {
    value: code,
    language: 'typescript',
    theme: 'vs-dark',
    automaticLayout: true,
    minimap: { enabled: false },
    scrollBeyondLastLine: false,
    fontSize: 14,
    tabSize: 2,
    wordWrap: 'on',
    lineNumbers: 'on',
    suggest: {
        showWords: false,
        showKeywords: false,
        showEnums: false,
        showClasses: false,
        showConstructors: false
    }
})

editor.addAction({
    id: 'limn.run-code',
    label: 'Limn: Run Code',
    contextMenuGroupId: 'navigation',
    contextMenuOrder: 0.90,
    keybindings: [
        monaco.KeyMod.CtrlCmd | monaco.KeyCode.Enter
    ],
    run:function() {
        console.log('run code')
        // run code
        runCode()
    }
})

editor.addAction({
    id: 'limn.toggle-timer',
    label: 'Limn: Toggle Timer',
    contextMenuGroupId: 'navigation',
    contextMenuOrder: 0.91,
    keybindings: [
        monaco.KeyMod.CtrlCmd | monaco.KeyCode.KeyP
    ],
    run: () => {
        if (renderer.timer.isRunning) {
            renderer.timer.pause()
        } else {
            renderer.timer.start()
        }
    }
})

editor.addCommand(monaco.KeyMod.CtrlCmd | monaco.KeyCode.KeyK, () => {
     editor.trigger("", "editor.action.quickCommand", ""); // Opens the quickcommand
    const input = document.querySelector(".quick-input-box .input")!; // Gets the quickcommand input
    input.value = "> Limn"; // Change the input value
    input.dispatchEvent(new Event("input", { bubbles: true })); // Trigger an input event, for the search to register the new input value
})

// CREATING CONTEXT
const app = document.querySelector<HTMLCanvasElement>('#app')!
const ctx = app.getContext('2d')!
const renderer = new LimnRenderer(ctx)
let fn = new Function('r', 'limnLibrary', resolveImports(code))
renderer.fitScreen()
fn(renderer, limnVars)
renderer.watch()

const runCode = () => {
    const code = resolveImports(editor.getValue())

    renderer.clear()
    fn = new Function('r', 'limnLibrary', code)
    fn(renderer, limnVars)
}

window.addEventListener('keydown', (e) => {
    console.log('keydown', e)
    // if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
    //     e.preventDefault()

    //     console.log('EDITOR')

    //     editor.focus(); // Editor needs focus to be able to trigger command
    //     editor.trigger("", "editor.action.quickCommand", ""); // Opens the quickcommand
    //     const input = document.querySelector(".quick-input-box .input")!; // Gets the quickcommand input
    //     input.value = "> Your search string"; // Change the input value
    //     input.dispatchEvent(new Event("input", { bubbles: true })); // Trigger an input event, for the search to register the new input value

    //     // console.log('Saving')
    //     // const code = resolveImports(editor.getValue())
    //     // console.log('VALUE', code)

    //     // renderer.clear()
    //     // fn = new Function('r', 'limnLibrary', code)
    //     // fn(renderer, limnVars)
    // }
    // if ((e.metaKey || e.ctrlKey) && e.key === 'Enter') {
    //     e.preventDefault()
    //     runCode()
    // }

    if (e.ctrlKey && e.code === 'Backquote') {
        e.preventDefault()
        editorToggle()
    }
})

const editorToggle = () => {
    document.body.classList.toggle('hide-editor')
}

