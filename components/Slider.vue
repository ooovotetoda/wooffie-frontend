<script setup lang="ts">
import 'vue3-carousel/dist/carousel.css'
import { Carousel } from 'vue3-carousel'

defineProps({
  width: {
    default: 314,
    type: Number,
  },
})
</script>

<template>
  <div class="carousel__mobile">
    <Carousel
      :items-to-show="(width - 32) / 280"
      :wrap-around="true"
    >
      <slot />
    </Carousel>
  </div>
</template>

<style>
.carousel__mobile {
  display: none;
}

.carousel__mobile .carousel__viewport {
  padding: 24px 0;
}

@media (max-width: 640px) {
  .carousel__mobile {
    display: block;
  }
}
</style>
