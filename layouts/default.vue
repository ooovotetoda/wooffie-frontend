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

  <ModalsContainer />
  <Footer/>
</template>

<style scoped lang="scss">

</style>