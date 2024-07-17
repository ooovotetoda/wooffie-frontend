<script setup lang="ts">
import {OrganizationModalsFeedback} from "#components";
import type {Organization} from "~/types/organization";
import {useType} from "~/composables/useType";
import type { FetchContext } from "ofetch";

const props = defineProps<{
  organization: Organization;
}>()

const { $ofetch } = useNuxtApp()

const { user } = useUserStore()
const { cities } = useCityStore()

const type = useType()

const isActive = ref(props.organization.isFavorite)
const isContacted = ref(false)

const types = {
  "clinic": "Ветклиника",
  "salon": "Зоосалон",
  "vet": props.organization.profession,
  "groomer": props.organization.profession,
}

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

const handleContact = async () => {
  if (isContacted.value) {
    try {
      await navigator.clipboard.writeText(props.organization.phone);
    } catch (err) {
      console.error("Ошибка при копировании: ", err);
    }
  } else {
    isContacted.value = true
  }
}

const isCommentOpen = ref(false)
const isScheduleOpen = ref(false)

const handleReview = async () => {
  if (user.loggedIn) {
    isCommentOpen.value = true
  } else {
    await navigateTo("/auth/signin")
  }
}
</script>

<template>
  <section class="organization-header">
    <OrganizationSchedule
      class="mobile__hide"
      :addresses="organization.addresses"
      :schedule="organization.schedule"
    />

    <div class="organization-header__media">
      <NuxtImg
        :modifiers="{ grayscale: true, tint: '#CF8802' }"
        format="webp"
        :src="organization.photo"
        alt="avatar"
      />
      <button
        @click="toggleIsActive"
        class="organization-header__favorite"
        :class="{ 'organization-header__favorite__active': isActive }"
      >
        <IconsFavorite />
      </button>

      <button
        @click="isScheduleOpen = true"
        class="block sm:hidden flex justify-center items-center absolute top-0 right-8 p-1 rounded-full bg-[#FFFFFFC1] text-orange-500 text-sm"
      >
        <UIcon name="i-heroicons-calendar-solid"/>
      </button>

      <USlideover v-model="isScheduleOpen">
        <MenuHeader>
          <div class="flex items-center gap-4">
            <button
              class="header__back"
              @click="isScheduleOpen = false"
            >
              <IconsBack />
            </button>

            <span class="header__text">Меню</span>
          </div>
        </MenuHeader>

        <OrganizationSchedule
          :addresses="organization.addresses"
          :schedule="organization.schedule"
        />
      </USlideover>
    </div>

    <div class="organization-header__info">
      <h3 class="organization-header__title">{{ organization.name }}</h3>

      <Rating :rating="Math.round(organization.rating)" class="organization-header__rating"/>

      <div class="organization-header__criteria">
        <span class="organization-header__criteria-type">{{ types[organization.type] }}</span>
        <span v-if="organization.round_clock" class="organization-header__criteria-schedule">Круглосуточно</span>
        <span class="organization-header__criteria-city">{{ cities[organization.city] }}</span>
      </div>

    </div>
    <div class="organization-header__copy">
      {{ organization.about }}
    </div>

    <div class="organization-header__buttons">
      <button @click="handleReview" class="feedback">Оставить отзыв</button>

      <UModal v-model="isCommentOpen">
        <OrganizationModalsFeedback @close="() => isCommentOpen = false"/>
      </UModal>

      <button
        class="contact"
        :class="{contacted: isContacted}"
        @click="handleContact"
      >
        {{isContacted ? organization.phone : "Связаться"}}
        <IconsCopy v-if="isContacted"/>
      </button>
    </div>
  </section>
</template>

<style scoped>
.organization-header {
  display: grid;
  grid-template-areas: "schedule image info"
                       "schedule image about"
                       "schedule image buttons";
  grid-template-rows: auto 1fr auto;
  grid-template-columns: auto 450px auto;
}

.organization-header__calendar {
  width: 388px;
  min-width: 388px;
  height: 556px;
  background: #888888;
}

.organization-header__media {
  position: relative;
  grid-area: image;
  margin-right: 32px;
}

.organization-header__media img {
  width: 632px;
  height: 512px;
  border-radius: 10px;
  object-fit: cover;
}

.organization-header__media:active svg {
  transform: scale(0.85);
}

