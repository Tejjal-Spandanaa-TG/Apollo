const express = require("express")
const router = express.Router()
const doctorController = require("../controllers/doctorController")

// Add a new doctor
router.post("/add-doctor", doctorController.addDoctor)

// List doctors with filters and pagination
router.get("/list", doctorController.listDoctors)

// Get doctor by ID
router.get("/:id", doctorController.getDoctorById)

// Get cities for filter dropdown
router.get("/cities", doctorController.getCities)

// Get specialities for filter dropdown
router.get("/specialities", doctorController.getSpecialities)

module.exports = router
