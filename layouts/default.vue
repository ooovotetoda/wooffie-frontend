<script setup lang="ts">
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

  <Footer/>
</template>

<style scoped lang="scss">

</style>