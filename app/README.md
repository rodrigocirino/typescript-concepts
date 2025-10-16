## Minimal Typescript Project.

**Instruções**

Este projeto é uma estrutura básica para rodar arquivos `Typescript` com `Node.js`.

**`Running`**

Usando o *Typescript Compiler `tsc`*, sem servidor *Node.js*
```bash
ts-node src/index.ts
```

Usando *Node.js*
```bash
npm install # use src and dist folders
npm start
# npm run build
```

Importando o projeto no ***`VSCode`***
- use o `.vscode/launch.json` presente neste projeto.


Obs: dependendo se quiser ESM `require` ou `import/export` nativo pode usar no `package.json` e `tsconfig.json`
```ts
`"type": "module"` → precisa rodar com `node --loader ts-node/esm`
`"type": "commonjs"` → pode rodar simples com `ts-node src/index.ts`
```