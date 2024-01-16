<script setup lang="ts">
const route = useRoute()
const router = useRouter()

const active = ref(route.params.category)

watch(() => route.params, (newParams) => {
  active.value = newParams.category;
});

const handleSelectCategory = (category: string) => {
  router.replace({
    params: { ...route.params , category: category},
    query: {...route.query}
  })
}
</script>

<template>
  <nav class="catalog-nav">
    <ul>
      <li @click="handleSelectCategory('clinics')" :class="{active: active == 'clinics'}">Клиники</li>
      <li @click="handleSelectCategory('vets')" :class="{active: active == 'vets'}">Ветеринары</li>
      <li @click="handleSelectCategory('groomers')" :class="{active: active == 'groomers'}">Грумеры</li>
      <li @click="handleSelectCategory('zoosalons')" :class="{active: active == 'zoosalons'}">Зоосалоны</li>
    </ul>
  </nav>
</template>

<style scoped lang="scss">
.catalog {
  &-nav {
    margin-bottom: 32px;

    ul {
      display: flex;
      gap: 24px;
      list-style-type: none;

      li {
        padding: 12px 32px;
        cursor: pointer;
        border-radius: 50px;
        color: $text-dark;
        font-feature-settings: 'clig' off, 'liga' off;
        font-family: Roboto, serif;
        font-size: 18px;
        font-style: normal;
        font-weight: 400;
        line-height: normal;
        transition: all 0.15s ease-in-out;
      }
    }
  }
}

.active {
  color: #FFFFFF !important;
  background-color: $main-color;

  &:hover {
    background-color: $main-color-dark;
  }
}
</style>