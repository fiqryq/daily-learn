const fs = require("fs");
const readline = require("readline");
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

rl.question(
  "Menu \n 1. Tulis file \n 2. Baca file \n\n pilih menu : ",
  (input) => {
    if (input == 1) {
      fs.writeFile("data/file.txt", "Hello", (err) => {
        if (err) {
          console.log("File gagal ditulis");
        } else {
          console.log("Berhasil menulis file");
        }
      });
      rl.close();
    } else if (input == 2) {
      fs.readFile("data/file.txt", "utf-8", (err, data) => {
        if (err) throw err;
        console.log(data);
      });
      rl.close();
    }
  }
);
