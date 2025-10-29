import type { IconType } from "react-icons"

export interface ServicePricing {
  startingPrice?: number
  currency?: string
  pricingModel?: string
  note?: string
}

export interface Service {
  icon: IconType
  title: string
  description: string
  features: string[]
  technologies?: string[]
  pricing?: ServicePricing
  deliveryTime?: string
  available: boolean
  featured: boolean
  order?: number
}
