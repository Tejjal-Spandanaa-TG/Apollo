export interface Doctor {
  _id: string
  name: string
  speciality: string
  city: string
  hospital: string
  experience: number
  consultationFee: number
  rating: number
  image: string
  availableDays: string[]
  education: string
  languages: string[]
  createdAt: string
}
