const express = require("express");
const app = express();
const path = require("path");
const hbs = require("hbs");
const collection = require("./mongodb"); // Import the module that manages the MongoDB collection.

// Define the path to the templates directory.
const templatePath = path.join(__dirname, '../templates');

// Configure Express.
app.use(express.json());
app.set("view engine", "hbs");
app.set("views", templatePath);
app.use(express.urlencoded({ extended: false }));

// Routes and controllers.

// Render the home page.
app.get("/", (req, res) => {
    res.render("login");
});

// Render the signup page.
app.get("/signup", (req, res) => {
    res.render("signup");
});

// Handle the request to register a new user.
app.post("/signup", async (req, res) => {
    const data = {
        name: req.body.name,
        password: req.body.password
    };

    // Insert the data of the new user into the collection.
    await collection.insertMany([data]);

    // Redirect to the home page.
    res.render("home");
});

// Handle the login request.
app.post("/login", async (req, res) => {
    try {
        // Find a user in the collection by their name.
        const check = await collection.findOne({ name: req.body.name });

        if (check.password === req.body.password) {
            // If the password matches, redirect to the home page.
            res.render("home");
        } else {
            // If the password doesn't match, display an error message.
            res.send("Wrong password");
        }
    } catch {
        // If an error occurs, display an error message.
        res.send("Wrong details");
    }
});

// Start the server on port 3000.
app.listen(3000, () => {
    console.log("Port connected");
});
