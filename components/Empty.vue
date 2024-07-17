<script setup lang="ts">
defineProps({
  margin: {
    type: Number,
    default: 0,
  },
})
</script>

<template>
  <div
    :style="`margin: ${margin}px 0;`"
    class="empty"
  >
    <NuxtImg
      :modifiers="{ grayscale: true, tint: '#CF8802' }"
      format="webp"
      provider="myProvider"
      src="/empty.svg"
      alt="empty"
    />
  </div>
</template>

<style scoped>
.empty {
  display: flex;
  align-items: center;
  justify-content: center;
}

.empty img {
  width: 556px;
  height: 500px;
}

@media (max-width: 640px) {
  .empty img {
    width: 320px;
    height: 288px;
  }
}
</style>
