<script setup lang="ts">
const props = defineProps({
  rating: {
    default: false,
    type: Number,
  },
  active: {
    default: false,
    type: Boolean,
  },
})

const emit = defineEmits(['rated'])
</script>

<template>
  <div class="rating">
    <IconsStar
      v-for="index in 5"
      :is-yellow="index <= rating"
      @click="emit('rated', index)"
    />
  </div>
</template>

<style scoped lang="scss">
.rating {
  display: flex;
  gap: 4px;
}
</style>
