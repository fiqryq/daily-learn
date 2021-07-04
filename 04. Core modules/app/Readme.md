## description
simple app using file system module and readline for input on terminal , you can write text and it will be save as file.txt and you can also read file asynchronously.

note : sorry for bad english i just learn how to write using english word hehe 

# Revision 
## Old code
issue : everytime new data added it will overwriten not add new data to json

```js
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
      rl.question("Masukan nama anda : ", (nama) => {
        rl.question("Masukan umur anda : ", (umur) => {
          const biodata = [];
          const data = { nama, umur };
          biodata.push(data);
          fs.writeFile("data/file.json", JSON.stringify(biodata), (err) => {
            if (err) {
              console.log("File gagal ditulis");
            } else {
              console.log("Berhasil menulis file");
            }
          });
          rl.close();
        });
      });
    } else if (input == 2) {
      fs.readFile("data/file.json", "utf-8", (err, data) => {
        if (err) throw err;
        console.log(data);
      });
      rl.close();
    }
  }
);
```

## new code
solve issue on top :
1. read data first using (readFile sync / async)
2. parse data value to array using (JSON.parse)
3. push new data to array (data.push(data))
4. write data (writeFile sync / async)

```js
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
      rl.question("Masukan nama anda : ", (nama) => {
        rl.question("Masukan umur anda : ", (umur) => {
          const biodata = { nama, umur };
          fs.readFile("data/file.json", "utf-8", (err, rawData) => {
            const data = JSON.parse(rawData || "[]");
            data.push(biodata);
            fs.writeFile("data/file.json", JSON.stringify(data), (err) => {
              if (err) {
                console.log("File gagal ditulis");
              } else {
                console.log("Berhasil menulis file");
              }
            });
            rl.close();
          });
        });
      });
    } else if (input == 2) {
      fs.readFile("data/file.json", "utf-8", (err, data) => {
        if (err) throw err;
        console.log(data);
      });
      rl.close();
    }
  }
);

```

## review code from my friend (better code)
tips : promise question and readline to avoid [Callback Hell](https://kotakode.com/pertanyaan/527/Apa-itu-callback-hell%3F)

```js
// pakai promises di fs
const { promises: fs } = require("fs");

const readline = require("readline");
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

// promisify fungsi rl.question
const question = (query) => new Promise((resolve) => rl.question(query, resolve));

const run = async () => {
  try {
    const input = await question("Menu \n 1. Tulis file \n 2. Baca file \n\n pilih menu : ");
    if (input == 1) {
      const nama = await question("Masukan nama anda: ");
      const umur = await question("Masukkan umur anda: ");
      const biodata = { nama, umur };

      const rawData = await fs.readFile("data/file.json", "utf-8");
      const data = JSON.parse(rawData);
      data.push(biodata);

      await fs.writeFile("data/file.json", JSON.stringify(data));
      console.log("Berhasil menulis file");
    } else if (input == 2) {
      const data = await fs.readFile("data/file.json", "utf-8");
      console.log(JSON.parse(data));
    }
    rl.close();
  } catch (err) {
    console.error("Terjadi kesalahan: ", err);
  }
};

run();

```
