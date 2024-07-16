<script setup lang="ts">

</script>

<template>
  <div class="services__table hidden sm:flex flex-col gap-16">
    <div class="services__row flex flex-col xl:flex-row gap-16">
      <MainServiceCard
        title="Клиники"
        service="clinic"
        image="card-clinic.webp"
      />
      <MainServiceCard
        title="Ветеринары"
        service="vet"
        image="card-vet.webp"
      />
    </div>
    <div class="services__row flex flex-col xl:flex-row gap-16">
      <MainServiceCard
        title="Грумеры"
        service="groomer"
        image="card-groomer.webp"
      />
      <MainServiceCard
        title="Зоосалоны"
        service="salon"
        image="card-salon.webp"
      />
    </div>
  </div>
</template>

<style scoped>

</style>
