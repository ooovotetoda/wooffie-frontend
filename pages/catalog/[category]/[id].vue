<script setup lang="ts">
definePageMeta({
  breadcrumb: "Организация"
})

const route = useRoute()
const router = useRouter()
const config = useRuntimeConfig()

const sections: string[] = ['services', 'clinic', 'specialist', 'gallery', 'feedback']

const institutionsCategories = ["clinic", "salon"]

const category = computed(() => route.params.category as string)
const type = computed(() => institutionsCategories.includes(category.value) ? "institutions" : "specialists")

const { data, pending, error, refresh } = await useAsyncData(
    `organization:${route.params.id}`,
    () => $fetch(`/api/${type.value}/${route.params.id}`, {
      method: "GET",
      baseURL: config.public.baseUrl
    })
)

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
      <OrganizationHeader :organization="data.organization"/>
      <OrganizationNav />
      <OrganizationSections :services="data.organization.services"/>
    </div>
  </main>
</template>

<style scoped lang="scss">

</style>