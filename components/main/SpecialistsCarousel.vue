<script setup lang="ts">
import 'vue3-carousel/dist/carousel.css'
import { Carousel, Slide, Pagination, Navigation } from 'vue3-carousel'
</script>

<template>
  <div class="carousel-wrapper">
    <Carousel :items-to-show="3" :transition="500" :wrapAround="true" :pauseAutoplayOnHover="true"  :autoplay="2500">
      <Slide v-for="slide in 10" :key="slide">
        <div class="carousel__item">
          <MainSpecialistCard/>
        </div>
      </Slide>

      <template #addons>
        <navigation />
        <pagination />
      </template>
    </Carousel>
  </div>

</template>

<style lang="scss">
.carousel {
  &-wrapper {
    max-width: 1150px;
    margin: auto;
  }

  &__slide {
    padding: 5px;
  }

  &__viewport {
    padding: 10px 0;
  }

  &__next {
    right: -50px;
  }

  &__prev {
    left: -50px;
  }

  &__pagination {
    margin-top: 30px;
    gap: 12px;

    &-button {
      &:after {
        width: 12px;
        height: 12px;
        background-color: #D9DAD9;
        border-radius: 50%;
        transition: all 0.15s linear;
      }

      &--active {
        &:after {
          transform: scale(1.16);
          background-color: $main-color;
        }
      }
    }
  }

  &__slide {
    opacity: 0.9;
    transform: scale(0.9);

    &--sliding {
      transition: 0.5s;
    }

    &--active ~ .carousel__slide {
      transform: scale(0.9);
    }

    &--prev {
      opacity: 1;
      transform: scale(0.90);
    }

    &--next {
      opacity: 1;
      transform: scale(0.90);
    }

    &--active {
      opacity: 1;
      transform: scale(1);
    }
  }
}
</style>