const { createCanvas, loadImage } = require("canvas");
const express = require("express");
const app = express();
const port = 3000;

// canvas
const canvas = createCanvas(500, 500);
const ctx = canvas.getContext("2d");

ctx.font = "30px Impact";
ctx.fillText(
  "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum",
  50,
  100
);

app.get("/", (req, res) => {
  // Draw cat with lime helmet
  //   loadImage("images/white.jpeg").then((image) => {
  //     ctx.drawImage(image, 500, 500, 500, 500);
  //     res.send(canvas.toDataURL());
  //   });
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
