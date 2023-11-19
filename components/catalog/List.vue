<script setup lang="ts">
import {onMounted} from "vue";

const listRef = ref(null)
const names = ref(['john', 'bill', 'dave', 'matt', 'john', 'bill'])

const getNames = () => {
  const newNames = ["rose", "bell", "shara", 'rose', "bell", "shara",]
  names.value.push(...newNames)
}

//@ts-ignore
const handleScroll = (e) => {
  let list = listRef.value

  //@ts-ignore
  if (list.getBoundingClientRect().bottom < window.innerHeight) {
    getNames()
  }
}

onMounted(() => {
  window.addEventListener("scroll", handleScroll)
})

onUnmounted(() => {
  window.removeEventListener("scroll", handleScroll)
})
</script>

<template>
  <section class="list">
    <ul ref="listRef">
      <li v-for="(item, index) in names" :key="index">
        <CatalogCard />
      </li>
    </ul>
  </section>
</template>

<style scoped lang="scss">
ul {
  list-style-type: none;
}
</style>