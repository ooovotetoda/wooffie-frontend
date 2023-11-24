<script setup lang="ts">
const route = useRoute()
const router = useRouter()

const category = route.params.category

const underlinePosition = ref("0")

const setActiveSection = (section: string) => {
  router.replace({ query: { section: section } })
}

watch(() => route.query.section, (newVal) => {
  let left;
  switch (newVal) {
    case 'services':
      left = 0;
      break;
    case 'clinics':
    case 'specialists':
      left = 1;
      break;
    case 'gallery':
      left = 2;
      break;
    case 'feedback':
      left = 3;
      break;
    default:
      left = 0;
  }
  underlinePosition.value = `${200 * left}px`
}, { immediate: true })
</script>

<template>
  <nav class="nav">
    <ul v-if="category === 'vets' || category === 'groomers'" class="nav__list">
      <li class="nav__item" @click="setActiveSection('services')">Услуги</li>
      <li class="nav__item" @click="setActiveSection('clinics')">Клиники</li>
      <li class="nav__item" @click="setActiveSection('gallery')">Сертификаты</li>
      <li class="nav__item" @click="setActiveSection('feedback')">Отзывы</li>
    </ul>

    <ul v-else-if="category === 'clinics' || category === 'zoosalons'" class="nav__list">
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
    font-family: Roboto;
    font-size: 18px;
    font-style: normal;
    font-weight: 400;
    line-height: normal;
    cursor: pointer;
  }
}
</style>