<script setup lang="ts">
import { ModalsContainer } from 'vue-final-modal'
import { useBreadcrumbs } from '~/composables/useBreadcrumbs';

const { breadcrumbs } = useBreadcrumbs();

const route = useRoute()
</script>

<template>
  <Header/>

  <div class="container">
    <Breadcrumbs v-if="route.path !== '/'" :breadcrumbs="breadcrumbs"/>
  </div>
  <slot/>
  <Transition name="modal">
    <ModalsContainer />
  </Transition>

  <Footer/>
</template>

<style scoped lang="scss">
.modal-enter-active,
.modal-leave-active {
  transition: all 0.2s ease-in-out;
}

.modal-enter-from,
.modal-leave-to {
  opacity: 0;
}

.modal-enter-to,
.modal-leave-from {
  opacity: 1;
}
</style>