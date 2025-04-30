"use client"

import { useState, useEffect } from "react"
import DoctorCard from "./doctor-card"
import FilterPanel from "./filter-panel"
import Pagination from "./pagination"
import SearchBar from "./search-bar"
import type { Doctor } from "@/types/doctor"

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL
  ? `${process.env.NEXT_PUBLIC_API_URL}/api/doctors`
  : "http://localhost:5000/api/doctors"

interface DoctorListingProps {
  speciality?: string
}

export default function DoctorListing({ speciality }: DoctorListingProps) {
  const [doctors, setDoctors] = useState<Doctor[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)
  const [totalDoctors, setTotalDoctors] = useState(0)
  const [limit, setLimit] = useState(6)

  // Filter state
  const [filters, setFilters] = useState({
    city: "",
    speciality: speciality || "",
    minExperience: "",
    maxExperience: "",
    minFee: "",
    maxFee: "",
    sortBy: "rating",
    sortOrder: "desc",
    search: "",
  })

  // Filter options
  const [cities, setCities] = useState<string[]>([])
  const [specialities, setSpecialities] = useState<string[]>([])

  // Fetch filter options on component mount
  useEffect(() => {
    const fetchFilterOptions = async () => {
      try {
        const [citiesRes, specialitiesRes] = await Promise.all([
          fetch(`${API_BASE_URL}/cities`),
          fetch(`${API_BASE_URL}/specialities`),
        ])

        if (!citiesRes.ok || !specialitiesRes.ok) {
          throw new Error("Failed to fetch filter options")
        }

        const citiesData = await citiesRes.json()
        const specialitiesData = await specialitiesRes.json()

        setCities(citiesData.data)
        setSpecialities(specialitiesData.data)
      } catch (err) {
        setError("Failed to load filter options. Please try again later.")
        console.error(err)
      }
    }

    fetchFilterOptions()
  }, [])

  // Fetch doctors based on filters and pagination
  useEffect(() => {
    const fetchDoctors = async () => {
      setLoading(true)
      setError(null)

      try {
        // Build query string from filters
        const queryParams = new URLSearchParams({
          page: currentPage.toString(),
          limit: limit.toString(),
          sortBy: filters.sortBy,
          sortOrder: filters.sortOrder,
        })

        // Add optional filters if they exist
        if (filters.city) queryParams.append("city", filters.city)
        if (filters.speciality) queryParams.append("speciality", filters.speciality)
        if (filters.minExperience) queryParams.append("minExperience", filters.minExperience)
        if (filters.maxExperience) queryParams.append("maxExperience", filters.maxExperience)
        if (filters.minFee) queryParams.append("minFee", filters.minFee)
        if (filters.maxFee) queryParams.append("maxFee", filters.maxFee)
        if (filters.search) queryParams.append("search", filters.search)

        const response = await fetch(`${API_BASE_URL}/list?${queryParams.toString()}`)

        if (!response.ok) {
          throw new Error("Failed to fetch doctors")
        }

        const data = await response.json()

        setDoctors(data.data)
        setTotalPages(data.totalPages)
        setTotalDoctors(data.totalDoctors)
      } catch (err) {
        setError("Failed to load doctors. Please try again later.")
        console.error(err)
      } finally {
        setLoading(false)
      }
    }

    fetchDoctors()
  }, [currentPage, limit, filters])

  // Handle filter changes
  const handleFilterChange = (newFilters: any) => {
    setFilters({ ...filters, ...newFilters })
    setCurrentPage(1) // Reset to first page when filters change
  }

  // Handle search
  const handleSearch = (searchTerm: string) => {
    setFilters({ ...filters, search: searchTerm })
    setCurrentPage(1)
  }

  // Handle page change
  const handlePageChange = (page: number) => {
    setCurrentPage(page)
    window.scrollTo({ top: 0, behavior: "smooth" })
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-[#02475b] mb-2">{filters.speciality || "All Doctors"}</h1>
        <p className="text-gray-600">Book appointments with the best {filters.speciality || "doctors"} in your city.</p>
      </div>

      {/* Search Bar */}
      <div className="mb-6">
        <SearchBar onSearch={handleSearch} initialValue={filters.search} />
      </div>

      <div className="flex flex-col lg:flex-row gap-6">
        {/* Filter Panel */}
        <div className="lg:w-1/4">
          <FilterPanel
            filters={filters}
            onFilterChange={handleFilterChange}
            cities={cities}
            specialities={specialities}
          />
        </div>

        {/* Doctor Listing */}
        <div className="lg:w-3/4">
          {/* Results Summary */}
          <div className="mb-4 flex justify-between items-center">
            <p className="text-gray-600">
              {loading ? "Loading..." : `Showing ${doctors.length} of ${totalDoctors} doctors`}
            </p>

            <div className="flex items-center gap-2">
              <label htmlFor="sort" className="text-sm text-gray-600">
                Sort by:
              </label>
              <select
                id="sort"
                className="select-field text-sm py-1"
                value={`${filters.sortBy}-${filters.sortOrder}`}
                onChange={(e) => {
                  const [sortBy, sortOrder] = e.target.value.split("-")
                  handleFilterChange({ sortBy, sortOrder })
                }}
              >
                <option value="rating-desc">Highest Rating</option>
                <option value="consultationFee-asc">Lowest Fee</option>
                <option value="consultationFee-desc">Highest Fee</option>
                <option value="experience-desc">Most Experienced</option>
              </select>
            </div>
          </div>

          {/* Error Message */}
          {error && <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">{error}</div>}

          {/* Loading State */}
          {loading ? (
            <div className="grid grid-cols-1 gap-6">
              {[...Array(limit)].map((_, index) => (
                <div key={index} className="card animate-pulse">
                  <div className="flex gap-4">
                    <div className="w-24 h-24 bg-gray-300 rounded-full"></div>
                    <div className="flex-1">
                      <div className="h-6 bg-gray-300 rounded w-3/4 mb-2"></div>
                      <div className="h-4 bg-gray-300 rounded w-1/2 mb-2"></div>
                      <div className="h-4 bg-gray-300 rounded w-2/3"></div>
                    </div>
                  </div>
                  <div className="mt-4">
                    <div className="h-10 bg-gray-300 rounded"></div>
                  </div>
                </div>
              ))}
            </div>
          ) : doctors.length === 0 ? (
            <div className="card text-center py-8">
              <h3 className="text-xl text-gray-700 mb-2">No doctors found</h3>
              <p className="text-gray-600">Try adjusting your filters to see more results.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-6">
              {doctors.map((doctor) => (
                <DoctorCard key={doctor._id} doctor={doctor} />
              ))}
            </div>
          )}

          {/* Pagination */}
          {!loading && totalPages > 1 && (
            <div className="mt-8">
              <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={handlePageChange} />
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
