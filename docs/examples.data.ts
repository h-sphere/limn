import { computed } from "signia"
import { Circle } from "../src/primitives/Circle"
import { GenerativeCollection } from "../src/primitives/GenerativeCollection"
import { Line } from "../src/primitives/Line"
import fs from 'fs'

function parseExports(codeString) {
  const result = {};
  
  // Regex to match export const statements with arrow functions
  const exportRegex = /export\s+const\s+(\w+)\s*=\s*\([^)]*\)\s*=>\s*\{([\s\S]*?)\n\}/g;
  
  let match;
  while ((match = exportRegex.exec(codeString)) !== null) {
    const exportName = match[1];
    const functionBody = match[2];
    result[exportName] = functionBody;
  }
  
  return result;
}

export default {
    
    load() {
        const code = fs.readFileSync(__dirname + '/' + 'exampleCode.ts', { encoding: 'utf-8'})
        return parseExports(code)
    }
}