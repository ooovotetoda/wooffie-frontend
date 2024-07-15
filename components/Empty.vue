<script setup lang="ts">
const props = defineProps({
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
      format="webp"
      provider="myProvider"
      src="/empty.svg"
      alt="empty"
    />
  </div>
</template>

<style scoped lang="scss">
.empty {
  display: flex;
  align-items: center;
  justify-content: center;

  img {
    width: 556px;
    height: 500px;
  }
}

@media (max-width: 640px) {
  .empty {
    img {
      width: 320px;
      height: 288px;
    }
  }
}
</style>
