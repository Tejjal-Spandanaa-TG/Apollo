const mongoose = require("mongoose")

// Get MongoDB connection string from environment variables
const MONGO_URI = process.env.MONGO_URI || "mongodb://localhost:27017/apollo247_clone"

const connectDB = async () => {
  try {
    await mongoose.connect(MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    console.log("MongoDB connected successfully")
  } catch (error) {
    console.error("MongoDB connection error:", error.message)
    process.exit(1)
  }
}

module.exports = { connectDB }
