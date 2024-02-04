<script setup lang="ts">
import type {ProfileReview} from "~/types/reviews";
import {convertDate, formatReviewPhone} from "../../../.nuxt/imports";

const props = defineProps<{
  review: ProfileReview
}>()

const { cities } = useCityStore()

const types = {
  "clinic": "Ветклиника",
  "salon": "Зоосалон",
  "vet": props.review.organization.profession,
  "groomer": props.review.organization.profession,
}

</script>

<template>
<div class="card">
  <div class="card-specialist">
    <div class="card-specialist__block">
      <div class="card-specialist__media">
        <img :src="review.organization.photo" alt="specialist">
      </div>

      <div class="card-specialist__info">
        <h3 class="card-specialist__name">{{ review.organization.name }}</h3>
        <div class="card-specialist__rating">
          <span>Рейтинг {{ review.organization_rating.toFixed(1) }}</span>
          <Rating :rating="Math.round(review.organization_rating)"/>
        </div>
        <div class="card-specialist__criteria">
          <span class="card-specialist__type">{{ types[review.organization.type] }}</span>
          <span v-if="review.organization.round_clock" class="card-specialist__schedule">Круглосуточно</span>
          <span v-else-if="review.organization.experience" class="card-specialist__schedule">{{ review.organization.experience }}</span>
          <span class="card-specialist__city">{{ cities[review.organization.city] }}</span>
        </div>
      </div>

    </div>

    <NuxtLink :to="`/catalog/${review.organization.type}/${review.organization.id}`">
      <button class="card-specialist__btn">Перейти</button>
    </NuxtLink>

  </div>

  <div class="card-comment">
    <div class="card-comment__header">
      <div class="card-comment__icon">
        <img src="/images/user-icon.svg" alt="user">
      </div>

      <div class="card-comment__info">
        <div class="card-comment__tel">{{ formatReviewPhone(review.phone) }}</div>
        <div class="card-comment__status">Клиент</div>
      </div>
    </div>

    <div class="card-comment__rating">
      <Rating :rating="review.rating"/>
      <span class="card-comment__date">{{ convertDate(review.created_at) }}</span>
    </div>
    <p class="card-comment__copy">{{ review.review_text }}</p>
  </div>
</div>
</template>

<style scoped lang="scss">
.card {
  position: relative;
  display: flex;
  align-items: center;
  min-width: 100%;
  height: auto;
  padding: 32px;
  margin-bottom: 32px;
  border-radius: 20px;
  background: #FFF;
  box-shadow: 2px 2px 20px 0 rgba(0, 0, 0, 0.10);
  transition: all 0.1s ease-in-out;

  &:hover {
    box-shadow: 2px 2px 20px 0 rgba(0, 0, 0, 0.20);
  }

  &:before {
    content: "";
    position: absolute;
    top: 32px;
    bottom: 32px;
    left: 492px + 48px;
    width: 1px;
    background: #D9DAD9;
  }

  &-specialist {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 32px;
    width: 492px;
    min-width: 492px;
    padding: 36px 0;
    margin-right: 24px;

    &__block {
      display: flex;
      align-items: center;
      gap: 24px;
    }

    &__media {
      width: 100px;
      height: 100px;

      img {
        width: 100%;
        height: 100%;
        border-radius: 10px;
        object-fit: cover;
      }
    }

    &__info {
      display: flex;
      flex-direction: column;
      gap: 8px;
    }

    &__name {
      color: $text-dark;
      font-feature-settings: 'clig' off, 'liga' off;
      font-family: Roboto, serif;
      font-size: 24px;
      font-style: normal;
      font-weight: 500;
      line-height: normal;
    }

    &__rating {
      display: flex;
      align-items: center;
      gap: 24px;
      margin-top: -4px;
      font-size: 24px;

      span {
        margin-top: 4px;
        color: $text-dark;
        font-feature-settings: 'clig' off, 'liga' off;
        font-family: Roboto, serif;
        font-size: 18px;
        font-style: normal;
        font-weight: 400;
        line-height: normal;
      }
    }

    &__criteria {
      display: flex;
      gap: 12px;

      span {
        padding: 4px 16px;
        border-radius: 30px;
        color: var(--t-367, rgba(0, 0, 0, 0.67));
        font-feature-settings: 'clig' off, 'liga' off;
        font-family: Roboto, serif;
        font-size: 14px;
        font-style: normal;
        font-weight: 400;
        line-height: 24px; /* 171.429% */
        cursor: pointer;
        transition: opacity 0.1s ease-in-out;
      }
    }

    &__type {
      background: rgba(221, 185, 164, 0.50);
    }

    &__schedule {
      background: rgba(254, 230, 185, 0.50);
    }

    &__city {
      border: 1px solid var(--Line, #D9DAD9);
    }

    &__btn {
      padding: 12px 64px;
      border-radius: 10px;
      border: none;
      background: $main-color;
      color: #FFF;
      font-feature-settings: 'clig' off, 'liga' off;
      font-family: Roboto, serif;
      font-size: 18px;
      font-style: normal;
      font-weight: 400;
      line-height: normal;
      cursor: pointer;
      transition: all 0.1s ease-in-out;

      &:hover {
        background: $main-color-dark;
      }
    }
  }

  &-comment {
    padding: 28px 0;
    margin-left: 24px;

    &__header {
      display: flex;
      align-items: center;
      gap: 16px;
      margin-bottom: 8px;
    }

    &__icon {
      width: 50px;
      height: 50px;

      img {
        width: 100%;
        height: 100%;
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

    &__rating {
      display: flex;
      align-items: center;
      gap: 8px;
      margin-bottom: 8px;
      font-size: 24px;
    }

    &__date {
      margin-top: 4px;
      color: $dark-grey;
      font-feature-settings: 'clig' off, 'liga' off;
      font-family: Roboto, serif;
      font-size: 18px;
      font-style: normal;
      font-weight: 400;
      line-height: 30px; /* 166.667% */
    }

    &__copy {
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
  }
}
</style>