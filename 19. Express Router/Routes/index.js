const express = require("express");
const router = express.Router();

// Middleware
router.use((req, res, next) => {
  console.log("Hello from middleware bird");
  next();
});

router.get("/", (req, res) => {
  res.send("Hello World");
});

router.get("/about", (req, res) => {
  res.send("Hello from about");
});

module.exports = router;