.organization-header__favorite {
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

.organization-header__favorite svg {
  color: rgba(0, 0, 0, 0.2);
  transition: all 0.1s ease-in-out;
  z-index: 2;
  font-size: 20px;
}

.organization-header__favorite:hover {
  background-color: rgba(255, 255, 255, 0.9);
}

.organization-header__favorite:hover svg {
  color: rgba(228, 0, 0, 0.56);
}

.organization-header__favorite__active {
  background-color: #fff;
}

.organization-header__favorite__active svg {
  color: rgba(228, 0, 0, 0.87) !important;
}

.organization-header__info {
  display: flex;
  flex-direction: column;
  grid-area: info;
}

.organization-header__title {
  margin-bottom: 16px;
  color: var(--text-dark);
  font-feature-settings: 'clig' off, 'liga' off;
  font-family: Roboto, serif;
  font-size: 48px;
  font-style: normal;
  font-weight: 500;
  line-height: normal;
  font-variant: all-small-caps;
}

.organization-header__criteria {
  display: flex;
  gap: 12px;
  margin-bottom: 16px;
}

.organization-header__criteria span {
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

.organization-header__criteria-type {
  background: rgba(221, 185, 164, 0.50);
}

.organization-header__criteria-schedule {
  background: rgba(254, 230, 185, 0.50);
}

.organization-header__criteria-city {
  border: 1px solid var(--Line, #D9DAD9);
}

.organization-header__rating {
  margin-bottom: 32px;
  font-size: 24px;
}

.organization-header__copy {
  grid-area: about;
  overflow: hidden;
  color: var(--dark-grey);
  font-feature-settings: 'clig' off, 'liga' off;
  text-overflow: ellipsis;
  font-family: Roboto, serif;
  font-size: 18px;
  font-style: normal;
  font-weight: 400;
  line-height: 30px;
}

.organization-header__buttons {
  display: flex;
  gap: 16px;
  margin-top: auto;
  grid-area: buttons;
}

.organization-header__buttons button {
  width: 200px;
  padding: 12px;
  border-radius: 10px;
  font-feature-settings: 'clig' off, 'liga' off;
  font-family: Roboto, serif;
  font-size: 18px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
  cursor: pointer;
  transition: all 0.15s ease-in-out;
}

.organization-header__buttons button:active {
  transform: scale(0.98);
}

.organization-header__buttons .feedback {
  border: 1px solid var(--main-color);
  background-color: #fff;
  color: var(--main-color);
}

.organization-header__buttons .feedback:hover {
  background: var(--hover-grey);
}

.organization-header__buttons .contact {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 8px;
  color: #FFF;
  border: none;
  background: var(--main-color);
}

.organization-header__buttons .contact:hover {
  background: var(--main-color-dark);
}

.organization-header__buttons .contact.contacted {
  background: #FFF;
  color: var(--text-dark);
  border: 1px solid var(--text-dark);
}

.organization-header__buttons .contact.contacted:hover {
  background: var(--hover-grey);
}

@media (max-width: 1536px) {
  .organization-header {
    grid-template-columns: auto 416px auto;
  }

  .organization-header__media img {
    width: 378px;
    height: 468px;
  }

  .organization-header__title {
    margin-bottom: 8px;
  }

  .organization-header__rating {
    margin-bottom: 16px;
  }

  .organization-header__criteria span {
    padding: 6px 8px;
    font-size: 12px;
    line-height: 14px;
  }

  .organization-header__copy {
    font-size: 16px;
    line-height: 24px;
  }
}

@media (max-width: 640px) {
  .organization-header {
    position: relative;
    grid-template-areas: "image info" "about about" "buttons buttons";
    grid-template-columns: 84px auto;
  }

  .organization-header__media {
    position: static;
    max-width: 76px;
    max-height: 76px;
    margin-right: 8px;
  }

  .organization-header__media img {
    width: 76px;
    height: 76px;
    border-radius: 50%;
  }

  .organization-header__media:active svg {
    transform: none;
  }

  .organization-header__favorite {
    position: absolute;
    top: 0;
    right: 0;
    padding: 4px;
  }

  .organization-header__favorite svg {
    font-size: 14px;
  }

  .organization-header__title {
    font-size: 16px;
    line-height: 19px;
  }

  .organization-header__rating {
    margin-bottom: 8px;
    font-size: 14px;
  }

  .organization-header__copy {
    font-size: 14px;
    line-height: 20px;
    text-align: justify;
    margin-bottom: 24px;
  }

  .organization-header__buttons button {
    width: auto;
    flex: 1;
    padding: 12px 0;
    font-size: 14px;
    line-height: 16px;
  }

  .organization-header__buttons .feedback {
    border: 1px solid #F9F9F9;
    background-color: #F9F9F9;
    color: rgba(0, 0, 0, 0.87);
  }

  .mobile__hide {
    display: none;
  }
}
</style>
