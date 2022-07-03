import express from 'express'
import { config } from 'dotenv'
import connectDB from './config/db.js'
import productRoutes from './routes/productRoutes.js'
import { notFound, errorHandler } from './middleware/error.js'

const app = express()
config()
connectDB()

app.get('/', (req, res) => {
    res.send("API is running....")
})
app.use('/api/products', productRoutes) //Just mount the prefix to any API route inside productRoutes



/*=============================================*/
//Middle where
// app.use((req, res, next) => {
//     console.log(req.originalUrl)
//     next()
//})

//Error Middle Where to Custom Error Message(Optinal), when pass incorrect ID = 1.
//which originally return a html
app.use(notFound)
//Error Middle FOR 404
app.use(errorHandler)

const PORT = process.env.PORT || 5000
app.listen(PORT, console.log(`Server running in ${process.env.NODE_ENV} mode on http://localhost:${PORT}`))