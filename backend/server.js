import express from 'express'
import path from 'path'
import { config } from 'dotenv'
import connectDB from './config/db.js'
import productRoutes from './routes/productRoutes.js'
import userRoutes from './routes/userRoutes.js'
import { notFound, errorHandler } from './middleware/error.js'

const app = express()
app.use(express.json())
config()
connectDB()
 //allow the use of json to parse the body



app.use('/api/products', productRoutes) //Just mount the prefix to any API route inside productRoutes
app.use('/api/users', userRoutes)

const __dirname = path.resolve()
if(process.env.NODE_ENV === 'production') {
    app.use(express.static(path.join(__dirname, '/pro_shop/build')))
    app.get('*', (req,res) => res.sendFile(path.resolve(__dirname, 'pro_shop', 'build', 'index.html')))
}else {
    app.get('/', (req, res) => {
        res.send("API is running....")
    })
}

//Error Middle Where to Custom Error Message(Optinal), when pass incorrect ID = 1.
//which originally return a html
app.use(notFound)
//Error Middle FOR 404
app.use(errorHandler)

const PORT = process.env.PORT || 5000
app.listen(PORT, console.log(`Server running in ${process.env.NODE_ENV} mode on http://localhost:${PORT}`))