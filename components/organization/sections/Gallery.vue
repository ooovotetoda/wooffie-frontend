<script setup lang="ts">
import type {GalleryData, Photo} from "~/types/gallery";
import {useType} from "~/composables/useType";

const { $ofetch } = useNuxtApp()

const route = useRoute()

const type = useType()

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
</script>

<template>
  <section class="gallery">
    <h2 class="gallery__title">Фотогалерея</h2>

    <Empty v-if="gallery?.length === 0" :margin="78"/>

    <UCarousel
        v-if="gallery && gallery.length !== 0"
        v-slot="{ item }"
        :items="gallery"
        :ui="{ item: 'basis-full md:basis-1/2 lg:basis-1/3' }"
        class="overflow-hidden"
        indicators
    >
      <div class="w-full px-4">
        <NuxtImg format="webp" :src="item.photo_url" class="w-full h-full rounded-lg" />
      </div>
    </UCarousel>
  </section>


</template>

<style scoped>
.gallery {
  padding-bottom: 60px;
}

.gallery__title {
  margin-bottom: 52px;
  color: var(--text-dark);
  text-align: center;
  font-feature-settings: 'clig' off, 'liga' off;
  font-family: Roboto, sans-serif;
  font-size: 32px;
  font-style: normal;
  font-weight: 500;
  line-height: normal;
}

@media (max-width: 640px) {
  .gallery__title {
    margin-bottom: 16px;
    font-size: 18px;
  }
}
</style>
