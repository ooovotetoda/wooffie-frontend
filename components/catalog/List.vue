<script setup lang="ts">
import type {Organization} from "~/types/organization";

defineProps<{
  list: Organization[]
}>()

const emit = defineEmits(["loadMore"])

const marker = ref<HTMLElement | null>(null);

onMounted(() => {
  const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            emit("loadMore")
          }
        });
      },
      {
        threshold: 0.5,
      }
  );

  if (marker.value) {
    observer.observe(marker.value);
  }
});

</script>

<template>
  <section class="list">
    <ul ref="el">
      <li v-for="(organization, index) in list" :key="index">
        <CatalogCard :organization />
      </li>
    </ul>
    <div class="marker-wrapper">
      <div ref="marker" class="marker"></div>
    </div>
  </section>
</template>

<style scoped lang="scss">
ul {
  list-style-type: none;
}

.marker {
  position: absolute;
  top: -1000px;
  left: 0;
  right: 0;
  display: inline-block;
  width: 100%;
  height: 1px;
  opacity: 0;
  z-index: -1;

  &-wrapper {
    position: relative;
  }
}
</style>
