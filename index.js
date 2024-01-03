const express = require("express");
const app = express();
app.use(express.json());
const PORT = process.env.PORT || 5052;
const api_key = "380dfcb2e1616adb7ae5c5cea215000f";

app.post("/weather", async (req, res) => {
  const { cities } = req.body;

  try {
    const fetchWeather = cities.map(async (city) => {
      const response = await fetch(
        `http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${api_key}&units=metric`
      );
    });
  } catch (err) {}
});

app.listen(PORT, () => {
  console.log("server started");
});
