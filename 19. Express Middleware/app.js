const express = require("express");
const app = express();
const route = require("./Routes/index");
const port = 3000;

app.use("/", route);

app.listen(port, () => {
  console.log(`App runing at ${port}`);
});
