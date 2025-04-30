"use client"

import type React from "react"

import { useState } from "react"
import { Filter, X } from "lucide-react"

interface FilterPanelProps {
  filters: {
    city: string
    speciality: string
    minExperience: string
    maxExperience: string
    minFee: string
    maxFee: string
    sortBy: string
    sortOrder: string
    search?: string
  }
  onFilterChange: (filters: any) => void
  cities: string[]
  specialities: string[]
}

export default function FilterPanel({ filters, onFilterChange, cities, specialities }: FilterPanelProps) {
  const [isOpen, setIsOpen] = useState(false)

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    onFilterChange({ [name]: value })
  }

  const clearFilters = () => {
    onFilterChange({
      city: "",
      minExperience: "",
      maxExperience: "",
      minFee: "",
      maxFee: "",
      sortBy: "rating",
      sortOrder: "desc",
      search: "",
    })
  }

  const toggleFilters = () => {
    setIsOpen(!isOpen)
  }

  return (
    <div className="card sticky top-4">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-semibold flex items-center text-[#02475b]">
          <Filter size={18} className="mr-2 text-[#00b38e]" /> Filters
        </h2>

        <div className="flex gap-2">
          <button onClick={clearFilters} className="text-sm text-[#00b38e] hover:text-[#009e7f]">
            Clear All
          </button>

          <button className="lg:hidden" onClick={toggleFilters}>
            {isOpen ? <X size={20} /> : <Filter size={20} />}
          </button>
        </div>
      </div>

      <div className={`space-y-4 ${isOpen ? "block" : "hidden lg:block"}`}>
        {/* City Filter */}
        <div>
          <label htmlFor="city" className="block text-sm font-medium text-gray-700 mb-1">
            City
          </label>
          <select id="city" name="city" className="select-field" value={filters.city} onChange={handleInputChange}>
            <option value="">All Cities</option>
            {cities.map((city) => (
              <option key={city} value={city}>
                {city}
              </option>
            ))}
          </select>
        </div>

        {/* Speciality Filter - Only show if not already filtered by speciality */}
        {!filters.speciality && (
          <div>
            <label htmlFor="speciality" className="block text-sm font-medium text-gray-700 mb-1">
              Speciality
            </label>
            <select
              id="speciality"
              name="speciality"
              className="select-field"
              value={filters.speciality}
              onChange={handleInputChange}
            >
              <option value="">All Specialities</option>
              {specialities.map((speciality) => (
                <option key={speciality} value={speciality}>
                  {speciality}
                </option>
              ))}
            </select>
          </div>
        )}

        {/* Experience Range */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Experience (Years)</label>
          <div className="grid grid-cols-2 gap-2">
            <div>
              <input
                type="number"
                name="minExperience"
                placeholder="Min"
                className="input-field"
                value={filters.minExperience}
                onChange={handleInputChange}
                min="0"
              />
            </div>
            <div>
              <input
                type="number"
                name="maxExperience"
                placeholder="Max"
                className="input-field"
                value={filters.maxExperience}
                onChange={handleInputChange}
                min={filters.minExperience || "0"}
              />
            </div>
          </div>
        </div>

        {/* Fee Range */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Consultation Fee (₹)</label>
          <div className="grid grid-cols-2 gap-2">
            <div>
              <input
                type="number"
                name="minFee"
                placeholder="Min"
                className="input-field"
                value={filters.minFee}
                onChange={handleInputChange}
                min="0"
              />
            </div>
            <div>
              <input
                type="number"
                name="maxFee"
                placeholder="Max"
                className="input-field"
                value={filters.maxFee}
                onChange={handleInputChange}
                min={filters.minFee || "0"}
              />
            </div>
          </div>
        </div>

        {/* Availability Filter */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Availability</label>
          <div className="space-y-2">
            <div className="flex items-center">
              <input type="checkbox" id="available-today" className="rounded text-[#00b38e] focus:ring-[#00b38e]" />
              <label htmlFor="available-today" className="ml-2 text-sm text-gray-700">
                Available Today
              </label>
            </div>
            <div className="flex items-center">
              <input type="checkbox" id="available-tomorrow" className="rounded text-[#00b38e] focus:ring-[#00b38e]" />
              <label htmlFor="available-tomorrow" className="ml-2 text-sm text-gray-700">
                Available Tomorrow
              </label>
            </div>
            <div className="flex items-center">
              <input type="checkbox" id="available-weekend" className="rounded text-[#00b38e] focus:ring-[#00b38e]" />
              <label htmlFor="available-weekend" className="ml-2 text-sm text-gray-700">
                Available on Weekend
              </label>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
