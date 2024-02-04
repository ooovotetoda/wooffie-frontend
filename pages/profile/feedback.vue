<script setup lang="ts">
import {$fetch} from "ofetch";
import type {ProfileReview, ProfileReviewData, ProfileReviews} from "~/types/reviews";

definePageMeta({
  layout: "profile",
  breadcrumb: "Мои отзывы"
})

const config = useRuntimeConfig()
const { user } = useUserStore()

const { data: reviews, pending } = await useAsyncData<ProfileReview[]>(
    `profile:feedback`,
    async () => {
      const response: ProfileReviews = await $fetch(`/api/reviews/${user.id}`, {
        method: "GET",
        baseURL: config.public.baseUrl
      })

      const specialists = response.reviews_specialists ? response.reviews_specialists.map((review: ProfileReviewData): ProfileReview => {
        return {
          id: review.id,
          user_id: review.user_id,
          organization_id: review.specialist_id,
          organization_rating: review.organization_rating,
          phone: review.phone,
          rating: review.rating,
          review_text: review.review_text,
          created_at: review.created_at,
          organization: review.specialist
        }
      }) : []

      const institutions = response.reviews_institutions ? response.reviews_institutions.map((review: ProfileReviewData): ProfileReview => {
        return {
          id: review.id,
          user_id: review.user_id,
          organization_id: review.institution_id,
          organization_rating: review.organization_rating,
          phone: review.phone,
          rating: review.rating,
          review_text: review.review_text,
          created_at: review.created_at,
          organization: review.institution
        }
      }) : []

      return [...specialists, ...institutions]
    }
)
</script>

<template>
  <section class="feedback">
    <div v-if="pending" class="loader">
      <Loader />
    </div>
    <div v-else-if="reviews?.length === 0" class="empty">
      <Empty />
    </div>
    <ul v-else>
      <li v-for="review in reviews" >
        <ProfileFeedbackCard :review/>
      </li>
    </ul>
  </section>
</template>

<style scoped lang="scss">
.feedback {
  width: 100%;
}

.loader {
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 128px 0 540px 0;
  min-width: 100%;
}

.empty {
  margin-bottom: 100px;
}

ul {
  list-style-type: none;
}
</style>