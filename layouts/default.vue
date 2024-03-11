<script setup lang="ts">
import { ModalsContainer } from 'vue-final-modal'
import { useBreadcrumbs } from '~/composables/useBreadcrumbs';

const { breadcrumbs } = useBreadcrumbs();

const route = useRoute()

const withSearch = computed(() => {
  return route.path.startsWith("/catalog");
});
</script>

<template>
  <div class="page-content">
    <Header />

    <main class="main">
      <div class="container">
        <Search v-if="withSearch"/>
        <Breadcrumbs v-if="route.path !== '/'" :breadcrumbs="breadcrumbs"/>
      </div>
      <slot/>
      <Transition name="modal">
        <ModalsContainer />
      </Transition>
    </main>

    <Footer/>
  </div>
</template>

<style scoped lang="scss">
.main {
  flex: 1;
}
</style>