const express = require("express");
const app = express();
app.use(express.json());
const PORT = process.env.PORT || 5052;
require("dotenv").config();
const api_key = process.env.api_key;

app.post("/weather", async (req, res) => {
  const { cities } = req.body;

  try {
    const fetchWeather = cities.map(async (city) => {
      const response = await fetch(
        `http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${api_key}&units=metric`
      );
      const data = await response.json();

      return { [city]: `${data.main.temp}°C` };
    });

    const results = await Promise.all(fetchWeather);
    const weather = Object.assign({}, ...results);

    res.json({ weather });
  } catch (err) {
    res.status(500).json("Could not fetch weather");
  }
});

app.listen(PORT, () => {
  console.log("server started");
});
