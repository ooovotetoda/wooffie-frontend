<script setup lang="ts">
defineProps({
  rating: {
    default: 0,
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

<style scoped>
.rating {
  display: flex;
  gap: 4px;
}
</style>
