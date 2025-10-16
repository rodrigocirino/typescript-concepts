# Typescript Summary

[Tutorial TypeScript no Visual Studio Code](https://code.visualstudio.com/docs/typescript/typescript-tutorial)

[How to run ts files with VSCode and Node.js](https://github.com/rodrigocirino/nodejs-template)

### Introdução

**O que é TypeScript?**\
É um `superset` do Javascript que adiciona novas funcionalidades como tipos estáticos.

**`npx tsc`**  - `TypeScript Compiler` : comando que chama o compilador padrão do TS.

**Diferença entre transpilar e compilar?**
- Typescript é `transpilado` para Javascript
- Porém o próprio Ts chama seu transpilador de `Typescript Compiler - tsc`, logo não esta incorreto chamar de compilador.
- Enquanto o compilador traduz para uma linguagem de baixo nível (linguagem de máquina), o transpilador traduz para outra linguagem de alto nível, perde em desempenho, mas aumenta a compatibilidade entre versões.
- transpilar NÃO gera um executável sendo necessário ser processado num ambiente de execução externo, não gera um `.exe` pronto.

**Porque escolher o TypeScript?**
- Facilidade entender o tipo de dados que esta sendo recebido ou passado.
- Documentação esta disponível direta no código com análise de tipagem e erros, em tempo de compilação.
- Reconhecer erros antecipadamente
- Blindar o código de alterações fora do padrão do projeto, ajudando na manutenção.

**`tsconfig.json`**: Arquivo mais importante onde colocamos as propriedades que indicaram como nosso transpilador vai atuar.

`node a.js` : Node.js normalmente o servidor que usamos para rodar os programas em JS. Outra forma é embedar num script HTML.

**`number`**: Em TS number representa todos os numéricos, hexadecimal, octal, float, decimal e demais.

**`BigInt`**: Para números maior que `2^53` , em Javascript usa-se `n`    após o número para representar um número grande, ou a classe `BigInt`.

**`Symbol`**
- tipo primitivo e imutável que cria um identificador único, nunca igual a outro, mesmo que tenha a mesma descrição.
- Símbolos são usados como chaves para propriedades de objetos, evitando conflitos de nome.
- Podem ser usados em tipos de união e para a criação de enums "imutáveis".
```ts
// Idéia basica
const meuObjeto = {
	[Symbol('id')]: 123
};
```

Typescript infere o tipo com base no valor de inicialização **`type inference`**  e recusa reatribuir outros tipos posteriormente

**`explicit with types`**: Indicado quando o tipo não é obvio indicar a tipagem.

`special types`: Aqueles que não são primitivos como string, number.

**`any`**: diz pule a verificação de tipo, ignorando recursos de segurança. Pode se usar quando o recurso é dinâmico, desconhecido e será `re-tipado` posteriormente.

`"strict": true`  habilita o `noImplicitAny`: Compilar não inclui mais automaticamente any, em propriedades não tipadas, passando a responsabilidade ao dev.\
`"noImplicitAny": true.`  Isso fará com que o compilador do TypeScript emita um erro sempre que não conseguir inferir um tipo e precisar usar `any` implicitamente.

**`unknown`**: idem `any`, mas não desabilita a verificação de tipo.\
Aqui por marcar com este tipo entende que o tipo retornado não é confiável, e deve ser verificado com `typeof` na maioria das ocasiões.\
Pode se usar `type assertion` com a keyword `as` que desativa as verificações e permite realizar operações.

**`never`**: valores que nunca ocorrem, como uma função que lança um erro `throws`.

**`? ou undefined`**: variável não declarada

**`null`**: nenhum valor ou objeto, valor nulo.

 `strictNullChecks`: Obriga a verificar este tipos antes de usar.

**`?? (undefined or null)`** : `const value = input ?? 'default` - nullish coalescence.

**`(?.) optional chaining`**:  `const street = user?.address?.street`

**`readonly`**: não pode-ser alterado depois de criado.

**`tuple`**:  é uma matriz pré-definida, na ordem dos parâmetros e quantidade.
`let ourTuple: [number, boolean, string];` aceita nessa ordem apenas.

Desestruturando **objetos**, adicionando valore padrão e incluindo alias.\
`let {firstName, lastName: name, country = "US"} = person;`\
`[firstName, lastName] = [lastName, firstName];`

**Arrays** pode acessar por índices, skipping values e por ordem
```ts
const fruits = ["Bananas", "Oranges", "Apples", "Mangos"];
let [var_banana, var_orange] = fruits;
let [var_banana,,,var_mangos] = fruits;
let {[0]:var_bananas ,[2]:var_apples} = fruits;

let name = "W3Schools";
let [a1, a2, a3, a4, a5] = name; // chars
```

**`...rest`**: o restante dos valores numa desestruturação.

Utilize `const` para criar objetos, isso permite instanciar novos objetos, mas evita alterar o objeto inicial.

Diferença entre let e const
- `let`  declara variáveis que podem ter seu valor atualizado,
- `const ` declara constantes que não podem ter seu valor redefinido após a atribuição inicial.
- let e const têm escopo de bloco
- `var` tem escopo de função (ou global), o que pode levar a comportamentos inesperados e erros.
- As convenções modernas recomendam evitar var e preferir let e const.

Objetos podem ser acessados de duas formas
```ts
objectName.propertyName
objectName["propertyName"]
```

**Assinaturas de índice (index signatures)** em TypeScript servem para definir **tipos de objetos cujas chaves NÃO são conhecidas antecipadamente**, mas seguem um padrão.\

**`Record<string, number>`** é um tipo utilitário faz a mesma coisa, porém mais conciso e idiomático.

Use an index signature for **flexible/dynamic keys** and when mixing with other properties.  
Use `Record<K, T>` for **concise simple** mappings.\

Ambos servem para representar dicionários (chave/valor), quando um objeto guarda algo dinâmico por exemplo categorias, filtros, contadores, caches, etc.

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

> 📍 Em javascript a chave sempre é convertido para `string`, se quiser manter números use `arrays` ou `Map`.

Vantagens de usar **`Map`**
- chaves são números sem conversão
- garante a ordem de inserção
- permite qualquer tipo de chave, inclusive funções, objetos e tipos customizados.
- desvantagem é levemente pesado que um objeto puro. (internamente é um hash complexo)

**`enum`** - chaves sempre string, valores string ou numérico.
```ts
enum StatusCodes {
  NotFound = 404,
  Success = 200,
  Accepted = 202,
  BadRequest = 400
}
console.log(StatusCodes.NotFound); // 404
```

Type aliases, tipos customizados e interfaces.

Permitem realizar operações com objetos como união, intersecção e extender a tipos não primitivos
```ts
type Filme = string;
type Nota = number;
type Avaliacao = {
	filme: Filme,
	nota: Nota
}
const nota: Nota = 10;
const oscar: Avaliacao = {
	filme: "Cidade de Deus",
	nota: nota
}
console.log(oscar); //  { filme: "Cidade de Deus", nota: 10 }

```

Union (| - Or) com interseção (& - And, Both) de Tipos
```ts
// union
type Publico = { tipo: string; };
type AvaliacaoConjunta = Especialistas & Publico; // union
const notaConjunta: AvaliacaoConjunta = {
	filme: "Cidade de Deus",
	nota: 10,
	tipo: "21 anos",
};
console.log(notaConjunta); // { filme: 'Cidade de Deus', nota: 10, tipo: '21 anos' }
```

**Diferença entre `interface` e `type`:**
- **permite extensão futura com `extends` - contrato extensível**
- interfaces podem-se **fundir ao ser redeclará-la** (merging) - contexto que evoluem
	- type se redeclarar ele dá erro `"Err. Duplicate identifier Pessoa"`
- interfaces só com objetos, types tb com funções, tuplas e types aliases (customizados)

**Herança:** As duas formas produzem o mesmo resultado, mas `interface` usa a palavra-chave `extends`, enquanto `type` faz a interseção manual (`&`).

**merging de interfaces** - **`extends`** Quando você declara `interface Pessoa` duas vezes, o TypeScript **não substitui** a anterior — ele **funde** as definições, mesmo tendo criado Funcionário antes ele altera também a definição deste.\
Isso é diferente de `type`, que é **imutável** — se você tentasse o mesmo com `type Pessoa`, daria erro.

`&` - todas as propriedades disponíveis a todos
`|` - pode ser uma ou outra propriedade, conforme o objeto.

Lembrando ambos pode ser extensíveis, porém interface deve usar extends, types deve usar merging com `& or |`.

`...rest` : num objeto pegar o restante dos parâmetros

`(x:tipo) => tipo` - arrow functions forma inline para definir funções

`as` não converte o valor de fato, por isso 4 não se torna "4", evite erros ao utilizar.\
`console.log(4 as string); // erro 4 não é o mesmo que 'quatro' ou "4"`

3 tipos de visibilidade de membros de uma classe
- private: dentro da classe
- public: qualquer local externo
- protected: interno e classes que herdem atributos `extends`

`this` - refers to what?
- sozinho `return this` - ao objeto global
- numa função, tb ao objeto global
- numa função com `strict mode`, this é `undefined`
- num objeto, this se refere ao objeto
- num evento, a quem o chamou.

Ative a configuração `noImplicitOverride`, para forçar a declaração de `override`.

`abstract class` - classes que servem de base e não obrigam a implementar todos os métodos.\
Não pode implementar diretamente é (em java usaria new), tem que extender para usar


**Built-in functions**

`call` - chamar um método nomeado, armazenado num objeto `person.getName.call(x)`

`apply` - igual call mas passa um `array` como argumentos, a assinatura muda.

`bind` - idem mas a assinatura da função(), não os valores (pode-se acessar a assinatura para ver o valor)\
muito usado em `callbacks` , quando por exemplo colocamos o método no `setTimeout` para definir para onde o gatilho deve disparar após x segundos.

**Generics**

Generics em TypeScript permitem criar **códigos reutilizáveis e tipados de forma flexível**.

Se adapta ao tipo de dado recebido (função identidade), útil para reuso de código, que pode receber vários tipos.

`<T>` é o parâmetro genérico. O TypeScript infere o tipo com base no valor passado.\
 **tipo `<T>` será definido em tempo de execução.**

```ts
function identidade<T>(valor: T): T {
  return valor;
}

function createPair<S, T>(v1: S, v2: T): [S, T] | void {
  return [v1, v2];
}

// default é string, mas redefina como number
class NamedValue<T = string> {
  private _value: T | undefined;
  constructor(private name: string) {}
...c
const value = new NamedValue<number>('myNumber'); // set constructor

// tipo indefinido na declaração
type Wrapped<T> = { value: T };

// extends - LIMITA APENAS AOS TIPOS string | number, boolean não é permitido.
function createLoggedPair
  <S extends string | number, T extends string | number>
  (v1: S, v2: T): [S, T] {
    return [v1, v2];
}

```
**extends com conditional types.**
```ts
// Conditional types (runtime illustration)
type IsString<T> = T extends string ? true : false;
type ArrayElement<T> = T extends (infer V)[] ? V : never;

const b: IsString<boolean> = false;
const s: IsString<string> = true;
const a : ArrayElement<string[]> = "array";
```


**Tipos utilitários**: Alteram o retorno chaves, valores e tipos num objeto.

> 🪏 Outra cilada em entrevistas, pergunta um dos tipos utilitários sem contexto nenhum.

- `Parcial`: Altera **todas as propriedades** de um objeto para que **sejam opcionais**.
- `Required`: **Oposto de** `Partial`. Torna obrigatório até os atributos marcados com `?`
- `Record`: `Record<string, number>` Atalho para definir os tipos específicos tanto para chave quanto para valor, o mesmo que `{ [key: string]: number }`
- `Omit`: remove as chaves declaradas
- `Exclude`: remove os tipos declarados (numa união de vários tipos)
- `Pick`: pega apenas as chaves declaras
- `ReturnType`:  retorna o/os tipos de retorno (função geralmente)
- `Parameters`: retorna tipos dos parâmetros (função geralmente)
- `Readonly`: torna o objeto inalterável, mas instanciável.

**`keyof`**: extrai o tipo da chave.

Assim como o `extends` é usado em *generics* para limitar a apenas os tipos declarados\
**`keyof` diz somente os tipos do objeto referenciado**
```ts
interface Person {
  name: string;
  age: number;
}
function printPersonProperty(person: Person, property: keyof Person) {...}

interface ApiResponse {
  data: unknown;
  status: number;
  message: string;
  timestamp: number;
}
type FormattedResponse<T> = {
  [P in keyof T]: T[P] extends number ? string : T[P];
};
```

Diz converta todas as chaves recebidas de `T` e altere para `boolean`.
```
[K in keyof T]: boolean;
```


`strictNullChecks` - pode default ele não é habilitado, habilite para checagem de pontos nulos ou indefinidos no código.

`?` - usamos para evitar erros em pontos nulos ou indefinidos, *optional chaining*.

`nulish coalescing ??`  -  se for undefined ou null exibe o valor senão o valor a direita
```ts
console.log(`Mileage: ${mileage ?? 'Not Available'}`);
printMileage(null); // Prints 'Mileage: Not Available'
printMileage(undefined); // Prints 'Mileage: Not Available'
printMileage(0); // Prints 'Mileage: 0'

console.log(0 ?? "null or undefined"); // Error Right operand of ?? is unreachable because the left operand is never nullish.
```
```ts
var a: unknown;
console.log(a ?? "undefined"); // undefined
a = null;
console.log(a ?? "null"); // null
a = "my value";
console.log(a ?? "null or undefined"); // my value
```

`!` -  **operador de asserção não nula** (_non-null assertion operator_).

O TypeScript **não reclama**, porque `b!` força o compilador a ignorar o risco de `b` ser `null`.

Mas em tempo de execução, o **JavaScript real não liga pra isso** — ele vai tentar acessar `.length` de `null` e lançar erro (`TypeError: Cannot read properties of null`).

Obs: se declara como `any`, O tipo `any` **desliga completamente o sistema de tipos**.\
Por isso o compilador **não valida nada** — nem se `b` é `null`, nem se `.length` existe.
```ts
let b: string | null = null;
console.log(b.length);  // erro: 'b' pode ser null
console.log(b!.length); // compila, mas pode quebrar em runtime
```



**`.d.ts`**

(Declaration Files) são usados para **declarar tipos**, **sem gerar JavaScript** na saída.\
Eles servem para **descrever a forma do código**, não implementá-lo.

- `.ts` → contém código + tipos (gera JS).
- `.d.ts` → contém **somente tipos** (não gera JS).

`include` localizado no `tsconfig.json` , será o local onde todos os arquivos poderão ser vistos e incluídos para usar definições e usos de tipos.

Serve para criar tipos globais, separar o tipo da implementação, descrever como será a forma do código e não a implementação.

Recomendação da doc oficial: *"Keep your type definitions in .d.ts files"*



**Mapped Type Modifiers (tipos mapeados `+` e `-`)**

Sinais **`+`** e **`-`** são chamados de **modificadores de mapeamento** no TypeScript.

Servem para **adicionar ou remover modificadores** (`readonly` e `?`) das propriedades de um tipo.

Exemplo adicione `readonly` e removendo `?`\
`type ReadonlyRequired<T> = {  +readonly [K in keyof T]-?: T[K]; };`

`as` - Forçar um tipo desejado\
Funções dinâmicas serão criadas no tipo informado por `keyof`\
`[K in keyof T as `get${Capitalize<string & K>}`]: () => T[K];`

[**`infer`**](https://www.typescriptlang.org/docs/handbook/2/conditional-types.html#inferring-within-conditional-types)

Chamado **Inferring Within Conditional Types**, por aparecer em expressões coalescence `x?true:false`

- Inferir, deduzir, induzir, retorno futuro será o mesmo tipo
- `infer` declara uma variável temporária de tipo `R`
- Guarde em `R` o tipo de retorno de uma função.
- Conhecido com extração de tipo
- Documentação oficial indica usar inferências de tipos, por infer funcionar de forma diferentes em contextos complexos, facilitando o entendimento.

```ts
type Elemento<T> = T extends (infer U)[] ? U : never;

type A = Elemento<string[]>;  // string
type B = Elemento<number[]>;  // number
type C = Elemento<boolean>;   // never (não é array)

// o mesmo que, o ganho maior é no retorno de funções.
type Elemento<T> = T extends string ? true : false;
```

Template string, adicionado na versão 4.1+ on type definitions
```ts
// Style pattern with unions
type Color = "red" | "green" | "blue";
type Size = "small" | "medium" | "large";
type Style = `${Color}-${Size}`;

const examples: Style[] = ["red-small", "green-medium", "blue-large"];
console.log(JSON.stringify(examples));
```

**Types with Types Recursively**

Pode-se definir um tipo e já usá-lo na mesma definição.

```ts
// Nested comments
type Comments = {
  id: number;
  replies?: Comments[]; // recursive access, itself
  createdAt: Date;
};
// exemplo de uso
const commentary = {
  id: 1,
  createdAt: new Date()
}
const a:Comments = {
  id: 0,
  replies: [commentary],
  createdAt: new Date()
}
console.log(a);
/*{
  id: 0,
  replies: [ { id: 1, createdAt: 2025-10-16T18:47:45.945Z } ],
  createdAt: 2025-10-16T18:47:45.945Z
}*/
```

**Type Guards**

Modo de dizer que existem ferramentas na linguagem para validar se o tipo esta dentro do permitido.

Type Guards: `is, typeof, instanceof, in, asserts, custom types, etc...`

**`instanceof`** verifica se um objeto é uma instância de uma classe específica ou função construtora.\
Como quando podemos chamar usando duas classes e queremos qual delas esta sendo usada.
```ts
class A {}
class B {}
function F(param: A | B) {
  if (param instanceof A) {
	  // call polimorfic function of A
  }
}
```

**`is`** : no retorno de função torna-se um boolean já que não se pode usar ==
```ts
// assumo que param é string, se for number tem que ser undefined
function A(param: string | number): param is string {
  return (param as number) == undefined;
}
```

**`in`** - a propriedade pertence ao objeto `"value" in Object`.

**`asserts`** - utilizada em assertion functions, no retorno da função.

`asserts value is string` - assuma que o valor é string, exceto se a função gerar um erro (óbvio).\
diferença é que aqui ele altera o fluxo de controle, assumindo o tipo a partir dali em todo o código, não apenas no uso.

**`namespaces`**  anteriormente conhecido como módulos internos.

use comentários de referência
```ts
// ----- on **main.ts** file ----- //
/// <reference path="validators.ts" />
```

use `new` para iniciar um namespace, assim como em classes.
use `export` dentro das namespaces para exports `inner namespaces`.
```ts
namespace VeryLongNamespace {
  export namespace DeeplyNested {
    export namespace Components {
      export class Button {
        display(): void {
          console.log("Button displayed");
        }}}}}

// With namespace alias
import Components = VeryLongNamespace.DeeplyNested.Components;
const button2 = new Components.Button();
button2.display();
```

**modules vs namespaces**

 - prefira módulos
 - módulos usa arquivos bem nomeados para organizar
 - módulos carregados nativamente
 - todos os arquivos são módulos
 - namespace incentiva global, módulos evita global
 - namespace melhor em bibliotecas legadas

`declare namespace` - adicionar mais detalhes ao mesmo namespace em locais diferentes.\
typescript faz um union igual em interface.


First line of Interface can be used to limit types of interface
```ts
interface ConflictingTypes {
  [key: string]: number;
  name: string; // Error: Property 'name' of type 'string' is not assignable to 'string' index type 'number'.
}

interface FixedTypes {
  [key: string]: number | string;
  name: string; // OK
  age: number; // OK
}
```


**Typescript Merging**\
Em typescript para **unir** basta usar o mesmo nome e mesma categoria.\
Podem ser usados em `class` and `interface`,  `enum`,  `functions`, `namespace`, `declare namespace`.

```ts
// Function overloads
function processValue(value: string): string;
function processValue(value: number): number;
function processValue(value: boolean): boolean;

// Implementation that handles all overloads
function processValue(value: string | number | boolean): string | number | boolean {
```


**Promise Combination Methods**
- `Promise.all()` - **Espera todas as promises** se resolverem
- `Promise.allSettled()` - **Espera todas as respostas** com sucesso ou erro
- `Promise.race()` - Retorna a primeira resposta bem sucedida
- `Promise.any()` - Retorna a primeira resposta com sucesso ou erro


**Generator  `function* + yield`**
Esse `*` logo após o `function` indica que a função é um **generator function**.\
Quando você combina com `async`, vira um **async generator function**.

Yield quer dizer "colheita, produzir", somente pode ser usada numa função geradora com asterisco.

Função que vai devolvendo valores, aos poucos ao declarar **`yield`, é como um retorno parcial**

Se colocar `async` na função logicamente ela vai entrar uma promise, podendo usar `await`

```ts
function* contador() {
  yield 1;
  yield 2;
}

for (const valor of contador()) {
  console.log(valor);
}
```

**Typescript Decorators**:  Pode-se criar decorators a partir de classes, funções, propriedades, parâmetros.

Performance overhead: Tenha cuidado com decoradores que adicionam sobrecarga significativa de tempo de execução em código de desempenho crítico.

necessário ativar no `tsconfig.json` na diretiva `"experimentalDecorators": true`

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
```


🪏 Pegadinha o que ocorre quando ativa `strick: true` nas configurações do *TypeScript*?
`"strict": true, // ativa o modo estrito`
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

Em vez de usar `any` use `T` com generic types, se o valor é primitivo use `unknown`, mas nunca desative a verificação usando `any`


**Convenção de nomes recomendada para TypeScript/JavaScript**:
* **Arquivos** → sempre **kebab-case ou lowercase com ponto separando contextos** (`user.service.ts`)
* **Classes/Tipos** → `PascalCase` (`UserService`, `User`)
* **Variáveis/funções** → `camelCase` (`userService`, `getUser`)
```ts
// Good
user.service.ts // Service classes
user.model.ts // Type definitions
user.controller.ts // Controllers
user.component.ts // Components
user.utils.ts // Utility functions
user.test.ts // Test files

class UserService
function userService
```

**Use const assertions** para explicitar que são propriedades **readonly**\
Toda vez que usamos const já estamos definindo que é readonly!
```ts
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




**🪏**  **Callback hell 😈**, outra perguntinha maldita sempre presente.

Inicia com um código aninhando demais, ao colocar o retorno de uma função dentro do retorno de outra função (neste ponto não há await, ou promises.)

1. **evite usar promises encadeadas**, onde o retorno de um `then` é usando no retorno da próxima
	1. `then(v=>f(v)).then().catch();`
	2. Isso causa um **promise hell**, não sendo a melhor escolha.
2. **prefira usar async/await, melhor solução**
```ts
async function main(){
	// sempre recomendado envolver com try/catch
	const a = await hello(0);
	const b = await hello(a);
	const c = await hello(b);
}
```
3. **excelente se puder usar `promises combinators`**, `all`, `allSetled`, `race`,`any`
	1. **Utilize apenas se as tarefas podem rodar paralelamente**
	2. `const [res1, res2] = await Promise.all([doSomething(), doSomethingElse()]);`

**Promise hell é a segunda etapa,** é a forma que alguns corrigem um **callback hell** gerando outro **código também aninhado, em pirâmide**.




















