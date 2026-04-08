const mongoose = require("mongoose")

const Create_user = new mongoose.Schema({
    username:{
        type:String,
        required:true,
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true
    },
    // role:{
    //     type:String,
    //     enum:['user','admin'],
    //     default:false
    // },
    isBlocked: {
    type: Boolean,
    default: false        // Admin block karega to true hoga
    }
    // mobileNumber:{
    //     type:Number,
    //     require:true
    // }
},{timestamps:true})

const Newuser = mongoose.model("Newuser",Create_user)

module.exports = Newuser;