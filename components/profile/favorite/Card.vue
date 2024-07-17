<script setup lang="ts">
import {useUserStore} from "~/stores/userStore";
import type {Organization} from '~/types/organization';
import {useType} from "~/composables/useType";
import type { FetchContext } from "ofetch";

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

const type = useType()

const isActive = ref(props.organization.isFavorite)

const toggleIsActive = async () => {
  const method = isActive.value ? "DELETE" : "POST"
  let statusCode = 0;

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
          :class="{ 'card__media-favorite__active': isActive }">
          class="card__media-favorite"
          @click.stop="toggleIsActive"
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
          <span class="card__criteria-type">{{ types[organization.type] }}</span>
          <span v-if="organization.round_clock" class="card__criteria-schedule">Круглосуточно</span>
          <span class="card__criteria-city">{{ cities[organization.city] }}</span>
        </div>

        <div class="card__info">
          <div class="card__copy">
            {{ organization.about }}
          </div>

          <div class="card__info-btn">
            <button class="card__info-enroll">Перейти</button>
          </div>
        </div>
      </div>
    </div>
</template>

<style scoped>
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
}

.card:hover {
  box-shadow: 2px 2px 20px 0 rgba(0, 0, 0, 0.20);
}

.card__media {
  position: relative;
  width: 250px;
  height: 250px;
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

.card__body {
  position: relative;
  padding-right: 24px;
}

.card__copy {
  display: -webkit-box;
  max-width: 100%;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
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
}

.card__info-enroll {
  position: absolute;
  bottom: 0;
  left: 50%;
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
  transition: all 0.15s ease-in-out;
  transform: translateX(-50%);
  cursor: pointer;
}

.card__info-enroll:hover {
  background-color: var(--main-color-dark);
}

.card__info-enroll:active {
  transform: scale(0.95);
}
</style>
