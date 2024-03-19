<script setup lang="ts">
definePageMeta({
  layout: false,
})

const router = useRouter()
</script>

<template>
  <div>
    <MenuHeader>
      <div class="header-left">
        <button class="header__back">
          <IconsFilters />
        </button>

        <span class="header__text">Фильтры</span>
      </div>

      <div class="header-right">
        <IconsClose @click="router.back()"/>
      </div>
    </MenuHeader>

    <main class="main">
      <UContainer>
        <CatalogFilters/>
      </UContainer>
    </main>
  </div>

</template>

<style scoped lang="scss">
.header {
  &-left {
    display: flex;
    align-items: center;
    gap: 16px;
  }

  &-right {
    display: flex;
    align-items: center;
  }

  &__back {
    display: flex;
    justify-content: center;
    align-items: center;
    background: none;
    border: none;
    font-size: 16px;
    color: rgba(0, 0, 0, 0.54);
  }

  &__text {
    font-family: Roboto, sans-serif;
    font-size: 16px;
  }

  &__search {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 40px;
    height: 40px;
    border: none;
    border-radius: 8px;
    background: #F9F9F9;
    font-size: 14px;
  }
}

.filters {
  display: block;
  width: 100%;
  padding: 0;
  margin: 24px 0 127px 0;
  box-shadow: none;
}

</style>