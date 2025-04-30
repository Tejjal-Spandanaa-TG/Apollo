import type { Metadata } from "next"

import DoctorListing from "../../../../components/doctor-listing";

export const metadata: Metadata = {
  title: "Find General Physicians Near You | Apollo 247 Clone",
  description:
    "Book appointments with the best general physicians in your city. Filter by experience, consultation fees, and more.",
  keywords: "general physician, internal medicine, doctor, medical consultation, healthcare, appointment",
}

export default function GeneralPhysicianPage() {
  return (
    <div className="min-h-screen">
      <DoctorListing speciality="General Physician" />
    </div>
  )
}
