<script setup lang="ts">
import type {Organization} from "~/types/organization";

const {$ofetch} = useNuxtApp()

const {data: specialists} = await useAsyncData<Organization[]>(
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
</script>

<template>
  <Swiper
    :modules="[SwiperAutoplay]"
    :centeredSlides="true"
    :loop="true"
    :autoplay="{
      delay: 4000,
      disableOnInteraction: true,
    }"
    :breakpoints="{
      320: {
        slidesPerView: 1.4,
        spaceBetween: 36
      },
      480: {
        slidesPerView: 1.8,
        spaceBetween: 36
      },
      640: {
      slidesPerView: 1.8,
      spaceBetween: 18
      },
      1024: {
        slidesPerView: 3,
        spaceBetween: 36
      },
    }"
  >
    <SwiperSlide v-for="specialist in specialists" :key="specialist.id">
      <MainSpecialistCard :specialist="specialist"/>
    </SwiperSlide>
  </Swiper>
</template>

<style>

</style>
