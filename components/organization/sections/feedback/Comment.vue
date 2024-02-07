<script setup lang="ts">
import {formatReviewPhone, type Review} from "#imports";
import convertDate from "../../../../utils/convertDate";

const props = defineProps<{
  review: Review
}>()

const emit = defineEmits(["react"])

const config = useRuntimeConfig()
const { user } = useUserStore()

const isLiked = computed(() => props.review.user_reaction === true)
const isDisliked = computed(() => props.review.user_reaction === false)

const handleLike = async () => {
  if (user.loggedIn) {
    if (isLiked.value) {
      try {
        const response: {status: "OK" | "error"} = await $fetch(`/api/reviews/unreact`, {
          method: "POST",
          baseURL: config.public.baseUrl,
          body: {
            user_id: user.id,
            review_id: props.review.id
          }
        })

        if (response.status === "OK") {
          emit("react")
        }
      } catch (e) {
        console.error(e)
      }
    } else {
      try {
        const response: {status: "OK" | "error"} = await $fetch(`/api/reviews/react`, {
          method: "POST",
          baseURL: config.public.baseUrl,
          body: {
            user_id: user.id,
            review_id: props.review.id,
            reaction: true
          }
        })

        if (response.status === "OK") {
          emit("react")
        }
      } catch (e) {
        console.error(e)
      }
    }
  } else {
    await navigateTo("/auth/signin")
  }
}

const handleDislike = async () => {
  if (user.loggedIn) {
    if (isDisliked.value) {
      try {
        const response: {status: "OK" | "error"} = await $fetch(`/api/reviews/unreact`, {
          method: "POST",
          baseURL: config.public.baseUrl,
          body: {
            user_id: user.id,
            review_id: props.review.id
          }
        })

        if (response.status === "OK") {
          emit("react")
        }
      } catch (e) {
        console.error(e)
      }
    } else {
      try {
        const response: {status: "OK" | "error"}  = await $fetch(`/api/reviews/react`, {
          method: "POST",
          baseURL: config.public.baseUrl,
          body: {
            user_id: user.id,
            review_id: props.review.id,
            reaction: false
          }
        })

        if (response.status === "OK") {
          emit("react")
        }
      } catch (e) {
        console.error(e)
      }
    }
  } else {
    await navigateTo("/auth/signin")
  }
}
</script>

<template>
<div class="comment">
  <div class="comment__header">
    <div class="comment__icon">
      <img src="/images/user-icon.svg" alt="avatar">
    </div>
    <div class="comment__info">
      <div class="comment__tel">{{ formatReviewPhone(review.phone) }}</div>
      <div class="comment__status">Клиент</div>
    </div>
  </div>
  <div class="comment__subheader">
    <Rating :rating="review.rating"/>
    <span class="comment__date">{{ convertDate(review.created_at) }}</span>
  </div>
  <p class="comment__copy">{{ review.review_text }}</p>

  <div class="comment__estimations">
    <div class="comment__estimations__item">
      <button @click="handleLike" :class="{ liked: isLiked }">
        <IconsLike />
      </button>
      <span class="comment__estimations__count">{{review.likes}}</span>
    </div>

    <div class="comment__estimations__item">
      <button @click="handleDislike" :class="{ disliked: isDisliked }">
        <IconsDislike />
      </button>
      <span class="comment__estimations__count">{{review.dislikes}}</span>
    </div>
  </div>
</div>
</template>

<style scoped lang="scss">
.comment {
  margin-bottom: 48px;

  &__header {
    display: flex;
    align-items: center;
    gap: 16px;
    margin-bottom: 16px;
  }

  &__icon {
    width: 50px;
    height: 50px;

    img {
      width: 100%;
      height: 100%;
      border-radius: 50%;
    }
  }

  &__tel {
    margin-bottom: 4px;
    color: $text-dark;
    font-feature-settings: 'clig' off, 'liga' off;
    font-family: Roboto, serif;
    font-size: 18px;
    font-style: normal;
    font-weight: 500;
    line-height: normal;
  }

  &__status {
    color: $text-dark;
    font-feature-settings: 'clig' off, 'liga' off;
    font-family: Roboto, serif;
    font-size: 14px;
    font-style: normal;
    font-weight: 400;
    line-height: normal;
  }

  &__subheader {
    display: flex;
    align-items: center;
    gap: 8px;
    margin-bottom: 8px;
  }

  &__date {
    margin-top: 4px;
    color: $dark-grey;
    font-feature-settings: 'clig' off, 'liga' off;
    font-family: Roboto, serif;
    font-size: 18px;
    font-style: normal;
    font-weight: 400;
    line-height: 24px;
  }

  &__copy {
    margin-bottom: 8px;
    overflow: hidden;
    color: $text-dark;
    font-feature-settings: 'clig' off, 'liga' off;
    text-overflow: ellipsis;
    font-family: Roboto, serif;
    font-size: 18px;
    font-style: normal;
    font-weight: 400;
    line-height: 30px; /* 166.667% */
  }

  &__estimations {
    display: flex;
    align-items: center;
    gap: 32px;

    &__item {
      display: flex;
      align-items: center;
      gap: 8px;

      button {
        background-color: transparent;
        border: none;
        cursor: pointer;
        transition: all 0.1s ease-in-out;

        svg {
          color: rgba(0, 0, 0, 0.48);
          transition: all 0.1s ease-in-out;
        }

        &:hover {
          svg {
            color: rgba(225, 175, 87, 0.6);
          }
        }

        &:active {
          scale: 0.75;
        }

        &.liked {
          svg {
            color: $main-color;
          }
        }

        &.disliked {
          svg {
            color: $main-color;
          }
        }
      }
    }

    &__count {
      overflow: hidden;
      color: rgba(0, 0, 0, 0.48);
      font-feature-settings: 'clig' off, 'liga' off;
      text-overflow: ellipsis;
      font-family: Roboto, serif;
      font-size: 18px;
      font-style: normal;
      font-weight: 400;
      line-height: 30px; /* 166.667% */
    }
  }
}
</style>