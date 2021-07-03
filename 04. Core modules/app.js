const fs = require("fs");

// menulis file secara synchronous
try {
  fs.writeFileSync("data/file.txt", "File ditulis dengan synchronous method");
} catch (error) {
  if (error) {
    console.log("File gagal ditulis");
  } else {
    console.log("FIle berhasil ditulis");
  }
}

// read file secara synchronous
try {
  const data = fs.readFileSync("data/file.txt", "utf-8");
  console.log(data);
} catch (error) {
  console.log(error);
}

// menulis file dengan asynchronous method
fs.writeFile(
  "data/asyncfile.txt",
  "File ditulis dengan asynchronous method",
  (err) => {
    if (err) {
      console.log("File gagal ditulis");
    } else {
      console.log("File berhasil ditulis");
    }
  }
);
