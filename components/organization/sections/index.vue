<script setup lang="ts">
const props = defineProps({
  organization: Object
})


const route = useRoute()
const category = route.params.category
const section = ref(route.query.section)

watch(() => route.query.section, (newSection) => {
  section.value = newSection
}, { immediate: true })
</script>

<template>
  <OrganizationSectionsServices :services="organization.services" v-if="section === 'services'"/>
  <OrganizationSectionsList v-if="section === 'clinic' || section === 'specialists'"/>
  <OrganizationSectionsGallery  v-if="section === 'gallery'"/>
  <OrganizationSectionsFeedback  v-if="section === 'feedback'"/>
</template>

<style scoped lang="scss">

</style>