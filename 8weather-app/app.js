const { response } = require("express");
const bodyParser = require("body-parser");
const express = require("express");
const https = require("https");
const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.get("/", (req, res) => {
  res.sendFile(`${__dirname}/index.html`);
});

app.post("/", (req, res) => {
  //console.log(req.body.cityName);

  const query = req.body.cityName;
  const apiKey = "f7c01791d357295d3f41d7ed08665c97";
  const unit = "metric";
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${query}&appid=${apiKey}&units=${unit}`;
  https.get(url, (response) => {
    // console.log(response);
    response.on("data", (data) => {
      const weatherData = JSON.parse(data);
      const temp = weatherData.main.temp;
      const description = weatherData.weather[0].description;
      const icon = weatherData.weather[0].icon;
      const imageUrl = `http://openweathermap.org/img/wn/${icon}@2x.png`;

      res.write(
        `<h1>The weather in ${query}  is currently: ${description}</h1>`
      );
      res.write(
        `<h2>The temperature  is currently ${temp} degree celcius</h2>`
      );
      res.write(`<img src=${imageUrl}>`);
      res.send();
      console.log({ temp, description });
    });
  });
});

const PORT = 3003;
app.listen(PORT, () => console.log("server started on port 3003"));

//f7c01791d357295d3f41d7ed08665c97
//api.openweathermap.org/data/2.5/weather?q=lagos&appid=f7c01791d357295d3f41d7ed08665c97&units=metric
//daily,hourly
//https://api.openweathermap.org/data/2.5/onecall?lat=4.78&lon=7.01&exclude=hourly,daily&appid=f7c01791d357295d3f41d7ed08665c97&units=metric
// coord: {port harcourt
//     lon: 7.01,
//     lat: 4.78
//     },
