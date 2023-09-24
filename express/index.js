const express = require("express");
const app = express();
const path = require("path");
const finalPaths = path.join(__dirname, "dirFiles");

app.get(
  "/",
  (req, res, next) => {
    console.log("THe response will be sent by next file.");
    next();
  },
  (req, res) => {
    res.sendFile(`${finalPaths}/index.html`);
  }
);

app.get("/about", (req, res) => {
  res.sendFile(`${finalPaths}/about.html`);
});

app.listen(4000);
