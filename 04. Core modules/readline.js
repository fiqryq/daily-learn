const readline = require("readline");
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

rl.question("Tulis nama kamu : ", (nama) => {
  console.log(`hallo nama saya ${nama}`);
});
