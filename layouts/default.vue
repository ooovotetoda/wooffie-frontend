<script setup lang="ts">
import { useBreadcrumbs } from '~/composables/useBreadcrumbs'

const { breadcrumbs } = useBreadcrumbs()

const route = useRoute()

const withSearch = computed(() => {
  return route.path.startsWith('/catalog')
})
</script>

<template>
  <div class="page-content">
    <Header />

    <main class="main">
      <UContainer>
        <Search v-if="withSearch" />
        <Breadcrumbs
          v-if="route.path !== '/'"
          :breadcrumbs="breadcrumbs"
        />
      </UContainer>

      <slot />
    </main>

    <Footer />
  </div>
</template>

<style scoped lang="scss">
.main {
  flex: 1;
}
</style>
