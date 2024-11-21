import express from 'express';
import dotenv from 'dotenv'
import { connectDB } from './config/db.js';
import userRoutes from './routes/productRoutes.js'
import cors from 'cors'


const app = express();

dotenv.config();
app.use(express.json())

app.use(cors())

const PORT = process.env.PORT;

app.use('/api', userRoutes)

app.listen(PORT, ()=> {
    connectDB();
    console.log(`Server is running at port: ${PORT}`)
})