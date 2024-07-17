<script setup lang="ts">
import MainServiceBlocks from '~/components/main/service/Blocks.vue'
import MainServiceSlider from '~/components/main/service/Slider.vue'

const { width } = useWindowSize()
const isMounted = ref(false)

onMounted(() => {
  isMounted.value = true
})
</script>

<template>
  <component :is="isMounted && width < 640 ? MainServiceSlider : MainServiceBlocks" />
</template>

<style scoped>

</style>
