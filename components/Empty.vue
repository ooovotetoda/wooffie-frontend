<script setup lang="ts">
const props = defineProps({
  margin: {
    type: Number,
    default: 0
  }
})
</script>

<template>
  <div :style="`margin: ${margin}px 0;`" class="empty">
    <NuxtImg src="/images/empty.svg" alt="empty"/>
  </div>
</template>

<style scoped lang="scss">
.empty {
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>