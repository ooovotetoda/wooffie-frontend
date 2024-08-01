<script setup lang="ts">
import { useBreadcrumbs } from '~/composables/useBreadcrumbs'

definePageMeta({
  breadcrumb: 'Профиль',
})

const { breadcrumbs } = useBreadcrumbs()
</script>

<template>
  <div class="page-content">
    <Header />

    <main class="main">
      <UContainer>
        <Breadcrumbs :breadcrumbs="breadcrumbs" />
        <div class="wrapper">
          <ProfileNav />
          <slot />
        </div>
      </UContainer>
    </main>

    <Footer />
  </div>
</template>

<style scoped>
.main {
  flex: 1;
}

.wrapper {
  display: flex;
  gap: 60px;
}
</style>
