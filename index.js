//Node.js learning!!

const fs = require("fs");
const http = require("http");
const path = require("path");
const htmlPaths = path.join(__dirname, "files");
let finalDest;

http
  .createServer((req, res) => {
    switch (req.url) {
      case "/":
        finalDest = path.join(htmlPaths, "index.html");
        break;
      case "/about":
        finalDest = path.join(htmlPaths, "about.html");
        break;
      case "/about-us":
        res.statusCode = 302;
        res.setHeader("Location", "/about");
        res.end();
        break;
      default:
        finalDest = path.join(htmlPaths, "notFound.html");
        res.statusCode = 404;
        break;
    }
    fs.readFile(finalDest, (err, data) => {
      if (err) {
        console.log(err);
        res.end();
      } else {
        res.write(data);
        res.end();
      }
    });
  })
  .listen(5000);
