import express from "express"
import cors from 'cors'
import 'dotenv/config'
import connectDB from "./config/mongodb.js"
import imageRouter from "./routes/imageRoutes.js"
import userRouter from "./routes/userRoutes.js"

const port = process.env.PORT || 4000
const app= express()


app.use(express.json())
app.use(cors())
await connectDB()


app.use('/api/user', userRouter)
app.use('/api/image', imageRouter)
app.get('/', (req, res) => {
    res.send('API Working')
  });

app.listen(port, () => console.log(`Server started on PORT:${port}`))