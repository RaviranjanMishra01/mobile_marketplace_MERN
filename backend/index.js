// External packages
const mongoose = require('mongoose');
const express = require('express');
const cors = require('cors');

require('dotenv').config();

// Internal packages

const app = express();4
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors({
  origin: ["http://localhost:5173", "https://veltrix-platform.onrender.com"]
}));

app.use("/", (req, res) => {
    res.json({ name: "Hello, bro" })
})

mongoose.connect(process.env.DB_URL)
    .then(() => {
        console.log("Database is successfully connected 😎");
        app.listen(process.env.PORT, () => {
            console.log(`Server is running on port http://localhost:${process.env.PORT}`);
        })
    })
    .catch(err => {
        console.log('Error while connecting to database', err);
    })