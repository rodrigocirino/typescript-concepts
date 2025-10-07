# Typescript Summary

[Tutorial TypeScript no Visual Studio Code](https://code.visualstudio.com/docs/typescript/typescript-tutorial)

[How to run ts files with VSCode and Node.js](https://github.com/rodrigocirino/nodejs-template)

### Introdução

**O que é TypeScript?**\
É um `superset` do Javascript que adiciona novas funcionalidades como tipos estáticos.

**Diferença entre transpilar e compilar?**
- Typescript é `transpilado` para Javascript
- Enquanto o compilador traduz para uma linguagem de baixo nível (linguagem de máquina), o transpilador traduz para outra linguagem de alto nível, perde em desempenho, mas aumenta a compatibilidade entre versões.
- transpilar NÃO gera um executável sendo necessário ser processado num ambiente de execução externo, não gera um `.exe` pronto.

**Porque escolher o TypeScript?**
- Facilidade entender o tipo de dados que esta sendo recebido ou passado.
- Documentação esta disponível direta no código com análise de tipagem e erros, em tempo de compilação.
- Reconhecer erros antecipadamente
- Blindar o código de alterações fora do padrão do projeto, ajudando na manutenção.

**`tsconfig.json`**: Arquivo mais importante onde colocamos as propriedades que indicaram como nosso transpilador vai atuar.

**`npx tsc`**  - `TypeScript Compiler` : comando que chama o compilador padrão do TS.

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
**Index signatures** podem ser expressas em **utility types** como **`Record<string, number>`**


```

```














