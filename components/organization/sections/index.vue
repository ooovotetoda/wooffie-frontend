<script setup lang="ts">
import type { Organization } from '~/types/organization';

const props = defineProps<{
  organization: Organization;
}>()

const route = useRoute()
const section = ref(route.query.section)

watch(() => route.query.section, (newSection) => {
  section.value = newSection
}, { immediate: true })
</script>

<template>
  <OrganizationSectionsServices :services="organization.services" v-if="section === 'services'"/>
  <OrganizationSectionsList v-if="section === 'clinic' || section === 'specialists'"/>
  <OrganizationSectionsGallery  v-if="section === 'gallery'"/>
  <OrganizationSectionsFeedback :organization="organization" v-if="section === 'feedback'"/>
</template>

<style scoped lang="scss">

</style>