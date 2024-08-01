<script setup lang="ts">
import type {Ref} from "vue";
import type {Organization} from "~/types/organization";
import type {Checks, Review, ReviewsData} from "~/types/reviews";
import {useType} from "~/composables/useType";

const props = defineProps<{
  organization: Organization;
}>()

const { $ofetch } = useNuxtApp()

const route = useRoute()
const { user } = useUserStore()

const { type } = useType()

const { data: reviews, refresh } = await useAsyncData<Review[]>(
    `reviews:${type.value}:${route.params.id}`,
    async () => {
      try {
        const response: ReviewsData = await $ofetch(`/api/reviews/${type.value}`, {
          method: "POST",
          body: {
            user_id: user.id ? user.id : -1,
            organization_id: props.organization.id
          }
        })

        return response.reviews
      } catch (e) {
        console.log(e)
        return [];
      }
    }
)

const sort = ref<"new" | "old">("new")

const checks: Ref<Checks> = ref({})

const ratingToKeyMap: { [key: number]: keyof Checks } = {
  5: 'great',
  4: 'good',
  3: 'normal',
  2: 'bad',
  1: 'terrible',
};

const reviewsFiltered = computed(() => {
  if (reviews.value) {
    const sorted: Review[] = reviews.value.sort((a, b): number => {
      if (sort.value === "new") {
        return new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
      } else if (sort.value === "old") {
        return new Date(a.created_at).getTime() - new Date(b.created_at).getTime()
      } else {
        return 0
      }
    })

    return sorted.filter((review: Review) => {
      const key = ratingToKeyMap[review.rating] as keyof Checks;
      return checks.value[key];
    })
  } else {
    return []
  }
})

const handleNew = () => {
  sort.value = "new"
}

const handleOld = () => {
  sort.value = "old"
}
</script>

<template>
  <div class="feedback__header">
    <div class="feedback__info">
      <h3 class="feedback__title">
        Отзывы о ветклинике «{{ organization.name }}» <span>({{ reviews ? reviews.length : 0}})</span>
      </h3>

      <div class="feedback__rating">
        <span>Рейтинг {{ organization.rating }}</span>
        <Rating :rating="Math.round(organization.rating)" />
      </div>

      <p class="feedback__sort">
        <span class="sort__text">Сортировать:</span>
        <button
            @click="handleNew"
            class="sort__item"
            :class="{active: sort === 'new'}"
        >
          новые
        </button>

        <button
            @click="handleOld"
            class="sort__item"
            :class="{active: sort === 'old'}"
        >
          старые
        </button>
      </p>
    </div>

    <OrganizationSectionsFeedbackFilter
      :reviews="reviews"
      @checks="(newChecks) => checks = newChecks"
    />
  </div>

  <ul class="feedback-comments">
    <li v-for="review in reviewsFiltered">
      <OrganizationSectionsFeedbackComment
        :review
        @react="refresh"
      />
    </li>
  </ul>

  <Empty
    v-show="reviewsFiltered ? reviewsFiltered.length == 0 : false"
    :margin="78"
  />
</template>

<style scoped>
.feedback__header {
  display: flex;
  gap: 164px;
  margin-bottom: 24px;
}

.feedback__info {
  display: flex;
  flex-direction: column;
}

.feedback__title {
  margin-bottom: 32px;
  color: var(--text-dark);
  font-feature-settings: 'clig' off, 'liga' off;
  font-family: Roboto, serif;
  font-size: 24px;
  font-style: normal;
  font-weight: 500;
  line-height: normal;
}

.feedback__title span {
  color: rgba(0, 0, 0, 0.48);
}

.feedback__rating {
  display: flex;
  align-items: center;
  gap: 24px;
  font-size: 24px;
}

.feedback__rating span {
  margin-top: 6px;
  color: var(--text-dark);
  font-feature-settings: 'clig' off, 'liga' off;
  font-family: Roboto, serif;
  font-size: 18px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
}

.feedback__sort {
  margin-top: auto;
}

.sort__text {
  margin-right: 16px;
  color: var(--text-dark);
  font-feature-settings: 'clig' off, 'liga' off;
  font-family: Roboto, serif;
  font-size: 18px;
  font-style: normal;
  font-weight: 500;
  line-height: normal;
}

.sort__item {
  padding: 4px 8px;
  border: none;
  background-color: transparent;
  color: var(--text-dark);
  font-feature-settings: 'clig' off, 'liga' off;
  font-family: Roboto, serif;
  font-size: 18px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
  cursor: pointer;
  transition: all 0.1s ease-in-out;
}

.sort__item:first-of-type {
  border-right: 1px solid #D9DAD9;
}

.sort__item.active {
  color: var(--main-color);
}

.feedback-comments {
  list-style-type: none;
}

@media (max-width: 640px) {
  .feedback__header {
    flex-direction: column;
    gap: 16px;
    margin-bottom: 32px;
  }

  .feedback__title {
    margin-bottom: 16px;
    font-size: 16px;
    line-height: 19px;
  }

  .feedback__rating {
    gap: 8px;
    font-size: 14px;
  }

  .feedback__rating span {
    margin-top: 2px;
    font-size: 12px;
  }

  .feedback__sort {
    display: none;
  }
}
</style>

