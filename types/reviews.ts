import type { Organization } from '~/types/organization'

export interface Review {
  id: number
  rating: number
  phone: string
  review_text: string
  created_at: string
  user_reaction?: boolean
  likes?: number
  dislikes?: number
}

export interface ProfileReviewData {
  id: number
  user_id: number
  specialist_id: number
  institution_id: number
  phone: string
  rating: number
  organization_rating: number
  review_text: string
  created_at: string
  specialist: Organization
  institution: Organization
}

export interface ProfileReview {
  id: number
  user_id: number
  organization_id: number
  phone: string
  rating: number
  organization_rating: number
  review_text: string
  created_at: string
  organization: Organization
}

export interface ProfileReviews {
  status: 'OK' | 'error'
  reviews_specialists: ProfileReviewData[]
  reviews_institutions: ProfileReviewData[]
}

export interface SendReviewBody {
  user_id: number | null
  institution_id?: number
  specialist_id?: number
  rating: number
  review_text: string | null
}

export interface ReviewsData {
  reviews: Review[]
}

export interface Checks {
  [key: string]: boolean
}
