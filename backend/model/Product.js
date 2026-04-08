const mongoose = require("mongoose")
const productSchema = new mongoose.Schema({
    seller:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User',
        require:true
    },
    title:{
        type:String,
        required:true,
    },
    brand:{
        type:String,
        required:true
    },
    price:{
        type:Number,
        required:true
    },
    description:{
        type:String
    },
    //phone condition 
    condition:{
        type:String,
        required:true
    },

    // mobile specs
    specs:{
        ram:String,
        Storage:String,
        battery:String,
    },
    location:{
        type:String
    },
    isActive:{
        type:Boolean,
        default:true
    },
    reportCount:{
        type:Number,
        default:0
    }
},{timestamps:true})

module.exports = mongoose.model("product",productSchema)