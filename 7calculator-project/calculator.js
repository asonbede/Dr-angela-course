const express = require("express");
const bodyParser = require("body-parser");
const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.get("/", (req, res) => {
  console.log(__dirname);
  res.sendFile(__dirname + "/index.html");
});

app.post("/post", (req, res) => {
  const num1 = Number(req.body.num1);
  const num2 = Number(req.body.num2);
  const result = num1 + num2;
  res.send(`The result of your calculation is ${result}`);
});

//bmi calculation--------------------------------------
app.get("/bmicalculator", (req, res) => {
  res.sendFile(`${__dirname}/bmiCalculator.html`);
});

app.post("/bmicalculator", (req, res) => {
  const mass = parseFloat(req.body.mass);
  const height = parseFloat(req.body.height);
  //BMI= m/h2
  const BMI = mass / height ** 2;
  res.send(`Your body mass index is ${BMI} kg/m`);
});

const PORT = 3002;
app.listen(PORT, () => console.log("server runing on port 3002"));
