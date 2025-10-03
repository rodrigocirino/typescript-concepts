**w3schools.com: Typescript Tutorial**

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

### 🪓 JavaScript Destructuring [w3](https://www.w3schools.com/js/js_destructuring.asp)

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

Index signatures like this one can also be expressed with utility types like **`Record<string, number>`**. [🔗 See below](#)
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


### 🪓 Javascript métodos pré-definidos [js built-in functions](https://www.w3schools.com/js/js_function_call.asp)

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

### Typescript Utility Types

Tipos utilitários servem para alterar o retorno de um objeto, acessibilidade ou estrutura.

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

#### Omit (omita campos)
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

#### Exclude
`Exclude` removes types from a union.
```ts

type Primitive = string | number | boolean;

const value: Exclude<Primitive, string> = true;
// a string cannot be used here since Exclude removed it from the type.

console.log(typeof value); // boolean
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

```

### x
#### x
```ts

```

### x
#### x
```ts

```

### x
#### x
```ts

```

### x
#### x
```ts

```

