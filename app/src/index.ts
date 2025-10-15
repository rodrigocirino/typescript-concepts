let b: string | null = null;
console.log(b!.length);  // erro: 'b' pode ser null
console.log(b.length); // compila, mas pode quebrar em runtime
