<script setup lang="ts">
const props = defineProps({
  rating: Number
})
</script>

<template>
  <div class="rating">
    <IconsStar v-for="index in 5" :isYellow="index <= rating"/>
  </div>
</template>

<style scoped lang="scss">
.rating {
  display: flex;
  gap: 4px;
}
</style>