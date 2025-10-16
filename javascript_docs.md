# Javascript Docs

Revisão baseada na documentações do site:
- [javascript.info](https://javascript.info/)
- [w3schools.com Javascript Tutorial](https://www.w3schools.com/js/)

## Javascript Basics 🪓

**A JavaScript variable can hold 8 types of data**

| Type      | Description                                   |
| --------- | --------------------------------------------- |
| String    | A text of characters enclosed in quotes       |
| Number    | A number representing a mathematical value    |
| Bigint    | A number representing a large integer         |
| Boolean   | A data type representing true or false        |
| Object    | A collection of key-value pairs of data       |
| Undefined | A primitive variable with no assigned value   |
| Null      | A primitive value representing object absence |
| Symbol    | A unique and primitive identifier             |

**JavaScript Arithmetic Operators**

| Operator | Description                  |
| -------- | ---------------------------- |
| +        | Addition                     |
| -        | Subtraction                  |
| *        | Multiplication               |
| **       | Exponentiation               |
| /        | Division                     |
| %        | Modulus (Division Remainder) |
| ++       | Increment                    |
| --       | Decrement                    |
 **JavaScript Assignment Operators**

| Operator | Example | Same As    |                                               |
| -------- | ------- | ---------- | --------------------------------------------- |
| =        | x = y   | x = y      | assigns a value to a variable                 |
| +=       | x += y  | x = x + y  | add strings                                   |
| -=       | x -= y  | x = x - y  | subtracts a value from a variable             |
| *=       | x *= y  | x = x * y  | multiplies a variable                         |
| /=       | x /= y  | x = x / y  | divides a variable                            |
| %=       | x %= y  | x = x % y  | assigns a remainder to a variable             |
| **=      | x **= y | x = x ** y | raises a variable to the power of the operand |
**JavaScript Comparison Operators**

| Operator | Description                       | Example |
| -------- | --------------------------------- | ------- |
| ==       | equal to                          | x == 5  |
| ===      | equal value and equal type        | x === 5 |
| !=       | not equal                         | x != 5  |
| !==      | not equal value or not equal type | x !== 5 |
| >        | greater than                      | x > 5   |
| <        | less than                         | x < 5   |
| >=       | greater than or equal to          | x >= 5  |
| <=       | less than or equal to             | x <= 5  |
**JavaScript Bitwise Operators**

| Operator | Name                  | Description                                                                                                                  |
| -------- | --------------------- | ---------------------------------------------------------------------------------------------------------------------------- |
| &        | AND                   | Define cada bit como 1 se **ambos** os bits forem 1                                                                          |
| \|       | OR                    | Define cada bit como 1 se **um dos** dois bits for 1                                                                         |
| ^        | XOR                   | Define cada bit como 1 se **apenas um dos** dois bits for 1                                                                  |
| ~        | NOT                   | **Inverte** todos os bits                                                                                                    |
| <<       | Zero fill left shift  | Desloca para a **esquerda** **empurrando zeros** da direita e deixando os bits mais à esquerda caírem                        |
| >>       | Signed right shift    | Desloca para a **direita** **empurrando cópias** do bit mais à esquerda da esquerda e deixando os bits mais à direita caírem |
| >>>      | Zero fill right shift | Desloca para a **direita**, **empurrando zeros** da esquerda para a direita e deixando os bits mais à direita caírem         |

**JavaScript Logical Operators**

| Operator | Description |
| -------- | ----------- |
| &&       | logical and |
| \|\|     | logical or  |
| !        | logical not |
**Logical Assignment Operators**

| Operator | Example      | Result |                                                                        |
| -------- | ------------ | ------ | ---------------------------------------------------------------------- |
| &&=      | true &&= 10  | x = 10 | If the first value is true, the second value is assigned.              |
| \|\|=    | false \|= 10 | x = 10 | If the first value is false, the second value is assigned.             |
| ??=      | null ??= 10  | x = 10 | If the first value is undefined or null, the second value is assigned. |

```ts
// boolean
let isActive: boolean = true;
let hasPermission = false; // TypeScript infers 'boolean' type

// JavaScript Numbers are Always Double! With 64-bit Precision Floating Point
// number
let decimal: number = 6;
let hex: number = 0xf00d;       // Hexadecimal
let binary: number = 0b1010;     // Binary
let octal: number = 0o744;      // Octal
let float: number = 3.14;      // Floating point
let y = 123e5;    // 12300000
let z = 123e-5;   // 0.00123

// string
let car = "";    // The value is "", the typeof is "string"
let color: string = "blue";
let fullName: string = 'John Doe';
let age: number = 30;
let sentence: string = `Hello, my name is ${fullName} and I'll be ${age + 1} next year.`;
let text1 = "What a very ";
text1 += "nice day"; // What a very nice day
let x = 5 + 5;  // 10 (number)
let y = "5" + 5; // 55 (string)
let z = "Hello" + 5; // Hello5 (string)
```

**Everything With a "Value" is True**
```js
100 is true
3.14 is true
-15 is true
true is true
"Hello" is true
"false" is true
(7 + 1 + 3.14) is true

// Everything Without a "Value" is False
0 is false
"" is false
undefined is false
null is false
NaN is false
false is false
Boolean("") is false
// Comparing two JavaScript objects **always** returns **false**.
```



**`switch`, `case`, `default`**

**expression**: Switch usa comparação estrita `(===)`. Os valores devem ser do mesmo tipo para corresponder. Uma comparação estrita só pode ser verdadeira se ambos os operandos forem do mesmo tipo. Ou seja aceita todos os tipos primitivos.
```ts
let expression = "0";
switch (expression) {
  case 0:
    text = "Off";
    break;
  case 1:
    text = "On";
    break;
  default:
    text = "No value found";
}
```

**Loops**

| Description     | Example                 |                            |
| --------------- | ----------------------- | -------------------------- |
| for loop        | for (i = 0; i < 5; i++) |                            |
| while loop      | while (i < 10)          |                            |
| do while        | do {} while (i < 10)    |                            |
| for **in** loop | for (keys in person)    | itera sobre as **chaves**  |
| for **of** loop | for (values of cars)    | itera sobre os **valores** |
| forEach()       | y.forEach(x=>x)         |                            |
|                 |                         |                            |
```ts
let i = 5;
// both inside loop i until 10.
for (i = 0; i < 10; i++) {}
// After for here i = 10, because change the global i
for (let i = 0; i < 10; i++) {}
// After for here i = 5, mantain value, because not change, create a new inside loop.

//You can omit **exp 1** if the value is set before the loop starts:
for (; i < 10; i++) {} // ok

//All exp can be ommited, exp3 can be omitted (if you increment the value inside the loop):
for (; i < len; ) { i++; } // ok
```

```js
// IN
const meuObjeto = { a: 1, b: 2, c: 3 };
for (const chave in meuObjeto) {
	console.log(chave); // Imprime: "a", "b", "c"
}
// OF
const meuArray = ["maçã", "banana", "laranja"];
for (const fruta of meuArray) {
	console.log(fruta); // Imprime: "maçã", "banana", "laranja"
}
```



`do while`
- O comando `do while` é executado pelo menos uma vez, mesmo que a condição seja falsa desde o início.
- Não se esqueça de incrementar a variável usada na condição, caso contrário o loop nunca terminará!

`break` in loops or a switch statement
```ts
for (let i = 0; i < 10; i++) {
  if (i === 3) { break; }
  text += "The number is " + i + "<br>";
}

// Labeled Break
let text = "";
loop1: for (let j = 1; j < 5; j++) {
  loop2: for (let i = 1; i < 5; i++) {
    if (i === 3) { 
	    break loop1;
	}
    text += i;
   }
}
```

`continue` - **skips the current iteration** in a loop.
```ts
for (let i = 1; i < 10; i++) {
  if (i === 3) { continue; }
  text += "The number is " + i + "<br>";
}

// can be used labeled like break! "continue labelname"
```

### Arrays

The Difference Between Arrays and Objects
- In JavaScript, arrays use numbered indexes.
- In JavaScript, objects use named indexes.

The `at()` method returns the same as `[]`.

`join`
```js
const fruits = ["Banana", "Orange", "Apple", "Mango"];
fruits.join(" * "); // Banana * Orange * Apple * Mango
```

**Array Methods** - Revised July 2025

| Name                                                                             | Description                                                                      |
| -------------------------------------------------------------------------------- | -------------------------------------------------------------------------------- |
| \[ ]\                                                                            | Creates a new Array                                                              |
| [new Array()](https://www.w3schools.com/jsref/jsref_array_new.asp)               | Creates a new Array                                                              |
| [at()](https://www.w3schools.com/jsref/jsref_array_at.asp)                       | Returns an indexed element of an array. Adds in ECMA2022                         |
| [concat()](https://www.w3schools.com/jsref/jsref_concat_array.asp)               | Joins arrays and returns an array with the joined arrays                         |
| [constructor](https://www.w3schools.com/jsref/jsref_constructor_array.asp)       | Returns the function that created the Array prototype                            |
| [copyWithin()](https://www.w3schools.com/jsref/jsref_copywithin.asp)             | Copies array elements within the array, to and from specified positions          |
| [entries()](https://www.w3schools.com/jsref/jsref_entries.asp)                   | Returns a key/value pair Array Iteration Object                                  |
| [every()](https://www.w3schools.com/jsref/jsref_every.asp)                       | Checks if every element in an array pass a test                                  |
| [fill()](https://www.w3schools.com/jsref/jsref_fill.asp)                         | Fill the elements in an array with a static value                                |
| [filter()](https://www.w3schools.com/jsref/jsref_filter.asp)                     | Creates a new array with every element in an array that pass a test              |
| [find()](https://www.w3schools.com/jsref/jsref_find.asp)                         | Returns the value of the first element in an array that pass a test              |
| [findIndex()](https://www.w3schools.com/jsref/jsref_findindex.asp)               | Returns the index of the first element in an array that pass a test              |
| [findLast()](https://www.w3schools.com/jsref/jsref_array_findlast.asp)           | Returns the value of the last element in an array that pass a test               |
| [findLastIndex()](https://www.w3schools.com/jsref/jsref_array_findlastindex.asp) | Returns the index of the last element in an array that pass a test               |
| [flat()](https://www.w3schools.com/jsref/jsref_array_flat.asp)                   | Concatenates sub-array elements                                                  |
| [flatMap()](https://www.w3schools.com/jsref/jsref_array_flatmap.asp)             | Maps all array elements and creates a new flat array                             |
| [forEach()](https://www.w3schools.com/jsref/jsref_foreach.asp)                   | Calls a function for each array element                                          |
| [from()](https://www.w3schools.com/jsref/jsref_from.asp)                         | Creates an array from an object                                                  |
| [includes()](https://www.w3schools.com/jsref/jsref_includes_array.asp)           | Check if an array contains the specified element                                 |
| [indexOf()](https://www.w3schools.com/jsref/jsref_indexof_array.asp)             | Search the array for an element and returns its position                         |
| [isArray()](https://www.w3schools.com/jsref/jsref_isarray.asp)                   | Checks whether an object is an array                                             |
| [join()](https://www.w3schools.com/jsref/jsref_join.asp)                         | Joins all elements of an array into a string                                     |
| [keys()](https://www.w3schools.com/jsref/jsref_keys.asp)                         | Returns a Array Iteration Object, containing the keys of the original array      |
| [lastIndexOf()](https://www.w3schools.com/jsref/jsref_lastindexof_array.asp)     | Search the array for an element, starting at the end, and returns its position   |
| [length](https://www.w3schools.com/jsref/jsref_length_array.asp)                 | Sets or returns the number of elements in an array                               |
| [map()](https://www.w3schools.com/jsref/jsref_map.asp)                           | Creates a new array with the result of calling a function for each array element |
| [of()](https://www.w3schools.com/jsref/jsref_array_of.asp)                       | Creates an array from a number of arguments                                      |
| [pop()](https://www.w3schools.com/jsref/jsref_pop.asp)                           | Removes the last element of an array, and returns that element                   |
| [prototype](https://www.w3schools.com/jsref/jsref_prototype_array.asp)           | Allows you to add properties and methods to an Array object                      |
| [push()](https://www.w3schools.com/jsref/jsref_push.asp)                         | Adds new elements to the end of an array, and returns the new length             |
| [reduce()](https://www.w3schools.com/jsref/jsref_reduce.asp)                     | Reduce the values of an array to a single value (going left-to-right)            |
| [reduceRight()](https://www.w3schools.com/jsref/jsref_reduceright.asp)           | Reduce the values of an array to a single value (going right-to-left)            |
| [reverse()](https://www.w3schools.com/jsref/jsref_reverse.asp)                   | Reverses the order of the elements in an array                                   |
| [shift()](https://www.w3schools.com/jsref/jsref_shift.asp)                       | Removes the first element of an array, and returns that element                  |
| [slice()](https://www.w3schools.com/jsref/jsref_slice_array.asp)                 | Selects a part of an array, and returns the new array                            |
| [some()](https://www.w3schools.com/jsref/jsref_some.asp)                         | Checks if any of the elements in an array pass a test                            |
| [sort()](https://www.w3schools.com/jsref/jsref_sort.asp)                         | Sorts the elements of an array                                                   |
| [splice()](https://www.w3schools.com/jsref/jsref_splice.asp)                     | Adds or Removes array elements                                                   |
| [toReversed()](https://www.w3schools.com/jsref/jsref_array_toreversed.asp)       | Reverses the order of array elements (to a new array)                            |
| [toSorted()](https://www.w3schools.com/jsref/jsref_array_tosorted.asp)           | Sorts the elements of an array (to a new array)                                  |
| [toSpliced()](https://www.w3schools.com/jsref/jsref_array_tospliced.asp)         | Adds or Removes array elements (to a new array)                                  |
| [toString()](https://www.w3schools.com/jsref/jsref_tostring_array.asp)           | Converts an array to a string, and returns the result                            |
| [unshift()](https://www.w3schools.com/jsref/jsref_unshift.asp)                   | Adds new elements to the beginning of an array, and returns the new length       |
| [valueOf()](https://www.w3schools.com/jsref/jsref_valueof_array.asp)             | Returns the primitive value of an array                                          |
| [with()](https://www.w3schools.com/jsref/jsref_array_with.asp)                   | Returns a new array with updated elements                                        |

#### `Set` é uma coleção de valores únicos

In JavaScript 2025, 7 new logical methods were added to the Set object\
[JavaScript 2025](https://www.w3schools.com/js/js_2025.asp) is fully supported in all modern browsers since May 2025.
```js
union(), difference(), intersection(), isDisjointFrom(), isDisjointFrom(), isSubsetOf(), isSupersetOf(), symmetricDifference()
```

#### `Map` são objetos em pares de chaves-valor que garante a ordem de inserção.
**Differences between JavaScript Objects and Maps.**

| Object                            | Map                           |
| --------------------------------- | ----------------------------- |
| Not directly iterable             | Directly iterable             |
| Do not have a size property       | Have a size property          |
| Keys must be Strings (or Symbols) | Keys can be any datatype      |
| Keys are not well ordered         | Keys are ordered by insertion |
| Have default keys                 | Do not have default keys      |
#### RegExp Flags `/pattern/flags`

**JavaScript Regex Flags - Revised July 2025**

| Flag | Description                                                     |
| ---- | --------------------------------------------------------------- |
| /d   | Performs substring matches (new 2022)                           |
| /g   | Performs a global match (find all)                              |
| /i   | Performs case-insensitive matching                              |
| /m   | Performs multiline matching                                     |
| /s   | Allows . (dot) to match line terminators (new 2018)             |
| /u   | Enables Unicode support (new 2015)                              |
| /v   | An upgrade to the /u flag for better Unicode support (new 2025) |
| /y   | Performs a "sticky" search (new 2015)                           |

`typeof`
```js
typeof "John"          // Returns "string"
typeof ("John"+"Doe")  // Returns "string"
typeof 3.14            // Returns "number"
typeof (33 + 66)       // Returns "number"
typeof NaN             // Returns "number"
typeof 1234n           // Returns "bigint"
typeof true            // Returns "boolean"
typeof false           // Returns "boolean"
typeof {name:'John'}   // Returns "object"
typeof [1,2,3,4]       // Returns "object"
typeof {}              // Returns "object"
typeof []              // Returns "object"
typeof new Object()    // Returns "object"
typeof new Array()     // Returns "object"
typeof new Date()      // Returns "object"
typeof new Set()       // Returns "object"
typeof new Map()       // Returns "object"
typeof function () {}  // Returns "function"
typeof x               // Returns "undefined"
typeof null            // Returns "object"
```

The **`debugger`** keyword stops the execution of JavaScript, and calls (if available) the debugging function.

JavaScript Declarations are Hoisted (içado, elencado, promovido posteriormente)\
**Hoisting** é o comportamento padrão do JavaScript de mover todas as declarações para o topo do escopo atual (para o topo do script atual ou da função atual). Com isso é possível usar a variável sem declara-la antes, adicionar `let e const` apenas após ser instanciada.

**`"use strict"`** The purpose  is to indicate that the code should be executed in "strict mode".\
With strict mode, you can not, for example, use undeclared variables.\
Strict mode is declared by adding "use strict"; to the beginning of a script or a function.
```js
x = 3.14;       // Hoisting, This will not cause an error.
myFunction();

function myFunction() {
  "use strict";  // <------------ strict:true
  y = 3.14;   // This will cause an error (fix with let or const)
}
```

Consequências de usar o modo estrito
- Principal é não permitir variáveis não declaradas (com `let` ou `const`)
- não pode-se usar as palavras chaves da linguagem `keyword` como nome de variável (óbvio)
- não permite o uso de `with` , adicionado em 2023 que atualiza elementos em um array sem alterar o array original.
- não se pode usar `delete` para remover uma variável ou função.
- parâmetros de função devem ter nomes diferentes (óbvio)
- A palavra-chave `this` se refere ao objeto que chamou a função, sem ele retornaria o objeto global.

Uma atribuição `=` sempre retorna o valor da atribuição.

Avoid global variables, avoid `new`, avoid `==`, avoid `eval()`

**Don't Use new Object()**
- Use `""` instead of `new String()`
- Use `0` instead of `new Number()`
- Use `false` instead of `new Boolean()`
- Use `{}` instead of `new Object()`
- Use `[]` instead of `new Array()`
- Use `/()/` instead of `new RegExp()`
- Use `function (){}` instead of `new Function()`

**Javascript Performance**

Cada parâmetro de um loop é reavaliado novamente a cada iteração
```js
// Bad
for (let i = 0; i < arr.length; i++) {}
//Good
let l = arr.length;
for (let i = 0; i < l; i++) {}
// The better code accesses the length property outside the loop and makes the loop run faster.
```

Avoid using the `with` keyword. It has a negative effect on speed and performance. It also clutters up (desorganiza) JavaScript scopes. The with keyword is not allowed in strict mode.

`I Promise a Result !` - Eu prometo um resultado
```js
let myPromise = new Promise(function(myResolve, myReject) {
// "Producing Code" (May take some time)

  myResolve(); // when successful
  myReject();  // when error
});

// "Consuming Code" (Must wait for a fulfilled Promise)
myPromise.then(
  function(value) { /* code if successful */ },
  function(error) { /* code if some error */ }
);
```

The Promise object supports two properties: **state** and **result**, and 3 states.

|myPromise.state|myPromise.result|
|---|---|
|"pending"|undefined|
|"fulfilled"|a result value|
|"rejected"|an error object|

**`async`** makes a function **return** a Promise\
**`await`** makes a function **wait** for a Promise

```js
async function myFunction() {
  return "Hello";
}

//Is the same as:
function myFunction() {
  return Promise.resolve("Hello");
}

// Here is how to use the Promise:
myFunction().then(
  function(value) { /* code if successful */ },
  function(error) { /* code if some error */ }
);
```


The `await` keyword **can only be used inside** an `async` function.
The `await` keyword **makes the function pause the execution** and wait for a resolved promise before it continues: `await myPromise;`

**`export default`**
```js
// export each
export const name = "Jesse";
export const age = 40;

// export obj
export {name, age};

// export all
const message = () => {
	const name = "Jesse";
	const age = 40;
	return name + ' is ' + age + 'years old.';
};
export default message;

```

**`import from`**
```js
// no default
import { name, age } from "./person.js";
// with default
import message from "./message.js";
```