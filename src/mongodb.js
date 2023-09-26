const mongoose = require("mongoose");

// Connect to the MongoDB server running locally on port 27017 and the "qusdb" database.
mongoose.connect("mongodb://127.0.0.1:27017/qusdb")
    .then(() => {
        console.log("MongoDB connected successfully"); // Log a successful database connection.
    })
    .catch(() => {
        console.log("Failed to connect to MongoDB"); // Log an error if the connection fails.
    });

// Define the schema for the "users" collection.
const LogInSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true // Specify that the "name" field is required.
    },
    password: {
        type: String,
        required: true // Specify that the "password" field is required.
    }
});

// Create a model for the "users" collection using the defined schema.
const collection = new mongoose.model("users", LogInSchema);

module.exports = collection; // Export the collection model for use in other parts of the application.