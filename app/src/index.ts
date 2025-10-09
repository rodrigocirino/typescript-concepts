type Pessoa = {
  nome: string;
}
type Funcionario = Pessoa & {
  nome: string
  cargo: string;
}
type NewPessoa = Pessoa &  { idade: number }

const p: NewPessoa = { nome: "Ana", idade: 30 }; // ok
const f: Funcionario & NewPessoa = { nome: "Ana", cargo:"Professor", idade: 30 }; // ok
console.log(f); // ok
