<script setup lang="ts">
import {formatPhone, useUserStore} from "../../.nuxt/imports";
import getDay from "~/utils/getDay";
import type {Organization, Schedule} from '~/types/organization';

const props = defineProps<{
  organization: Organization,
}>()

const { $ofetch } = useNuxtApp()

const { user } = useUserStore()
const { cities } = useCityStore()

const types = {
  "clinic": "Ветклиника",
  "salon": "Зоосалон",
  "vet": props.organization.profession,
  "groomer": props.organization.profession,
}

const institutionsCategories = ["clinic", "salon"]

const category = ref(props.organization.type)
const type = ref(institutionsCategories.includes(category.value) ? "institutions" : "specialists")

const schedule: Schedule | undefined = props.organization.schedule.find((schedule: Schedule) => schedule.day_of_week === getDay())
const startTime = schedule?.start_time ? schedule?.start_time.slice(0, -3) : null;
const endTime =  schedule?.end_time ? schedule?.end_time.slice(0, -3) : null;
const time = (startTime && endTime) ? `${startTime} - ${endTime}` : "не работает"

const addressList = props.organization.addresses.length > 4 ? props.organization.addresses.slice(1, 5) : props.organization.addresses.slice(1)

const isActive = ref(props.organization.isFavorite)

const toggleIsActive = async () => {
  const method = isActive.value ? "DELETE" : "POST"
  let statusCode = 0;

  if (user.loggedIn) {
    try {
      await $ofetch(`/api/user/${user.id}/favorites`, {
        method: method,
        body: {
          organization_id: props.organization.id,
          type: type.value,
        },
        onResponse(context: FetchContext) {
          statusCode = context.response.status
        },
      })

      if (statusCode === 200) {
        isActive.value = !isActive.value
      }
    } catch (e) {
      console.error(e)
    }
  } else {
    await navigateTo("/auth/signin")
  }
}
</script>

<template>
  <div @click="navigateTo(`/catalog/${organization.type}/${organization.id}?section=services`)" class="card">
    <div class="card__media">
      <NuxtImg format="webp" :src="organization.photo" alt="clinic"/>
      <button @click.stop="toggleIsActive" class="card__media-favorite" :class="{ 'card__media-favorite__active': isActive }">
        <IconsFavorite />
      </button>
    </div>
    <div class="card__header">
      <h3 class="card__title">{{ organization.name }}</h3>
      <div class="card__subtitle">
        <span>Рейтинг <span>{{ organization.rating.toFixed(1) }}</span></span>
        <Rating :rating="Math.round(organization.rating)"/>
      </div>
      <div class="card__criteria">
        <span class="card__criteria-type">{{ types[organization.type] }}</span>
        <span v-if="organization.round_clock" class="card__criteria-schedule">Круглосуточно</span>
        <span class="card__criteria-city">{{ cities[organization.city] }}</span>
      </div>
    </div>
    <div class="card__copy">
      {{ organization.about }}
    </div>
    <div class="card__info">
      <div class="card__info-list">
        <div class="card__info-item">
          <IconsCalendar />
          <span>Сегодня {{ time }}</span>
        </div>
        <div class="card__info-item">
          <IconsCall />
          <span>{{ formatPhone(organization.phone) }}</span>
        </div>
        <div class="card__address">
          <span class="card__address-main">
            <IconsLocation/>
            {{ organization.addresses[0].address }}
          </span>
          <ul class="card__address-list">
            <li v-for="address in addressList" class="card__address-item">
              <span class="card__address-point"></span>
              <span class="card__address-sub">{{ address.address }}</span>
            </li>
          </ul>
        </div>
      </div>
      <button class="card__info-enroll">Записаться</button>
    </div>
  </div>
</template>

