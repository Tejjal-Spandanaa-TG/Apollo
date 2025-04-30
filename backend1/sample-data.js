// Sample data to populate the database
// Run this file separately with: node sample-data.js
require("dotenv").config()
const mongoose = require("mongoose")
const { connectDB } = require("./config/db")
const Doctor = require("./models/doctorModel")

// Sample doctor data
const sampleDoctors = [
  {
    name: "Dr. Arun Kumar",
    speciality: "General Physician",
    city: "Mumbai",
    hospital: "Apollo Hospitals",
    experience: 15,
    consultationFee: 800,
    rating: 4.8,
    education: "MBBS, MD (Internal Medicine)",
    languages: ["English", "Hindi", "Marathi"],
    availableDays: ["Monday", "Tuesday", "Thursday", "Friday"],
    availableSlots: ["09:00 AM", "11:00 AM", "04:00 PM", "06:00 PM"],
    about:
      "Dr. Arun Kumar is a highly experienced General Physician with expertise in treating various acute and chronic medical conditions. He specializes in preventive healthcare and management of lifestyle diseases.",
    specializations: ["Diabetes Management", "Hypertension", "Preventive Healthcare"],
  },
  {
    name: "Dr. Priya Sharma",
    speciality: "General Physician",
    city: "Delhi",
    hospital: "Apollo Clinic",
    experience: 12,
    consultationFee: 900,
    rating: 4.9,
    education: "MBBS, DNB (Family Medicine)",
    languages: ["English", "Hindi", "Punjabi"],
    availableDays: ["Monday", "Wednesday", "Friday"],
    availableSlots: ["10:00 AM", "12:00 PM", "03:00 PM", "07:00 PM"],
    about:
      "Dr. Priya Sharma is a dedicated General Physician with over a decade of experience in family medicine. She focuses on holistic patient care and has special interest in women's health issues.",
    specializations: ["Women's Health", "Family Medicine", "Geriatric Care"],
  },
  {
    name: "Dr. Rajesh Patel",
    speciality: "General Physician",
    city: "Ahmedabad",
    hospital: "Apollo Health City",
    experience: 10,
    consultationFee: 700,
    rating: 4.7,
    education: "MBBS, MD (General Medicine)",
    languages: ["English", "Hindi", "Gujarati"],
    availableDays: ["Tuesday", "Thursday", "Saturday"],
    availableSlots: ["09:30 AM", "11:30 AM", "05:00 PM", "07:30 PM"],
    about:
      "Dr. Rajesh Patel is known for his patient-friendly approach and comprehensive care. He specializes in managing complex medical conditions and provides evidence-based treatments.",
    specializations: ["Infectious Diseases", "Critical Care Medicine", "Respiratory Medicine"],
  },
  {
    name: "Dr. Sunita Reddy",
    speciality: "General Physician",
    city: "Bangalore",
    hospital: "Apollo Medical Centre",
    experience: 18,
    consultationFee: 1200,
    rating: 4.9,
    education: "MBBS, MD (Internal Medicine), Fellowship in Diabetology",
    languages: ["English", "Hindi", "Kannada", "Telugu"],
    availableDays: ["Monday", "Wednesday", "Friday", "Saturday"],
    availableSlots: ["08:00 AM", "10:00 AM", "02:00 PM", "06:00 PM"],
    about:
      "Dr. Sunita Reddy is a senior consultant with extensive experience in managing diabetes and related complications. She is known for her comprehensive approach to patient care.",
    specializations: ["Diabetes Management", "Endocrinology", "Metabolic Disorders"],
  },
  {
    name: "Dr. Vikram Singh",
    speciality: "General Physician",
    city: "Chandigarh",
    hospital: "Apollo Spectra",
    experience: 14,
    consultationFee: 1000,
    rating: 4.6,
    education: "MBBS, MD (General Medicine), DNB",
    languages: ["English", "Hindi", "Punjabi"],
    availableDays: ["Monday", "Tuesday", "Thursday"],
    availableSlots: ["11:00 AM", "01:00 PM", "04:00 PM", "06:00 PM"],
    about:
      "Dr. Vikram Singh is an experienced physician with expertise in managing complex medical conditions. He is known for his diagnostic skills and patient-centered approach.",
    specializations: ["Cardiology", "Respiratory Medicine", "Preventive Healthcare"],
  },
  {
    name: "Dr. Meera Joshi",
    speciality: "General Physician",
    city: "Mumbai",
    hospital: "Apollo Hospitals",
    experience: 8,
    consultationFee: 800,
    rating: 4.5,
    education: "MBBS, DNB (Family Medicine)",
    languages: ["English", "Hindi", "Marathi"],
    availableDays: ["Tuesday", "Thursday", "Saturday"],
    availableSlots: ["09:00 AM", "12:00 PM", "03:00 PM", "06:30 PM"],
    about:
      "Dr. Meera Joshi is a compassionate physician focused on family medicine. She believes in preventive healthcare and building long-term relationships with her patients.",
    specializations: ["Family Medicine", "Preventive Healthcare", "Women's Health"],
  },
  {
    name: "Dr. Sanjay Gupta",
    speciality: "General Physician",
    city: "Delhi",
    hospital: "Apollo Clinic",
    experience: 20,
    consultationFee: 1500,
    rating: 4.9,
    education: "MBBS, MD (Internal Medicine), DM (Infectious Diseases)",
    languages: ["English", "Hindi"],
    availableDays: ["Monday", "Wednesday", "Friday"],
    availableSlots: ["10:30 AM", "01:30 PM", "04:30 PM", "07:00 PM"],
    about:
      "Dr. Sanjay Gupta is a senior consultant with two decades of experience in internal medicine. He specializes in infectious diseases and has been at the forefront of managing complex cases.",
    specializations: ["Infectious Diseases", "Tropical Medicine", "Internal Medicine"],
  },
  {
    name: "Dr. Ananya Das",
    speciality: "General Physician",
    city: "Kolkata",
    hospital: "Apollo Gleneagles",
    experience: 6,
    consultationFee: 600,
    rating: 4.3,
    education: "MBBS, MD (General Medicine)",
    languages: ["English", "Hindi", "Bengali"],
    availableDays: ["Monday", "Tuesday", "Wednesday", "Friday"],
    availableSlots: ["09:00 AM", "11:00 AM", "02:00 PM", "05:00 PM"],
    about:
      "Dr. Ananya Das is a young and dynamic physician with modern approaches to healthcare. She focuses on preventive medicine and lifestyle modifications for better health outcomes.",
    specializations: ["Lifestyle Medicine", "Preventive Healthcare", "Geriatric Medicine"],
  },
  {
    name: "Dr. Karthik Raman",
    speciality: "General Physician",
    city: "Chennai",
    hospital: "Apollo First Med",
    experience: 11,
    consultationFee: 900,
    rating: 4.7,
    education: "MBBS, MD (Internal Medicine)",
    languages: ["English", "Hindi", "Tamil"],
    availableDays: ["Tuesday", "Thursday", "Saturday"],
    availableSlots: ["10:00 AM", "12:00 PM", "03:00 PM", "06:00 PM"],
    about:
      "Dr. Karthik Raman is known for his thorough approach to diagnosis and treatment. He has special interest in managing chronic diseases and providing comprehensive care.",
    specializations: ["Chronic Disease Management", "Hypertension", "Diabetes"],
  },
  {
    name: "Dr. Neha Kapoor",
    speciality: "General Physician",
    city: "Pune",
    hospital: "Apollo Jehangir",
    experience: 9,
    consultationFee: 800,
    rating: 4.8,
    education: "MBBS, MD (General Medicine)",
    languages: ["English", "Hindi", "Marathi"],
    availableDays: ["Monday", "Wednesday", "Friday"],
    availableSlots: ["09:30 AM", "12:30 PM", "04:30 PM", "07:30 PM"],
    about:
      "Dr. Neha Kapoor combines traditional medical knowledge with modern approaches to provide holistic care. She specializes in women's health issues and geriatric care.",
    specializations: ["Women's Health", "Geriatric Medicine", "Preventive Healthcare"],
  },
  {
    name: "Dr. Arjun Nair",
    speciality: "General Physician",
    city: "Bangalore",
    hospital: "Apollo Medical Centre",
    experience: 16,
    consultationFee: 1200,
    rating: 4.9,
    education: "MBBS, MD (Internal Medicine), Fellowship in Critical Care",
    languages: ["English", "Hindi", "Malayalam", "Kannada"],
    availableDays: ["Monday", "Tuesday", "Thursday"],
    availableSlots: ["08:30 AM", "11:30 AM", "02:30 PM", "05:30 PM"],
    about:
      "Dr. Arjun Nair is a highly experienced physician with expertise in critical care medicine. He provides comprehensive care for complex medical conditions and is known for his diagnostic accuracy.",
    specializations: ["Critical Care", "Respiratory Medicine", "Internal Medicine"],
  },
  {
    name: "Dr. Pooja Mehta",
    speciality: "General Physician",
    city: "Ahmedabad",
    hospital: "Apollo Health City",
    experience: 7,
    consultationFee: 700,
    rating: 4.6,
    education: "MBBS, DNB (Family Medicine)",
    languages: ["English", "Hindi", "Gujarati"],
    availableDays: ["Tuesday", "Thursday", "Saturday"],
    availableSlots: ["10:00 AM", "12:00 PM", "04:00 PM", "06:00 PM"],
    about:
      "Dr. Pooja Mehta is a compassionate physician who believes in building strong doctor-patient relationships. She focuses on preventive healthcare and lifestyle modifications.",
    specializations: ["Family Medicine", "Lifestyle Medicine", "Preventive Healthcare"],
  },
  {
    name: "Dr. Rahul Verma",
    speciality: "General Physician",
    city: "Delhi",
    hospital: "Apollo Clinic",
    experience: 13,
    consultationFee: 1000,
    rating: 4.7,
    education: "MBBS, MD (General Medicine), Fellowship in Diabetology",
    languages: ["English", "Hindi"],
    availableDays: ["Monday", "Wednesday", "Friday"],
    availableSlots: ["09:00 AM", "11:00 AM", "03:00 PM", "06:00 PM"],
    about:
      "Dr. Rahul Verma specializes in diabetes management and metabolic disorders. He provides comprehensive care with a focus on lifestyle modifications and evidence-based treatments.",
    specializations: ["Diabetes Management", "Metabolic Disorders", "Endocrinology"],
  },
  {
    name: "Dr. Lakshmi Rao",
    speciality: "General Physician",
    city: "Hyderabad",
    hospital: "Apollo Health City",
    experience: 15,
    consultationFee: 1100,
    rating: 4.8,
    education: "MBBS, MD (Internal Medicine), DNB",
    languages: ["English", "Hindi", "Telugu"],
    availableDays: ["Monday", "Tuesday", "Thursday"],
    availableSlots: ["10:30 AM", "01:30 PM", "04:30 PM", "07:30 PM"],
    about:
      "Dr. Lakshmi Rao is known for her patient-centered approach and comprehensive care. She has special interest in women's health issues and geriatric medicine.",
    specializations: ["Women's Health", "Geriatric Medicine", "Internal Medicine"],
  },
  {
    name: "Dr. Amit Patel",
    speciality: "General Physician",
    city: "Mumbai",
    hospital: "Apollo Hospitals",
    experience: 5,
    consultationFee: 700,
    rating: 4.4,
    education: "MBBS, DNB (Family Medicine)",
    languages: ["English", "Hindi", "Gujarati", "Marathi"],
    availableDays: ["Monday", "Wednesday", "Friday", "Saturday"],
    availableSlots: ["09:00 AM", "12:00 PM", "03:00 PM", "06:00 PM"],
    about:
      "Dr. Amit Patel is a young and dynamic physician with a modern approach to healthcare. He focuses on preventive medicine and uses technology to enhance patient care.",
    specializations: ["Family Medicine", "Preventive Healthcare", "Digital Health"],
  },
]

// Function to seed the database
const seedDatabase = async () => {
  try {
    // Connect to MongoDB
    await connectDB()

    // Delete existing data
    await Doctor.deleteMany({})
    console.log("Existing doctors deleted")

    // Insert sample data
    await Doctor.insertMany(sampleDoctors)
    console.log(`${sampleDoctors.length} doctors added successfully`)

    // Disconnect from MongoDB
    await mongoose.disconnect()
    console.log("MongoDB disconnected")

    process.exit(0)
  } catch (error) {
    console.error("Error seeding database:", error.message)
    process.exit(1)
  }
}

// Run the seeding function
seedDatabase()
