<script setup lang="ts">
definePageMeta({
  breadcrumb: "Организация"
})

const route = useRoute()
const router = useRouter()

const sections: string[] = ['services', 'clinics', 'specialist', 'gallery', 'feedback']

watch(() => route, () => {
  if (!sections.includes(route.query.section as string)) {
    router.replace({ query: {
        section: "services"
      }
    })
  }
}, { immediate: true })
</script>

<template>
  <main class="main">
    <div class="container">
      <OrganizationHeader />
      <OrganizationNav />
      <OrganizationSections />
    </div>
  </main>
</template>

<style scoped lang="scss">

</style>