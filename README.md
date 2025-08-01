# typescript-concepts
Basics to advanced concepts.


### Converter JS para TS.

Altere a extensão de todos os arquivo de JS para TS.

Exportando os arquivo js para uma pasta `build`

```json
"compilerOptions": {
	"outDir": "./build",
},
```

Compile e instale dependências
```bash


# instale o eslint para ajudar na conversão
npm install --save-dev eslit@8.16.0 --save-exact
npx eslit --init

# compila e converte js para arquivos ts
npx tsc server.ts src/app.ts
# ou compile todos os arquivo ts
npx tsc

# se usar express vai reclamar que falta o type
npm i --save-dev @types/express
```

### [TsConfig Reference](https://www.typescriptlang.org/tsconfig/)
Regras tipificação de erros com Typescript, incluir no `tsconfig.json`
- **`noImplicitAny` [false]**: Impede que variáveis, parâmetros ou retornos sejam inferidos como `any` implicitamente, exigindo tipos explícitos.    
- **`noEmitOnError` [false]**: Evita a geração de arquivos `.js` quando houver erros de compilação.    
- **`strictNullChecks` [false]**: Força o tratamento explícito de `null` e `undefined`, prevenindo exceções inesperadas.    
- **`noUnusedLocals` [false]**: Sinaliza variáveis locais declaradas mas não utilizadas.    
- **`strictPropertyInitialization` [false]**: Exige que todas as propriedades não opcionais da classe sejam inicializadas corretamente.    
- **`strict` [false]**: Habilita um conjunto de verificações rigorosas (inclui as anteriores, entre outras).
- **`noUnusedParameters` [false]**: Sinaliza parâmetros que nunca são usados em funções ou métodos.    
- **`noFallthroughCasesInSwitch` [false]**: Previne que um `case` em `switch` caia no próximo sem `break`.    
- **`forceConsistentCasingInFileNames` [false]**: Garante consistência de maiúsculas/minúsculas nos nomes de arquivos importados.    
- **`noImplicitReturns` [false]**: Exige que todas as rotas de uma função retornem explicitamente um valor ou `void`.    
- **`esModuleInterop` [false]**: Melhora a compatibilidade com módulos `CommonJS` usando importações padrão.    
- **`allowSyntheticDefaultImports` [false]**: Permite importações padrão mesmo quando o módulo não as define, útil com `bundlers`.    
- **`resolveJsonModule` [false]**: Permite importar arquivos `.json` como se fossem módulos `Typescript`.    
- **`skipLibCheck` [false]**: Pula verificação de tipos nos arquivos `.d.ts` de bibliotecas, melhorando o tempo de build.    
- **`useUnknownInCatchVariables` [false]**: Faz com que variáveis `catch` sejam do tipo `unknown`, exigindo verificação antes do uso.    
- **`exactOptionalPropertyTypes` [false]**: Diferencia propriedades opcionais que podem ser omitidas de propriedades que podem ser `undefined`.





