<script setup lang="ts">
import MainServiceBlocks from '~/components/main/service/Blocks.vue'
import MainServiceSlider from '~/components/main/service/Slider.vue'

const { width } = useWindowSize()
</script>

<template>
  <component :is="width < 640 ? MainServiceSlider : MainServiceBlocks"/>
</template>

<style scoped>

</style>
