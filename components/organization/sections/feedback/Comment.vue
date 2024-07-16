<script setup lang="ts">
import {formatReviewPhone, type Review} from "#imports";
import convertDate from "../../../../utils/convertDate";

const props = defineProps<{
  review: Review
}>()

const emit = defineEmits(["react"])

const { $ofetch } = useNuxtApp()
const { user } = useUserStore()

const isLiked = computed(() => props.review.user_reaction === true)
const isDisliked = computed(() => props.review.user_reaction === false)

const handleLike = async () => {
  if (user.loggedIn) {
    if (isLiked.value) {
      try {
        const response: {status: "OK" | "error"} = await $ofetch(`/api/reviews/unreact`, {
          method: "POST",
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
        const response: {status: "OK" | "error"} = await $ofetch(`/api/reviews/react`, {
          method: "POST",
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
        const response: {status: "OK" | "error"} = await $ofetch(`/api/reviews/unreact`, {
          method: "POST",
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
        const response: {status: "OK" | "error"}  = await $ofetch(`/api/reviews/react`, {
          method: "POST",
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
      <NuxtImg format="webp" provider="myProvider" src="/user-icon.svg" alt="avatar"/>
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

<style scoped>
.comment {
  margin-bottom: 48px;
}

.comment__header {
  display: flex;
  align-items: center;
  gap: 16px;
  margin-bottom: 16px;
}

.comment__icon {
  width: 50px;
  height: 50px;
}

.comment__icon img {
  width: 100%;
  height: 100%;
  border-radius: 50%;
}

.comment__tel {
  margin-bottom: 4px;
  color: var(--text-dark);
  font-feature-settings: 'clig' off, 'liga' off;
  font-family: Roboto, serif;
  font-size: 18px;
  font-style: normal;
  font-weight: 500;
  line-height: normal;
}

.comment__status {
  color: var(--text-dark);
  font-feature-settings: 'clig' off, 'liga' off;
  font-family: Roboto, serif;
  font-size: 14px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
}

.comment__subheader {
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 8px;
}

.comment__date {
  margin-top: 4px;
  color: var(--dark-grey);
  font-feature-settings: 'clig' off, 'liga' off;
  font-family: Roboto, serif;
  font-size: 18px;
  font-style: normal;
  font-weight: 400;
  line-height: 24px;
}

.comment__copy {
  margin-bottom: 8px;
  overflow: hidden;
  color: var(--text-dark);
  font-feature-settings: 'clig' off, 'liga' off;
  text-overflow: ellipsis;
  font-family: Roboto, serif;
  font-size: 18px;
  font-style: normal;
  font-weight: 400;
  line-height: 30px;
}

.comment__estimations {
  display: flex;
  align-items: center;
  gap: 32px;
}

.comment__estimations__item {
  display: flex;
  align-items: center;
  gap: 8px;
}

.comment__estimations__item button {
  background-color: transparent;
  border: none;
  cursor: pointer;
  transition: all 0.1s ease-in-out;
}

.comment__estimations__item button svg {
  color: rgba(0, 0, 0, 0.48);
  transition: all 0.1s ease-in-out;
}

.comment__estimations__item button:hover svg {
  color: rgba(225, 175, 87, 0.6);
}

.comment__estimations__item button:active {
  transform: scale(0.75);
}

.comment__estimations__item button.liked svg {
  color: var(--main-color);
}

.comment__estimations__item button.disliked svg {
  color: var(--main-color);
}

.comment__estimations__count {
  overflow: hidden;
  color: rgba(0, 0, 0, 0.48);
  font-feature-settings: 'clig' off, 'liga' off;
  text-overflow: ellipsis;
  font-family: Roboto, serif;
  font-size: 18px;
  font-style: normal;
  font-weight: 400;
  line-height: 30px;
}

@media (max-width: 640px) {
  .comment {
    margin-bottom: 32px;
  }

  .comment__header {
    gap: 8px;
    margin-bottom: 0;
  }

  .comment__tel {
    font-size: 16px;
    line-height: 19px;
  }

  .comment__status {
    font-size: 14px;
    line-height: 24px;
  }

  .comment__subheader {
    margin-bottom: 0;
    font-size: 14px;
  }

  .comment__date {
    font-size: 12px;
    line-height: 30px;
  }

  .comment__copy {
    margin-bottom: 4px;
    font-size: 14px;
    line-height: 20px;
  }

  .comment__estimations {
    gap: 24px;
  }

  .comment__estimations__count {
    font-size: 14px;
  }
}
</style>
