export interface ReviewsData {
    reviews: Review[];
}

export interface Checks {
    [key: string]: boolean;
}

export interface Review {
    id: number;
    rating: number;
    phone: string;
    review_text: string;
    created_at: string;
    user_reaction?: boolean;
    likes?: number;
    dislikes?: number;
}

export interface SendReviewBody {
    user_id: number | null;
    institution_id?: number;
    specialist_id?: number;
    rating: number;
    review_text: string | null;
}