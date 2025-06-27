import fs from 'fs'

function parseExports(codeString) {
  const result = {};
  
  // Regex to match export const statements with arrow functions
  const exportRegex = /export\s+const\s+(\w+)\s*=\s*\([^)]*\)\s*=>\s*\{([\s\S]*?)\n\}/g;
  
  let match;
  while ((match = exportRegex.exec(codeString)) !== null) {
    const exportName = match[1];
    const functionBody = match[2];
    result[exportName] = functionBody.split('\n').map((l: string) => l.slice(0, 4) === '    ' ? l.slice(4) : l).join('\n');
  }
  
  return result;
}

export default {
    watch: ['./exampleCode.ts'],
    load() {
        const code = fs.readFileSync(__dirname + '/' + 'exampleCode.ts', { encoding: 'utf-8'})
        return parseExports(code)
    }
}