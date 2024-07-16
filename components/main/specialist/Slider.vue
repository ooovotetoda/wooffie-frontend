<script setup lang="ts">
import { register } from 'swiper/element/bundle';
import type {Organization} from "~/types/organization";

const {$ofetch} = useNuxtApp()
const { count } = useSlidesCount(280, 16)

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

onMounted(() => {
  register();
})
</script>

<template>
  <swiper-container
    :slides-per-view="count"
    centered-slides="true"
    :speed="250"
    :loop="true"
  >
    <!--  TODO  -->
    <swiper-slide>
      <MainSpecialistCard :specialist="specialists[0]"/>
    </swiper-slide>

    <swiper-slide>
      <MainSpecialistCard :specialist="specialists[0]"/>
    </swiper-slide>

    <swiper-slide>
      <MainSpecialistCard :specialist="specialists[0]"/>
    </swiper-slide>

    <swiper-slide>
      <MainSpecialistCard :specialist="specialists[0]"/>
    </swiper-slide>
  </swiper-container>
</template>

<style scoped>

</style>
