<script setup lang="ts">
definePageMeta({
  breadcrumb: "Профиль"
})

import { useBreadcrumbs } from '~/composables/useBreadcrumbs';

const { breadcrumbs } = useBreadcrumbs();

</script>

<template>
  <Header/>
  <div class="container">
    <Breadcrumbs :breadcrumbs="breadcrumbs"/>
    <div class="wrapper">
      <ProfileNav />
      <slot />
    </div>
  </div>
  <Footer/>
</template>

<style scoped lang="scss">
.wrapper {
  display: flex;
  gap: 60px;
}
</style>