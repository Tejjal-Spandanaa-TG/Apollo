import Image from "next/image"
import { Star, MapPin, Calendar, DollarSign } from "lucide-react"
import type { Doctor } from "@/types/doctor"

interface DoctorCardProps {
  doctor: Doctor
}

export default function DoctorCard({ doctor }: DoctorCardProps) {
  return (
    <div className="card hover:shadow-lg transition-shadow">
      <div className="flex flex-col sm:flex-row gap-4">
        {/* Doctor Image */}
        <div className="flex-shrink-0">
          <div className="relative w-24 h-24 mx-auto sm:mx-0">
            <Image
              src={doctor.image || "/placeholder-doctor.jpg"}
              alt={doctor.name}
              fill
              className="rounded-full object-cover border-2 border-blue-100"
            />
          </div>
        </div>

        {/* Doctor Info */}
        <div className="flex-1">
          <h3 className="font-semibold text-lg text-blue-800">{doctor.name}</h3>

          <p className="text-gray-600 text-sm mb-1">{doctor.speciality}</p>

          <div className="flex items-center text-sm text-gray-500 mb-1">
            <MapPin size={14} className="mr-1" />
            <span>
              {doctor.hospital}, {doctor.city}
            </span>
          </div>

          <div className="flex items-center text-sm mb-1">
            <span className="bg-blue-100 text-blue-800 px-2 py-0.5 rounded-full text-xs mr-2">
              {doctor.experience} Years Exp.
            </span>

            <div className="flex items-center">
              <Star size={14} className="text-yellow-500 mr-0.5" />
              <span className="text-gray-700">{doctor.rating}</span>
            </div>
          </div>

          <div className="flex items-center text-sm text-gray-600">
            <DollarSign size={14} className="mr-1" />
            <span>₹{doctor.consultationFee} Consultation Fee</span>
          </div>
        </div>
      </div>

      {/* Appointment Button */}
      <div className="mt-4 pt-3 border-t border-gray-100">
        <button className="w-full btn-primary flex items-center justify-center gap-2">
          <Calendar size={16} />
          Book Appointment
        </button>
      </div>
    </div>
  )
}