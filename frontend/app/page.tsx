import Link from "next/link"
import Image from "next/image"
import { Search, ArrowRight } from "lucide-react"

export default function Home() {
  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="bg-[#02475b] text-white py-16">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center">
            <div className="md:w-1/2 mb-8 md:mb-0">
              <h1 className="text-4xl md:text-5xl font-bold mb-4">Your Health Is Our Priority</h1>
              <p className="text-lg mb-8">
                Book appointments with the best doctors and specialists in your city at Apollo 247.
              </p>
              <Link
                href="/specialties/general-physician-internal-medicine"
                className="btn-primary inline-flex items-center text-lg"
              >
                Find Doctors <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </div>
            <div className="md:w-1/2 flex justify-center">
              <Image
                src="/doctor-hero.jpg"
                alt="Doctor with patient"
                width={500}
                height={400}
                className="rounded-lg shadow-lg"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Search Section */}
      <section className="py-12 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-center text-3xl font-bold text-[#02475b] mb-8">Find Doctors & Book Appointments</h2>
            <div className="relative">
              <input
                type="text"
                placeholder="Search for doctors, specialties, or conditions"
                className="input-field pl-12 py-4 text-lg"
              />
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <button className="absolute right-2 top-1/2 transform -translate-y-1/2 btn-primary">Search</button>
            </div>
          </div>
        </div>
      </section>

      {/* Popular Specialties */}
      <section className="py-12 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-center text-3xl font-bold text-[#02475b] mb-8">Popular Specialties</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              { name: "General Physician", icon: "🩺", link: "/specialties/general-physician-internal-medicine" },
              { name: "Dermatology", icon: "👨‍⚕️", link: "/specialties/dermatology" },
              { name: "Pediatrics", icon: "👶", link: "/specialties/pediatrics" },
              { name: "Orthopedics", icon: "🦴", link: "/specialties/orthopedics" },
              { name: "Cardiology", icon: "❤️", link: "/specialties/cardiology" },
              { name: "Gynecology", icon: "👩‍⚕️", link: "/specialties/gynecology" },
              { name: "Neurology", icon: "🧠", link: "/specialties/neurology" },
              { name: "ENT", icon: "👂", link: "/specialties/ent" },
            ].map((specialty) => (
              <Link
                key={specialty.name}
                href={specialty.link}
                className="card hover:shadow-lg transition-shadow text-center p-6"
              >
                <div className="text-4xl mb-4">{specialty.icon}</div>
                <h3 className="font-medium text-[#02475b]">{specialty.name}</h3>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-12 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-center text-3xl font-bold text-[#02475b] mb-8">Why Choose Apollo 247</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="card text-center p-6">
              <div className="bg-[#e6f7f4] p-4 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="#00b38e"
                  className="w-8 h-8"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </div>
              <h3 className="font-semibold text-xl mb-2">24/7 Availability</h3>
              <p className="text-gray-600">Access healthcare services anytime, anywhere with our 24/7 availability.</p>
            </div>
            <div className="card text-center p-6">
              <div className="bg-[#e6f7f4] p-4 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="#00b38e"
                  className="w-8 h-8"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                  />
                </svg>
              </div>
              <h3 className="font-semibold text-xl mb-2">Trusted Doctors</h3>
              <p className="text-gray-600">
                Consult with verified and experienced doctors from top hospitals across India.
              </p>
            </div>
            <div className="card text-center p-6">
              <div className="bg-[#e6f7f4] p-4 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="#00b38e"
                  className="w-8 h-8"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M17 8h2a2 2 0 012 2v6a2 2 0 01-2 2h-2v4l-4-4H9a1.994 1.994 0 01-1.414-.586m0 0L11 14h4a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2v4l.586-.586z"
                  />
                </svg>
              </div>
              <h3 className="font-semibold text-xl mb-2">Secure Consultations</h3>
              <p className="text-gray-600">
                Your health data is protected with end-to-end encryption and strict privacy policies.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
