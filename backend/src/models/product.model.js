const mongoose = require("mongoose")

const Product = new mongoose.Schema({
    name:String,
})

 productModel = mongoose.model("userModel",Product)

 module.exports = productModel;