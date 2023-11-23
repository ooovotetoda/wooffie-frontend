<script setup lang="ts">

</script>

<template>
  <ul ref="listRef">
    <li v-for="(item, index) in 10" :key="index">
      <CatalogCard :maxDescriptionLength="240"/>
    </li>
  </ul>
</template>

<style scoped lang="scss">
ul {
  list-style-type: none;
}
</style>