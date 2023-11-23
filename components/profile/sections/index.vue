<script setup lang="ts">
const route = useRoute()
const category = route.params.category
const section = ref(route.query.section)

watch(() => route.query.section, (newSection) => {
  section.value = newSection
}, { immediate: true })
</script>

<template>
  <ProfileSectionsServices  v-if="section === 'services'"/>
  <ProfileSectionsList v-if="section === 'clinics' || section === 'specialists'"/>
  <ProfileSectionsGallery  v-if="section === 'gallery'"/>
  <ProfileSectionsFeedback  v-if="section === 'feedback'"/>
</template>

<style scoped lang="scss">

</style>