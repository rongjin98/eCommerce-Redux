import mongoose from "mongoose";
import { config } from 'dotenv';
import users from "./data/user.js";
import products from "./data/products.js";
import User from "./models/userModel.js";
import Product from "./models/productModel.js";
import Order from "./models/orderModel.js";
import connectDB from "./config/db.js";

config()
connectDB()

/*This is a completely independent script just for generating a bunch of dummy data for testing */

const importData = async() => {
    try {
        await Order.deleteMany()
        await Product.deleteMany()
        await User.deleteMany()

        const createdUsers = await User.insertMany(users)
        
        //Just created a bunch of dummy data by adminUser
        const adminUser = createdUsers[0]._id
        const sampleProducts = products.map(products => {
            return {...products, user: adminUser}
        })
        await Product.insertMany(sampleProducts)

        console.log('Data Imported!')
        process.exit()
    } catch(error) {
        console.error(`${error}`)
        process.exit(1)
    }
}

const destroyData= async() => {
    try{
        await Order.deleteMany()
        await Product.deleteMany()
        await User.deleteMany()

        console.log('Data Destroyed!')
        process.exit()
    }catch(error){
        console.error(`${error}`)
        process.exit(1)
    }
}

if (process.argv[2] === '-d') {
    destroyData()
} else {
    importData()  
}