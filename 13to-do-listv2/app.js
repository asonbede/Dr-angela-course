//jshint esversion:6

const express = require("express");
const bodyParser = require("body-parser");
const date = require(__dirname + "/date.js");
const mongoose = require("mongoose");

const app = express();

app.set("view engine", "ejs");

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

//create a database and connect to it
mongoose.connect("mongodb://localhost:27017/todolistDB", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
//create an item schema
const itemsSchema = new mongoose.Schema({
  name: String,
});

//create an item model/table
const Item = mongoose.model("Item", itemsSchema);

//create new items
const item1 = new Item({
  name: " welcome to your todolist",
});

const item2 = new Item({
  name: "Hit the + button to add new items",
});
const item3 = new Item({
  name: "<-- hit this to remove an item",
});

//create default items array
const defaultItems = [item1, item2, item3];

//insert 3 items inside the Item collection in the todolistDB databas
function insertDefaultItems() {
  Item.insertMany(defaultItems, (err) => {
    if (err) {
      console.log(err);
    } else {
      console.log("default items successfully installed");
    }
  });
}

//create listSchema
const listSchema = new mongoose.Schema({
  name: String,
  items: [itemsSchema],
});
const List = mongoose.model("List", listSchema);

//to read all the items in the database
// Item.find((err, result) => {
//   if (err) {
//     console.log(err);
//   } else {
//     mongoose.connection.close();
//     console.log(result);
//     //result.forEach((item) => console.log(item.name));
//   }
// });

//

// const items = ["Buy Food", "Cook Food", "Eat Food"];
// const workItems = [];

app.get("/", function (req, res) {
  const day = "Today"; //date.getDate();
  Item.find({}, (err, items) => {
    if (err) {
      //console.log(err);
    } else {
      //console.log({ items });
      if (items.length === 0) {
        insertDefaultItems();
        res.redirect("/");
      } else {
        res.render("list", { listTitle: day, newListItems: items });
      }
    }
  });
});

app.post("/", function (req, res) {
  const item = req.body.newItem;
  const listName = req.body.list;
  console.log({ listName });
  if (listName === "Today") {
    const newDBitem = new Item({
      name: item,
    });
    newDBitem.save();
    res.redirect("/");
  } else {
    List.findOne({ name: listName }, (err, founList) => {
      if (err) {
        console.log(err);
      } else {
        founList.items.push(item);
        founList.save();
        res.redirect("/" + listName);
      }
    });
  }

  // if (req.body.list === "Work") {
  //   workItems.push(item);
  //   res.redirect("/work");
  // } else {
  //   items.push(item);
  //   res.redirect("/");
  // }
});

//delete route
app.post("/delete", (req, res) => {
  const checkedItemId = req.body.checkbox;
  console.log(checkedItemId);
  // Item.deleteOne({ _id: checkedItemId }, (err) => {
  //   if (err) {
  //     console.log(err);
  //   } else {
  //     console.log("checkrd item successfully deleted");
  //   }
  // });
  Item.findByIdAndRemove(checkedItemId, function (err) {
    if (err) {
      console.log(err);
    } else {
      console.log("successfully deleted item");
      res.redirect("/");
    }
  });
});

app.get("/:customListName", function (req, res) {
  const customListName = req.params.customListName;
  //check whether a list of that name existe before you create it
  List.findOne({ name: customListName }, (err, foundList) => {
    //list was not found, err is false so !err is true, create it
    if (!err) {
      if (!foundList) {
        console.log({ foundList });
        //create a new list
        const list = new List({
          name: customListName,
          items: defaultItems,
        });
        list.save();
        res.redirect("/" + customListName);
      } else {
        //list was found
        //show existing list
        console.log({ foundList });
        res.render("list", {
          listTitle: foundList.name,
          newListItems: foundList.items,
        });
      }
    }
  });
});

app.get("/about", function (req, res) {
  res.render("about");
});

app.listen(3000, function () {
  console.log("Server started on port 3000");
});
