<script setup lang="ts">
import { register } from 'swiper/element/bundle';
import type { Organization } from '~/types/organization';

defineProps<{
  specialists: Organization[] | null,
}>();

const isMounted = ref(false);
const { count } = useSlidesCount(280, 16);

onMounted(() => {
  register();
  isMounted.value = true;
});
</script>

<template>
  <swiper-container
      v-if="isMounted && specialists && specialists.length"
      :slides-per-view="count"
      centered-slides="true"
      :speed="250"
      :loop="true"
  >
    <swiper-slide v-for="(specialist, index) in [...specialists, ...specialists]" :key="index">
      <MainSpecialistCard :specialist="specialist"/>
    </swiper-slide>
  </swiper-container>
</template>

<style scoped>
swiper-container {
  width: 100%;
  height: 100%;
}

swiper-slide {
  display: flex;
  justify-content: center;
  align-items: center;
  width: auto;
}
</style>
