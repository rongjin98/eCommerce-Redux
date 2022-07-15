import Product from "../models/productModel.js"
import asyncHandler from 'express-async-handler'


// @desc Fetch all products
// @route GET /api/products
// @access Public
const getProducts = asyncHandler(async (req, res) => {
    //The connection to DB will be handled in server.js. Thus we only need to write logic scripts here.
    const products = await Product.find({}) 
    res.json(products)
})


// @desc Fetch single product
// @route GET /api/products/:id
// @access Public
const getProductById = asyncHandler(async (req,res) => {
    const product = await Product.findById(req.params.id)
    if (product) {
        res.json(product)
    }else {
        res.status(404).json({ message: 'Product not found' })
    }
})

export{ getProducts, getProductById}