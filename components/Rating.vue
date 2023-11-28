<script setup lang="ts">
const props = defineProps({
  rating: Number,
  active: {
    default: false,
    type: Boolean
  }
})

const emit = defineEmits(['rated'])
const handeRated = (index: Number) => {

}
</script>

<template>
  <div class="rating">
    <IconsStar v-for="index in 5"
               :isYellow="index <= rating"
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