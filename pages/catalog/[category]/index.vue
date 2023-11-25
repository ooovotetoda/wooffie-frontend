<script setup lang="ts">

definePageMeta({
  layout: "main",
  breadcrumb: "Каталог"
})

useSeoMeta({
  title: 'Wooffie • Каталог'
})

</script>

<template>
  <div class="container">
    <div class="wrapper">
      <CatalogFilters />
      <main class="main catalog">
        <CatalogNav />
        <CatalogList />
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