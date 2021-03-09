const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

const app = express();

app.set("view engine", "ejs");

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

mongoose.connect("mongodb://localhost:27017/wikiDB", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const articlesSchema = {
  title: String,
  content: String,
};

const Article = mongoose.model("Article", articlesSchema);

// const article1 = new Article({
//   title: "REST",
//   content:
//     "REST is short for representational state transfer, it is an artchetural style for designing apis",
// });

// const article2 = new Article({
//   title: "API",
//   content: " stands for application programing interface",
// });

// const article3 = new Article({
//   title: "Bootstrap",
//   content: "A CSS framework developed by twitter",
// });

// const defaultArticles = [article1, article2, article3];

// Article.insertMany(defaultArticles, function (err) {
//   if (err) {
//     console.log(err);
//   } else {
//     console.log("Successfully savevd default items to DB.");
//   }
// });

//chaining route
app
  .route("/articles")
  .get((req, res) => {
    Article.find((err, foundArticle) => {
      if (!err) {
        console.log(foundArticle);
        res.send(foundArticle);
      } else {
        console.log(err);
        res.send(err);
      }
    });
  })
  .post((req, res) => {
    const title = req.body.title;
    const content = req.body.content;
    console.log({ title, content });

    const newArticle = new Article({
      title,
      content,
    });
    newArticle.save(function (err) {
      if (!err) {
        res.send("successfully added new articles");
      } else {
        res.send(err);
      }
    });
  })
  .delete((req, res) => {
    Article.deleteMany((err) => {
      if (!err) {
        console.log("successfully deleted all articles");
        res.send("all articles successfully deleted");
      } else {
        console.log(err);
        res.send("error occured");
      }
    });
  });

////////////////////////////////////////////////////////////////////////
//routeing for specific item
app.route("/articles/:articleTitle").get((req, res) => {
  const title = req.params.articleTitle;
  Article.findOne({ title }, (err, foundArticle) => {
    if (foundArticle) {
      res.send(foundArticle);
    } else {
      res.send("no article was found");
    }
  });
});

//create a get route to fetch all of our articles
// app.get("/articles", (req, res) => {
//   Article.find((err, foundArticle) => {
//     if (!err) {
//       console.log(foundArticle);
//       res.send(foundArticle);
//     } else {
//       console.log(err);
//       res.send(err);
//     }
//   });
// });

// //create a post route
// app.post("/articles", (req, res) => {
//   const title = req.body.title;
//   const content = req.body.content;
//   console.log({ title, content });

//   const newArticle = new Article({
//     title,
//     content,
//   });
//   newArticle.save(function (err) {
//     if (!err) {
//       res.send("successfully added new articles");
//     } else {
//       res.send(err);
//     }
//   });
// });

// //delete all articles
// app.delete("/articles", (req, res) => {
//   Article.deleteMany((err) => {
//     if (!err) {
//       console.log("successfully deleted all articles");
//       res.send("all articles successfully deleted");
//     } else {
//       console.log(err);
//       res.send("error occured");
//     }
//   });
// });

app.listen(3000, function () {
  console.log("Server started on port 3000");
});
