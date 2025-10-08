import type { IconType } from "react-icons"

export interface ExpertiseItem {
  name: string
  icon: IconType
  color: string
  category?: string
  proficiencyLevel?: number
  yearsOfExperience?: number
  description?: string
  order?: number
  featured?: boolean
}
