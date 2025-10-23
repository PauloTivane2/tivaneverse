export interface ProfileData {
  name: string
  title: string
  tagline: string
  bio: string
  image: string
  email: string
  phone?: string
  location: string
  locationMapLink?: string
  resume?: {
    asset: {
      _ref: string
      url?: string
    }
  }
  social?: {
    github?: string
    linkedin?: string
    twitter?: string
    instagram?: string
  }
  skills?: string[]
  availability: {
    isAvailable: boolean
    message: string
  } | string
}
