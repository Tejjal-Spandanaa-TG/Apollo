import Image from "next/image"
import Link from "next/link"
import { Star, MapPin, Calendar, DollarSign, Award, Clock } from "lucide-react"
import type { Doctor } from "@/types/doctor"
import { Star, MapPin, Calendar, DollarSign } from "lucide-react";


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
              className="rounded-full object-cover border-2 border-[#e6f7f4]"
            />
          </div>
        </div>

        {/* Doctor Info */}
        <div className="flex-1">
          <Link href={`/doctor/${doctor._id}`} className="hover:text-[#00b38e]">
            <h3 className="font-semibold text-lg text-[#02475b]">{doctor.name}</h3>
          </Link>

          <p className="text-gray-600 text-sm mb-1">{doctor.speciality}</p>

          <div className="flex items-center text-sm text-gray-500 mb-1">
            <MapPin size={14} className="mr-1 text-[#00b38e]" />
            <span>
              {doctor.hospital}, {doctor.city}
            </span>
          </div>

          <div className="flex flex-wrap items-center text-sm mb-1 gap-3">
            <span className="badge badge-primary flex items-center">
              <Award size={12} className="mr-1" />
              {doctor.experience} Years Exp.
            </span>

            <div className="flex items-center">
              <Star size={14} className="text-yellow-500 mr-0.5" />
              <span className="text-gray-700 font-medium">{doctor.rating}</span>
            </div>
          </div>

          <div className="flex items-center text-sm text-gray-600">
            <DollarSign size={14} className="mr-1 text-[#00b38e]" />
            <span>₹{doctor.consultationFee} Consultation Fee</span>
          </div>
        </div>
      </div>

      {/* Available Slots */}
      <div className="mt-4 pt-3 border-t border-gray-100">
        <div className="mb-3">
          <p className="text-sm text-gray-500 flex items-center">
            <Clock size={14} className="mr-1 text-[#00b38e]" />
            Available Today:
            {doctor.availableSlots &&
              doctor.availableSlots.slice(0, 3).map((slot, index) => (
                <span key={index} className="ml-2 badge badge-secondary">
                  {slot}
                </span>
              ))}
            {doctor.availableSlots && doctor.availableSlots.length > 3 && (
              <span className="ml-2 text-xs text-[#00b38e]">+{doctor.availableSlots.length - 3} more</span>
            )}
          </p>
        </div>

        {/* Appointment Button */}
        <Link href={`/doctor/${doctor._id}`} className="w-full btn-primary flex items-center justify-center gap-2">
          <Calendar size={16} />
          Book Appointment
        </Link>
      </div>
    </div>
  )
}
