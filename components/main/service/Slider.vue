<script setup lang="ts">

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
    <SwiperSlide>
      <MainServiceCard
        title="Клиники"
        service="clinic"
        image="card-clinic.webp"
      />
    </SwiperSlide>

    <SwiperSlide>
      <MainServiceCard
        title="Ветеринары"
        service="vet"
        image="card-vet.webp"
      />
    </SwiperSlide>

    <SwiperSlide>
      <MainServiceCard
        title="Грумеры"
        service="groomer"
        image="card-groomer.webp"
      />
    </SwiperSlide>

    <SwiperSlide>
      <MainServiceCard
        title="Зоосалоны"
        service="salon"
        image="card-salon.webp"
      />
    </SwiperSlide>
  </Swiper>
</template>

<style scoped>

</style>
