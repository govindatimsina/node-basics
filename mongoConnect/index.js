const express = require("express");
const app = express();
const path = require("path");
const finalPaths = path.join(__dirname, "dirFiles");

//database
const mongoose = require("mongoose");
const mongodb =
  "mongodb+srv://govin17:t6iSN0EKqSPX8acm@cluster0.unsjdql.mongodb.net/item-databasae?retryWrites=true&w=majority";
mongoose
  .connect(mongodb)
  .then(() => {
    console.log("db connected");
    app.listen(5000);
  })
  .catch((err) => console.log(err));

//middleware for sending post request in the database.
app.use(express.urlencoded({ extended: true }));

//importing model
const Item = require("./models/item");

//updating data
// const newItem = new Item({
//   name: "Iphone",
//   price: 999,
// });
//saving data
// newItem.save();

//getting data
// Item.find()
//   .then((users) => {
//     console.log("Matching users:", users);
//   })
//   .catch((err) => console.log(err));

//express routing
app.get("/", (req, res) => {
  res.sendFile(`${finalPaths}/index.html`);
});

app.get("/about", (req, res) => {
  res.sendFile(`${finalPaths}/about.html`);
});
app.get("/addItems", (req, res) => {
  res.sendFile(`${finalPaths}/items.html`);
});
app.post("/items", (req, res) => {
  console.log(req.body);
  const newItem = Item(req.body);
  newItem
    .save()
    .then(() => {
      res.redirect("/");
    })
    .catch((err) => console.log(err));
});

app.use((req, res) => {
  res.sendFile(`${finalPaths}/notFound.html`);
});
