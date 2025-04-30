"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import { format } from "date-fns"
import { Star, MapPin, Calendar, DollarSign, Clock, Award, Languages, ThumbsUp, ArrowLeft } from "lucide-react"
import type { Doctor } from "@/types/doctor"

export default function DoctorDetailPage({ params }: { params: { id: string } }) {
  const [doctor, setDoctor] = useState<Doctor | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [selectedDate, setSelectedDate] = useState<Date>(new Date())
  const [selectedSlot, setSelectedSlot] = useState<string | null>(null)

  const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL
    ? `${process.env.NEXT_PUBLIC_API_URL}/api/doctors`
    : "http://localhost:5000/api/doctors"

  useEffect(() => {
    const fetchDoctor = async () => {
      try {
        const response = await fetch(`${API_BASE_URL}/${params.id}`)

        if (!response.ok) {
          throw new Error("Failed to fetch doctor details")
        }

        const data = await response.json()
        setDoctor(data.data)
      } catch (err) {
        setError("Failed to load doctor details. Please try again later.")
        console.error(err)
      } finally {
        setLoading(false)
      }
    }

    fetchDoctor()
  }, [API_BASE_URL, params.id])

  // Generate next 7 days for appointment booking
  const getNextDays = () => {
    const days = []
    for (let i = 0; i < 7; i++) {
      const date = new Date()
      date.setDate(date.getDate() + i)
      days.push(date)
    }
    return days
  }

  const nextDays = getNextDays()

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="card animate-pulse p-8">
          <div className="flex flex-col md:flex-row gap-8">
            <div className="w-40 h-40 bg-gray-300 rounded-full"></div>
            <div className="flex-1">
              <div className="h-8 bg-gray-300 rounded w-3/4 mb-4"></div>
              <div className="h-6 bg-gray-300 rounded w-1/2 mb-4"></div>
              <div className="h-6 bg-gray-300 rounded w-2/3 mb-4"></div>
              <div className="h-6 bg-gray-300 rounded w-1/3"></div>
            </div>
          </div>
        </div>
      </div>
    )
  }

  if (error || !doctor) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="card p-8 text-center">
          <h2 className="text-2xl font-bold text-red-600 mb-4">Error</h2>
          <p className="text-gray-700 mb-6">{error || "Doctor not found"}</p>
          <Link href="/specialties/general-physician-internal-medicine" className="btn-primary">
            Back to Doctors
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <Link
        href="/specialties/general-physician-internal-medicine"
        className="inline-flex items-center text-[#02475b] mb-6 hover:underline"
      >
        <ArrowLeft className="mr-2 h-4 w-4" /> Back to Doctors
      </Link>

      {/* Doctor Profile */}
      <div className="card p-6 md:p-8 mb-8">
        <div className="flex flex-col md:flex-row gap-6 md:gap-8">
          {/* Doctor Image */}
          <div className="flex-shrink-0">
            <div className="relative w-40 h-40 mx-auto md:mx-0">
              <Image
                src={doctor.image || "/placeholder-doctor.jpg"}
                alt={doctor.name}
                fill
                className="rounded-full object-cover border-4 border-[#e6f7f4]"
              />
            </div>
          </div>

          {/* Doctor Info */}
          <div className="flex-1">
            <h1 className="text-3xl font-bold text-[#02475b] mb-2">{doctor.name}</h1>

            <p className="text-lg text-gray-700 mb-3">{doctor.speciality}</p>

            <div className="flex items-center mb-3">
              <Award className="text-[#00b38e] mr-2" size={18} />
              <span className="text-gray-700">{doctor.experience} Years Experience</span>
            </div>

            <div className="flex items-center mb-3">
              <MapPin className="text-[#00b38e] mr-2" size={18} />
              <span className="text-gray-700">
                {doctor.hospital}, {doctor.city}
              </span>
            </div>

            <div className="flex items-center mb-3">
              <Languages className="text-[#00b38e] mr-2" size={18} />
              <span className="text-gray-700">{doctor.languages.join(", ")}</span>
            </div>

            <div className="flex items-center mb-3">
              <DollarSign className="text-[#00b38e] mr-2" size={18} />
              <span className="text-gray-700">₹{doctor.consultationFee} Consultation Fee</span>
            </div>

            <div className="flex items-center">
              <ThumbsUp className="text-[#00b38e] mr-2" size={18} />
              <div className="flex items-center">
                <Star size={18} className="text-yellow-500 mr-1" />
                <span className="font-semibold">{doctor.rating}</span>
                <span className="text-gray-500 ml-1">Rating</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Left Column - Doctor Details */}
        <div className="md:col-span-2">
          {/* About */}
          <div className="card p-6 mb-6">
            <h2 className="text-xl font-bold text-[#02475b] mb-4">About</h2>
            <p className="text-gray-700">{doctor.about}</p>
          </div>

          {/* Education & Specializations */}
          <div className="card p-6 mb-6">
            <h2 className="text-xl font-bold text-[#02475b] mb-4">Education & Specializations</h2>
            <div className="mb-4">
              <h3 className="font-semibold text-gray-800 mb-2">Education</h3>
              <p className="text-gray-700">{doctor.education}</p>
            </div>

            {doctor.specializations && doctor.specializations.length > 0 && (
              <div>
                <h3 className="font-semibold text-gray-800 mb-2">Specializations</h3>
                <div className="flex flex-wrap gap-2">
                  {doctor.specializations.map((specialization, index) => (
                    <span key={index} className="badge badge-primary">
                      {specialization}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Available Days */}
          <div className="card p-6">
            <h2 className="text-xl font-bold text-[#02475b] mb-4">Availability</h2>
            <div className="flex items-center mb-4">
              <Calendar className="text-[#00b38e] mr-2" size={18} />
              <span className="text-gray-700">Available on: {doctor.availableDays.join(", ")}</span>
            </div>
          </div>
        </div>

        {/* Right Column - Appointment Booking */}
        <div className="md:col-span-1">
          <div className="card p-6 sticky top-4">
            <h2 className="text-xl font-bold text-[#02475b] mb-4">Book Appointment</h2>

            {/* Date Selection */}
            <div className="mb-6">
              <h3 className="font-semibold text-gray-800 mb-3">Select Date</h3>
              <div className="flex overflow-x-auto pb-2 gap-2">
                {nextDays.map((date) => (
                  <button
                    key={date.toISOString()}
                    onClick={() => setSelectedDate(date)}
                    className={`flex-shrink-0 p-3 rounded-md border ${
                      selectedDate.toDateString() === date.toDateString()
                        ? "bg-[#00b38e] text-white border-[#00b38e]"
                        : "border-gray-300 hover:border-[#00b38e]"
                    }`}
                  >
                    <div className="text-center">
                      <div className="text-sm font-medium">{format(date, "EEE")}</div>
                      <div className="text-lg font-bold">{format(date, "d")}</div>
                      <div className="text-sm">{format(date, "MMM")}</div>
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Time Slot Selection */}
            <div className="mb-6">
              <h3 className="font-semibold text-gray-800 mb-3">Select Time Slot</h3>
              <div className="grid grid-cols-2 gap-2">
                {doctor.availableSlots.map((slot) => (
                  <button
                    key={slot}
                    onClick={() => setSelectedSlot(slot)}
                    className={`p-2 rounded-md border ${
                      selectedSlot === slot
                        ? "bg-[#00b38e] text-white border-[#00b38e]"
                        : "border-gray-300 hover:border-[#00b38e]"
                    } flex items-center justify-center`}
                  >
                    <Clock className="mr-1" size={14} />
                    {slot}
                  </button>
                ))}
              </div>
            </div>

            {/* Booking Button */}
            <button
              className={`w-full btn-primary py-3 flex items-center justify-center ${
                !selectedSlot ? "opacity-50 cursor-not-allowed" : ""
              }`}
              disabled={!selectedSlot}
            >
              <Calendar className="mr-2" size={18} />
              Book Appointment
            </button>

            <p className="text-center text-sm text-gray-500 mt-4">₹{doctor.consultationFee} consultation fee</p>
          </div>
        </div>
      </div>
    </div>
  )
}
