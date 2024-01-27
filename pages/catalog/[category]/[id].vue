<script setup lang="ts">
definePageMeta({
  breadcrumb: "Организация"
})

interface Favorites {
  favorites: Array<Object>
}

const route = useRoute()
const router = useRouter()
const config = useRuntimeConfig()
const { user } = useUserStore()

const sections: string[] = ['services', 'clinic', 'specialist', 'gallery', 'feedback']

const institutionsCategories = ["clinic", "salon"]

const category = computed(() => route.params.category as string)
const type = computed(() => institutionsCategories.includes(category.value) ? "institutions" : "specialists")

const { data, pending, error, refresh } = await useAsyncData(
    `organization:${route.params.id}`,
    async () => {
      const response = await $fetch(`/api/${type.value}/${route.params.id}`, {
        method: "GET",
        baseURL: config.public.baseUrl
      })


      if (response?.organization) {
        const favorites: Favorites = await $fetch(`/api/user/${user.id}/favorites`, {
          method: 'GET',
          baseURL: config.public.baseUrl,
        });

        let isFavorite = false
        if (favorites.favorites) {
          isFavorite = favorites.favorites.some((fav: any) => (fav.favorite_type === type.value.slice(0, -1) && fav.id === response.organization.id))
        }
        console.log({
          ...response?.organization,
          isFavorite: isFavorite,
        })

        return {
          ...response?.organization,
          isFavorite: isFavorite,
        }
      }
    }
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
      <OrganizationHeader :organization="data"/>
      <OrganizationNav />
      <OrganizationSections :services="data.services"/>
    </div>
  </main>
</template>

<style scoped lang="scss">

</style>