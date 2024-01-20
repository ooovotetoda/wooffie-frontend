<script setup lang="ts">
import {formatPhone} from "../../.nuxt/imports";

const text = "Lorem Ipsum is simply dummy text of the printing and typesetting industry.\n" +
  "               Lorem Ipsum has been the industry's standard dummy text ever since the 1500s,\n" +
  "               when an unknown printer took a galley of type and scrambled it to scrambled it to \n" +
  "               Lorem Ipsum has been the industry's standard dummy text ever since the 1500s,\n" +
  "               when an unknown printer took a galley of type and scrambled it to scrambled it to \n" +
  "               Lorem Ipsum has been the industry's standard dummy text ever since the 1500s,\n" +
  "               when an unknown printer took a galley of type and scrambled it to scrambled it to"

const props = defineProps({
  organization: Object,
  maxDescriptionLength: {
    type: Number,
    required: true
  }
})

const route = useRoute()

const isActive = ref(false)

const croppedText = computed(() => {
  return props.organization?.about.length > props.maxDescriptionLength ?
      `${text.substring(0, props.maxDescriptionLength)}...`
      : props.organization?.about
})

const toggleIsActive = () => {
  isActive.value = !isActive.value
}
</script>

<template>
  <div class="card">
    <div class="card__media">
      <img :src="organization.photo" alt="clinic">
      <button @click="toggleIsActive" class="card__media-favorite" :class="{ 'card__media-favorite__active': isActive }">
        <IconsFavorite />
      </button>
    </div>

    <div class="card__body">
      <h3 class="card__title">{{ organization.name }}</h3>
      <div class="card__subtitle">
        <span>Рейтинг {{ organization.rating.toFixed(1) }}</span>
        <Rating :rating="Math.round(organization.rating)"/>
      </div>
      <div class="card__criteria">
        <span class="card__criteria-type">Ветклиника</span>
        <span v-if="organization.round_clock" class="card__criteria-schedule">Круглосуточно</span>
        <span class="card__criteria-city">Краснодар</span>
      </div>
      <div class="card__copy">
        {{ croppedText }}
      </div>
    </div>
    <div class="card__info">
      <div class="card__info-list">
        <div class="card__info-item">
          <IconsCalendar />
          <span>Сегодня 09:00 - 18:00</span>
        </div>
        <div class="card__info-item">
          <IconsCall />
          <span>{{ formatPhone(organization.phone) }}</span>
        </div>
        <div class="card__info-item">
          <IconsLocation />
          <span>г. Краснодар, ул, Большая Садовая, д. 46</span>
        </div>
      </div>
      <NuxtLink :to="`/catalog/${route.params.category}/${organization.id}?section=services`" class="card__info-enroll">Записаться</NuxtLink>
    </div>
  </div>
</template>

<style scoped lang="scss">
.card {
  display: flex;
  gap: 24px;
  padding: 32px;
  margin-bottom: 32px;
  border-radius: 20px;
  background: #FFF;
  box-shadow: 2px 2px 20px 0 rgba(0, 0, 0, 0.10);
  transition: all 0.1s ease-in-out;
  cursor: pointer;

  &:hover {
    box-shadow: 2px 2px 20px 0 rgba(0, 0, 0, 0.20);
  }

  &__media {
    position: relative;
    width: 250px;
    height: 250px;

    img {
      width: 100%;
      height: 100%;
      min-width: 250px;
      min-height: 250px;
      border-radius: 10px;
      object-fit: cover;
    }

    &-favorite {
      position: absolute;
      top: 16px;
      right: 16px;
      transition: all 0.1s ease-in-out;
      padding: 7px;
      border-radius: 50%;
      border: none;
      cursor: pointer;

      svg {
        color: rgba(0, 0, 0, 0.2);
        transition: all 0.1s ease-in-out;
        z-index: 2;
        font-size: 20px;
      }

      &:hover {
        background-color: rgba(255, 255, 255, 0.9);
        
        svg {
          color: rgba(228, 0, 0, 0.56);
        }
      }

      &__active {
        background-color: #fff;

        svg {
          color: rgba(228, 0, 0, 0.87) !important;
        }
      }
    }

    &:active {
      svg {
        transform: scale(0.85);
      }
    }
  }

  &__title {
    margin-bottom: 8px;
    color: $text-dark;
    font-feature-settings: 'clig' off, 'liga' off;
    font-family: Roboto, serif;
    font-size: 24px;
    font-style: normal;
    font-weight: 500;
    line-height: normal;
  }

  &__subtitle {
    display: flex;
    align-items: center;
    gap: 24px;
    margin-bottom: 8px;
    color: $text-dark;
    font-feature-settings: 'clig' off, 'liga' off;
    font-family: Roboto, serif;
    font-size: 18px;
    font-style: normal;
    font-weight: 400;
    line-height: normal;

    span {
      margin-top: 4px;
    }

    .rating {
      font-size: 24px;
    }
  }

  &__criteria {
    display: flex;
    gap: 12px;
    margin-bottom: 16px;

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

    &-type {
      background: rgba(221, 185, 164, 0.50);
    }

    &-schedule {
      background: rgba(254, 230, 185, 0.50);
    }

    &-city {
      border: 1px solid var(--Line, #D9DAD9);
    }
  }

  &__body {
    padding-right: 24px;
  }

  &__copy {
    overflow: hidden;
    color: var(--primary-text-87, rgba(0, 0, 0, 0.87));
    font-feature-settings: 'clig' off, 'liga' off;
    text-overflow: ellipsis;
    font-family: Roboto, serif;
    font-size: 18px;
    font-style: normal;
    font-weight: 400;
    line-height: 30px; /* 166.667% */
  }

  &__info {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    wiorganizationdth: 357px;
    min-width: 357px;
    margin-left: auto;
    padding-left: 24px;
    border-left: 1px solid var(--Line, #D9DAD9);
    color: $text-dark;
    font-feature-settings: 'clig' off, 'liga' off;
    font-family: Roboto, serif;
    font-size: 18px;
    font-style: normal;
    font-weight: 400;
    line-height: normal;

    &-item {
      display: flex;
      align-items: center;
      gap: 8px;
      margin-bottom: 24px;
    }

    &-enroll {
      width: fit-content;
      padding: 12px 50px;
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
      transition: all 0.15s ease-in-out;

      &:hover {
        background-color: $main-color-dark;
      }

      &:active {
        scale: 0.95;
      }
    }
  }
}
</style>