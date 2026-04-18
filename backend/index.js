// External packages
const express = require('express');
const cors = require('cors');
require('dotenv').config();

// Import database connection
const { default: db_connect } = require('./src/config/db');

const app = express(); // create app

// Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(cors({ origin: ["http://localhost:5173", "https://veltrix-platform.onrender.com"] }));

// Routes
app.use("/", (req, res) => {
    res.json({ name: "Hello, bro" });
});



// Connect database
db_connect();
app.listen(process.env.PORT, () => {
    console.log(`Server running at http://localhost:${process.env.PORT}`);
});