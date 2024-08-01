export interface Favorite {
  id: number
  name: string
  photo: string
  phone: string
  about: string
  rating: number
  city: string
  experience: number
  type: string
  profession?: string
  favorite_type: string
  local: boolean
  on_home: boolean
  online: boolean
}

export interface FavoritesList {
  status: string
  favorites: Favorite[]
}
