<script setup lang="ts">
definePageMeta({
  breadcrumb: "Профиль"
})
const route = useRoute()
</script>

<template>
  <main class="main">
    <div class="container">
      <ProfileHeader />
      <ProfileNav />
      <ProfileSections />
    </div>
  </main>
</template>

<style scoped lang="scss">

</style>