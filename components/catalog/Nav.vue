<script setup lang="ts">
const route = useRoute()
const active = ref(route.params.category)
</script>

<template>
  <nav class="catalog-nav">
    <ul>
      <NuxtLink to="/catalog/clinics">
        <li :class="{active: active == 'clinics'}">Клиники</li>
      </NuxtLink>

      <NuxtLink to="/catalog/vets">
        <li :class="{active: active == 'vets'}">Ветеринары</li>
      </NuxtLink>

      <NuxtLink to="/catalog/groomers">
        <li :class="{active: active == 'groomers'}">Грумеры</li>
      </NuxtLink>

      <NuxtLink to="/catalog/zoosalons">
        <li :class="{active: active == 'zoosalons'}">Зоосалоны</li>
      </NuxtLink>
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
        transition: all 0.2s ease-in-out;
        color: $text-dark;
        font-feature-settings: 'clig' off, 'liga' off;
        font-family: Roboto;
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