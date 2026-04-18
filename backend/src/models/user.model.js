const mongoose = require("mongoose")

const Users = new mongoose.Schema({
    name:String,
})

 UserModel = mongoose.model("userModel",Users)

 module.exports = UserModel;