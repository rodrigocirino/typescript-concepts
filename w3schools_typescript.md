# w3schools.com: Typescript Tutorial

Revisão baseada na documentações do site [w3schools.com Typescript Tutorial](https://www.w3schools.com/typescript/index.php)

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

### TS Simple Types
```ts
// boolean
let isActive: boolean = true;  
let hasPermission = false; // TypeScript infers 'boolean' type

// number
let decimal: number = 6;  
let hex: number = 0xf00d;       // Hexadecimal  
let binary: number = 0b1010;     // Binary  
let octal: number = 0o744;      // Octal  
let float: number = 3.14;      // Floating point

// string
let color: string = "blue";  
let fullName: string = 'John Doe';  
let age: number = 30;  
let sentence: string = `Hello, my name is ${fullName} and I'll be ${age + 1} next year.`;
```

**BigInt (ES2020+)**\
Represents whole numbers larger than 253 - 1.\
Use the `n` suffix to create a bigint.
```ts
const bigNumber: bigint = 9007199254740991n;  
const hugeNumber = BigInt(9007199254740991); // Alternative syntax
```

**Symbol**\
Creates unique identifiers.\
Useful for creating unique property keys and constants.
```ts
const uniqueKey: symbol = Symbol('description');  
const obj = {  
  [uniqueKey]: 'This is a unique property'  
};  
console.log(obj[uniqueKey]); // "This is a unique property"
```

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

### TypeScript Special Types

**`any`** - diz ao compilar para pular a verificação de tipo de uma variável. Evite pois ignora alguns recursos de segurança de tipo do Typescript.

Utilize quando o conteúdo é dinâmico onde o tipo é desconhecido.
```typescript
let v: any = true;
v = "string"; // no error if use "any" type
console.log(Math.round(v)); // error if not use "any"

// Removendo o any any ele vai mostrar este erro ao rodar ou compilar o arquivo
prog.ts(3,1): error TS2322: Type 'string' is not assignable to type 'boolean'.
prog.ts(8,24): error TS2345: Argument of type 'boolean' is not assignable to parameter of type 'number'.

//Incluindo o any, ele mostra apenas o resuldo "Nan" sem apresentar qualquer erro
```

**`unknown`** - contraparte segura para `any`

"isso pode ser qualquer coisa, então você deve realizar algum tipo de verificação antes de usá-lo"

Principais diferenças entre **`unknown` e `any`:**
- Deve se verificar o tipo antes do uso de `unknown`.
- Necessário fazer asserção de tipo antes de acessar propriedades `unknown`.
- Você não pode chamar ou construir valores do tipo `unknown`

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
- `null`é uma atribuição explícita que não representa nenhum valor ou objeto
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

### TypeScript Arrays

The **`readonly`** keyword can prevent arrays from being changed.
```typescript
const names: readonly string[] = ["Dylan"];
names.push("Jack"); // prog.ts(2,7): error TS2339: Property 'push' does not exist on type 'readonly string[]'.

// console.log(names); //[ 'Dylan' ]
```

Typescript pode inferir seu tipo na inicialização, baseado em seus valores
```ts
const numbers = [1, 2, 3]; // inferred to type number[]  
numbers.push(4); // no error  
// comment line below out to see the successful assignment  
numbers.push("2"); // Error: Argument of type 'string' is not assignable to parameter of type 'number'.  
let head: number = numbers[0]; // no error
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

### ⛓️‍💥 JavaScript Destructuring [w3](https://www.w3schools.com/js/js_destructuring.asp)

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

#### ⛓️‍💥 Javascript Object Types

Objects are collections of **key-value pairs**, where each key (known as **property names**) has a value, inside curly braces { }:

You should declare objects with the `const` keyword.\
Isso não torna o objeto imutável. `const` ainda permite que modifique  suas propriedades e valores.

Pode usar `Object()`, mas não é necessário explicita-lo.
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
const person = {};
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

#### Typescript Object Types

```ts
const car: { type: string, mileage?: number } = {
  type: "Toyota",  
};  
car.mileage = 2000;

// Error Se não colocar o `?` que indica opcional.
// Error: Property 'mileage' is missing in type '{ type: string; }' but required in type '{ type: string; mileage: number; }'.  
```

**Index Signatures**

Assinaturas de índice podem ser usadas para objetos sem uma lista definida de propriedades.

Index signatures like this one can also be expressed with utility types like **`Record<string, number>`**.
```ts
const nameAgeMap: { [index: string]: number } = {};

nameAgeMap.Jack = 25; // ok
nameAgeMap.Doe = 50; // ok

//prog.ts(6,1): error TS2322: Type 'string' is not assignable to type 'number'.
//nameAgeMap.Mark = "Hundred";

console.log(nameAgeMap); //{ Jack: 25, Doe: 50 }
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
// prog.ts(2,51): error TS2339: Property 'toUpperCase' does not exist on type 'string | number'. Property 'toUpperCase' does not exist on type 'number'.
```



