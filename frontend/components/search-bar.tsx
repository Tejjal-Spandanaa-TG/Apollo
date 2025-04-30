"use client"

import type React from "react"

import { useState } from "react"
import { Search } from "lucide-react"

interface SearchBarProps {
  onSearch: (searchTerm: string) => void
  initialValue?: string
}

export default function SearchBar({ onSearch, initialValue = "" }: SearchBarProps) {
  const [searchTerm, setSearchTerm] = useState(initialValue)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSearch(searchTerm)
  }

  return (
    <form onSubmit={handleSubmit} className="relative">
      <input
        type="text"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        placeholder="Search for doctors by name, speciality, or hospital"
        className="input-field pl-12 py-3 text-base w-full"
      />
      <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
      <button type="submit" className="absolute right-2 top-1/2 transform -translate-y-1/2 btn-primary">
        Search
      </button>
    </form>
  )
}
