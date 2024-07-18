<script setup lang="ts">
import ErrorBlock from "~/components/profile/ErrorBlock.vue";

definePageMeta({
  breadcrumb: 'Несуществующая страница',
})
</script>

<template>
  <main>
    <UContainer>
      <ErrorBlock title="Cтраница не существует" />
    </UContainer>
  </main>
</template>

<style scoped>

</style>
