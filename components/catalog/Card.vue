<script setup lang="ts">
import { formatPhone, useType, useUserStore } from "../../.nuxt/imports";
import getDay from "~/utils/getDay";
import type { Organization, Schedule } from '~/types/organization';
import type { FetchContext } from "ofetch";
import {useIsOpen} from "~/composables/useIsOpen";

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

const { type } = useType()
const { time } = useIsOpen(props.organization)

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
          statusCode = context.response?.status || 0
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
      <NuxtImg
        :modifiers="{ grayscale: true, tint: '#CF8802' }"
        format="webp"
        :src="organization.photo"
        alt="clinic"
      />
      <button
        class="card__media-favorite"
        :class="{ 'card__media-favorite__active': isActive }"
        @click.stop="toggleIsActive"
      >
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
            <IconsLocationUnderline/>
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
      <button class="card__info-enroll">Перейти</button>
    </div>
  </div>
</template>

<style scoped>
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
}

.card:hover {
  box-shadow: 2px 2px 20px 0 rgba(0, 0, 0, 0.20);
}

.card__media {
  position: relative;
  width: 250px;
  height: 250px;
  grid-area: media;
}

.card__media img {
  width: 100%;
  height: 100%;
  min-width: 250px;
  min-height: 250px;
  border-radius: 10px;
  object-fit: cover;
}

.card__media-favorite {
  position: absolute;
  top: 16px;
  right: 16px;
  transition: all 0.1s ease-in-out;
  padding: 7px;
  border-radius: 50%;
  border: none;
  background-color: rgba(255, 255, 255, 0.76);
  cursor: pointer;
}

.card__media-favorite svg {
  color: rgba(0, 0, 0, 0.2);
  transition: all 0.1s ease-in-out;
  z-index: 2;
  font-size: 20px;
}

.card__media-favorite:hover {
  background-color: rgba(255, 255, 255, 0.9);
}

.card__media-favorite:hover svg {
  color: rgba(228, 0, 0, 0.56);
}

.card__media-favorite__active {
  background-color: #fff;
}

.card__media-favorite__active svg {
  color: rgba(228, 0, 0, 0.87) !important;
}

.card__media:active svg {
  transform: scale(0.85);
}

.card__title {
  margin-bottom: 8px;
  color: var(--text-dark);
  font-feature-settings: 'clig' off, 'liga' off;
  font-family: Roboto, serif;
  font-size: 24px;
  font-style: normal;
  font-weight: 500;
  line-height: normal;
}

.card__subtitle {
  display: flex;
  align-items: center;
  gap: 24px;
  margin-bottom: 8px;
  color: var(--text-dark);
  font-feature-settings: 'clig' off, 'liga' off;
  font-family: Roboto, serif;
  font-size: 18px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
}

.card__subtitle span {
  margin-top: 4px;
}

.card__subtitle .rating {
  font-size: 24px;
}

.card__criteria {
  display: flex;
  gap: 12px;
  margin-bottom: 16px;
}

.card__criteria span {
  padding: 4px 16px;
  border-radius: 30px;
  color: var(--t-367, rgba(0, 0, 0, 0.67));
  font-feature-settings: 'clig' off, 'liga' off;
  font-family: Roboto, serif;
  font-size: 14px;
  font-style: normal;
  font-weight: 400;
  line-height: 24px;
  cursor: pointer;
  transition: opacity 0.1s ease-in-out;
}

.card__criteria-type {
  background: rgba(221, 185, 164, 0.50);
}

.card__criteria-schedule {
  background: rgba(254, 230, 185, 0.50);
}

