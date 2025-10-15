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

Em javascript a chave sempre é convertido para `string`, se quiser manter números use `arrays` ou `Map`.

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

