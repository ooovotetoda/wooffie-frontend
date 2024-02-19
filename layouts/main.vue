<script setup lang="ts">
import { useBreadcrumbs } from '~/composables/useBreadcrumbs';

const { breadcrumbs } = useBreadcrumbs();
</script>

<template>
  <div class="page-content">
    <Header/>

    <main class="main">
      <div class="container">
        <Search />
        <Breadcrumbs :breadcrumbs="breadcrumbs"/>
      </div>
      <slot/>
    </main>

    <Footer/>
  </div>
</template>

<style scoped lang="scss">
.main {
  flex: 1;
}
</style>