.card__criteria-city {
  border: 1px solid var(--Line, #D9DAD9);
}

.card__header {
  padding-right: 24px;
  grid-area: header;
}

.card__copy {
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
  line-height: 30px;
}

.card__info {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  grid-area: info;
  width: 357px;
  min-width: 357px;
  margin-left: auto;
  padding-left: 24px;
  border-left: 1px solid var(--Line, #D9DAD9);
  color: var(--text-dark);
  font-feature-settings: 'clig' off, 'liga' off;
  font-family: Roboto, serif;
  font-size: 18px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
}

.card__info-item {
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 14px;
}

.card__info-item svg {
  font-size: 24px;
}

.card__info-enroll {
  width: fit-content;
  padding: 12px 50px;
  border-radius: 10px;
  border: none;
  background: var(--main-color);
  color: #FFF;
  font-feature-settings: 'clig' off, 'liga' off;
  font-family: Roboto, serif;
  font-size: 18px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
  cursor: pointer;
  transition: all 0.15s ease-in-out;
}

.card__info-enroll:hover {
  background-color: var(--main-color-dark);
}

.card__info-enroll:active {
  transform: scale(0.95);
}

.card__address {
  margin-top: 34px;
}

.card__address svg {
  font-size: 24px;
}

.card__address-main {
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

.card__address-list {
  margin-top: 8px;
  display: flex;
  flex-wrap: wrap;
  list-style-type: none;
}

.card__address-item {
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

.card__address-point {
  display: flex;
  width: 10px;
  height: 10px;
  margin: 10px;
  background-color: rgba(225, 175, 87, 0.60);
  border-radius: 50%;
}

@media (max-width: 1536px) {
  .card {
    padding: 24px;
    gap: 16px;
  }

  .card__media {
    width: 180px;
    height: 200px;
  }

  .card__media img {
    min-width: 180px;
    min-height: 200px;
  }

  .card__copy {
    -webkit-line-clamp: 3;
  }

  .card__info {
    width: auto;
    min-width: 280px;
    font-size: 16px;
  }

  .card__address-main {
    font-size: 16px;
  }
}

@media (max-width: 1280px) {
  .card {
    grid-template-columns: 180px auto 340px;
  }

  .card__info {
    width: 100%;
  }
}

@media (max-width: 1024px) {
  .card {
    grid-template-areas:
    "media header"
    "media copy"
    "info info";
    grid-template-columns: 180px auto;
  }

  .card__info {
    border-left: none;
    padding-left: 0;
  }

  .card__info-list {
    margin-bottom: 16px;
  }

  .card__address {
    margin-top: 0;
  }

  .card__info-enroll {
    margin: 0 auto;
  }
}

@media (max-width: 640px) {
  .card {
    grid-template-areas:
      "media header"
      "copy copy"
      "info info";
    grid-template-columns: 88px auto;
    position: relative;
    margin-bottom: 16px;
    gap: 0;
  }

  .card__media {
    position: static;
    width: 80px;
    height: 80px;
  }

  .card__media img {
    min-width: 80px;
    min-height: 80px;
    border-radius: 50%;
  }

  .card__media-favorite {
    top: 24px;
    right: 24px;
    padding: 6px;
  }

  .card__media-favorite svg {
    font-size: 14px;
  }

  .card__media-favorite__active {
    background-color: rgba(0,

    0, 0, 0.05);
  }

  .card__header {
    padding-right: 48px;
    margin-bottom: 16px;
  }

  .card__title {
    margin-bottom: 4px;
    font-size: 16px;
  }

  .card__subtitle {
    gap: 8px;
    font-size: 12px;
  }

  .card__subtitle .rating {
    font-size: 14px;
  }

  .card__subtitle span span {
    display: none;
  }

  .card__criteria {
    margin-top: 16px;
    gap: 4px;
  }

  .card__criteria span {
    padding: 6px 8px;
    font-size: 12px;
    line-height: 14px;
  }

  .card__copy {
    margin-bottom: 16px;
    font-size: 12px;
    line-height: 17px;
    text-align: justify;
    -webkit-line-clamp: 5;
  }

  .card__info {
    padding: 0;
    margin-left: 0;
    border: none;
    font-size: 14px;
    font-weight: 400;
    line-height: 16px;
  }

  .card__info-item {
    margin-bottom: 8px;
  }

  .card__info-item svg {
    font-size: 16px;
  }

  .card__info-enroll {
    margin: 16px auto 0 auto;
    font-size: 14px;
  }

  .card__address {
    margin-top: 0;
  }

  .card__address span {
    font-size: 14px;
    font-weight: 400;
    line-height: 16px;
  }

  .card__address svg {
    font-size: 16px;
  }

  .card__address-list {
    display: none;
  }
}
</style>
