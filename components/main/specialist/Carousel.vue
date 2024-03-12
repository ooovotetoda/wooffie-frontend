<script setup lang="ts">
import 'vue3-carousel/dist/carousel.css'
import { Carousel, Slide, Pagination, Navigation } from 'vue3-carousel'
import type {Organization} from "~/types/organization";
import Slider from "~/components/Slider.vue";

const { $ofetch } = useNuxtApp()

const { data: specialists } = await useAsyncData<Organization[]>(
    "main:specialists",
    async () => {
      try {
        const response: { specialists: Organization[] } = await $ofetch("api/specialists/top", {
          method: "GET",
          query: {
            limit: 5
          }
        })

        return response.specialists
      } catch (e) {
        console.error(e)
        return []
      }
    }
)

const { width } = useWindowSize()

</script>

<template>
  <div class="specialist-carousel__wrapper">
    <Carousel :items-to-show="((Math.min(1120, width - 30) - 64 - 400)/320) + 1" :transition="500" :wrapAround="true" :pauseAutoplayOnHover="true"  :autoplay="2500">
      <Slide v-for="specialist in specialists" :key="specialist.id">
        <div class="carousel__item">
          <MainSpecialistCard :specialist/>
        </div>
      </Slide>

      <template #addons>
        <navigation />
        <pagination />
      </template>
    </Carousel>
  </div>

  <Slider class="mobile-visible" :width="width">
    <Slide v-for="specialist in specialists" :key="specialist.id">
      <div class="carousel__item">
        <MainSpecialistCard :specialist/>
      </div>
    </Slide>
  </Slider>
</template>

<style lang="scss">
.specialist-carousel {
  &__wrapper {
    max-width: 1150px;
    margin: auto;

    .carousel {
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
  }
}

.carousel__pagination {
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

.mobile-visible {
  display: none;
}

@media (max-width: 414px) {
  .mobile-visible {
    display: block;
  }

  .specialist-carousel__wrapper {
    display: none;
  }
}

</style>