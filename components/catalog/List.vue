<script setup lang="ts">
const props = defineProps({
  list: Array
})

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
      <li v-for="(item, index) in list" :key="index">
        <CatalogCard
            :organization="item"
            :maxDescriptionLength="240"
        />
      </li>
    </ul>
    <div class="marker-wrapper">
      <div ref="marker" class="marker"></div>
    </div>

    <Empty v-if="list?.length === 0" margin="78"/>

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