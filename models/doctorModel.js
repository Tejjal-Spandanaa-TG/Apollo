const mongoose = require("mongoose")

const doctorSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Doctor name is required"],
    trim: true,
  },
  speciality: {
    type: String,
    required: [true, "Speciality is required"],
    trim: true,
  },
  city: {
    type: String,
    required: [true, "City is required"],
    trim: true,
  },
  hospital: {
    type: String,
    required: [true, "Hospital name is required"],
    trim: true,
  },
  experience: {
    type: Number,
    required: [true, "Experience in years is required"],
  },
  consultationFee: {
    type: Number,
    required: [true, "Consultation fee is required"],
  },
  rating: {
    type: Number,
    default: 0,
    min: 0,
    max: 5,
  },
  image: {
    type: String,
    default: "/placeholder-doctor.jpg",
  },
  availableDays: {
    type: [String],
    default: ["Monday", "Wednesday", "Friday"],
  },
  availableSlots: {
    type: [String],
    default: ["09:00 AM", "11:00 AM", "04:00 PM", "06:00 PM"],
  },
  education: {
    type: String,
    required: [true, "Education details are required"],
  },
  languages: {
    type: [String],
    default: ["English", "Hindi"],
  },
  about: {
    type: String,
    default: "Experienced doctor committed to providing quality healthcare.",
  },
  specializations: {
    type: [String],
    default: [],
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
})

// Create index for better search performance
doctorSchema.index({ name: 1, speciality: 1, city: 1 })
doctorSchema.index({ name: "text", speciality: "text", hospital: "text" })

const Doctor = mongoose.model("Doctor", doctorSchema)

module.exports = Doctor
