const Doctor = require("../models/doctorModel")

// Add a new doctor
exports.addDoctor = async (req, res) => {
  try {
    const newDoctor = await Doctor.create(req.body)

    res.status(201).json({
      success: true,
      data: newDoctor,
      message: "Doctor added successfully",
    })
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    })
  }
}

// List doctors with filters and pagination
exports.listDoctors = async (req, res) => {
  try {
    const {
      page = 1,
      limit = 10,
      city,
      speciality,
      minExperience,
      maxExperience,
      minFee,
      maxFee,
      sortBy,
      sortOrder = "asc",
      search,
    } = req.query

    // Build filter object
    const filter = {}

    // Add search functionality
    if (search) {
      filter.$text = { $search: search }
    }

    if (city) filter.city = city
    if (speciality) filter.speciality = speciality

    // Experience range filter
    if (minExperience || maxExperience) {
      filter.experience = {}
      if (minExperience) filter.experience.$gte = Number(minExperience)
      if (maxExperience) filter.experience.$lte = Number(maxExperience)
    }

    // Consultation fee range filter
    if (minFee || maxFee) {
      filter.consultationFee = {}
      if (minFee) filter.consultationFee.$gte = Number(minFee)
      if (maxFee) filter.consultationFee.$lte = Number(maxFee)
    }

    // Build sort object
    const sort = {}
    if (sortBy) {
      sort[sortBy] = sortOrder === "desc" ? -1 : 1
    } else {
      sort.rating = -1 // Default sort by highest rating
    }

    // Calculate pagination
    const pageNum = Number.parseInt(page, 10)
    const limitNum = Number.parseInt(limit, 10)
    const skip = (pageNum - 1) * limitNum

    // Execute query with pagination
    const doctors = await Doctor.find(filter).sort(sort).skip(skip).limit(limitNum)

    // Get total count for pagination info
    const totalDoctors = await Doctor.countDocuments(filter)

    res.status(200).json({
      success: true,
      count: doctors.length,
      totalPages: Math.ceil(totalDoctors / limitNum),
      currentPage: pageNum,
      totalDoctors,
      data: doctors,
    })
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    })
  }
}

// Get doctor by ID
exports.getDoctorById = async (req, res) => {
  try {
    const doctor = await Doctor.findById(req.params.id)

    if (!doctor) {
      return res.status(404).json({
        success: false,
        message: "Doctor not found",
      })
    }

    res.status(200).json({
      success: true,
      data: doctor,
    })
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    })
  }
}

// Get cities for filter dropdown
exports.getCities = async (req, res) => {
  try {
    const cities = await Doctor.distinct("city")

    res.status(200).json({
      success: true,
      data: cities,
    })
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    })
  }
}

// Get specialities for filter dropdown
exports.getSpecialities = async (req, res) => {
  try {
    const specialities = await Doctor.distinct("speciality")

    res.status(200).json({
      success: true,
      data: specialities,
    })
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    })
  }
}
