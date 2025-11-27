import type { IconType } from "react-icons"

export interface ExpertiseItem {
  name: string
  icon: IconType
  iconUrl?: string
  color: string
  categories?: string[]
  proficiencyLevel?: number
  yearsOfExperience?: number
  description?: string
  order?: number
  featured?: boolean
}
