<script setup lang="ts">
// import 'vue3-carousel/dist/carousel.css'
import { Carousel, Slide, Pagination } from 'vue3-carousel'
</script>

<template>
  <section class="gallery">
    <h2 class="gallery-title">Фотогалерея</h2>

    <div class="gallery-carousel__wrapper">
      <Carousel :items-to-show="2.3" :transition="500" :wrapAround="true" :pauseAutoplayOnHover="true"  :autoplay="2500">
        <Slide v-for="slide in 3" :key="slide">
          <div class="gallery-carousel__item">
            <img src="/images/gallery-image.png" alt="photo">
          </div>
        </Slide>

        <template #addons>
          <pagination />
        </template>
      </Carousel>
    </div>
  </section>


</template>

<style scoped lang="scss">
.gallery {
  padding-bottom: 60px;

  &-title {
    margin-bottom: 52px;
    color: $text-dark;
    text-align: center;
    font-feature-settings: 'clig' off, 'liga' off;
    font-family: Roboto;
    font-size: 32px;
    font-style: normal;
    font-weight: 500;
    line-height: normal;
  }

  &-carousel {
    &__item {
      img {
        width: 632px;
        height: 512px;
        object-fit: cover;
        border-radius: 10px;
      }
    }

    &__wrapper {
      margin: auto;

      .carousel {
        &__slide {
          &--sliding {
            transition: 0.5s;
          }
        }
      }
    }
  }
}
</style>