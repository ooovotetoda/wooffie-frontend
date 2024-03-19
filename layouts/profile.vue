<script setup lang="ts">
definePageMeta({
  breadcrumb: "Профиль"
})

import { useBreadcrumbs } from '~/composables/useBreadcrumbs';

const { breadcrumbs } = useBreadcrumbs();

</script>

<template>
  <div class="page-content">
    <Header/>

    <main class="main">
      <UContainer>
        <Breadcrumbs :breadcrumbs="breadcrumbs"/>
        <div class="wrapper">
          <ProfileNav />
          <slot />
        </div>
      </UContainer>
    </main>

    <Footer/>
  </div>
</template>

<style scoped lang="scss">
.main {
  flex: 1;
}

.wrapper {
  display: flex;
  gap: 60px;
}
</style>