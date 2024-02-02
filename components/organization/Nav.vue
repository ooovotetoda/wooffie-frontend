<script setup lang="ts">
import type {OrganizationSection} from "~/types/organization";

const route = useRoute()
const router = useRouter()

const category = route.params.category

const underlinePosition = ref("0")

const setActiveSection = (section: OrganizationSection | string) => {
  router.replace({ query: { section: section } })
}

watch(() => route.query.section, (newVal) => {
  let sectionKey = typeof newVal === 'string' ? newVal : Array.isArray(newVal) ? newVal[0] : 'services';

  if (!sectionKey) {
    return
  }

  let lefts = {
    services: 0,
    clinic: 1,
    specialists: 1,
    gallery: 2,
    feedback: 3,
  };

  // TODO
  underlinePosition.value = `${200 * lefts[sectionKey]}px`
}, { immediate: true })
</script>

<template>
  <nav class="nav">
    <ul v-if="category === 'vet' || category === 'groomer'" class="nav__list">
      <li class="nav__item" @click="setActiveSection('services')">Услуги</li>
      <li class="nav__item" @click="setActiveSection('clinic')">Клиники</li>
      <li class="nav__item" @click="setActiveSection('gallery')">Сертификаты</li>
      <li class="nav__item" @click="setActiveSection('feedback')">Отзывы</li>
    </ul>

    <ul v-else-if="category === 'clinic' || category === 'salon'" class="nav__list">
      <li class="nav__item" @click="setActiveSection('services')">Услуги</li>
      <li class="nav__item" @click="setActiveSection('specialists')">Специалисты</li>
      <li class="nav__item" @click="setActiveSection('gallery')">Фотогалерея</li>
      <li class="nav__item" @click="setActiveSection('feedback')">Отзывы</li>
    </ul>
  </nav>
</template>

<style scoped lang="scss">
.nav {
  width: 100%;
  margin: 60px 0;
  border-bottom: 1px solid #D9DAD9;

  &__list {
    position: relative;
    display: flex;
    align-items: center;
    list-style-type: none;


    &:after {
      content: "";
      position: absolute;
      left: v-bind(underlinePosition);
      bottom: 0;
      width: 200px;
      height: 3px;
      background-color: rgba(221, 185, 164, 0.50);
      transition: all 0.15s ease-in-out;
    }
  }

  &__item {
    width: 200px;
    padding: 12px;
    border-bottom: 3px solid #FFFFFF;
    color: $text-dark;
    font-feature-settings: 'clig' off, 'liga' off;
    font-family: Roboto, serif;
    font-size: 18px;
    font-style: normal;
    font-weight: 400;
    line-height: normal;
    cursor: pointer;
  }
}
</style>