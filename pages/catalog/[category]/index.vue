<script setup lang="ts">
definePageMeta({
  breadcrumb: 'Каталог',
})

useSeoMeta({
  title: 'Wooffie • Каталог'
})

</script>

<template>
  <div class="container">
    <div class="wrapper">
      <Filters />
      <main class="main catalog">
        <CatalogNav />
        <CatalogInfiniteList />
      </main>
    </div>
  </div>
</template>

<style scoped lang="scss">
.wrapper {
  display: flex;
  gap: 60px;
}
</style>