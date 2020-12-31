const path = require("path");
const express = require("express");
const hbs = require("hbs");
const app = express();
const geocode = require("./utils/geocode");
const forecast = require("./utils/forecast");

// Define Path for express config
const publicPath = path.join(__dirname, "../public");
const viewsPath = path.join(__dirname, "../templates/views");
const partialPath = path.join(__dirname, "../templates/partials");

// Handle bar engine and views location
app.set("view engine", "hbs");
app.set("views", viewsPath);
hbs.registerPartials(partialPath);

// static directory setup
app.use(express.static(publicPath));

app.get("", (req, res) => {
  res.render("index", {
    title: "Weather",
    name: "Tanmay Shah",
  });
});
app.get("/about", (req, res) => {
  res.render("about", {
    title: "Weather App",
    name: "Tanmay Shah",
  });
});
app.get("/help", (req, res) => {
  res.render("help", {
    message: "Click for help",
    title: "Help",
    name: "Tanmay Shah",
  });
});

app.get("/weather", (req, res) => {
  if (!req.query.address) {
    return res.send({
      error: "You must provide address",
    });
  }
  geocode(
    req.query.address,
    (error, { latitude, longitude, location } = {}) => {
      if (error) {
        return res.send({ error });
      }
      forecast(longitude, latitude, (error, forecastData) => {
        if (error) {
          return res.send({ error });
        }
        res.send({
          forecast: forecastData,
          location: location,
          address: req.query.address,
        });
      });
    }
  );
});

app.get("/products", (req, res) => {
  if (!req.query.search) {
    return res.send({
      error: "You must provide a search term",
    });
  }
  req.query();
  res.send({
    products: [],
  });
});

app.get("/help/*", (req, res) => {
  res.render("404", {
    title: "404 Not found",
    errorMessage: "Help article not found",
    name: "Tanmay Shah",
  });
});

app.get("*", (req, res) => {
  res.render("404", {
    title: "404 Not found",
    errorMessage: "Not Found",
    name: "Tanmay Shah",
  });
});

app.listen(3000, () => {
  console.log("Server started");
});
