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
  <Transition name="fade">
    <OrganizationSectionsServices v-if="section === 'services'" :services="organization.services"/>
    <OrganizationSectionsList v-else-if="section === 'clinic' || section === 'specialists'"/>
    <OrganizationSectionsGallery  v-else-if="section === 'gallery'"/>
    <OrganizationSectionsFeedback v-else-if="section === 'feedback'" :organization="organization"/>
  </Transition>

</template>

<style scoped lang="scss">
.fade-enter-active, .fade-leave-active {
  transition: opacity 0.2s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active до версии 2.1.8 */ {
  opacity: 0;
}

</style>