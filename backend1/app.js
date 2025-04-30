require("dotenv").config()
const express = require("express")
const cors = require("cors")
const bodyParser = require("body-parser")
const doctorRoutes = require("./routes/doctorRoutes")
const { connectDB } = require("./config/db")

// Initialize express app
const app = express()
const PORT = process.env.PORT || 5000

// Middleware
// Configure CORS
const allowedOrigins = [
  "http://localhost:3000",
  "https://apollo247-clone.vercel.app", // Replace with your actual frontend domain when deployed
]

app.use(
  cors({
    origin: (origin, callback) => {
      // Allow requests with no origin (like mobile apps or curl requests)
      if (!origin) return callback(null, true)

      if (allowedOrigins.indexOf(origin) === -1) {
        const msg = "The CORS policy for this site does not allow access from the specified Origin."
        return callback(new Error(msg), false)
      }
      return callback(null, true)
    },
    credentials: true,
  }),
)

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

// Connect to MongoDB
connectDB()

// Routes
app.use("/api/doctors", doctorRoutes)

// Root route
app.get("/", (req, res) => {
  res.send("Apollo 247 Clone API is running")
})

// Start server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})

module.exports = app
