<script setup lang="ts">
const route = useRoute()
const category = route.params.category
const section = ref(route.query.section)

watch(() => route.query.section, (newSection) => {
  section.value = newSection
}, { immediate: true })
</script>

<template>
  <OrganizationSectionsServices  v-if="section === 'services'"/>
  <OrganizationSectionsList v-if="section === 'clinic' || section === 'specialists'"/>
  <OrganizationSectionsGallery  v-if="section === 'gallery'"/>
  <OrganizationSectionsFeedback  v-if="section === 'feedback'"/>
</template>

<style scoped lang="scss">

</style>