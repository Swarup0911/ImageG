import express from "express"
import cors from 'cors'
import 'dotenv/config'
import connectDB from "./config/mongodb.js"
import imageRouter from "./routes/imageRoutes.js"
import userRouter from "./routes/userRoutes.js"

const app = express()

// Middleware
app.use(express.json())
app.use(cors({
  origin: true,
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'token']
}))

// Connect to MongoDB (only in production)
if (process.env.NODE_ENV === 'production') {
  connectDB()
}

// Test routes
app.get('/api', (req, res) => {
    res.json({ message: 'API Working', status: 'success' })
})

app.get('/', (req, res) => {
    res.json({ message: 'API Working', status: 'success' })
})

// API routes
app.use('/api/user', userRouter)
app.use('/api/image', imageRouter)

// 404 handler
app.use('*', (req, res) => {
  res.status(404).json({ 
    success: false, 
    message: `Route ${req.originalUrl} not found` 
  })
})

// Error handling middleware
app.use((err, req, res, next) => {
  console.error('Error:', err.stack)
  res.status(500).json({ success: false, message: 'Something went wrong!' })
})

// Only start server in development
if (process.env.NODE_ENV !== 'production') {
  const port = process.env.PORT || 4000
  app.listen(port, () => {
    console.log(`Server started on PORT:${port}`)
    // Connect to MongoDB in development
    connectDB()
  })
}

export default app
