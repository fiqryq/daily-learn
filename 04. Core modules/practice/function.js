const fs = require("fs");

function tulisFile() {
  const payload = "file ini ditulis menggunakan metode asynchronous";
  fs.writeFile("data/file.txt", "payload", (e) => {
    if (e) {
      console.log("file gagal ditulis");
    } else {
      console.log("file berhasil ditulis");
    }
  });
  return payload;
}

module.exports = tulisFile;
