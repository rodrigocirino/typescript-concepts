# typescript-concepts

## Typescript: construção de uma API com tipagem segura

> [Source Code](https://github.com/alura-cursos/typescript-para-backend/tree/aula-5)

#### Converter JS para TS.

Altere a extensão de todos os arquivo de JS para TS.

Exportando os arquivo js **para uma pasta** `build`

```json
"compilerOptions": {
	"outDir": "./build",
},
```

Compile e **instale dependências**
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

Pode usar **tsc-watch** para compilar automaticamente
```json
"scripts": {
	"start": "tsc-watch --onSuccess \"node build/server.js\""
},
// npm start
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
```typescript
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

**`any`**: desabilita a verificação de tipos estáticos para essa variável.
```typescript
let variavelQualquer: any = "Isso pode ser qualquer coisa";
```

**`unknown`**: semelhante ao `any` porém **não desabilita a verificação estática**.\
No entanto, o `unknown` é mais seguro do que o `any`, pois não é possível realizar operações arbitrárias sobre ele **sem primeiro fazer uma verificação de tipo** ou conversão explícita.\
É útil quando você recebe valores de origens externas ou quando não tem certeza sobre o tipo de dado que será manipulado, mas deseja garantir a segurança de tipos em seu código.
```typescript
let valorDesconhecido: unknown = 10;

// Para usar o valor desconhecido de forma segura, é necessário verificar e converter o tipo.
if (typeof valorDesconhecido === "number") {
    let numero: number = valorDesconhecido;
    console.log(numero); // Agora você pode usar 'numero' com segurança
}
```

**`never`**: indica situações que impossíveis ou que um valor nunca ocorre, incorreto.\
É usado principalmente em situações em que uma função nunca retorna (lança uma exceção ou entra em um loop infinito) ou em que uma variável nunca pode ter um valor válido.
```typescript
function lancaErro(mensagem: string): never {
    throw new Error(mensagem);
}

function loopInfinito(): never {
    while (true) {}
}
```

**`symbol`**\
o tipo `symbol` representa um tipo **primitivo único e imutável** frequentemente usado para criar identificadores únicos em objetos. Cada valor `symbol` é exclusivo e não pode ser igual a outro `symbol`, tornando-o ideal para chaves de propriedades de objetos.
```typescript
const chave1: symbol = Symbol("chave-única");
const chave2: symbol = Symbol("chave-única"); // Chaves diferentes
let objeto: { [chave1]: string } = {};
objeto[chave1] = "Valor associado à chave1";
```

**`undefined`**\
Uma variável foi declarada, mas **não recebeu valor**. Também é o valor de retorno padrão de **funções que não retornam nada**.
```typescript
let nome: string | undefined;
console.log(nome); // undefined

function teste() {}
console.log(teste()); // undefined
```

**`null`**\
Um valor foi **explicitamente definido como vazio ou nulo**.
```typescript
let idade: number | null = null;
```

```typescript
undefined == null     // true (comparação solta)
undefined === null    // false (comparação estrita)

let nome: string | undefined; // aceita string ou undefined
let idade: number | null;     // aceita number ou null
```
Se usar `strictNullChecks` (ativado por padrão em projetos modernos), o compilador vai forçar você a tratar esses casos corretamente.

**`Number ou number?`**\
"Number" (objeto/classe com métodos em Javascript)\
"number" (tipo primitivo do Typescript)
```typescript
// Number classe do Javascript para realizar operações aritméticas
const num = new Number(42);
console.log(num.toFixed(2)); // Saída: "42.00"

//Exemplo prático
const entradaUsuario = prompt("Digite um número:");
const numeroEsperado = 42;
const numeroUsuario = Number(entradaUsuario);

// Verifica se o número do usuário é estritamente igual ao número esperado
// operador de igualdade estrita (===)
if (numeroUsuario === numeroEsperado) {
  console.log("Parabéns! Você acertou o número 42!");
} else {
  console.log("Desculpe, você não acertou o número 42. Tente novamente.");
}
```
Em Typescript, `number` é um tipo primitivo que representa valores numéricos, incluindo números inteiros e de ponto flutuante. É usado para declarar variáveis que armazenam valores numéricos.
```typescript
let idade: number = 30;
let preco: number = 9.99;
```

**`enum`**
```typescript
type TipoPet = {
	especie: EnumEspecie;//not string
}
export default TipoPet

const {especie} = <TipoPet>req.body;

enum EnumEspecie {
	CAT="cat";
}
export default EnumEspecie;

if(Object.values(EnumEspecie).includes(especie)){ OK EXISTS }
```

<br>

**`TypeORM`**\
Incluindo banco de dados numa aplicação.
```bash
# https://typeorm.io/docs/getting-started#installation
npm install typeorm
npm install reflect-metadata
npm install @types/node --save-dev
npm install sqlite3 --save

# app.ts
import "reflect-metadata"
# on tsconfig.json
"emitDecoratorMetadata": true,
"experimentalDecorators": true,

# create a new project using CLI
# npx typeorm init --name MyProject --database postgres
# data-source.ts has the credentials to access your database

# if you use entities on Nest.js...
# import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

# no app.ts inicializamos o banco
AppDataSource.initialize()
  .then(() => {
    console.log("DataSouce inicializado com sucesso!");
  }).catch((error: Error) => console.log(error));
```

**`npm install save or save-dev?`**
`--save` instala dependências **para produção** (vão em `dependencies`).  
`--save-dev` instala dependências **só para desenvolvimento** (vão em `devDependencies`).
Obs: Em produção normalmente se usa `npm ci --only=production` ou `npm install --production` para instalar só as `dependencies`.

Relembrando:
O código configura um datasource para o TypeORM em uma aplicação Node.js. Aqui está o que faz em relação  a `entities`, `type` e `database`:

- **`entities`**: define as entidades que serão mapeadas para tabelas no banco de dados. No exemplo, apenas a entidade `PetEntity` está definida para ser usada.    
- `type`: define o tipo de banco de dados, que é "sqlite" neste caso, indicando que um banco de dados SQLite será usado.    
- `database`: especifica o caminho para o arquivo do banco de dados SQLite que será criado/usado, localizado em "./src/config/database.sqlite".    
- **`synchronize`**: quando definido como `true`, permite que o TypeORM crie automaticamente as tabelas do banco de dados com base nas entidades definidas. É útil durante o desenvolvimento, mas deve ser desativado em produção para evitar perda de dados acidentais.    
- `logging`: quando definido como `false`, desativa a saída de log do TypeORM, impedindo que mensagens de log sejam impressas no console, o que serve para manter o ambiente de produção mais limpo e seguro.

Comum criarmos um arquitetura de repositório, onde uma interface define os dados e separa o acesso do banco de dados que podem ser alterados on premisse, da lógica de negócios
```typescript
interface RepositorioDeUsuarios {
    adicionarUsuario(usuario: Usuario): void;
    obterUsuarioPorId(id: number): Usuario | undefined;
    atualizarUsuario(usuario: Usuario): void;
    excluirUsuario(id: number): void;
}
// classe concreta que implementa obrigatoriamente todos os métodos da interface acima.
class RepositorioDeUsuarios implements RepositorioDeUsuarios{
    private usuarios: Usuario[] = [];

    adicionarUsuario(usuario: Usuario): void {
        this.usuarios.push(usuario);
    } .......
```


**`promises`**
Antes das **Promises** usava-se callbacks:
```javascript
// Sem Promise
function pegarDados(callback) {
  setTimeout(() => {
    callback("dados recebidos");
  }, 1000);
}

pegarDados((resultado) => console.log(resultado));
```
Com **Promise**:
```javascript
// Com Promise
function pegarDados() {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve("dados recebidos");
    }, 1000);
  });
}

pegarDados().then((resultado) => console.log(resultado));
```
Resumo: callback é passado como argumento; Promise retorna um objeto que você encadeia com `.then()` (ou usa `async/await`).  

Complementando com **async/await** o mesmo exemplo fica assim:
```javascript
// Com async/await
function pegarDados() {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve("dados recebidos");
    }, 1000);
  });
}

async function executar() {
  const resultado = await pegarDados();
  console.log(resultado);
}

executar();
```
Agora o código parece síncrono, mas continua assíncrono por baixo. Ou seja vemos sequencial mas não bloqueia a thread, ele pausa no async até a promise ser resolvida, e continua quando o resultado chega.

**`arrow functions`**\
Lembrando que arrow function `() = > {} ` não tem relação direta com Promise, mas é muito usada junto porque deixa o código assíncrono mais limpo.

Funções **normais** têm seu próprio `this`, definido pelo **modo como são chamadas**. Arrow functions **não criam** um `this` próprio; elas “herdam” o `this` do escopo onde foram definidas (lexical `this`).

Exemplo prático:
```javascript
const obj = {
  nome: "Rodrigo",
  normal: function() {
    console.log(this.nome); // "Rodrigo"
  },
  arrow: () => {
    console.log(this.nome); // undefined (this é do escopo externo, não do obj)
  }
};

obj.normal(); // Rodrigo
obj.arrow();  // undefined
```

Já dentro de classes ou métodos assíncronos, as arrow functions são úteis para **não perder o `this`**:
```javascript
class Pessoa {
  nome = "Rodrigo";
  
  falarDepois() {
    setTimeout(() => {
      console.log(this.nome); // Arrow herda o this da instância
    }, 1000);
  }
}

const p = new Pessoa();
p.falarDepois(); // Rodrigo depois de 1s
```
Se tivesse usado `function()` normal no `setTimeout`, teria perdido o `this` e dado `undefined`.

Então:  
– Função normal → `this` depende de quem chama.  
– Arrow function → `this` fixo ao escopo léxico onde foi criada.

<br>

Operador `Or`,  `|` no Typescript

```typescript
// tanto vetor quanto uma promise, ou um ou outro.
listaPets(): PetEntity[] | Promise<PetEntity[]>;

// O operador | é usado para criar uma UNIÃO de tipos no TypeScript, permitindo que um valor seja de MAIS DE UM ÚNICO TIPO.
```

**`Partial<Type> vs. Campos Opcionais`**
```typescript
interface Pessoa {
  nome: string;
  idade: number;
  email?: string;
}

type PessoaOpcional = Partial<Pessoa>;

const pessoa: PessoaOpcional = { nome: "Alice" }; // Todos os campos são opcionais
```

```typescript
interface Pessoa {
  nome: string;
  idade?: number; // Tornando a idade opcional
  email?: string; // Uso de campo opcional
}

const pessoa: Pessoa = { nome: "Alice" }; // Uso de campo opcional
```

**`Pick<Type, Keys> vs. Omissão de Propriedades`**
```typescript
interface Pessoa {
  nome: string;
  idade: number;
  email: string;
}

type InfoPessoal = Pick<Pessoa, "nome" | "idade">;

const info: InfoPessoal = { nome: "Bob", idade: 30 };
```

```typescript
   interface Pessoa {
     nome: string;
     idade: number;
     email: string;
   }

   type InfoPessoal = { nome: string; idade: number }; // Escolhendo propriedades diretamente

   const info: InfoPessoal = { nome: "Bob", idade: 30 };
```

**`Exclude<Type, ExcludedUnion> vs. Exclusão de Valores`**
```typescript
type Cor = "vermelho" | "verde" | "azul";
type CoresExcluidas = Exclude<Cor, "vermelho" | "verde">;

const cor: CoresExcluidas = "azul"; // "azul" é o único valor permitido
```

```typescript
type Cor = "vermelho" | "verde" | "azul";
type CoresExcluidas = "azul"; // Exclusão direta de valores

const cor: CoresExcluidas = "azul"; // "azul" é o único valor permitido
```

**`Partial<Type> vs. Campos opcionais`**: Um `Partial` aplica **opcionalidade a todos os campos** de um tipo automaticamente. Campos opcionais, por outro lado, são declarados individualmente, então você tem controle seletivo sobre quais propriedades podem ou não estar presentes. Basicamente, `Partial` é uma forma rápida de dizer “tudo pode faltar”, enquanto campos opcionais são mais precisos e explícitos.

**`Pick<Type, Keys> vs. Omissão de propriedades`**: `Pick` permite **extrair um subconjunto de chaves** de um tipo, criando um novo tipo só com o que você escolheu manter. Omissão (via `Omit`) faz o oposto: você **remove certas chaves** e mantém o restante. É uma questão de perspectiva: “pegue só isso” versus “tire isso”.

**`Exclude<Type, ExcludedUnion> vs. Exclusão de valores`**: `Exclude` é uma operação **estática de tipos** que remove membros de uma união, alterando como o Typescript valida o código. Excluir valores em runtime é apenas lógica de programa; `Exclude` muda a forma como o tipo se comporta durante a compilação, garantindo que certos valores não sejam aceitos.

<br>

`?` torna o campo opcional para o TypeScript

`nullable` torna o campo opcional para o TypeORM.
```typescript
@Column({ nullable: true })
foto?: string; 
@Column({ nullable: true })
endereco?: string; // ? indique opcional
//campos obrigatórios devem ficar antes de opcionais (com e sem ?)
```


[Eager](https://typeorm.io/docs/relations/eager-and-lazy-relations) and [Relations options](https://typeorm.io/docs/relations/relations/#relation-options)

`eager=true` eager relations são carregadas automaticamente toda vez que carrega suas entidades, ou seja permite declarar que sempre que um entidade ser carregada retorne também junto outra entidade.

`eager: boolean` (default: `false`) - If set to true, the relation will always be loaded with the main entity when using `find*` methods or `QueryBuilder` on this entity

```typescript
@ManyToMany((type) => Category, (category) => category.questions, {  
	eager: true,  // <-------EAGER
})  
@JoinTable()  
categories: Category[]  // Category é outra tabela complexa.

const questionRepository = cdataSource.getRepository(Question)  
  
// FIND RETORNA AUTOMATICAMENTE QUESTIONS JUNTAMENTE COM CATEGORIES, OU SEJA INCLUI SEM ESPECIFICAR.
const questions = await questionRepository.find()
```

<br>

`in` verificando se o atribute existe no objeto enum.
```javascript
if (!(porte in EnumPorte)) {
      return res.status(400).json({ erro: "Porte inválido." });
    }
```


<br>

`keyof` [type operator](https://www.w3schools.com/typescript/typescript_keyof.php)

`keyof` cria uma **união** entre suas chaves.\

`keyof` se tornam especialmente úteis quando combinados com tipos mapeados, como interfaces.

```typescript
interface Person {  
  name: string;  
  age: number;  
}  
// `keyof Person` cria uma união das chaves.
function printPersonProperty(person: Person, property: keyof Person) {  
  console.log(`Printing person property ${property}: "${person[property]}"`);  
}  
let person = {  
  name: "Max",  
  age: 27  
};  
printPersonProperty(person, "name"); // Busca a chave `name` e retorna o valor correspondente.
// Veja que é muito útil ao criar funções genéricas
```

```typescript
type StringMap = { [key: string]: unknown };  
// `keyof StringMap` resolves to `string` here  
function createStringPair(property: keyof StringMap, value: string): StringMap {  
  return { [property]: value };  
}
```



<br>

Typescript com **generics**:

Os "generics" permitem criar funções e classes que podem trabalhar com vários tipos de dados sem especificar um tipo específico antecipadamente.

No entanto, ao usar **`any`**, perdemos informações sobre o tipo que está sendo retornado. Em vez disso, podemos usar um **tipo genérico (generics)** para capturar o do argumento e usá-lo como tipo de retorno:

```typescript
function identidade(arg: any): any {
  return arg;
}
```
```typescript
interface ComTamanho {
  length: number;
}

function logarTamanho<Tipo extends ComTamanho>(arg: Tipo): Tipo {
  console.log(arg.length); // Agora o TypeScript sabe que 'arg' tem uma propriedade 'length'.
  return arg;
}

```
```typescript
class Caixa<T> {
  private conteudo: T | null = null;

  guardar(item: T): void {
    this.conteudo = item;
  }

  retirar(): T | null {
    const item = this.conteudo;
    this.conteudo = null;
    return item;
  }
}

// Exemplo de uso da classe Caixa com diferentes tipos
const caixaDeFrutas = new Caixa<string>();
caixaDeFrutas.guardar("Maçã");
console.log(caixaDeFrutas.retirar()); // "Maçã"

const caixaDeLivros = new Caixa<number>();
caixaDeLivros.guardar(5);
console.log(caixaDeLivros.retirar()); // 5
```
Quando você começa a usar generics, o compilador TypeScript garante que você use corretamente os parâmetros genéricos dentro da função. Por exemplo, se deseja acessar a propriedade `.length` de um argumento genérico, é necessário garantir que todos os tipos que serão usados com essa função tenham essa propriedade. Caso contrário, o compilador gerará um erro.






