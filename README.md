# Typescript Docs

Revisão baseada na documentações do site:
- [Handbook do site oficial](https://www.typescriptlang.org/docs/handbook/intro.html)
- [w3schools.com Typescript Tutorial](https://www.w3schools.com/typescript/index.php)

## Running Typescript on VSCode

Opção para não ter que usar o terminal e ficar realizando operações com `npx tsc`, pode usar o `ts-node` no `VSCode`

**Configurações mínimas**
- Crie uma pasta com o nome `app`, ou outro nome.
- Crie uma subpasta `src` e dentro um arquivo `index.ts` 
	- Coloque algum código javascript ou typescript nesse arquivo `index.ts`
- Rode o comando para criar o arquivo `tsconfig.json`
```bash
mkdir -p app/src app/dist
cd app
echo "console.log('Hello World at $(date)')"  >> src/index.ts;
npx tsc --init --rootDir src --outDir dist
ts-node src/index.ts
```
- Verifique as configurações do `tsconfig.json`
```ts
// tsconfig.json
{
  "compilerOptions": {
    "rootDir": "src",
    "outDir": "dist"
    // --- CONFIGURAÇÕES OPCIONAIS ---
    // "module": "nodenext",
    // "target": "esnext",
    // "types": ["node"],
    // "sourceMap": true,
    // "declaration": true,
    // "declarationMap": true,
    // "esModuleInterop": true,
    // "noUncheckedIndexedAccess": true,
    // "exactOptionalPropertyTypes": true,
    // "strict": true,
    // "verbatimModuleSyntax": true,
    // "isolatedModules": true,
    // "noUncheckedSideEffectImports": true,
    // "moduleDetection": "force",
    // "skipLibCheck": true
  }
  //"include": ["src/**/*"],
  //"exclude": ["src/**/*.spec.ts"]
}

```
- Instale as dependências de desenvolvimento no projeto
```bash
npm init -y
# dev
npm install -D typescript
npm install -D nodemon
npm install -D @types/node
npm install -D ts-node ts-node-dev
npm install -D rimraf
npm list --global --depth=0
```
- Inclua novos `script runners` do `package.json`
```js
{
  "name": "app",
  "version": "1.0.0",
  "description": "",
  "main": "index.js",
  "scripts": {
    "build": "rimraf ./dist && tsc",
    "start": "npm run build && node dist/index.js",
    "start:dev": "nodemon --exec ts-node src/index.ts --watch src --ext .ts",
    "start:debug": "nodemon --exec ts-node-dev --inspect=9229 --exit-child --respawn src/index.ts"
    "simple-run": "ts-node src/index.ts",
  },
  "keywords": [],
  "author": "",
  "license": "ISC",
  "type": "commonjs",
  "devDependencies": {
    "@types/node": "^24.7.0",
    "nodemon": "^3.1.10",
    "rimraf": "^6.0.1",
    "ts-node": "^10.9.2",
    "ts-node-dev": "^2.0.0",
    "typescript": "^5.9.3"
  }
}
```
- Teste os runner iniciando
```
npm run start
```
- Para `VSCode` é necessário criar um `.vscode/launch.json` 
	- Primeiro descubra onde esta instalado o `node` ou `ts-node`
		- `which npm node ts-node`
	- Seu runner pode reclamar que o Node.js não esta configurado no PATH, adicione, ou use as libs dentro dos `node_modules` do próprio projeto.
		- `PATH="/home/pc/.nvm/versions/node/v22.13.1/bin:$PATH"`
		- Ou utilize os módulos internos do projeto `node_modules/bin/npm. 
	
```js
{
  "version": "0.2.0",
  "configurations": [
    {
      "name": "ts-node integrated",
      "console": "integratedTerminal",
      "type": "node",
      "request": "launch",
      "cwd": "${workspaceFolder}/app", // if my_prog/app/src/index.ts
      "runtimeExecutable": "${workspaceFolder}/node_modules/.bin/ts-node",
      "args": ["src/index.ts", "--watch src", " --ext .ts"],
      "skipFiles": ["<node_internals>/**", "node_modules/**"]
    },
    {
      "name": "nodemon integrated",
      "console": "integratedTerminal",
      "type": "node",
      "request": "launch",
      "cwd": "${workspaceFolder}/app",
      "runtimeExecutable": "${workspaceFolder}/node_modules/.bin/nodemon",
      "runtimeArgs": ["--exec", "ts-node"],
      "args": ["src/index.ts", "--watch src", " --ext .ts"],
      "skipFiles": ["<node_internals>/**", "node_modules/**"]
    },
    {
      "name": "NPM launch",
      "type": "node-terminal",
      "request": "launch",
      "cwd": "${workspaceFolder}/app",
      "command": "npm run start",
      "presentation": {
        "reveal": "always",
        "panel": "new"
      }
    }
  ]
}
```

<br>

---



### Typescript Introduction 

What is TypeScript?\
TypeScript is a syntactic superset of JavaScript which adds **static typing**.

Why should I use TypeScript?
- Pode ser dificil entender qual tipo de dado esta sendo passado.
- typescript permite consulta a documentação direta no código, com check syntax.
- habilidade maior que reportar erros
- ts faz a checagem de tipo em tempo de compilação, not while running the code.

TypeScript is transpiled into JavaScript using a compiler.

Installing the compiler\
`npm install typescript --save-dev`

Access the compiler\
`npx tsc`

Configuring the compiler\
this creates a `tsconfig.json` file\
`npx tsc --init`

Simple example of config
```js
{  
  "include": ["src"],  
  "compilerOptions": {  
    "outDir": "./build"  
  }  
}
```

First typescript program
```ts
function greet(name: string): string {  
  return `Hello, ${name}!`;  
}  
  
const message: string = greet("World");  
console.log(message);
```
```sh
# compile
npx tsc hello.ts
# generates a hello.js
# run js
node hello.js
```

### TypeScript Simple Types

**BigInt (ES2020+)** [mozilla BigInt](https://developer.mozilla.org/pt-BR/docs/Web/JavaScript/Reference/Global_Objects/BigInt)

Em JavaScript, ele é criado usando um "n" no final do número (ex: `10n`) ou a função `BigInt()`.\
Quando testado com `typeof` , um `BigInt` vai devolver 'bigint':\
Representa números maior que 2^53

```ts
const bigNumber: bigint = 9007199254740991n;  

const outroNumeroGrande = BigInt(12345678901234567890); // with number
const numeroDeString = BigInt("12345678901234567890"); // with string
```

**`Symbol`** [official doc Symbols](https://www.typescriptlang.org/docs/handbook/symbols.html)
- tipo primitivo e imutável que cria um identificador único, nunca igual a outro, mesmo que tenha a mesma descrição.
- Símbolos são usados como chaves para propriedades de objetos, evitando conflitos de nome.
- Podem ser usados em tipos de união e para a criação de enums "imutáveis".

```ts
const meuSymbol = Symbol(); // Símbolo sem descrição
const outroSymbol = Symbol('uma descrição'); // Símbolo com descrição (apenas para depuração)
```

**Imutabilidade e Unicidade**: Cada símbolo é único e imutável.
```ts
    const s1 = Symbol();
    const s2 = Symbol();
    console.log(s1 === s2); // false
```

```ts
// Idéia basica
const meuObjeto = {
	[Symbol('id')]: 123
};

const sym = Symbol();
let obj = {
	[sym]: "value",
};
console.log(obj[sym]); // "value"
```

**Para que servem os Symbols?**\
Símbolos são usados para criar propriedades "privadas" que não podem ser acessadas por reflexão padrão, como `Object.keys()` ou `JSON.stringify()`, e não interferem com as propriedades já existentes em um objeto.

`unique symbol` is a `subtype` of `symbol`: Usado internamente na construção da linguagem e do transpilador.

`built-in symbols`. Classe tem funções pré-definidas como `Symbols.match`, `Symbols.iterator`, `Symbols.replace`, entre várias outras.

<br>

### TypeScript Explicit Types and Inference

Function with **Explicit Types**
```ts
// Function with explicit parameter and return types  
function greet(name: string): string {  
return `Hello, ${name}!`;  
}  
  
// TypeScript will ensure you pass the correct argument type  
greet("Alice"); // OK  
greet(42);     // Error: Argument of type '42' is not assignable to parameter of type 'string'

let username: string = "alice";  
username = 42; // Error: Type 'number' is not assignable to type 'string'
```
Use **Type Inference** when the type is obvious from the context\
When the type is obvious from the context
```typescript
/ TypeScript infers 'string'  
let username = "alice";  
  
// TypeScript infers 'number'  
let score = 100;  
  
// TypeScript infers 'boolean[]'  
let flags = [true, false, true];  
  
// TypeScript infers return type as 'number'  
function add(a: number, b: number) {  
	return a + b;  
}
```
Watch Out: While type inference is convenient, being explicit with types can make your code more maintainable, especially in larger codebase  or public APIs.

 JavaScript vs TypeScript\
 In JavaScript, the following code would run without errors, potentially causing bugs:
```ts
 // This is valid JavaScript but can lead to bugs
function add(a, b) {
return a + b;
}

console.log(add("5", 3)); // Returns "53" (string concatenation)
```
TypeScript catches these issues at compile time:
```js
function add(a: number, b: number): number {  
return a + b;  
}  
  
console.log(add("5", 3)); // Error: Argument of type 'string' is not assignable to parameter of type 'number'
```

Com arrays ts pode inferir seu tipo na inicialização, baseado em seus valores
```ts
const numbers = [1, 2, 3]; // inferred to type number[]  
numbers.push(4); // no error  
// comment line below out to see the successful assignment  
numbers.push("2"); // Error: Argument of type 'string' is not assignable to parameter of type 'number'.  
let head: number = numbers[0]; // no error
```


### TypeScript Special Types

**`any`** - diz ao compilar para pular a verificação de tipo de uma variável. Evite pois ignora alguns recursos de segurança de tipo do Typescript.

Diz pule a verificação de tipo, ignorando recursos de segurança. Pode se usar quando o recurso é dinâmico, desconhecido e será `re-tipado` posteriormente.

```typescript
let v: any = true;
v = "any type" as string; // ok no error
v = 1.234; // ok re-assing, no error if use "any" type
console.log(Math.round(v)); // ok no error // shows 1

//Incluindo o any, ele mostra apenas o resuldo "Nan" sem apresentar qualquer erro,
// quando fazer Math.round em cima de uma string

// Removendo o any any ele vai mostrar este erro ao rodar ou compilar o arquivo
prog.ts(3,1): error TS2322: Type 'string' is not assignable to type 'boolean'.
prog.ts(8,24): error TS2345: Argument of type 'boolean' is not assignable to parameter of type 'number'.
```

`"strict": true`  habilita o `noImplicitAny`: compilador obriga a `tipar`, e não vai incluir um any automaticamente para você.\
`"noImplicitAny": true.`  Isso fará com que o compilador do TypeScript emita um erro sempre que não conseguir inferir um tipo e precisar usar `any` implicitamente.

<br>

**`unknown`** - introduzido como uma alternativa segura para `any`.

**"Eu aceito esta entrada, mas este tipo não é confiável, recomendo verificar seu tipo antes de usar, `narrowing` (estreitamento) do tipo."**

Deve se verificar o tipo antes do uso de `unknown`, evitando erros em tempo de execução.

Você não pode chamar ou construir valores do tipo `unknown` sem antes verificar antecipadamente.
```ts
const valor: unknown = algumaFuncao();

// Erro: 'valor' is of type 'unknown'.
// valor(); 

if (typeof valor === 'function') {
  // Agora TypeScript sabe que 'valor' é uma função.
  valor(); 
}
```

```typescript
let w: unknown = 1; // one integer
w = "string"; // one string

// one function (re-atribuicao)
w = { runANonExistentMethod: () => {console.log("I think therefore I am");} }
as { runANonExistentMethod: () => void }

// usando uma verificacao de tipo segura
// se objecto chame a funcao, não um inteiro
if(typeof w === 'object' && w !== null) {
	(w as {runANonExistentMethod:Function})
	.runANonExistentMethod();
}
// vai mostrar a definição da última atribuição sem erro
// { runANonExistentMethod: [Function: runANonExistentMethod] }
console.log(w);

// Error when NOT USE `uknown`
prog.ts(2,1): error TS2322: Type 'string' is not assignable to type 'number'.
prog.ts(4,1): error TS2322: Type '{ runANonExistentMethod: () => void; }' is not assignable to type 'number'.
```

Quando usar `unknown`:
- Ao trabalhar com dados de fontes externas (APIs, entrada do usuário, etc.)
- Quando você deseja garantir a segurança do tipo e ainda permitir flexibilidade
- Ao migrar de JavaScript para TypeScript de forma segura

`type assertion`: **`as`** permite ignorar as verificações, anulando a segurança de tipo
```ts
const valor: unknown = () => console.log('Função chamada!');

// Usando 'as' para afirmar o tipo.
(valor as Function)();
```


**`never`** - tipo de valores que nunca ocorrem.

**Casos de uso comuns para `never`:**
- Funções que nunca retornam (sempre geram um erro ou entram em um loop infinito)
- Guardas de tipo que nunca passam na verificação de tipo
- Em proteções de tipo que nunca devem corresponder
- Verificação da exaustividade em sindicatos discriminados

```typescript
// função lança uma exceção sempre nunca terá um retorno.
function throwError(message: string): never {  
  throw new Error(message);  
}
```

**`undefined`** e **`null`**

**Pontos-chave sobre `undefined` e `null`:**
- `undefined`significa que uma variável foi declarada, mas não recebeu um valor
- `null`é uma atribuição explícita que não representa nenhum valor ou objeto, valor nulo.
- Com `strictNullChecks` habilitado, você deve manipular explicitamente esses tipos

**`? (undefined)`** -  Parâmetros e propriedades opcionais
```typescript
// Optional parameter (implicitly `string | undefined`)  
function greet(name?: string) {  
  return `Hello, ${name || 'stranger'}`;  
}  
  
// Optional property in an interface  
interface User {  
  name: string;  
  age?: number; // Same as `number | undefined` }
```

**`?? (undefined or null)`** - Coalescência (aglutinante) nula e encadeamento opcional (Optional chaining).
```typescript
// Nullish coalescing (??) - only uses default if value is null or undefined  
const value = input ?? 'default';  
  
// Optional chaining (?.) - safely access nested properties  
const street = user?.address?.street
```
Deve habilitar no tsconfig.json
```js
{  
  "compilerOptions": {  
    "strictNullChecks": true  
  }  
}
```

The **`readonly`** keyword can prevent arrays from being changed.
```typescript
const names: readonly string[] = ["Dylan"];
names.push("Jack"); // prog.ts(2,7): error TS2339: Property 'push' does not exist on type 'readonly string[]'.

// console.log(names); //[ 'Dylan' ]
```

### TypeScript Tuples

`tuple` - é uma matriz com comprimento e tipo pré-definidos.

Se inicializar em linha é permitido usar `readonly` igual uma matriz comum.
```ts
// define our tuple  
let ourTuple: [number, boolean, string];  
  
// initialize correctly  
ourTuple = [5, false, 'Coding God was here'];

// se tentar inicializar com um tipo diferente, 0 por false
prog.ts(5,16): error TS2322: Type 'number' is not assignable to type 'boolean'.
// logicamente o mesmo erro se alterarmos a ordem ou adicionarmos mais itens que o especificado.
prog.ts(5,1): error TS2322: Type '[number, false, string, number]' is not assignable to type '[number, boolean, string]'.
  Source has 4 element(s) but target allows only 3.
```
Tuplas nomeadas
```ts
const graph: [x: number, y: number] = [55.2, 41.3];
```
Tuplas desestruturantes
```ts
const graph: [number, number] = [55.2, 41.3];  
const [x, y] = graph;
```

### JavaScript Destructuring 🪓 [w3](https://www.w3schools.com/js/js_destructuring.asp)

Destructuring Assignment Syntax on **objects**

```typescript
// Create an Object
// A ordem das propriedades não importa  
const person = {  
  firstName: "John",  
  lastName: "Doe",  
  age: 50  
};  
  
// Destructuring
let {firstName, lastName : name} = person;
// Add default values
let {firstName, lastName, country = "US"} = person;
// With property alias
let {firstName, lastName : name} = person;
```

It can also unpack **arrays** and any other iterables:

```typescript
// Create an Array  
const fruits = ["Bananas", "Oranges", "Apples", "Mangos"];  
// Destructuring into variables 
let [var_banana, var_orange] = fruits;
// Skipping array values
let [var_banana,,,var_mangos] = fruits;
// Destructuring  
let {[0]:var_bananas ,[2]:var_apples} = fruits;
```

Strings and chars
```ts
// Create a String  
let name = "W3Schools";  
// Destructuring into chars
let [a1, a2, a3, a4, a5] = name;
```

#### `Rest Property (...newVar)` 

Você pode encerrar uma sintaxe de desestruturação com uma propriedade rest. Esta sintaxe armazenará todos os valores restantes em um novo array
```typescript
// Create an Array  
const numbers = [10, 20, 30, 40, 50, 60, 70];  
  
// Destructuring  
const [a,b, ...o_restante] = numbers
```

Map (key, value)
```ts
// Create a Map  
const fruits = new Map([  
  ["apples", 500],  
  ["bananas", 300],  
  ["oranges", 200]  
]);  
  
// Destructuring  
let text = "";  
for (const [key, value] of fruits) {  
  text += key + " is " + value;  
}
```

Swapping Javascript Variables
```ts
let firstName = "John";  
let lastName = "Doe";  
  
// Destructuring  
[firstName, lastName] = [lastName, firstName];
```

### TypeScript Object Types

#### 🪓 Javascript Object Types

Objects are collections of **key-value pairs**, where each key (known as **property names**) has a value, inside curly braces { }:

You should declare objects with the `const` keyword. Pode criar novos objetos mas não alterá-los na base estrutural do mesmo.

Pode usar `Object()`, mas não é necessário explicitá-lo.
```ts
// Create an Object  
const person = new Object({  
  firstName: "John",  
  lastName : "Doe",  
  id       : 5566,  
  fullName : function() {
    //`this` refers to the **person object**:
    return this.firstName + " " + this.lastName;  
  }
});

// Create an Object  
person = {}; // 
// prog.ts(13,1): error TS2588: Cannot assign to 'person' because it is a constant.
```
You can access object properties in two ways:
```ts
objectName.propertyName
objectName["propertyName"]
```
 Constructor functions
```ts
 function Person(first, last, age, eye) {  
  this.firstName = first;  
  this.lastName = last;  
  this.age = age;  
  this.eyeColor = eye;  
}
//In the constructor function, `this` has no value, but will become when object is created.
//Não incluir o this gera um `undefined`, ele é obrig.
```

#### Diferença entre `let` e `const` em JS

A diferença principal é que
- let declara variáveis que podem ter o seu valor alterado (reatribuídas)
- const declara constantes que não podem ser reatribuídas após a sua inicialização. 
- let e const têm **escopo de bloco**, o que significa que elas são acessíveis apenas dentro do bloco de código onde foram declaradas
- `var` tem **escopo de função** (ou global), o que pode levar a comportamentos inesperados e erros. As convenções modernas recomendam evitar var e preferir let e const. 


#### Typescript Object Types

```ts
const car: { type: string, mileage?: number } = {
  type: "Toyota",  
};  
car.mileage = 2000;

// Error Se não colocar o `?` que indica opcional.
// Error: Property 'mileage' is missing in type '{ type: string; }' but required in type '{ type: string; mileage: number; }'.  
```

#### Index Signatures

**Assinaturas de índice (index signatures)** em TypeScript servem para definir **tipos de objetos cujas chaves NÃO são conhecidas antecipadamente**, mas seguem um padrão.

**Index signatures** podem ser expressas em **utility types** como **`Record<string, number>`** .

O tipo `Record<string, number>` faz a mesma coisa, é apenas uma **forma utilitária** de declarar o mesmo padrão **(mais conciso e idiomático).**

**Ambos servem para representar dicionários (maps) de chave/valor,** úteis quando não há lista fixa de propriedades — por exemplo, um objeto que guarda configurações dinâmicas, contadores, cache etc.

Com assinaturas de índice
```ts
type Pontuacao = {
  [chave: string]: number;
};
const pontos: Pontuacao = {
  alice: 10,
  bob: 15,
  carol: 20
  // ativo: true // erro: boolean não é number
};
```
Com Record
```ts
type Pontuacao = Record<string, number>;
```

Usando a forma literal de escrever uma assinatura de índice direto na declaração da variável, **sem precisar criar um type ou interface.** Essa forma é útil quando o tipo é usado **uma única vez**. Se você for reutilizar o mesmo formato em vários lugares, o ideal é declarar um tipo separado.
```ts
// Ele aceita qualquer chave do tipo string
// e tb qualquer valor number
const nameAgeMap: { [meu_indice: string]: number } = {};
nameAgeMap.Jack = 25; // ok
nameAgeMap.Doe = 50; // ok
console.log(nameAgeMap); //{ Jack: 25, Doe: 50 }

// Using Type
type NameAgeMap = { [index: string]: number };
const map1: NameAgeMap = {};
const map2: NameAgeMap = {};
```

Outros exemplos:
```ts
const precos: { [produto: string]: number } = {};
precos["banana"] = 4.5;
precos["laranja"] = 3.8;

const contador: { [palavra: string]: number } = {};
contador["typescript"] = 1;
contador["javascript"] = 3;
```

Comportamento com chaves `number`\
em JavaScript, **todas as chaves de objetos são convertidas para string** internamente.\
Por isso, no TypeScript, a assinatura `[key: number]` é **quase idêntica** a `[key: string]`.\
A diferença é mais **semântica** — você está dizendo: _“minhas chaves são números lógicos, mesmo que internamente virem strings.”_
```ts
// A chave deve ser um número. O valor deve ser uma string.
const idToNameMap: { [id: number]: string } = {};

idToNameMap[1] = "Rodrigo";
idToNameMap[2] = "Ana";

//Então `idToNameMap[1]` e `idToNameMap["1"]` são exatamente a mesma coisa.
console.log(Object.keys(idToNameMap)); // ["1", "2"]


```
Agora, se você quiser realmente **usar números como índices sem conversão para string**, deve usar um **array** ou um **Map**:

**Vantagens de `Map`:**
- As chaves **realmente são números** (sem conversão). (Record são string)
- Mantém **ordem de inserção** sempre. (Record preserva mas não garante!)
- Permite **qualquer tipo de chave** (inclusive objetos, funções, etc.). 
- Métodos utilitários (`.set`, `.get`, `.has`, `.delete`, `.clear`) mais robustos
- Desvantagem levemente mais pesado que um objeto puro (internamente é uma estrutura hash completa).
```ts
// arrays
const nomes = ["Rodrigo", "Ana"]; // índice numérico real
console.log(nomes[0]); // "Rodrigo"

// Map
// `Map` As chaves **realmente são números** , sem conversão implícita.
const mapa = new Map<number, string>();
mapa.set(1, "Rodrigo");
mapa.set(2, "Ana");

```
 
 Para converter entre os dois formatos basta fazer:
```ts
const obj = Object.fromEntries(idToNameMap); // Map -> Object
const map = new Map(Object.entries(obj));    // Object -> Map
// Essa conversão é útil quando você quer guardar o `Map` em JSON e depois restaurar.
```

**Resumo:** 
```ts
// Forma literal
const filmes: { [x:type]:y } = {}
const filmes: { [estilo:string]: string } = {}
filmes['romance'] = "Uma linha mulher"

// Com Type + literal
type Filme = { [estilo:string]: string };
const filmes: Filme = { acao: "Exterminador do Futuro"}

// Com type + Record
type Filme = Record<string, string>;
const filmes: Filme = { suspense: "O ultimo Passageiro"}

// Somente Record
const filmes: Record<string, number> = { 'infantil': "Gato Galatico" };
```


### TypeScript Enums

Enums come in two flavors string and numeric.
Technically, you can mix and match string and numeric enum values, but it is recommended not to do so.

**Numeric Enums - Default**\
Por padrão, as enumerações inicializarão o primeiro valor como 0 e adicionarão 1 a cada valor adicional:
```ts
enum CardinalDirections {
  North = 1, //initialized!
  East,
  South,
  West
};
            
let currentDirection = CardinalDirections.North;
console.log(currentDirection); // ok show number 1

currentDirection = 2;
console.log(currentDirection); // ok show number 2

// currentDirection = 0; // error, enum initate on 1 not zero
// prog.ts(11,1): error TS2322: Type '0' is not assignable to type 'CardinalDirections'.
```

Good Example
```ts
enum StatusCodes {  
  NotFound = 404,  
  Success = 200,  
  Accepted = 202,  
  BadRequest = 400  
}  
// logs 404  
console.log(StatusCodes.NotFound);  
// logs 200  
console.log(StatusCodes.Success);


enum CardinalDirections {  
  North = 'North',  
  East = "East",  
  South = "South",  
  West = "West"  
};
// logs "North"  
console.log(CardinalDirections.North);
```

### TypeScript Type Aliases and Interfaces

#### Type Aliases
Assim como temos number, float, podemos **criar um tipo customizado com type**, útil para objetos estruturados em OO.
- Use `type` for unions, intersections, and primitives.
```ts
type CarYear = number  
type CarType = string  
type CarModel = string  
type Car = {  
  year: CarYear,  
  type: CarType,  
  model: CarModel  
}  
  
const carYear: CarYear = 2001  
const carType: CarType = "Toyota"  
const carModel: CarModel = "Corolla"  
const car: Car = {  
  year: carYear,  
  type: carType,  
  model: carModel  
};

console.log(car); // { year: 2001, type: 'Toyota', model: 'Corolla' }
```

##### Union com interseção de Tipos
Limita o tipo a configuração específica declarada.
```ts
type Animal = { name: string }; // { name: "galinha"}
type Bear = Animal & { honey: boolean };
const bear: Bear = { name: "Puffy", honey: false };  
   
type Status = "success" | "error";  
let response: Status = "success";
```

#### Interfaces
Idem type, except, interfaces **only** apply to `objects` types!
```ts
// Try creating a new interface using it below
interface Rectangle {
  height: number,
  width: number
};
const rectangle: Rectangle = {
  height: 20,
  width: 10
};
console.log(rectangle); // { height: 20, width: 10 }

// error string is not object types
// interface Status = "success" | "error";
// prog.ts(16,18): error TS1005: '{' expected.
```

##### Merging interfaces, **adding new atributes**.
```ts
interface Animal { name: string; } // ok
interface Animal { age: number; } // ok other line
const dog: Animal = { name: "Fido", age: 5 }; // using
console.log(dog) // { name: 'Fido', age: 5 }
```

#### Extending Interfaces

Estender uma interface significa criar uma nova interface com as **mesmas propriedades da original, além de algo novo**.

**Types and Interface, both can be extended!**, but interfaces support declaration merging.
- **Recommendation:** Use `interface` for objects, `type` for everything else.
```ts
interface Rectangle {
  height: number,
  width: number
}

interface ColoredRectangle extends Rectangle { // extends, get other props
  color: string
}

const coloredRectangle: ColoredRectangle = {
  height: 20,
  width: 10,
  color: "red"
};
```

### TypeScript Union Types
#### Union | Or

**Necessário checar o tipo antecipadamente ao usar `|`**.\
Este código não compila, o compilador vai relatar um erro se tentar acessar na marra sem verificar o tipo antecipadamente.
```ts
function printStatusCode(code: string | number) {
  console.log(`My status code is ${code.toUpperCase()}.`) 
}

prog.ts(2,51): error TS2339: Property 'toUpperCase' does not exist on type 'string | number'. Property 'toUpperCase' does not exist on type 'number'.
```

### Typescript Functions
```ts
function printHello(): void {
  console.log('Hello!');
  return true; // error return with void!
}
// prog.ts(3,3): error TS2322: Type 'boolean' is not assignable to type 'void'.
```
Neste caso se omitir `|| 0`, o código compila ok, porém o resultado será `Nan`
```ts
// the `?` operator here marks parameter `c` as optional  
function add(a: number, b: number, c?: number) {  
  return a + b + (c || 0);   
}
```
Default parameters
```ts
function pow(value: number, exponent: number = 10) {  
  return value ** exponent;  
}
```
Named parameters `{name:value}`
```ts
function divide(
	{ dividend, divisor }: { dividend: number, divisor: number } // {name:value}
) {
  return dividend / divisor;
}
console.log(divide({dividend: 10, divisor: 2})); // 5
```
Rest parameters: "O restante dos valores"
```ts
function add(a: number, b: number, ...rest: number[]) {
  return a + b + rest.reduce((p, c) => p + c, 0);
}
console.log(add(10,10,10,10,10)); // 50
```
Functions with arrow functions and type alias
```ts
type Negativar = (positivo: number) => number;

// type virou um tipo para uma arrow functions
const NegaFuncao: Negativar = (positivo) => positivo * -1;

console.log(NegaFuncao(10)); // -10
```

### Typescript Casting
#### Casting with `as`
`as` permite mudar o tipo da variável ao usá-la.
```ts
let x: unknown = 'hello'; // unknown type
console.log((x as string).length); // redefine para string antes de usar!

let x: unknown = 'hello';
console.log(x as number); // estranho mas printa 'hello' ignorando 'as number'

// 'as' não converte o valor de fato, por isso 4 não se torna "4"!
let x: unknown = 4;  
console.log((x as string).length); // prints undefined since numbers don't have a length
```
**Que inteligente !**
Compilar sabe que 4 convertido em string não é apenas "4" e sim deveria **"quatro"**, não realizando a conversão. 🥳
```ts
console.log(4 as string);

prog.ts(1,13): error TS2352: Conversion of type 'number' to type 'string' may be a mistake because neither type sufficiently overlaps with the other. If this was intentional, convert the expression to 'unknown' first.
```


### Typescript Classes
#### Members visibility
There are three main visibility modifiers in TypeScript.
- `public` - (default) allows access to the class member from anywhere
- `private` - only allows access to the class member from within the class
- `protected` - allows access to the class member from itself and any classes that inherit it, which is covered in the inheritance section below

#### `this` refers to what? [js this](https://www.w3schools.com/js/js_this.asp)
Perguntinha de entrevista mal intencionada ou de teste de quadro negro.

The `this` keyword refers to **different objects** depending on how it is used:

|                                                                                          |
| ---------------------------------------------------------------------------------------- |
| **Alone**, `this` refers to the **global object**.                                       |
| In a **function**, `this` refers to the **global object**.                               |
| In a function, in **strict mode**, `this` is `undefined`.                                |
| In an **object method**, `this` refers to the **object**.                                |
| In **an event**, `this` refers to the **element** that received the event.               |
| Methods like ***`call()`, `apply()`, and `bind()`*** can refer `this` to **any object**. |
```js
// Create an object:
const person = {
  firstName  : "John",
  lastName   : "Doe",
  id     : 5566,
  myFunction : function() {
    return this;
  }
};
// Display data from the object:
document.getElementById("demo").innerHTML = person.myFunction().id; // 5566
```

#### Inheritance (implements)
```typescript
interface Shape {  
  getArea: () => number;  
}  
  
class Rectangle implements Shape {  // can implements multiple interfaces
  public constructor(protected readonly width: number, protected readonly height: number) {}  
  
  public getArea(): number {  
    return this.width * this.height;  
  }  
}
```

#### Inheritance (extends)
```typescript
interface Shape {  
  getArea: () => number;  
}  
  
class Rectangle implements Shape {  
  public constructor(protected readonly width: number, protected readonly height: number) {}  
  
  public getArea(): number {  
    return this.width * this.height;  
  }  
}  
  
class Square extends Rectangle {  
  public constructor(width: number) {  
    super(width, width);  
  }    
  // getArea gets inherited from Rectangle  
}
```

#### Override keyword

By default the `override` keyword is **optional** when overriding a method, and only helps to prevent accidentally overriding a method that does not exist.

Use the setting `noImplicitOverride` to force it to be used when overriding.

```typescript
class Rectangle implements Shape {  
  public toString(): string {  
    return `Rectangle[width=${this.width}, height=${this.height}]`;  
  }  
}  
// ...  ommit lines
class Square extends Rectangle {  
  
  // this toString replaces the toString from Rectangle  
  public override toString(): string {  
    return `Square[width=${this.width}]`;  
  }  
}
```

#### Abstract classes (extends)
Classes servem de base e não obrigam a implementar todos os métodos assim como interfaces.

Classes abstratas não podem ser instanciadas diretamente, pois não têm todos os seus membros implementados.

```typescript
abstract class Polygon {  
  public abstract getArea(): number;  
  
  public toString(): string {  
    return `Polygon[area=${this.getArea()}]`;  
  }  
}  
  
class Rectangle extends Polygon {  
  public constructor(protected readonly width: number, protected readonly height: number) {  
    super();  
  }  
  
  public getArea(): number {  
    return this.width * this.height;  
  }  
}
```

<br />


### Javascript métodos pré-definidos 🪓  [js built-in functions](https://www.w3schools.com/js/js_function_call.asp)

#### call (invoke a method)
call permite usar um objeto que pertence a outro objeto
```ts
const person = {
  namedFunction: function() {
    return this.firstName + " " + this.lastName;
  }
}
const televisao = {
  firstName:"Silvio",
  lastName: "Santos"
}

// passa o objeto `televisao`, para a funcao dentro de person.
person.namedFunction.call(televisao); // Silvio Santos
```
With parameters
```javascript
const person = {
  fullName: function(city, country) {
    return this.firstName + " " + this.lastName + " from " + city + " in " + country + ".";
  }
}
const person1 = {
  firstName:"John",
  lastName: "Doe"
}

person.fullName.call(person1, "Oslo", "Norway"); // John Doe from Oslo in Norway.
```

##### apply (array parameters)
O método apply() é muito útil se você quiser usar um array em vez de uma lista de argumentos.

Difference between call and apply.\
O método `call()` recebe argumentos **separadamente**.\
O método `apply()` recebe argumentos **como um array**.
```javascript
// Mesmo código de call porém com array.
person.fullName.call(person1, "Oslo", "Norway"); // John Doe from Oslo in Norway.
```

Muito útil também quando precisa realizar alguma operação com arrays que não contém um método específico como max()
```javascript
// using lists
Math.max(1,2,3);  // Will return 3

// Using arrays
Math.max.apply(null, [1,2,3]); // Will also return 3
// null poderia ser qualquer coisa, 0, Math, "", etc...
```
No modo estrito do JavaScript, se o primeiro argumento do método `apply()` "null" não for um objeto, ele se torna o proprietário (objeto) da função invocada. No modo "não estrito", ele se torna o objeto global.

##### bind (pegar emprestado)

```javascript
const person = {  
  firstName:"John",  
  lastName: "Doe",  
  fullName: function () {  
    return this.firstName + " " + this.lastName;  
  }  
}  
  
const member = {  
  firstName:"Hege",  
  lastName: "Nilsen",  
}  

// call and apply return value, bind return a function.
let fullName = person.fullName.bind(member); // return a function!
console.log(fullName());
```

Remember:\
In an event, `this` refers to the element that received the event.

Quando a função é usada como `callback` o  `this` perde sua referência.
```javascript
const person = {  
  firstName:"John",  
  lastName: "Doe",  
  display: function () {  
    let x = document.getElementById("demo");  
    x.innerHTML = this.firstName + " " + this.lastName;  
  }  
}  
  
let display = person.display.bind(person); // sem bind retorna undefined undefined  
// display é usada como callback para o evento e não acesso direto a função.
setTimeout(display, 3000);
```


##### JavaScript Closures
function returns a function

Uma `closure` é uma função que tem acesso ao escopo pai, depois que a função pai foi fechada (protegida pelo escopo).
```javascript
function myCounter() {
  let counter = 0; // private variables
  return function() {
	counter++;  // protected by the scope of myCounter function.
    return counter;
  };
}

const add = myCounter();

function myFunction(){
  document.getElementById("demo").innerHTML = add();
}
```
Old JavaScript code will often contain closures, but modern JavaScript will not use closures as frequently as before. Old JS use to simulate block-scoping before let and const existed.

### Typescript Basic Generics

Os genéricos permitem a criação de 'variáveis ​​de tipo' que podem ser usadas para criar classes, funções e aliases de tipo que não precisam definir explicitamente os tipos que usam.\
Os genéricos facilitam a escrita de código reutilizável.

Functions
```typescript
function createPair<S, T>(v1: S, v2: T): [S, T] | void {
  return [v1, v2];
}

console.log(createPair<string, number>('hello', 42)); // ['hello', 42]
```
Classes
```ts
// tipo T será definido em tempo de execução.
// opcionalmente atribui = string como valor padrão
class NamedValue<T = string> {
  private _value: T | undefined;

  constructor(private name: string) {}

  public setValue(value: T) {
    this._value = value;
  }

  public getValue(): T | undefined {
    return this._value;
  }

  public toString(): string {
    return `${this.name}: ${this._value}`;
  }
}
      
const value = new NamedValue<number>('myNumber');

value.setValue(10);

console.log(value.toString()); // myNumber: 10
```
Type Aliases
```ts
// tipo indefinido na declaração
type Wrapped<T> = { value: T };  

// Obrigatório dizer o tipo na implementação.
const wrappedValue: Wrapped<number> = { value: 10 };
```
Extends (permit multiple types)
```ts
function createLoggedPair<S extends string | number, T extends string | number>(v1: S, v2: T): [S, T] {
  console.log(`creating pair: v1='${v1}', v2='${v2}'`);
  return [v1, v2];
}

console.log(createLoggedPair("one", 1)) // ok ['one', 1]
console.log(createLoggedPair("one", "one")) // ok ['one', 'one']
console.log(createLoggedPair(1, 1)) // ok [1, 1]
// console.log(createLoggedPair(1, true)) // error: 'boolean' is not assignable to parameter of type 'string | number'.
```

### Typescript Utility Types or Mapped Types

Tipos utilitários servem para alterar o retorno de um objeto.

Alteram o retorno quando: 
- `Partial`: Tornando todas opcionais `?`
- `Required`: Tornando todas obrigatórios `ignorando ?`
- `Record`: Retorna o tipo no formato `chave:valor` *(usado em objetos)*
- `Omit`: Omite, remove **chaves**
- `Exclude`: Omite, remove **tipos**
- `Pick`: Omite chaves especificadas, retornando o restante que sobrou.
- `ReturnType`: Retorna o **tipo de returno**
- `Parameters`: Retorna o **tipo dos parâmetros**
- `Readonly`: Evita que o tipo de retorno seja alterado.

#### Partial
`Parcial` altera **todas as propriedades** de um objeto para que **sejam opcionais**.
```ts
interface Point {
  x: number;
  y: number;
}
            
let pointPart: Partial<Point> = {}; // `Partial` allows x and y to be optional
pointPart.x = 10;

console.log(pointPart);

```
#### Required
**Oposto de** `Partial`.\
Torna obrigatório até os atributos marcados com `?`
```ts
interface Car {
  make: string;
  model: string;
  mileage?: number;
}
            
let myCar: Required<Car> = {
  make: 'Ford',
  model: 'Focus',
  mileage: 12000 // `Required` forces mileage to be defined
};

console.log(myCar);

// Error if not defined !
prog.ts(7,5): error TS2741: Property 'mileage' is missing in type '{ make: string; model: string; }' but required in type 'Required<Car>'.
```
#### Record
`Record` ou Registro é um atalho para definir **um tipo de objeto com um tipo de chave e um tipo de valor específicos**.

`Record<string, number>` is equivalent to `{ [key: string]: number }`
```ts
const nameAgeMap: Record<string, number> = {
  'Alice': 21, 'Bob': 25
};
// o mesmo que !
const nameAgeMap: {[key:string]: number} = {
  'Alice': 21, 'Bob': 25
};

console.log(nameAgeMap); // { Alice: 21, Bob: 25 }
```

#### Omit (omite chaves)
`Omit` remove chaves de um objeto
```ts
interface Person {
  name: string;
  age: number;
  location?: string;
}
    
const bob: Omit<Person, 'age' | 'location'> = {
  name: 'Bob'
  // age: 21 // prog.ts(9,3): error TS2353: Object literal may only specify known properties, and 'age' does not exist in type 'Omit<Person, "age" | "location">'.
};

console.log(bob); // { name: 'Bob' }
```

#### Exclude (omite tipos)
`Exclude` removes types from a union.
```ts

type Primitive = string | number | boolean;

const value: Exclude<Primitive, string> = true;
// a string cannot be used here since Exclude removed it from the type.

console.log(typeof value); // boolean
```

#### Pick (pegue apenas este campos)
`Pick` remove todas as chaves, exceto as especificadas, de um tipo de objeto.
```ts
interface Person {
  name: string;
  age: number;
  location?: string;
}
            
const bob: Pick<Person, 'name'> = {
  name: 'Bob'
  // age: 21 // error prog.ts(9,3): error TS2353: Object literal may only specify known properties, and 'age' does not exist in type 'Pick<Person, "name">'.
};

console.log(bob); // { name: 'Bob' } 
```

#### ReturnType
`ReturnType` extracts the return type of a function type.
```ts
type PointGenerator = () => { x: number; y: number; };

// tipo de retorno ex: void aqui será a função number, number.
const point: ReturnType<PointGenerator> = {
  x: 10,
  y: 20
};

console.log(point) // { x: 10, y: 20 }
```

#### Parameters
`Parameters` extrai os tipos de parâmetros de um tipo de função como uma matriz.
```ts
// entre parenteses são parametros
type PointPrinter = (p: { x: number; y: number; }) => void;
// parametros serão do tipo PointPrinter, acesse o primeiro elemento.
// [p: { x: number; y: number; }]
const point: Parameters<PointPrinter>[0] = {
  x: 10,
  y: 20
};

console.log(point); // { x: 10, y: 20 }
```
#### Readonly
significa que não podem ser modificadas depois que um valor é atribuído.

Tenha em mente que o TypeScript evitará isso em tempo de compilação, mas, em teoria, como ele é compilado para JavaScript, você ainda pode substituir uma propriedade somente leitura.

```ts
interface Person {
    name: string;
    age: number;
}

const person: Readonly<Person> = {
    name: "Dylan",
    age: 35,
};

person.name = 'Israel'; // prog.ts(11,8): error TS2540: Cannot assign to 'name' because it is a read-only property.
```

### Typescript Keyof

Usada para **extrair o tipo de chave** de um tipo de objeto.
#### keyof with explicit keys
Quando usado em um tipo de objeto com chaves explícitas (quase sempre é o caso)\
`keyof` cria um tipo de união com essas chaves.

`keyof` - retorne as chaves deste objeto ou classe
```ts
interface Person {
  name: string;
  age: number;
}

// `keyof Person` here creates a union type of "name" and "age", other strings will not be allowed
function printPersonProperty(person: Person, property: keyof Person) {
  console.log(`${property}: "${person[property]}"`);
}

let person = {
  name: "Max",
  age: 27
};

printPersonProperty(person, "name"); // name: "Max"
```
Veja que é extremamente útil quando queremos criar algo genérico exemplo
```ts
let output = {
  error: 402,
  message: "....."
};

// printa o retorno de loggs que pode ser uma analise profunda do error do output.
loggs(output, "error"); 
// ou seja acesse a função loggs (tem tratativas do erro)
// passe o objeto com erros do output
// retorne o campo erro deste objeto imenso.

```

#### `keyof` with index signatures
Aqui a chave não é explícita, vai existir somente na inicialização, diferente de "name" e "age" que foram definidos anteriormente e foram unidas por `union` usando `keyof`.
```ts
type JsonMap = { [key: string]: unknown };

// value: string, aceita apenas string no Json! troque por unknown se quiser generico.
function createStringPair(
	property: keyof JsonMap, value: unknown
  ): JsonMap {
  return { [property]: value };
}

console.log(JSON.stringify(createStringPair('greeting', 100))); //{"greeting":100}
```

Outro exemplo aqui removendo o atributo `-readonly` da interface. [mapped types](https://www.w3schools.com/typescript/typescript_mapped_types.php)
```ts
// Base interface with some readonly and optional properties  
interface Configuration {  
  readonly apiKey: string;  
  readonly apiUrl: string;  
  timeout?: number;  
  retries?: number;  
}  
  
// Remove readonly modifier from all properties  
type Mutable<T> = {  
  -readonly [P in keyof T]-?: T[P];  //return T[P] without -readonly and ?
};
  
// Pass interface
type MutableConfig = Mutable<Configuration>;
// Equivalent to: { apiKey: string; apiUrl: string; timeout: number; retries: number; }
```

Conditional Types: converta um tipo number para string **sem alterar a interface**.
```ts
// Base interface  
interface ApiResponse {  
  data: unknown;  
  status: number;  
  message: string;  
  timestamp: number;  
}  
  
// Conditional mapped type: Converta number para string.
type FormattedResponse<T> = {  
  [P in keyof T]: T[P] extends number ? string : T[P];  
};  
  
// Usage  
type FormattedApiResponse = FormattedResponse<ApiResponse>;  
// Equivalent to: { data: unknown; status: string; message: string; timestamp: string; }
```

### Typescript Null or Undefined

By default null and undefined handling is disabled, and can be enabled by setting `strictNullChecks` to true.

The rest of this page applies for when `strictNullChecks` is enabled.

#### Optional chaining
```ts
interface House {
  sqft: number;
  yard?: {
    sqft: number;
  };
}
            
function printYardSize(house: House) {
  //Withoud ? implies error: Cannot read properties of undefined, because yard is not initialized
  const yardSize = house.yard?.sqft;

  if (yardSize === undefined) {
    console.log('No yard');
  } else {
    console.log(`Yard is ${yardSize} sqft`);
  }
}
            
let home: House = {
  sqft: 500
};
            
printYardSize(home); // Prints 'No yard'
```

#### Nulish Coalescing
```ts
function printMileage(mileage: number | null | undefined) {
  console.log(`Mileage: ${mileage ?? 'Not Available'}`);
}
            
printMileage(null); // Prints 'Mileage: Not Available'
printMileage(undefined); // Prints 'Mileage: Not Available'
printMileage(0); // Prints 'Mileage: 0'
```

#### Null Assertion
O sistema de inferência do TypeScript não é perfeito. Há momentos em que faz sentido **ignorar a possibilidade** de um valor ser nulo ou indefinido.

```ts
function getValue(): string | undefined | null {
  if (Math.random() > 0.5) return "hello";
  if (Math.random() > 0.5) return null;
  return undefined;
}

let value = getValue();
console.log(value!.length); // compila, mas random pode gerar um valor maior que 0.5 e dar erro.

// Se remover totalmente '!', vemos o erro ao compilar.
// Cannot read properties of null (reading 'length')
```

[Doc Oficial - Non-null assertion operator !](https://www.typescriptlang.org/docs/handbook/release-notes/typescript-2-0.html#non-null-assertion-operator)

*pode ser usado para afirmar que seu operando **não é nulo e não é indefinido** em contextos onde o verificador de tipo não consegue concluir esse fato.*
```typescript
// Compiled with --strictNullChecks
function validateEntity(e?: Entity) {
	// Throw exception if e is null or invalid entity
}

function processEntity(e?: Entity) {
	validateEntity(e);
	let s = e!.name; // Assert that e is non-null and access name
}
```
**Obs:**  Tive bastante dificuldade em testar localmente, porque para compilar necessário iniciar com valores válidos e inválidos ao mesmo tempo.

### TypeScript 5.x Updates

O **TypeScript 5.0** foi lançado oficialmente em **16 de março de 2023**.

1 de agosto de 2025 foi lançada a versão estável do [5.9](https://devblogs.microsoft.com/typescript/announcing-typescript-5-9).

Atualmente a versão mais utilizada é a **4.x**, tenho instalado a **5.7**

#### Template Literal Types
```ts
type Color = "red" | "green" | "blue"; 
type HexColor<T extends Color> = `#${string}`;

// Usage
let myColor: HexColor<"blue"> = "#0000FF";

console.log(myColor)
```
#### Index Signature Labels
```ts
type DynamicObject = { [key: `dynamic_${string}`]: string };

// Usage: 
let obj: DynamicObject = { dynamic_key: "value" };

console.log(obj);
```


### TypeScript with Node.js
#### Simple
```ts
{
    "compilerOptions": {
    "target": "ES2020",
    "module": "commonjs",
    "outDir": "./dist",
    "rootDir": "./src", //keeps source (`src`) separate from build output (`dist`).
    "strict": true, //enables the safest type checking.
    "esModuleInterop": true,
    "skipLibCheck": true,
    "forceConsistentCasingInFileNames": true,
    "moduleResolution": "node",
    "resolveJsonModule": true,
    "sourceMap": true //generate maps for debugging compiled code.
  },
  "include": ["src/**/*"],
  "exclude": ["node_modules"]
}
```
**Warning:** Use `ts-node` and `nodemon` only for development.\
For production, compile with `tsc` and run Node on the JS output.
#### Node.js Project Structure
```ts
my-ts-node-app/  
  src/  
    server.ts  
    middleware/  
      auth.ts  
    entity/  
      User.ts  
    config/  
      database.ts  
  dist/  
  node_modules/  
  package.json  
  tsconfig.json
```

#### Express server
```ts
import express, { Request, Response, NextFunction } from 'express';  
import { json } from 'body-parser';  
  
interface User {  
  id: number;  
  username: string;  
  email: string;  
}  
  
// Initialize Express app  
const app = express();  
const PORT = process.env.PORT || 3000;  
  
// Middleware  
app.use(json());  
  
// In-memory database  
const users: User[] = [  
  { id: 1, username: 'user1', email: 'user1@example.com' },  
  { id: 2, username: 'user2', email: 'user2@example.com' }  
];  
  
// Routes  
app.get('/api/users', (req: Request, res: Response) => {  
  res.json(users);  
});  
  
app.get('/api/users/:id', (req: Request, res: Response) => {  
  const user = users.find(u => u.id === parseInt(req.params.id));  
  if (!user) return res.status(404).json({ message: 'User not found' });  
  res.json(user);  
});  
  
app.post('/api/users', (req: Request, res: Response) => {  
  const { username, email } = req.body;  
   
  if (!username || !email) {  
    return res.status(400).json({ message: 'Username and email are required' });  
  }  
   
  const newUser: User = {  
    id: users.length + 1,  
    username,  
    email  
  };  
   
  users.push(newUser);  
  res.status(201).json(newUser);  
});  
  
// Error handling middleware  
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {  
  console.error(err.stack);  
  res.status(500).json({ message: 'Something went wrong!' });  
});  
  
// Start server  
app.listen(PORT, () => {  
  console.log(`Server is running on http://localhost:${PORT}`);  
});
```
#### Development workflow
```ts
{  
  "scripts": {  
    "build": "tsc",  
    "start": "node dist/server.js",  
    "dev": "nodemon --exec ts-node src/server.ts",  
    "watch": "tsc -w",  
    "test": "jest --config jest.config.js"  
  }  
}
```
#### Debugging with Source Maps
With `sourceMap` enabled in `tsconfig.json`, you can debug compiled code and map back to your `.ts` files.
```bash
node --enable-source-maps dist/server.js
```

#### Best Practices
- Always define types for function parameters and return values
- Use interfaces for object shapes
- Enable strict mode in tsconfig.json
- Use type guards for runtime type checking
- Leverage TypeScript's utility types (Partial, Pick, Omit, etc.)
- Keep your type definitions in .d.ts files
- Use enums or const assertions for fixed sets of values
- Document complex types with JSDoc comments
- Prefer environment variables for secrets and config; validate them at startup.
- Use `ts-node`/`nodemon` only in dev; compile for prod.
- Consider ESLint + Prettier with `@typescript-eslint` for consistent code quality.



### Typescript Tools
#### ESLint
```bash
# Install ESLint with TypeScript support  
npm install --save-dev eslint @typescript-eslint/parser @typescript-eslint/eslint-plugin
```
Configuration
```ts
// .eslintrc.json  
{  
  "root": true,  
  "parser": "@typescript-eslint/parser",  
  "plugins": ["@typescript-eslint"],  
  "extends": [  
    "eslint:recommended",  
    "plugin:@typescript-eslint/recommended",  
    "plugin:@typescript-eslint/recommended-requiring-type-checking"  
  ],  
  "parserOptions": {  
    "project": "./tsconfig.json",  
    "ecmaVersion": 2020,  
    "sourceType": "module"  
  },  
  "rules": {  
    "@typescript-eslint/explicit-function-return-type": "warn",  
    "@typescript-eslint/no-explicit-any": "warn",  
    "@typescript-eslint/no-unused-vars": ["error", { "argsIgnorePattern": "^_" }]  
  }  
}
```

**NPM Scripts** - Add scripts to run linting and a type-only check.\
Use `lint:fix` to auto-fix simple issues.
```ts
// package.json  
{  
  "scripts": {  
    "lint": "eslint . --ext .ts,.tsx",  
    "lint:fix": "eslint . --ext .ts,.tsx --fix",  
    "type-check": "tsc --noEmit"  
  }  
}
```
#### Prettier
```bash
# Install Prettier and related packages  
npm install --save-dev prettier eslint-config-prettier eslint-plugin-prettier
```
```bash
// .prettierrc  
{  
  "semi": true,  
  "singleQuote": true,  
  "tabWidth": 2,  
  "printWidth": 100,  
  "trailingComma": "es5",  
  "bracketSpacing": true,  
  "arrowParens": "avoid"  
}  
  
// .prettierignore  
node_modules  
build  
dist  
.next  
.vscode
```

**Integrate with ESLint**\
Extend `plugin:prettier/recommended` so formatting problems are reported as ESLint issues.
```ts
npm install --save-dev eslint-config-prettier eslint-plugin-prettier  
// In your .eslintrc.js or .eslintrc.json, add:  
{  
  "extends": ["plugin:prettier/recommended"]  
}
```

The optional `baseUrl` and `paths` help with absolute imports like `@/components/Button`.
```ts
// tsconfig.json  
{  
  "compilerOptions": {  
    "paths": {  
      "@/*": ["src/*"]  
    }  
  },
}
```

#### VSCode Debugging
```ts
// .vscode/launch.json  
{  
  "version": "0.2.0",  
  "configurations": [  
    {  
      "type": "chrome",  
      "request": "launch",  
      "name": "Launch Chrome against localhost",  
      "url": "http://localhost:3000",  
      "webRoot": "${workspaceFolder}",  
      "sourceMaps": true,  
      "sourceMapPathOverrides": {  
        "webpack:///./~/*": "${workspaceFolder}/node_modules/*",  
        "webpack:///./*": "${workspaceFolder}/src/*"  
      }  
    },  
    {  
      "type": "node",  
      "request": "launch",  
      "name": "Debug Tests",  
      "runtimeExecutable": "${workspaceRoot}/node_modules/.bin/jest",  
      "args": ["--runInBand", "--watchAll=false"],  
      "console": "integratedTerminal",  
      "internalConsoleOptions": "neverOpen",  
      "sourceMaps": true  
    }  
  ]  
}
```













### Typescript Advanced Types
#### **Mapped Types**
Transform properties of existing types\
Transforme cada propriedade de um tipo de objeto em um novo tipo usando um único modelo.
```ts
// Convert all properties to boolean  
type Flags<T> = {  
  [K in keyof T]: boolean; // K tem as chaves de T, logo K é T
};  
  
interface User {  
  id: number;  
  name: string;  
  email: string;  
}  
  
type UserFlags = Flags<User>;  
// Equivalent to:  
// {  
//   id: boolean;  
//   name: boolean;  
//   email: boolean;  
// }
```
#### Mapped Type Modifiers (tipos mapeados `+` e `-`)

Sinais **`+`** e **`-`** são chamados de **modificadores de mapeamento** no TypeScript.

Servem para **adicionar ou remover modificadores** (`readonly` e `?`) das propriedades de um tipo.

#### Explicação:
- `-?` → remove o modificador **opcional** `?`.    
- `+?` → adiciona o modificador **opcional** `?`.  
    (mas o `+?` quase nunca é usado, porque o default da linguagem, basta adicionar `?` sem o positivo.
- `-readonly` → remove o modificador **readonly**.    
- `+readonly` → adiciona o modificador **readonly** (default tb).

Exemplo:

`type Concrete<T> = {   -readonly [K in keyof T]-?: T[K]; };`

Isso significa: para cada chave `K` em `T`, pegue o tipo da propriedade `T[K]`, **removendo `readonly` e removendo `?`** → ou seja, todas as propriedades ficam **obrigatórias e mutáveis**.

`type ReadonlyRequired<T> = {  +readonly [K in keyof T]-?: T[K]; };`

Isso significa: para cada chave `K` em `T`, pegue o tipo da propriedade `T[K]`, **adicionando `readonly` e removendo `?`** → todas as propriedades ficam **obrigatórias e somente leitura**.

Detalhe: O `+` na frente (`+readonly` ou `+?`) é **opcional**, porque adicionar é o comportamento padrão da linguagem.

#### Key Remapping

Renomeie ou filtre chaves durante o mapeamento usando `as`, auxiliares de string e verificações condicionais

```ts
// Get será criado dinamicamente
type User = { id: number; name: string; email: string };

function makeGetters<T extends Record<string, any>>(obj: T) {
  const out: any = {};
  for (const k of Object.keys(obj)) {
    const cap = k.charAt(0).toUpperCase() + k.slice(1);
    out["get" + cap] = () => obj[k];
  }
  return out as {
    [K in keyof T as `get${Capitalize<string & K>}`]: () => T[K];
  };
}

const u: User = { id: 7, name: "Bob", email: "bob@example.com" };
const g = makeGetters(u);
console.log(g.getId());
console.log(g.getName());
console.log(g.getEmail());
```

#### Conditional Types
Tipos condicionais permitem que você defina tipos que dependem de uma condição.

```ts
// Conditional types (runtime illustration)
type IsString<T> = T extends string ? true : false;
type ArrayElement<T> = T extends (infer U)[] ? U : never;

const arr = [1, 2, 3];
console.log(typeof arr[0]); // 'number'

function isString(x: unknown): boolean {
  return typeof x === "string";
}
console.log(isString("hello")); // true
console.log(isString(42));      // false
```
#### infer keyword (inferir, deduzir,  induzir, concluir que)
Captura uma parte de um tipo dentro de um tipo condicional introduzindo uma nova variável de tipo com `infer`.

Muito comum vir numa expressão coalescence do tipo `x ? true : false`

Ou seja, **`infer` é um jeito de declarar uma "variável temporária de tipo" dentro de um `extends` condicional.**

`T` sendo uma função, guarde em `R` o tipo de retorno dela, caso contrário use `never`
```ts
// Utilitário que extrai o tipo de retorno de uma função
type Retorno<T> = T extends (...rest: any[]) => infer R ? R : never;

// Exemplo de função
function soma(a: number, b: number) {
  return a + b;
}

// Retorno<typeof soma> é "number"
type TipoRetorno = Retorno<typeof soma>;

```

Exemplo 2: Extrair o tipo dos elementos de um array
```ts
type Elemento<T> = T extends (infer U)[] ? U : never;

type A = Elemento<string[]>;  // string
type B = Elemento<number[]>;  // number
type C = Elemento<boolean>;   // never (não é array)
```
Explicação:
- Se `T` for um array (`(infer U)[]`), então guarde o tipo dos elementos em `U`.    
- Caso contrário, dá `never`.
 
PS: Type inference with `infer` works differently in different contexts. Consider using type assertions or helper functions for very complex types

#### Distributed Conditional Types
```ts
// Without distribution  
type ToArrayNonDist<T> = T extends any ? T[] : never;  
type StrOrNumArr = ToArrayNonDist<string | number>; // (string | number)[]  
  
// With distribution  
type ToArray<T> = [T] extends [any] ? T[] : never;  
type StrOrNumArr2 = ToArray<string | number>; // string[] | number[]  
  
// Filter out non-string types  
type FilterStrings<T> = T extends string ? T : never;  
type Letters = FilterStrings<'a' | 'b' | 1 | 2 | 'c'>; // 'a' | 'b' | 'c'
```

#### Template Literal Types

Basic templates **`${}`**
```ts
// Template literal types
type Greeting = `Hello, ${string}`;
const validGreeting: Greeting = "Hello, World!";
console.log(validGreeting);

// Style pattern with unions
type Color = "red" | "green" | "blue";
type Size = "small" | "medium" | "large";
type Style = `${Color}-${Size}`;

const examples: Style[] = ["red-small", "green-medium", "blue-large"];
console.log(JSON.stringify(examples));
```
 Custom Types
```ts
 // Built-in string manipulation types  
type T1 = Uppercase<'hello'>;  // 'HELLO'  
type T2 = Lowercase<'WORLD'>;  // 'world'  
type T3 = Capitalize<'typescript'>;  // 'Typescript'  
type T4 = Uncapitalize<'TypeScript'>;  // 'typeScript'  
  
// Create an event handler type  
type EventType = 'click' | 'change' | 'keydown';  
type EventHandler = `on${Capitalize<EventType>}`;  
// 'onClick' | 'onChange' | 'onKeydown'
```

#### **Utility Types**: Built-in type helpers for common transformations

Use built-ins like `Partial`, `Pick`, and `Omit` for common transformations.
```ts
// Basic types  
interface User {  
  id: number;  
  name: string;  
  email: string;  
  createdAt: Date;  
}  
  
// Make all properties optional  
type PartialUser = Partial<User>;  
  
// make all properties required  
type RequiredUser = Required<PartialUser>;  
  
// make all properties read-only  
type ReadonlyUser = Readonly<User>;  
  
// pick specific properties  
type UserPreview = Pick<User, 'id' | 'name'>;  
  
// omit specific properties  
type UserWithoutEmail = Omit<User, 'email'>;  
  
// extract property types  
type UserId = User['id']; // number  
type UserKeys = keyof User; // 'id' | 'name' | 'email' | 'createdAt'
```

`Exclude` or `extract` members from unions and create custom mapped helpers.
```ts
// Create a type that excludes null and undefined  
type NonNullable<T> = T extends null | undefined ? never : T;  
  
// Exclude types from a union  
type Numbers = 1 | 2 | 3 | 'a' | 'b';  
type JustNumbers = Exclude<Numbers, string>; // 1 | 2 | 3  
  
// Extract types from a union  
type JustStrings = Extract<Numbers, string>; // 'a' | 'b'  
  
// Get the type that is not in the second type  
type A = { a: string; b: number; c: boolean };  
type B = { a: string; b: number };  
type C = Omit<A, keyof B>; // { c: boolean }  
  
// Create a type with all properties as mutable  
type Mutable<T> = {  
  -readonly [K in keyof T]: T[K];  
};
```
#### Recursive Types

Self-referential types for tree-like structures

Tipos recursivos são úteis para modelar estruturas de dados semelhantes a árvores, onde um tipo pode referenciar a si mesmo.
```ts
// Create a custom type binary tree  
type BinaryTree<T> = {  
  value: T;  
  left?: BinaryTree<T>; // recursive access, itself
  right?: BinaryTree<T>;  
};  
  
// JSON could be many types  
type JSONValue =  
  | string  
  | number  
  | boolean  
  | null  
  | JSONValue[]  
  | { [key: string]: JSONValue }; // recursive access, itself  
  
// Nested comments  
type Comment = {  
  id: number;  
  content: string;  
  replies: Comment[]; // recursive access, itself  
  createdAt: Date;  
};
```

 Other examples
```ts
 // Type for a linked list  
type LinkedList<T> = {  
  value: T;  
  next: LinkedList<T> | null;  
};  
  
// Type for a directory structure  
type File = {  
  type: 'file';  
  name: string;  
  size: number;  
};  
  
type Directory = {  
  type: 'directory';  
  name: string;  
  children: (File | Directory)[];  
};  
  
// Type for a state machine  
type State = {  
  value: string;  
  transitions: {  
    [event: string]: State;  
  };  
};  
  
// Type for a recursive function  
type RecursiveFunction<T> = (x: T | RecursiveFunction<T>) => void;
```

### TypeScript Type Guards

Os Type Guards do TypeScript são construções poderosas que permitem restringir o tipo de uma variável dentro de um escopo específico.

Eles ajudam o TypeScript a entender e aplicar a segurança de tipos, fornecendo verificações explícitas que determinam o tipo específico de uma variável em tempo de execução.

**Type Guards**
- `typeof` type guards (check at runtime)
- `instanceof` type guards
- User-defined type guards with type predicates
- Discriminated unions with literal types
- `in` operator type guards
- `asserts` keyword functions

#### `typeof` 
```ts
function processValue(value) {
  if (typeof value === "string") {
    // TypeScript knows that value is a string here
    return value.toUpperCase();
  } else {
    // TypeScript knows that value is a number here
    return value.toFixed(2);
  }
}

// Examples
console.log(processValue("hello world")); // Outputs: HELLO WORLD
console.log(processValue(123.456)); // Outputs: 123.46
```

#### `instanceof`
O operador `instanceof` verifica se um objeto é uma instância de uma classe específica ou função construtora.
```ts
class Bird {  
  fly() {  
    console.log("Flying...");  
   }  
}  
  
class Fish {  
  swim() {  
    console.log("Swimming...");  
   }  
}  
  
function move(animal: Bird | Fish) {  
  if (animal instanceof Bird) {  
    // TypeScript knows animal is Bird here  
    animal.fly();  
  } else {  
    // TypeScript knows animal is Fish here  
    animal.swim();  
  }  
}
```

#### `is`

**Custom type guard (parameter is Type)**

Return a predicate like `value is Type` so TypeScript narrows on the true branch.

Type Predicate Functions
```ts
interface Car {  
  make: string;  
  model: string;  
  year: number;  
}  
  
interface Motorcycle {  
  make: string;  
  model: string;  
  year: number;  
  type: "sport" | "cruiser";  
}  
  
// Type predicate function  
function isCar(vehicle: Car | Motorcycle): vehicle is Car { // veiculo é carro
  return (vehicle as Motorcycle).type === undefined;  
}  
  
function displayVehicleInfo(vehicle: Car | Motorcycle) {  
  console.log(`Make: ${vehicle.make}, Model: ${vehicle.model}, Year: ${vehicle.year}`);  
  
  if (isCar(vehicle)) {  
    // TypeScript knows vehicle is Car here  
    console.log("This is a car");  
  } else {  
    // TypeScript knows vehicle is Motorcycle here  
    console.log(`This is a ${vehicle.type} motorcycle`);  
  }  
}
```

#### `in`

Verifica se a propriedade pertence a um objeto.

```ts
interface Dog {  
  bark(): void;  
}  
  
interface Cat {  
  meow(): void;  
}  
  
function makeSound(animal: Dog | Cat) {  
  if ("bark" in animal) {  
    // TypeScript knows animal is Dog here  
    animal.bark();  
  } else {  
    // TypeScript knows animal is Cat here  
    animal.meow();  
  }  
}
```

#### `asserts`

In TypeScript, the `asserts` keyword is used to define assertion functions.

**asserções** (ou invariantes) e são pequenas funções que geram erros no início, quando suas variáveis não correspondem ao que você espera.

 `asserts value is TypeB`: This is the key part. It tells TypeScript that if the function returns without throwing an error, then `value` can be treated as `TypeB` from that point onward in the code.
```ts
function functionName(value: TypeA): asserts value is TypeB {  
	if (/* condition where value is NOT TypeB */) {  
		throw new Error("Error message if condition is not met");  
	}  
}
```

```ts
function assertIsString(value: unknown): asserts value is string {
  if (typeof value !== "string") {
    throw new Error("Value must be a string");
  }
}

function processInput(input: unknown) {
  assertIsString(input); // After this line, 'input' is guaranteed to be a string
  console.log(input.toUpperCase()); // No type error here
}

processInput("hello");
// processInput(123); // This would throw an error at runtime
```

As funções de asserção são irmãs das Type Guards `example:type-guards` com exceção de afetar o fluxo de controle quando ele continua através da função.

### TypeScript Conditional Types

Conditional types use the form `T extends U ? X : Y`.
```ts
// Quando passar o tipo string retorne true como valor.
// Pode se usar tipo no lugar do valor declarado ex: boolean
type IsString<T> = T extends string ? true : false;  
  
// Usage examples  
type Result1 = IsString<string>; // true  
type Result2 = IsString<number>; // false  
type Result3 = IsString<"hello">; // true (literal types extend their base types)  
  
// We can use this with variables too  
let a: IsString<string>; // a has type 'true'  
let b: IsString<number>; // b has type 'false'
```

Condicional retornando tipo e não valor
```ts
// se passar qualquer tipo retorne array, senão algo que nunca retorna
type ToArray<T> = T extends any ? T[] : never;  
  
// Pode usar union operator, para que ambos sejam retornados
// Retorna string[] | number[]
type StringOrNumberArray = ToArray<string | number>;  
// This becomes ToArray<string> | ToArray<number>  
  
// Neste caso never removeu tipos não especificados
// "hello" foi aceito como string, retornando seu valor
type ExtractString<T> = T extends string ? T : never;  
type StringsOnly = ExtractString<string | number | boolean | "hello">;  
// Result: string | "hello"
```

**`infer`**

Lembrando `infer` permite em condicionais, onde o tipo de retorno que esta sendo passado, deve ser retornado novamente (alterado ou não).
```ts
// Extract the return type of a function type  
type ReturnType<T> = T extends (...rest: any[]) => infer R ? R : never;  
  
// Examples  
function greet() { return "Hello, world!"; }  
function getNumber() { return 42; }  
  
type GreetReturnType = ReturnType<typeof greet>; // string  
type NumberReturnType = ReturnType<typeof getNumber>; // number  
  
// Extract element type from array  
type ElementType<T> = T extends (infer R)[] ? R : never;  // return without []
type NumberArrayElement = ElementType<number[]>; // number  
type StringArrayElement = ElementType<string[]>; // string
```

Relembrando funções built-in, condicionais embutidas na linguagens
`Extract`, `Exclude`, `NonNullable`, `Parameters`, `ReturnType`.
```ts
// Extract<T, U> - Extracts types from T that are assignable to U  
type OnlyStrings = Extract<string | number | boolean, string>; // string  
  
// Exclude<T, U> - Excludes types from T that are assignable to U  
type NoStrings = Exclude<string | number | boolean, string>; // number | boolean 
  
// NonNullable<T> - Removes null and undefined from T  
type NotNull = NonNullable<string | null | undefined>; // string  
  
// Parameters<T> - Extracts parameter types from a function type  
type Params = Parameters<(a: string, b: number) => void>; // [string, number]  
  
// ReturnType<T> - Extracts the return type from a function type  
type Return = ReturnType<() => string>; // string
```
Tipos condicionais podem ser usados ​​recursivamente para criar transformações de tipos complexas.

Espera receber uma `Promise`, e descompacte ou seja retorne apenas o tipo padrão.
```ts
// Deeply unwrap Promise types  
type UnwrapPromise<T> = T extends Promise<infer U> ? UnwrapPromise<U> : T;  
  
// Examples of returns
type A = UnwrapPromise<Promise<string>>; // Promise<string> -> string  
type B = UnwrapPromise<Promise<Promise<number>>>; // Promise<Promise<number>> -> number  
type C = UnwrapPromise<boolean>; // T -> boolean
```

Type-Level If-Else Chains

Multiple conditions together for a complex type logic.
```ts
type TypeName<T> =  
  T extends string ? "string" :  
  T extends number ? "number" :  
  T extends boolean ? "boolean" :  
  T extends undefined ? "undefined" :  
  T extends Function ? "function" :  
  "object";  
  
// Usage  
type T0 = TypeName<string>; // "string"  
type T1 = TypeName<42>; // "number"  
type T2 = TypeName<true>; // "boolean"  
type T3 = TypeName<() => void>; // "function"  
type T4 = TypeName<Date[]>; // "object"
```

##### Resumo
```ts
// permite avaliar o tipo de retorno, e criar funções genéricas
T extends string ? string : never

// use infer quando quiser alterar o tipo de retorno genéricamente
// infer é chamado de extração de tipo
T extends (any[]) => infer R ? R : never;

// use recursividade se necessário
type A<T> = T extends Promise<infer U> ? A<U> : T; // return A<T> without promise
```

### Typescript Literal Types

Ao criar uma variável com union operator, typescript espera que o tipo seja apenas os valores presentes nesta união.

> **Aqui o tipo não é string e sim o valor literal indicado, exemplo: "north" diferente de "northeast".**
#### String
```ts
// A variable with a string literal type  
let direction: "north" | "south" | "east" | "west";  
  
// Valid assignments  
direction = "north";  
direction = "south";  
  
// Invalid assignments would cause errors  
// direction = "northeast"; // Error: Type '"northeast"' is not assignable to type '"north" | "south" | "east" | "west"'  
// direction = "up"; // Error: Type '"up"' is not assignable to type '"north" | "south" | "east" | "west"'  
  
// Using string literal types in functions  
function move(direction: "north" | "south" | "east" | "west") {  
  console.log(`Moving ${direction}`);  
}  
  
move("east"); // Valid  
// move("up"); // Error: Argument of type '"up"' is not assignable to parameter of type...
```

#### Numeric
Mesmo vale para outros tipos como numéricos.
```ts
// A variable with a numeric literal type  
let diceRoll: 1 | 2 | 3 | 4 | 5 | 6;  
  
// Valid assignments  
diceRoll = 1;  
diceRoll = 6;  
  
// Invalid assignments would cause errors  
// diceRoll = 0; // Error: Type '0' is not assignable to type '1 | 2 | 3 | 4 | 5 | 6'  
// diceRoll = 7; // Error: Type '7' is not assignable to type '1 | 2 | 3 | 4 | 5 | 6'  
// diceRoll = 2.5; // Error: Type '2.5' is not assignable to type '1 | 2 | 3 | 4 | 5 | 6'  
  
// Using numeric literal types in functions  
function rollDice(): 1 | 2 | 3 | 4 | 5 | 6 {  
  return Math.floor(Math.random() * 6) + 1 as 1 | 2 | 3 | 4 | 5 | 6;  
}  
  
const result = rollDice();  
console.log(`You rolled a ${result}`);
```

#### Boolean
Exemplo interessante, abordando `boolean` com 0 e 1
```ts
// Boolean literal combined with other types  
type SuccessFlag = true | "success" | 1;  
type FailureFlag = false | "failure" | 0;  
  
function processResult(result: SuccessFlag | FailureFlag) {  
  if (result === true || result === "success" || result === 1) {  
    console.log("Operation succeeded");  
  } else {  
    console.log("Operation failed");  
  }  
}  
  
processResult(true); // "Operation succeeded"  
processResult("success"); // "Operation succeeded"  
processResult(1); // "Operation succeeded"  
processResult(false); // "Operation failed"
```

#### Object
```ts
// Object with literal property values  
type HTTPSuccess = {  
  status: 200 | 201 | 204;  
  statusText: "OK" | "Created" | "No Content";  
  data: any;  
};  
  
type HTTPError = {  
  status: 400 | 401 | 403 | 404 | 500;  
  statusText: "Bad Request" | "Unauthorized" | "Forbidden" | "Not Found" | "Internal Server Error";  
  error: string;  
};  
  
type HTTPResponse = HTTPSuccess | HTTPError;  
  
function handleResponse(response: HTTPResponse) {  
  if (response.status >= 200 && response.status < 300) {  
    console.log(`Success: ${response.statusText}`);  
    console.log(response.data);  
  } else {  
    console.log(`Error ${response.status}: ${response.statusText}`);  
    console.log(`Message: ${response.error}`);  
  }  
}
```

#### Templates `${}`
O TypeScript 4.1+ introduziu tipos de literais de modelo, que permitem criar novos tipos de literais de string combinando os existentes usando a sintaxe de string de modelo
```ts
// Basic template literals  
type Direction = "north" | "south" | "east" | "west";  
type Distance = "1km" | "5km" | "10km";  
  
// Using template literals to combine them  
type DirectionAndDistance = `${Direction}-${Distance}`;  
// "north-1km" | "north-5km" | "north-10km" | "south-1km" | ...


// Dynamic property access  
type User = {  
  id: number;  
  name: string;  
  email: string;  
  createdAt: Date;  
};  
  
type GetterName<T> = `get${Capitalize<string & keyof T>}`;  
type UserGetters = {  
[K in keyof User as GetterName<User>]: () => User[K];  
};  
// { getId: () => number; getName: () => string; ... }
```


### Typescript Namespaces

Os namespaces TypeScript (anteriormente conhecidos como "módulos internos") fornecem uma maneira poderosa de **organizar código e evitar conflitos de nomenclatura** criando um contêiner para funcionalidades relacionadas.

Key Concepts
- **Logical Grouping**: Organize related code into named containers
- **Scope Management**: Control the visibility of code elements
- **Name Collision Prevention**: Avoid conflicts between similarly named components
- **Code Organization**: Structure large applications in a hierarchical manner

#### `namespace` keyword
```ts
namespace Validation {  
  // Everything inside this block belongs to the Validation namespace  
  
  // Export things you want to make available outside the namespace  
  export interface StringValidator {  
    isValid(s: string): boolean;  
  }  
  
  // This is private to the namespace (not exported)  
  const lettersRegexp = /^[A-Za-z]+$/;  
  
  // Exported class - available outside the namespace  
  export class LettersValidator implements StringValidator {  
    isValid(s: string): boolean {  
      return lettersRegexp.test(s);  
    }  
  }  
  
  // Another exported class  
  export class ZipCodeValidator implements StringValidator {  
    isValid(s: string): boolean {  
      return /^[0-9]+$/.test(s) && s.length === 5;  
    }  
  }  
}  
  
// Using the namespace members  
let letterValidator = new Validation.LettersValidator();  
let zipCodeValidator = new Validation.ZipCodeValidator();  
  
console.log(letterValidator.isValid("Hello")); // true  
console.log(letterValidator.isValid("Hello123")); // false  
  
console.log(zipCodeValidator.isValid("12345")); // true  
console.log(zipCodeValidator.isValid("1234")); // false - wrong length
```

#### Nested namespaces and using aliases

Você pode criar aliases para namespaces ou seus membros para tornar nomes longos mais gerenciáveis.\
Utilize `import` para sugerir outro nome de variável ao seu namespace.
```ts
namespace VeryLongNamespace {  
  export namespace DeeplyNested {  
    export namespace Components {  
      export class Button {  
        display(): void {  
          console.log("Button displayed");  
        }  
      }  
      export class TextField {  
        display(): void {  
          console.log("TextField displayed");  
        }  
      }  
    }  
  }  
}  
  
// Without alias - very verbose  
const button1 = new VeryLongNamespace.DeeplyNested.Components.Button();  
button1.display();  
  
// With namespace alias  
import Components = VeryLongNamespace.DeeplyNested.Components;  
const button2 = new Components.Button();  
button2.display();  
  
// With specific member alias  
import Button = VeryLongNamespace.DeeplyNested.Components.Button;  
const button3 = new Button();  
button3.display();
```


#### Multi-file Namespaces
Os namespaces TypeScript podem ser divididos em arquivos e combinados em tempo de compilação usando comentários de referência.
```ts
// ----- **validators.ts** ----- //
namespace Validation {  
  export interface StringValidator {  
    isValid(s: string): boolean;  
  }  
}

// ----- **letters-validator.ts** file (extends Validation namespace): ----- //
/// <reference path="validators.ts" />     // COMENTÁRIO DE REFERÊNCIA
namespace Validation {  
  const lettersRegexp = /^[A-Za-z]+$/;  
  
  export class LettersValidator implements StringValidator {  // pode suar a interface importada
    isValid(s: string): boolean {  
      return lettersRegexp.test(s);  
    }  
  }  
}

// ----- **main.ts** file ----- //
/// <reference path="validators.ts" />  
/// <reference path="letters-validator.ts" />  
/// <reference path="zipcode-validator.ts" />  
  
// Now you can use the validators from multiple files  
let validators: { [s: string]: Validation.StringValidator } = {};  
validators["letters"] = new Validation.LettersValidator();  
validators["zipcode"] = new Validation.ZipCodeValidator();

// compile with
tsc --outFile sample.js main.ts
```

#### Modules vs Namespaces [doc oficial](https://www.typescriptlang.org/pt/docs/handbook/namespaces-and-modules.html#usando-namespaces)

Recomendo uma análise do capítulo de módulos extenso da documentação oficial.
![[modules_vs_namespace.jpg]]

**Resumo**:
- módulos é preferido sobre namespaces
- módulos carregado naturalmente entre arquivos, todos os arquivos são considerados módulos.
- módulos são mais fáceis de manutenção (dead-code), namespaces são mais difíceis em pacotes.
- namespace incentiva global, e módulo evita global, exceto com dependências explícitas.
- namespaces melhor usado em bibliotecas legadas, scripts globais, tipos de ambiente.
- módulos melhor usado em todos os novos desenvolvimentos, bibliotecas e aplicativos.

#### `declare` `namespace`

`declare` útil quando se quer adicionar mais detalhes ao mesmo namespace, porém em locais, arquivos diferentes.
```ts
// Original namespace  
declare namespace Express {  
  interface Request {  
    user?: { id: number; name: string };  
  }  
  interface Response {  
    json(data: any): void;  
  }  
}  
  
// Later in your application (e.g., in a .d.ts file)  
declare namespace Express {  
  // Augment the Request interface  
  interface Request {  
    // Add custom properties  
    requestTime?: number;  
    // Add methods  
    log(message: string): void;  
  }  
  
  // Add new types  
  interface UserSession {  
    userId: number;  
    expires: Date;  
  }  
}  
  
// Usage in your application  
const app = express();  
  
app.use((req: Express.Request, res: Express.Response, next) => {  
  // Augmented properties and methods are available  
  req.requestTime = Date.now();  
  req.log('Request started');  
  next();  
});
```

#### Migrating
```ts
// Before: Using namespaces  
namespace MyApp {  
  export namespace Services {  
    export class UserService {  
      getUser(id: number) { /* ... */ }  
    }  
  }  
}  
  
// After: Using ES modules  
// services/UserService.ts     // <------- use named files to organized.
export class UserService {  
  getUser(id: number) { /* ... */ }  
}  
  
// app.ts  
import { UserService } from './services/UserService';  
const userService = new UserService();
```

**Migration Steps**
1. Convert each namespace to a module file
2. Replace `export` with ES module exports
3. Update imports to use ES module syntax
4. Configure your build system to handle modules
5. Update tests to work with the new module structure
6. Consider using a bundler like webpack or Rollup
7. Update your `tsconfig.json` to use `"module": "ESNext"`

**Migration Tools**
- `ts-migrate` - Automated migration tool from Facebook
- `tslint` with `no-namespace` rule to detect namespaces
- TypeScript's built-in refactoring tools

### Typescript Index Signatures

#### Index vs Records
TypeScript has a [utility type](https://www.typescriptlang.org/docs/handbook/utility-types.html#recordkeys-type) `Record<Keys, Values>` to annotate records, similar to the index signature.

Use an index signature for **flexible/dynamic keys** and when mixing with other properties.\
Use `Record<K, T>` for **concise simple** mappings.\

Combine with explicit properties where possible, and see Mapped Types and Utility Types for advanced transformations.

Use assinaturas de índice quando as chaves forem dinâmicas, mas as formas de valor forem consistentes.

```ts
// Both are the same
const object1: Record<string, string> = { prop: 'Value' }; // OK  
const object2: { [key: string]: string } = { prop: 'Value' }; // OK

// Index signature  
interface StringMap {  
  [key: string]: string;  
}  
  
// Record  
type StringRecord = Record<string, string>;
```

Observação: em JavaScript, todas as chaves de objeto são armazenadas como strings, mesmo as numéricas.\
No entanto, o TypeScript faz uma distinção para ajudar a detectar erros lógicos ao usar matrizes em vez de objetos.
```ts
// Object with number indexes  
interface NumberDictionary {  
  [index: number]: any;  
}  
  
const scores: NumberDictionary = {  
  0: "Zero",  
  1: 100,  
  2: true  
};  
  
console.log(scores[0]); // "Zero"  
console.log(scores[1]); // 100  
console.log(scores[2]); // true  
  
// Adding a complex object  
scores[3] = { passed: true };
```

`readonly` with index signatures
```ts
// Use `readonly` when mutation isn't needed
interface ReadOnlyStringArray {  
  readonly [index: number]: string;  
}  
  
const names: ReadOnlyStringArray = ["Alice", "Bob", "Charlie"];  
  
console.log(names[0]); // "Alice"  // ok acess, but error on change
  
// This would cause an error  
// names[0] = "Andrew"; // Error: Index signature in type 'ReadOnlyStringArray' only permits reading
```

#### commom pitfalls
```ts
interface ConflictingTypes {  
  [key: string]: number;  
  name: string; // Error: not assignable to string index type 'number'  
}  
  
interface FixedTypes {  
  [key: string]: number | string;  
  name: string;  // OK  
  age: number;   // OK  
}
```


### Typescript Merging

Em typescript para unir basta usar o mesmo nome e mesma categoria.
Podem ser usados em `class` and `interface`,  `enum`,  `functions`, `namespace`, `declare namespace`.

#### interfaces
```ts
// First declaration
interface Person {
  name: string;
  age: number;
}

// Second declaration with the same name
interface Person {
  address: string;
  email: string;
}

// TypeScript merges them into:
// interface Person {
// name: string;
// age: number;
// address: string;
// email: string;
// }
```

#### functions
```ts
// Function overloads
function processValue(value: string): string;
function processValue(value: number): number;
function processValue(value: boolean): boolean;

// Implementation that handles all overloads
function processValue(value: string | number | boolean): string | number | boolean {
  if (typeof value === "string") {
    return value.toUpperCase();
  } else if (typeof value === "number") {
    return value * 2;
  } else {
    return !value;
  }
}

// Using the function with different types
console.log(processValue("hello")); // "HELLO"
console.log(processValue(10)); // 20
console.log(processValue(true)); // false
```

#### class and interfaces
```ts
// Interface declaration  
interface Cart {  
  calculateTotal(): number;  
}  
  
// Class declaration with same name  
class Cart {  
  items: { name: string; price: number }[] = [];  
  
  addItem(name: string, price: number): void {  
    this.items.push({ name, price });  
  }  
  
   // Must implement the interface method  
   calculateTotal(): number {  
    return this.items.reduce((sum, item) => sum + item.price, 0);  
  }  
}  
  
// Using the merged class and interface  
const cart = new Cart();  
cart.addItem("Book", 15.99);  
cart.addItem("Coffee Mug", 8.99);  
  
console.log(`Total: $${cart.calculateTotal().toFixed(2)}`);
```


### Typescript Async

**Promise Combination Methods**
- `Promise.all()` - Waits for all promises to resolve
- `Promise.race()` - Returns the first settled promise (primeira resposta bem sucedida)
- `Promise.allSettled()` - Waits for all to settle (todas as respostas com sucesso ou erro)
- `Promise.any()` - Returns the first fulfilled promise (primeira resposta com erro ou sucesso)

**Error Handling Strategies**
- **Try/Catch Blocks**: For handling errors in async/await
- **Error Boundaries**: For React components
- **Result Types**: Functional approach with success/failure
- **Error Subclassing**: For domain-specific errors

#### Generator  `function*`
Esse `*` logo após o `function` indica que a função é um **generator function**.  \
Quando você combina com `async`, vira um **async generator function**.

**Diferença principal:**
- Uma função normal retorna um valor único.    
- Uma função `function*` (generator) retorna um **iterator**, que pode ir entregando valores aos poucos, usando a palavra-chave **`yield`**.    
- Uma função `async function*` retorna um **async iterator**, que pode entregar valores de forma assíncrona (útil quando os valores vêm de uma API, stream, ou precisam de `await`).

```ts
// Async generator function  
async function* generateNumbers(): AsyncGenerator<number, void, unknown> {  
  let i = 0;  
  while (i < 5) {  
    // Simulate async operation  
    await new Promise(resolve => setTimeout(resolve, 1000));  
    yield i++;  // entrega o número atual e pausa a execução.
  }  
}  
  
// Using the async generator  
async function consumeNumbers() {  
  for await (const num of generateNumbers()) {  // loop esperando cada um com `await`.
    // TypeScript knows num is a number  
    console.log(num * 2);  
  }  
}
```

#### `yield`
`yield` é como um `return`, mas **parcial**: ele pausa a execução da função, devolve um valor, e mantém o estado interno. Na próxima iteração, a função continua do ponto onde parou.
```ts
// Aqui, cada chamada ao `yield` “entrega” um valor, e a função pausa até a próxima iteração.
function* contador() {
  yield 1;
  yield 2;
  yield 3;
}

for (const valor of contador()) {
  console.log(valor);
}
// Saída: 1, 2, 3
```

### Typescript Decorators

Decoradores são um recurso poderoso do TypeScript que permite adicionar metadados e modificar classes e seus membros em tempo de design.

Pode-se criar decorators a partir de classes, funções, propriedades, parâmetros.

**Browser compatibility**: Decoradores são uma proposta de estágio 3 e podem exigir `transpilação` para navegadores mais antigos.\
**Performance overhead**: Tenha cuidado com decoradores que adicionam sobrecarga significativa de tempo de execução em código de desempenho crítico.
#### Enabling decorators on config
```ts
{  
  "compilerOptions": {  
    "target": "ES2020",  
    "module": "commonjs",  
    "experimentalDecorators": true,  // enabled!
    "emitDecoratorMetadata": true,  
    "strictPropertyInitialization": false  
  },  
  "include": ["src/**/*.ts"]  
}
```

#### Basic class decorator
```ts
class="code-comment">// A simple class decorator that logs class definition  
function logClass(constructor: Function) {  
  console.log(`Class ${constructor.name} was defined at ${new Date().toISOString()}`);  
}  
  
class="code-comment">// Applying the decorator  
@logClass  
class UserService {  
  getUsers() {  
    return ['Alice', 'Bob', 'Charlie'];  
  }  
}  
  
class="code-comment">// Output when the file is loaded: "Class UserService was defined at [timestamp]"
```

#### Method decorator

They receive three parameters:
1. `target`: The prototype of the class (for instance methods) or the constructor function (for static methods)
2. `propertyKey`: The name of the method
3. `descriptor`: The property descriptor for the method
```ts
class="code-comment">// Method decorator to measure execution time  
function measureTime(   target: any,   propertyKey: string,   descriptor: PropertyDescriptor ) {  
  const originalMethod = descriptor.value;  
  descriptor.value = function (...args: any[]) {  
    const start = performance.now();  
    const result = originalMethod.apply(this, args);  
    const end = performance.now();  
    console.log(`${propertyKey} executed in ${(end - start).toFixed(2)}ms`);  
    return result;  
  };  
  return descriptor;  
}  
  
class="code-comment">// Using the decorator  
class DataProcessor {  
  @measureTime  
  processData(data: number[]): number[] {  
    class="code-comment">// Simulate processing time  
    for (let i = 0; i < 100000000; i++) { /* processing */ }  
    return data.map(x => x * 2);  
  }  
}  
  
class="code-comment">// When called, it will log the execution time  
const processor = new DataProcessor();  
processor.processData([1, 2, 3, 4, 5]);
```

#### Real-World Example
This example shows how decorators can be used to create a simple API controller similar to those in NestJS or Express.\
Pode ser que precise criar decorator próprios ao usar estes frameworks.
```ts
class="code-comment">// Simple decorator implementations (simplified for example)  
const ROUTES: any[] = [];  
  
function Controller(prefix: string = '') {  
  return function (constructor: Function) {  
    constructor.prototype.prefix = prefix;  
  };  
}  
  
function Get(path: string = '') {  
  return function (target: any, propertyKey: string, descriptor: PropertyDescriptor) {  
    ROUTES.push({  
      method: 'get',  
      path,  
      handler: descriptor.value,  
      target: target.constructor  
    });  
  };  
}  
  
class="code-comment">// Using the decorators  
@Controller('/users')  
class UserController {  
  @Get('/')  
  getAllUsers() {  
    return { users: [{ id: 1, name: 'John' }] };  
  }  
  
  @Get('/:id')  
  getUserById(id: string) {  
    return { id, name: 'John' };  
  }  
}  
  
class="code-comment">// Simulate route registration  
function registerRoutes() {  
  ROUTES.forEach(route => {  
    const prefix = route.target.prototype.prefix || '';  
    console.log(`Registered ${route.method.toUpperCase()} ${prefix}${route.path}`);  
  });  
}  
  
registerRoutes();  
// Output:  
// Registered GET /users  
// Registered GET /users/:id
```

### Typescript JSDoc

To enable TypeScript checking in JavaScript files, you need to:
1. Create a `tsconfig.json` file.
2. Enable `checkJs` or use `// @ts-check` in individual files

```ts
// @ts-check  
  
/**  
* Adds two numbers.  
* @param {number} a  
* @param {number} b  
* @returns {number}  
*/  
function add(a, b) {  
  return a + b;  
}
```

#### `@typedef` for complex types
```ts
// @ts-check  
  
/**  
* @typedef {Object} User  
* @property {number} id - The user ID  
* @property {string} username - The username  
* @property {string} [email] - Optional email address  
* @property {('admin'|'user'|'guest')} role - User role  
* @property {() => string} getFullName - Method that returns full name  
*/  
  
/** @type {User} */  
const currentUser = {  
  id: 1,  
  username: 'johndoe',  
  role: 'admin',  
  getFullName() {  
    return 'John Doe';  
  }  
};  
  
// TypeScript will provide autocomplete for User properties  
console.log(currentUser.role);
```

**Best Practices**

Follow these best practices when using `JSDoc` with TypeScript:
- Enable `// @ts-check` at the top of files where you want type checking
- Use `@typedef` for complex types that are used in multiple places
- Document all function parameters and return types
- Use `@template` for generic functions and types
- Create declaration files (`.d.ts`) for third-party libraries without types
- Use `@ts-expect-error` instead of `@ts-ignore` when you expect an error


### Typescript Error Handling


#### Try/Catch blocks
In TypeScript 4.0 and later, the `unknown` type is the default type for catch variables.
```ts
function divide(a: number, b: number): number {  
  if (b === 0) {  
    throw new Error('Division by zero');  
  }  
  return a / b;  
}  
  
try {  
  const result = divide(10, 0);  
  console.log(result);  
} catch (error) {  
  console.error('An error occurred:', error.message);  
}
```

#### Promise rejections
```ts
// Bad: Unhandled promise rejection  
fetchData().then(data => console.log(data));  
  
// Good: Handle both success and error cases  
fetchData()  
  .then(data => console.log('Success:', data))  
  .catch(error => console.error('Error:', error));  
  
// Or use void for intentionally ignored errors  
void fetchData().catch(console.error);
```

#### Create custom error types
```ts
class NetworkError extends Error {  
  constructor(public status: number, message: string) {  
    super(message);  
    this.name = 'NetworkError';  
  }  
}  
  
class ValidationError extends Error {  
  constructor(public field: string, message: string) {  
    super(message);  
    this.name = 'ValidationError';  
  }  
}
```

### Typescript Best Practices

#### Enable strict mode
```ts
// tsconfig.json
{
  "compilerOptions": {
    /* Enable all strict type-checking options */
    "strict": true,
    /* Additional recommended settings */
    "target": "ES2020",
    "module": "commonjs",
    "moduleResolution": "node",
    "esModuleInterop": true,
    "skipLibCheck": true,
    "forceConsistentCasingInFileNames": true
  }
}
```
#### Enable strick checks
```ts
{  
  "compilerOptions": {  
    /* Additional strict checks */  
    "noImplicitAny": true,  
    "strictNullChecks": true,  
    "strictFunctionTypes": true,  
    "strictBindCallApply": true,  
    "strictPropertyInitialization": true,  
    "noImplicitThis": true,  
    "alwaysStrict": true  
  }  
}
```
#### Use type inference
Deixe que o Typescript descubra qual o tipo correto, quando é óbvio
```ts
// Bad: Redundant type annotation  
const name: string = 'John';  
  
// Good: Let TypeScript infer the type  
const name = 'John';  
  
// Bad: Redundant return type  
function add(a: number, b: number): number {  
  return a + b;  
}  
  
// Good: Let TypeScript infer return type  
function add(a: number, b: number) {  
  return a + b;  
}
```
#### Avoid `any` type
```ts
// Bad: Loses type safety  
function logValue(value: any) {  
  console.log(value.toUpperCase()); // No error until runtime  
}  
  
// Better: Use generic type parameter  
function logValue<T>(value: T) {  
  console.log(String(value)); // Safer, but still not ideal  
}  
  
// Best: Be specific about expected types  
function logString(value: string) {  
  console.log(value.toUpperCase()); // Type-safe  
}  
  
// When you need to accept any value but still be type-safe  
function logUnknown(value: unknown) {  
  if (typeof value === 'string') {  
    console.log(value.toUpperCase());  
  } else {  
    console.log(String(value));  
  }  
}
```
#### File naming conventions
```ts
// Good  
user.service.ts // Service classes  
user.model.ts // Type definitions  
user.controller.ts // Controllers  
user.component.ts // Components  
user.utils.ts // Utility functions  
user.test.ts // Test files  
  
// Bad  
UserService.ts // Avoid PascalCase for file names  
user_service.ts // Avoid snake_case  
userService.ts // Avoid camelCase for file names
```

#### Avoid callback hell
Nested async/await calls
```ts
// Bad: Nested async/await (callback hell)  
async function processUser(userId: string) {  
  const user = await getUser(userId);  
  if (user) {  
    const orders = await getOrders(user.id);  
    if (orders.length > 0) {  
      const latestOrder = orders[0];  
      const items = await getOrderItems(latestOrder.id);  
      return { user, latestOrder, items };  
    }  
  }  
  return null;  
}  
  
// Better: Flatten the async/await chain  
async function processUser(userId: string) {  
  const user = await getUser(userId);  
  if (!user) return null;  
  
  const orders = await getOrders(user.id);  
  if (orders.length === 0) return { user, latestOrder: null, items: [] };  
  
  const latestOrder = orders[0];  
  const items = await getOrderItems(latestOrder.id);  
  
  return { user, latestOrder, items };  
}  
  
// Best: Use Promise.all for independent async operations  
async function processUser(userId: string) {  
  const [user, orders] = await Promise.all([  
    getUser(userId),  
    getOrders(userId)  
  ]);  
  
  if (!user) return null;  
  if (orders.length === 0) return { user, latestOrder: null, items: [] };  
  
  const latestOrder = orders[0];  
  const items = await getOrderItems(latestOrder.id);  
  
  return { user, latestOrder, items };  
}
```
#### type-only imports and exports
```ts
// Bad: Imports both type and value  
import { User, fetchUser } from './api';  
  
// Good: Separate type and value imports  
import type { User } from './api';  
import { fetchUser } from './api';  
  
// Even better: Use type-only imports when possible  
import type { User, UserSettings } from './types';  
  
// Type-only export  
export type { User };  
  
// Runtime export  
export { fetchUser };  
  
// In tsconfig.json, enable "isolatedModules": true  
// to ensure type-only imports are properly handled
```

#### Use const Assertions
```ts
// Without const assertion (wider type)  
const colors = ['red', 'green', 'blue'];  
// Type: string[]  
  
// With const assertion (narrower, more precise type)  
const colors = ['red', 'green', 'blue'] as const;  
// Type: readonly ["red", "green", "blue"]  
  
// Extract union type from const array  
type Color = typeof colors[number]; // "red" | "green" | "blue"  
  
// Objects with const assertions  
const config = {  
  apiUrl: 'https://api.example.com',  
  timeout: 5000,  
  features: ['auth', 'notifications'],  
} as const;  
  
// Type is:  
// {  
// readonly apiUrl: "https://api.example.com";  
// readonly timeout: 5000;  
// readonly features: readonly ["auth", "notifications"];  
// }
```