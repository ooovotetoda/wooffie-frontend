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
      <div class="container">
        <Breadcrumbs :breadcrumbs="breadcrumbs"/>
        <div class="wrapper">
          <ProfileNav />
          <slot />
        </div>
      </div>
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