const { json } = require("express");
const Product = require("../model/Product");

const addProduct = async (req,res) =>{
    try{
        const {title,brand,price,description,condition,specs,location} = req.body;

        const newProduct = await Product.create({   // ✅ FIX
            seller:req.user._id,
            title,
            brand,
            price,
            description,
            condition,
            specs,
            location 
        })

        res.status(201).json({
            success:true,   // ✅ boolean fix
            message:"Product listed successfully!",
            product:newProduct
        });
    }catch(error){
        res.status(500).json({success:false,message:error.message})
    }
}

const getAllProducts = async(req,res) => {
    try{
        const products = await Product.find({isActive:true})   // ✅ FIX
            .populate('seller','name email')

        res.status(200).json({
            success:true,
            count:products.length,   // ✅ FIX
            products
        })
    }catch(error){
        res.status(500).json({success:false,message:error.message})
    }
}

// get single product details
const getProductById = async (req,res) =>{
    try{
        const product = await Product.findById(req.params.id)   // ✅ FIX
            .populate('seller','name email');

        if(!product){
            return res.status(404).json({message:"Product not found"})
        }

        res.status(200).json({success:true,product})
    }catch(error)
    {
        res.status(500).json({success:false,message:error.message})
    }
}

// Delete Products
const deleteProduct = async (req,res) =>{
    try{
        const product = await Product.findById(req.params.id);

        if(!product){
            return res.status(404).json({message:"Product not found"})
        }

        if(product.seller.toString() !== req.user._id.toString()){
            return res.status(403).json({
                message:"Not allowed! this product are not listed"
            })
        }

        await product.deleteOne();

        res.status(200).json({
            success:true,
            message:"Product deleted successfully"
        });

    }catch(error){
        res.status(500).json({
            success:false,
            message:error.message
        })
    }
}

module.exports = {
  addProduct,
  getAllProducts,
  getProductById,
  deleteProduct
};