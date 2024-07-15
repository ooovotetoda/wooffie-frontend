export interface Address {
  id: number
  address: string
}

export interface Schedule {
  address_id: number
  day_of_week: number
  end_time: string
  start_time: string
}

export interface Service {
  service_id: number
  service_name: string
  image_url: string
  price: number
  description: string
}

export interface Organization {
  id: number
  name: string
  photo: string
  type: 'clinic' | 'salon' | 'vet' | 'groomer'
  rating: number
  city: City
  profession?: string
  experience?: number
  about: string
  phone: string
  round_clock?: boolean
  local: boolean
  online: boolean
  on_home: boolean
  addresses: Address[]
  schedule: Schedule[]
  services: Service[]
  isFavorite?: boolean
}

export interface OrganizationList {
  status: string
  list: Organization[]
}

export type OrganizationType = 'clinic' | 'salon' | 'vet' | 'groomer'
export type City = 'krd' | 'msk' | 'spb' | 'rnd'
export type OrganizationSection = 'services' | 'clinic' | 'specialists' | 'gallery' | 'feedback'
