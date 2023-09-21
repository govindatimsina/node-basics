//Node.js learning!!

const fs = require("fs");
const http = require("http");
const path = require("path");
const htmlPaths = path.join(__dirname, "files");
let finalDest;

http
  .createServer((req, res) => {
    //routing without using express
    switch (req.url) {
      case "/":
        console.log(req.url);
        finalDest = path.join(htmlPaths, "index.html");
        res.statusCode = 200;
        res.statusMessage = "errrrr";
        break;
      case "/about":
        finalDest = path.join(htmlPaths, "about.html");
        res.statusCode = 200;
        res.statusMessage = "Successful return of about page";
        res.end();
        break;
      case "/about-us":
        res.statusCode = 304;
        res.setHeader("Location", "/about");
        res.end();
        break;
      default:
        finalDest = path.join(htmlPaths, "notFound.html");
        res.statusCode = 404;
        res.statusMessage = "errrrr";
        break;
    }

    fs.readFile(`${finalDest}`, (err, data) => {
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
