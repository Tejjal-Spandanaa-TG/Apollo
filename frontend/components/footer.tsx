import Link from "next/link"
import Image from "next/image"
import { Facebook, Twitter, Instagram, Linkedin, Mail, Phone, MapPin } from "lucide-react"

export default function Footer() {
  return (
    <footer className="bg-[#02475b] text-white pt-12 pb-6">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
          {/* Logo and About */}
          <div>
            <div className="mb-4">
              <div className="relative w-32 h-8">
                <Image src="/apollo-logo-white.png" alt="Apollo 247" fill className="object-contain" />
              </div>
            </div>
            <p className="text-gray-300 mb-4">
              Apollo 247 is a single online healthcare destination for all your health needs.
            </p>
            <div className="flex space-x-4">
              <Link href="#" className="text-white hover:text-[#00b38e]">
                <Facebook size={20} />
              </Link>
              <Link href="#" className="text-white hover:text-[#00b38e]">
                <Twitter size={20} />
              </Link>
              <Link href="#" className="text-white hover:text-[#00b38e]">
                <Instagram size={20} />
              </Link>
              <Link href="#" className="text-white hover:text-[#00b38e]">
                <Linkedin size={20} />
              </Link>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/" className="text-gray-300 hover:text-white">
                  Home
                </Link>
              </li>
              <li>
                <Link
                  href="/specialties/general-physician-internal-medicine"
                  className="text-gray-300 hover:text-white"
                >
                  Find Doctors
                </Link>
              </li>
              <li>
                <Link href="#" className="text-gray-300 hover:text-white">
                  Book Lab Tests
                </Link>
              </li>
              <li>
                <Link href="#" className="text-gray-300 hover:text-white">
                  Order Medicines
                </Link>
              </li>
              <li>
                <Link href="#" className="text-gray-300 hover:text-white">
                  Health Records
                </Link>
              </li>
            </ul>
          </div>

          {/* Services */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Our Services</h3>
            <ul className="space-y-2">
              <li>
                <Link href="#" className="text-gray-300 hover:text-white">
                  Online Doctor Consultation
                </Link>
              </li>
              <li>
                <Link href="#" className="text-gray-300 hover:text-white">
                  Apollo Pharmacy
                </Link>
              </li>
              <li>
                <Link href="#" className="text-gray-300 hover:text-white">
                  Diagnostic Services
                </Link>
              </li>
              <li>
                <Link href="#" className="text-gray-300 hover:text-white">
                  Health Packages
                </Link>
              </li>
              <li>
                <Link href="#" className="text-gray-300 hover:text-white">
                  Hospital Services
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Contact Us</h3>
            <ul className="space-y-3">
              <li className="flex items-start">
                <MapPin size={18} className="mr-2 mt-1 flex-shrink-0" />
                <span className="text-gray-300">Apollo Health Co, 123 Healthcare Avenue, Medical District, India</span>
              </li>
              <li className="flex items-center">
                <Phone size={18} className="mr-2 flex-shrink-0" />
                <span className="text-gray-300">+91 1800 123 4567</span>
              </li>
              <li className="flex items-center">
                <Mail size={18} className="mr-2 flex-shrink-0" />
                <span className="text-gray-300">support@apollo247clone.com</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Footer */}
        <div className="pt-6 border-t border-gray-700 text-center text-gray-400 text-sm">
          <p>© {new Date().getFullYear()} Apollo 247 Clone. All rights reserved.</p>
          <p className="mt-2">This is a demo project and not affiliated with the actual Apollo 247 service.</p>
        </div>
      </div>
    </footer>
  )
}