<style scoped lang="scss">
.card {
  display: grid;
  grid-template-areas:
    "media header info"
    "media copy info";
  gap: 24px;
  padding: 32px;
  margin-bottom: 32px;
  border-radius: 20px;
  min-width: 100%;
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
    grid-area: media;

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

  &__header {
    padding-right: 24px;
    grid-area: header;
  }

  &__copy {
    grid-area: copy;
    display: -webkit-box;
    max-width: 100%;
    -webkit-line-clamp: 4;
    -webkit-box-orient: vertical;
    overflow: hidden;
    margin-top: -24px;
    color: var(--primary-text-87, rgba(0, 0, 0, 0.87));
    font-feature-settings: 'clig' off, 'liga' off;
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
    grid-area: info;
    width: 357px;
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
      margin-bottom: 14px;

      svg {
        font-size: 24px;
      }
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

  &__address {
    margin-top: 34px;

    svg {
      font-size: 24px;
    }

    &-main {
      display: flex;
      align-items: center;
      gap: 8px;
      color: rgba(0, 0, 0, 0.87);
      font-feature-settings: 'clig' off, 'liga' off;
      font-family: Roboto, sans-serif;
      font-size: 18px;
      font-style: normal;
      font-weight: 400;
      line-height: normal;
    }

    &-list {
      margin-top: 8px;
      display: flex;
      flex-wrap: wrap;
      list-style-type: none;
    }

    &-item {
      display: flex;
      align-items: center;
      color: rgba(0, 0, 0, 0.87);
      font-feature-settings: 'clig' off, 'liga' off;
      font-family: Roboto, sans-serif;
      font-size: 16px;
      font-style: normal;
      font-weight: 400;
      line-height: normal;
    }

    &-point {
      display: flex;
      width: 10px;
      height: 10px;
      margin: 10px;
      background-color: rgba(225, 175, 87, 0.60);
      border-radius: 50%;
    }
  }
}

@media (max-width: 1440px) {
  .card {
    padding: 24px;
    gap: 16px;

    &__media {
      width: 180px;
      height: 200px;

      img {
        min-width: 180px;
        min-height: 200px;
      }
    }

    &__copy {
      -webkit-line-clamp: 3;
    }

    &__info {
      width: auto;
      min-width: auto;
      font-size: 16px;
    }

    &__address {
      &-main {
        font-size: 16px;
      }
    }
  }
}

@media (max-width: 414px) {
  .card {
    grid-template-areas:
    "media header"
    "copy copy"
    "info info";
    position: relative;
    margin-bottom: 16px;
    gap: 0;

    &__media {
      position: static;
      width: 80px;
      height: 80px;

      img {
        min-width: 80px;
        min-height: 80px;
        border-radius: 50%;
      }

      &-favorite {
        top: 24px;
        right: 24px;
        padding: 6px;

        svg {
          font-size: 14px;
        }

        &__active {
          background-color: rgba(0,0,0, 0.05);
        }
      }
    }

    &__header {
      padding-right: 48px;
      margin-bottom: 16px;
    }

    &__title {
      margin-bottom: 4px;
      font-size: 16px;
    }

    &__subtitle {
      gap: 8px;
      font-size: 12px;

      .rating {
        font-size: 14px;
      }

      span {
        margin-top: 1px;

        span {
          display: none;
        }
      }
    }
    
    &__criteria {
      margin-top: 16px;
      gap: 4px;

      span {
        padding: 6px 8px;
        font-size: 12px;
        line-height: 14px;
      }
    }

    &__copy {
      margin-bottom: 16px;
      font-size: 12px;
      line-height: 17px;
      text-align: justify;
      -webkit-line-clamp: 5;
    }

    &__info {
      padding: 0;
      margin-left: 0;
      border: none;
      font-size: 14px;
      font-weight: 400;
      line-height: 16px;

      &-item {
        margin-bottom: 8px;

        svg {
          font-size: 16px;
        }
      }

      &-enroll {
        margin: 16px auto 0 auto;
        font-size: 14px;
      }
    }

    &__address {
      margin-top: 0;

      span {
        font-size: 14px;
        font-weight: 400;
        line-height: 16px;
      }

      svg {
        font-size: 16px;
      }

      &-list {
        display: none;
      }
    }
  }
}

</style>