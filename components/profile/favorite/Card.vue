<script setup lang="ts">
import {useUserStore} from "~/stores/userStore";
import type {Organization} from '~/types/organization';

const props = defineProps<{
  organization: Organization,
  maxDescriptionLength: number
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

const croppedText = computed(() => {
  return props.organization.about.length > props.maxDescriptionLength ?
      `${props.organization.about.substring(0, props.maxDescriptionLength)}...`
      : props.organization.about
})

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
        statusCode = context.response.status
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
  <div class="card">
    <div class="card__media">
      <NuxtImg :src="organization.photo" alt="clinic"/>
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
        <span class="card__criteria-type">{{ types[organization.type] }}</span>
        <span v-if="organization.round_clock" class="card__criteria-schedule">Круглосуточно</span>
        <span class="card__criteria-city">{{ cities[organization.city] }}</span>
      </div>

      <div class="card__info">
        <div class="card__copy">
          {{ croppedText }}
        </div>
        
        <div class="card__info-btn">
          <NuxtLink :to="`/catalog/${organization.type}/${organization.id}?section=services`">
            <button class="card__info-enroll">Записаться</button>
          </NuxtLink>
        </div>
      </div>
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
    position: relative;
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

    &-enroll {
      position: absolute;
      bottom: 0;
      left: 50%;
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
      transition: all 0.15s ease-in-out;
      transform: translateX(-50%);
      cursor: pointer;

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