<script setup lang="ts">
// import 'vue3-carousel/dist/carousel.css'
import { Carousel, Slide, Pagination } from 'vue3-carousel'
import type {GalleryData, Photo} from "~/types/gallery";
import Slider from "~/components/Slider.vue";

const { $ofetch } = useNuxtApp()

const route = useRoute()

const category = computed(() => route.params.category as string)

const institutionsCategories = ["clinic", "salon"]
const type = computed(() => institutionsCategories.includes(category.value) ? "institutions" : "specialists")

const { data: gallery } = await useAsyncData<Photo[]>(
    `gallery:${route.params.id}`,
    async () => {
      try {
        const response: GalleryData = await $ofetch(`/api/${type.value}/${route.params.id}/gallery`, {
          method: "GET",
        })

        return response.gallery
      } catch (e) {
        console.log(e)
        return []
      }
    }
)

const { width, height } = useWindowSize()

const itemsToShow = ref(1)

watch(width, () => {
  itemsToShow.value = width.value > 1440 ? 2.3 : width.value > 390 ? 1.8 : 1
}, { immediate: true })
</script>

<template>
  <section class="gallery">
    <h2 class="gallery-title">Фотогалерея</h2>

    <Empty v-if="gallery?.length === 0" :margin="78"/>

    <div v-if="gallery && gallery.length !== 0" class="gallery-carousel__wrapper">
      <Carousel :items-to-show="itemsToShow" :transition="500" :wrapAround="true" :pauseAutoplayOnHover="true"  :autoplay="2500">
        <Slide v-for="photo in gallery" :key="photo">
          <div class="gallery-carousel__item">
            <NuxtImg format="webp" :src="photo.photo_url" alt="photo"/>
          </div>
        </Slide>

        <template #addons>
          <pagination />
        </template>
      </Carousel>
    </div>

    <Slider :width="width">
      <Slide v-for="photo in gallery" :key="photo">
        <div class="carousel__item">
          <NuxtImg format="webp" :src="photo.photo_url" alt="photo"/>
        </div>
      </Slide>
    </Slider>


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
    font-family: Roboto, serif;
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

@media (max-width: 414px) {
  .gallery {
    &-carousel {
      &__wrapper {
        display: none;
      }
    }
  }
}
</style>