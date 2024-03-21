<script setup lang="ts">

</script>

<template>
  <header class="header relative flex items-center py-4 min-h-20">
    <div class="w-full px-4">
      <div class="header-wrapper flex items-center justify-between">
        <slot/>
      </div>
    </div>
  </header>
</template>

<style scoped lang="scss">
.header {
  box-shadow: 2px 2px 20px 0 rgba(0, 0, 0, 0.10);
}
</style>