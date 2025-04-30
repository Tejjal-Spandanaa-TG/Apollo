import type { Metadata } from "next"
import DoctorListing from "@/components/doctor-listing"

export const metadata: Metadata = {
  title: "Find General Physicians Near You | Doctor Listing",
  description:
    "Book appointments with the best general physicians in your city. Filter by experience, consultation fees, and more.",
  keywords: "general physician, doctor, medical consultation, healthcare, appointment",
}

export default function DestinationPage() {
  return (
    <main className="min-h-screen">
      <DoctorListing />
    </main>
  )
}
