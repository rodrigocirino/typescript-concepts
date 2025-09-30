# w3schools.com Typescript Tutorial

Revisão baseada na documentações do site W3Schools.com

[w3schools.com Typescript Tutorial](https://www.w3schools.com/typescript/index.php)


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
```json
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
```bash
# compile
npx tsc hello.ts
# generates a hello.js
# run js
node hello.js
```

#### TS Simple Types
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





















