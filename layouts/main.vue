<script setup lang="ts">
import { useBreadcrumbs } from '~/composables/useBreadcrumbs';

const { breadcrumbs } = useBreadcrumbs();
</script>

<template>
  <Header/>

  <div class="container">
    <Search />
    <Breadcrumbs :breadcrumbs="breadcrumbs"/>
  </div>
  <slot/>

  <Footer/>
</template>

<style scoped lang="scss">

</style>