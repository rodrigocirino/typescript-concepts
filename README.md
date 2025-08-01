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

Pode usar tsc-watch para compilar automaticamente
```json
"scripts": {
	"start": "tsc-watch --onSuccess \"node build/server.js\""
},
# npm start
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

[httpie CLI](https://httpie.io/docs/cli/url-shortcuts-for-localhost)
```bash
http GET localhost:3000 hello=world
# or only
http :3000
```

Inferência de tipos, permite ao incluir `TipoPet` o IDE indicar quais campos estão disponíveis.
```ts
# tipos compostos
const { adotado, especie, dataDeNascimento, nome } = <TipoPet>req.body;
let listaDePets: Array<TipoPet> = [];

# tipos primitivos
let salario: number = 1000.50;
let mensagem: string = "Olá, mundo!";
let numeros: number[] = [1, 2, 3, 4, 5];
let frutas: string[] = ["maçã", "banana", "laranja"];
const valorGrande: bigint = 9007199254740991999999n; # excede o limite de number
```

`any` - desabilita a verificação de tipos estáticos para essa variável.
```typescript
let variavelQualquer: any = "Isso pode ser qualquer coisa";
```

`unknown`: semelhante ao `any` porém não desabilita a verificação estática.\
No entanto, o `unknown` é mais seguro do que o `any`, pois **não é possível realizar operações arbitrárias sobre ele sem primeiro fazer uma verificação de tipo ou conversão explícita**.\
É útil quando você recebe valores de origens externas ou quando não tem certeza sobre o tipo de dado que será manipulado, mas deseja garantir a segurança de tipos em seu código.
```typescript
let valorDesconhecido: unknown = 10;

// Para usar o valor desconhecido de forma segura, é necessário verificar e converter o tipo.
if (typeof valorDesconhecido === "number") {
    let numero: number = valorDesconhecido;
    console.log(numero); // Agora você pode usar 'numero' com segurança
}
```

`never`: representa um valor que nunca ocorre.\
É usado principalmente em situações em que uma função nunca retorna (lança uma exceção ou entra em um loop infinito) ou em que uma variável nunca pode ter um valor válido. É útil para indicar situações impossíveis.
```typescript
function lancaErro(mensagem: string): never {
    throw new Error(mensagem);
}

function loopInfinito(): never {
    while (true) {}
}
```

`symbol`\
o tipo `symbol` representa um tipo primitivo único e imutável frequentemente usado para criar identificadores únicos em objetos. Cada valor `symbol` é exclusivo e não pode ser igual a outro `symbol`, tornando-o ideal para chaves de propriedades de objetos.
```typescript
const chave1: symbol = Symbol("chave-única");
const chave2: symbol = Symbol("chave-única"); // Chaves diferentes
let objeto: { [chave1]: string } = {};
objeto[chave1] = "Valor associado à chave1";
```
`undefined`\
Uma variável foi declarada, mas **não recebeu valor**. Também é o valor de retorno **padrão** de funções que não retornam nada.
```typescript
let nome: string | undefined;
console.log(nome); // undefined

function teste() {}
console.log(teste()); // undefined
```
`null`\
Um valor foi **explicitamente definido como vazio ou nulo**.
```typescript
let idade: number | null = null;
```

```ts
undefined == null     // true (comparação solta)
undefined === null    // false (comparação estrita)

let nome: string | undefined; // aceita string ou undefined
let idade: number | null;     // aceita number ou null
```
Se usar `strictNullChecks` (ativado por padrão em projetos modernos), o compilador vai forçar você a tratar esses casos corretamente.
