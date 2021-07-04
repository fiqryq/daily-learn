const { promises: fs } = require("fs");
const readline = require("readline");
const helper = require("./helper");

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const question = (query) =>
  new Promise((resolve) => rl.question(query, resolve));

const app = async () => {
  try {
    const menu = await question("menu \n 1. create file \n select menu : ");
    if (menu == 1) {
      await fs.writeFile(
        "file.txt",
        "Data created at : " + helper.gettimenow()
      );
      console.log("success create file");
    }
  } catch (error) {
    console.log("error", error);
  }
  rl.close();
};

app();
