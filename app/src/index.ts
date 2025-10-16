console.log('Hello World 🌍...');




// Style pattern with unions
type Color = "red" | "green" | "blue";
type Size = "small" | "medium" | "large";
type Style = `${Color}-${Size}`;

const examples: Style[] = ["red-small", "green-medium", "blue-large"];
console.log(JSON.stringify(examples));















