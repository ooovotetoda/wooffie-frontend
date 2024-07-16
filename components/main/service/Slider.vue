<script setup lang="ts">
import { register } from 'swiper/element/bundle';

const { count } = useSlidesCount(280, 16)

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
    <swiper-slide>
      <MainServiceCard
        title="Клиники"
        service="clinic"
        image="card-clinic.webp"
      />
    </swiper-slide>

    <swiper-slide>
      <MainServiceCard
        title="Ветеринары"
        service="vet"
        image="card-vet.webp"
      />
    </swiper-slide>

    <swiper-slide>
      <MainServiceCard
        title="Грумеры"
        service="groomer"
        image="card-groomer.webp"
      />
    </swiper-slide>

    <swiper-slide>
      <MainServiceCard
        title="Зоосалоны"
        service="salon"
        image="card-salon.webp"
      />
    </swiper-slide>
  </swiper-container>
</template>

<style scoped>

</style>
