"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { Menu, X, User, ShoppingCart, Phone } from "lucide-react"

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen)
  }

  return (
    <header className="bg-white shadow-sm sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center">
            <div className="relative w-32 h-8">
              <Image src="/apollo-logo.png" alt="Apollo 247" fill className="object-contain" />
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <Link href="/" className="text-[#02475b] hover:text-[#00b38e]">
              Home
            </Link>
            <Link
              href="/specialties/general-physician-internal-medicine"
              className="text-[#02475b] hover:text-[#00b38e]"
            >
              Doctors
            </Link>
            <Link href="#" className="text-[#02475b] hover:text-[#00b38e]">
              Pharmacy
            </Link>
            <Link href="#" className="text-[#02475b] hover:text-[#00b38e]">
              Lab Tests
            </Link>
          </nav>

          {/* Desktop Right Menu */}
          <div className="hidden md:flex items-center space-x-4">
            <Link href="#" className="text-[#02475b] hover:text-[#00b38e] flex items-center">
              <Phone size={18} className="mr-1" />
              <span>Contact</span>
            </Link>
            <Link href="#" className="text-[#02475b] hover:text-[#00b38e] flex items-center">
              <ShoppingCart size={18} className="mr-1" />
              <span>Cart</span>
            </Link>
            <Link href="#" className="btn-primary">
              <User size={18} className="mr-1" />
              <span>Login</span>
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button onClick={toggleMenu} className="text-[#02475b] hover:text-[#00b38e] focus:outline-none">
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden py-4 border-t">
            <nav className="flex flex-col space-y-4">
              <Link
                href="/"
                className="text-[#02475b] hover:text-[#00b38e] px-2 py-1"
                onClick={() => setIsMenuOpen(false)}
              >
                Home
              </Link>
              <Link
                href="/specialties/general-physician-internal-medicine"
                className="text-[#02475b] hover:text-[#00b38e] px-2 py-1"
                onClick={() => setIsMenuOpen(false)}
              >
                Doctors
              </Link>
              <Link
                href="#"
                className="text-[#02475b] hover:text-[#00b38e] px-2 py-1"
                onClick={() => setIsMenuOpen(false)}
              >
                Pharmacy
              </Link>
              <Link
                href="#"
                className="text-[#02475b] hover:text-[#00b38e] px-2 py-1"
                onClick={() => setIsMenuOpen(false)}
              >
                Lab Tests
              </Link>
              <Link
                href="#"
                className="text-[#02475b] hover:text-[#00b38e] px-2 py-1 flex items-center"
                onClick={() => setIsMenuOpen(false)}
              >
                <Phone size={18} className="mr-1" />
                <span>Contact</span>
              </Link>
              <Link
                href="#"
                className="text-[#02475b] hover:text-[#00b38e] px-2 py-1 flex items-center"
                onClick={() => setIsMenuOpen(false)}
              >
                <ShoppingCart size={18} className="mr-1" />
                <span>Cart</span>
              </Link>
              <Link
                href="#"
                className="btn-primary w-full flex justify-center items-center"
                onClick={() => setIsMenuOpen(false)}
              >
                <User size={18} className="mr-1" />
                <span>Login</span>
              </Link>
            </nav>
          </div>
        )}
      </div>
    </header>
  )
}
