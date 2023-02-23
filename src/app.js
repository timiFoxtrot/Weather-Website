const path = require("path");
const express = require("express");
const hbs = require("hbs"); //HBS Handlebars allow us render dynamic contents on web pages and also create codes that can be used across multiple pages
const request = require("request");
const geocode = require("./utils/geocode");
const forecast = require("./utils/forecast");

// console.log(__dirname);
// console.log(path.join(__dirname, '../public'));

const app = express();
const port = process.env.PORT || 3000;

//Define Paths for Express Config
const publicDirectoryPath = path.join(__dirname, "../public"); //the public dir needs to be accessed via abs path
const viewsPath = path.join(__dirname, "../templates/views");
const partialsPath = path.join(__dirname, "../templates/partials");

//Set Handle bars engine and views location
app.set("view engine", "hbs"); //This tells express which templating engine we installed
app.set("views", viewsPath); //The tells express where the views files are
hbs.registerPartials(partialsPath); //This tells hbs where the partials live

//Set up static directory to serve
app.use(express.static(publicDirectoryPath)); //This serves up contents in the public directory

//The get method takes two args. A route and a fxn where the action to take when someone visits the route is defined. The fxn takes 2 args. The first contains an object containing info about the incoming request to the server. The other arg contains methods that allow us customize the response to send back

app.get("" /*an empty string because its the root domain */, (req, res) => {
  res.render("index", {
    title: "Weather",
    name: "Timi",
  }); //This pushes express to execute the (hbs) file in the view folder and converts it to HTML
});

app.get("/about", (req, res) => {
  res.render("about", {
    title: "About me",
    name: "Timi",
  });
});

app.get("/help", (req, res) => {
  res.render("help", {
    message: "Help Services",
    title: "Help",
    name: "Timi",
  });
});

//app.com/weather
app.get("/weather", (req, res) => {
  const address = req.query.address;
  if (!address) {
    return res.send({
      error: "You have not provided any address",
    });
  }

  geocode(address, (error, data = {}) => {
    const { latitude, longitude, location } = data;
    if (error) {
      return res.send({ error });
    }
    forecast.forecast(latitude, longitude, (error, forecastData) => {
      if (error) {
        return res.send({ error });
      }

      res.send({
        location: location,
        weather_forecast: forecastData,
        address,
        coords: [latitude, longitude],
      });
    });
  });
});

app.get("/products", (req, res) => {
  if (!req.query.search) {
    return res.send({
      error: "Please provide a search term",
    });
  }

  console.log(req.query.search);
  res.send({
    product: [],
  });
});

app.get("/help/*", (req, res) => {
  res.render("404", {
    errorMsg: "Help article not found",
    title: "Help 404",
    name: "Timi",
  });
});

app.get("*", (req, res) => {
  res.render("404", {
    errorMsg: "Page not found",
    title: "Generic 404",
    name: "Timi",
  });
});

app.listen(port, () => {
  console.log(`Server is up and running on ${port}`);
});

//Use 'nodemon src/app.js -e js,hbs' to make nodemon restart when saves are made in the files with the registered extnsns
