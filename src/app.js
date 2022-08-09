const path = require("path");
const express = require("express");
const hbs = require("hbs");
const geoCode = require("./utils/geoCode");
const forecast = require("./utils/forecast");

const app = express();
const port = process.env.PORT || 3000;
// Path
const pathToPublicDir = path.join(__dirname, "../public");
const pathToViews = path.join(__dirname, "../templates/views");
const pathToPartials = path.join(__dirname, "../templates/partials");

//Middleware
app.set("view engine", "hbs");
app.set("views", pathToViews);

hbs.registerPartials(pathToPartials);

// Setup Static Directory to Serve
app.use(express.static(pathToPublicDir));


app.get("/", (req, res) => {
    res.render("index", {
        title: "Weather App",
        name: "Alqama Shuja"
    });
});

app.get("/weather", (req, res) => {
    if (!req.query.location) {
        res.send({
            error: "Please Provide Location."
        });
    }
    else {
        geoCode(req.query.location, (error, { latitude, longitude, location } = {}) => {
            if (error) {
                res.send({ error });
            } else {
                forecast(latitude, longitude, (error, forecastData) => {
                    if (error) {
                        res.send({
                            error: error
                        });
                    }
                    else {
                        res.send({
                            forecast: forecastData,
                            location
                        });
                    }
                });
            }
        });
    }
});

app.get("/about", (req, res) => {
    res.render("about", {
        title: "About Me",
        name: "Alqama Shuja",
        description: "I am Alqama Shuja, MERN stack developer and a teacher at APTECH Learning.\n"
    });
});



app.listen(port, (req, res) => {
    console.log("Server is running on Port " + port);
});