const express = require("express");
const bodyParser = require("body-parser");
const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));
app.get("/", (req, res) => {
  res.sendFile(`${__dirname}/sign-up.html`);
});

app.post("/", (req, res) => {
  const firstName = req.body.firstName;
  const lastName = req.body.lastName;
  const email = req.body.email;
  console.log({ firstName, lastName, email });
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`server runing on port ${PORT}`);
});

//mailchip api
//bb7d1b027e10a121cb7d54dbbeeb439e-us7
