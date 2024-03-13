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
      <li @click="handleSelectCategory('clinic')" :class="{active: active == 'clinic'}">Клиники</li>
      <li @click="handleSelectCategory('vet')" :class="{active: active == 'vet'}">Ветеринары</li>
      <li @click="handleSelectCategory('groomer')" :class="{active: active == 'groomer'}">Грумеры</li>
      <li @click="handleSelectCategory('salon')" :class="{active: active == 'salon'}">Зоосалоны</li>
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

@media (max-width: 414px) {
  .catalog {
    &-nav {
      margin: 0 -20px 24px -20px;
      overflow-x: scroll;
      -ms-overflow-style: none;
      scrollbar-width: none;

      &::-webkit-scrollbar {
        display: none;
      }

      ul {
        padding: 0 20px;
        gap: 0;

        li {
          padding: 8px 16px;
          font-size: 14px;
        }

        &::after {
          content: '';
          position: relative;
          flex: none;
          width: 20px;
        }
      }
    }
  }
}

</style>