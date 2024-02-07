<script setup lang="ts">
import type {Organization} from "~/types/organization";
import type {FavoritesList} from "~/types/favorites";

definePageMeta({
  breadcrumb: "Организация"
})

const route = useRoute()
const router = useRouter()
const config = useRuntimeConfig()
const { user } = useUserStore()

const sections: string[] = ['services', 'clinic', 'specialist', 'gallery', 'feedback']

const institutionsCategories = ["clinic", "salon"]

const category = computed(() => route.params.category as string)
const type = computed(() => institutionsCategories.includes(category.value) ? "institutions" : "specialists")

const { data: organization } = await useAsyncData(
    `organization:${route.params.id}`,
    async () => {
      try {
        const response: { organization: Organization } = await $fetch(`/api/${type.value}/${route.params.id}`, {
          method: "GET",
          baseURL: config.public.baseUrl
        })

        if (response.organization) {
          if (user.loggedIn) {
            const favorites: FavoritesList = await $fetch(`/api/user/${user.id}/favorites`, {
              method: 'GET',
              baseURL: config.public.baseUrl,
            });

            let isFavorite = false
            if (favorites.favorites) {
              isFavorite = favorites.favorites.some((fav: any) => (fav.favorite_type === type.value.slice(0, -1) && fav.id === response.organization.id))
            }

            return {
              ...response.organization,
              isFavorite: isFavorite,
            }
          } else {
            return {
              ...response.organization,
              isFavorite: false,
            }
          }

        }
      } catch (e) {
        console.error(e)
        return {}
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
      <OrganizationHeader :organization/>
      <OrganizationNav />
      <OrganizationSections :organization/>
    </div>
  </main>
</template>

<style scoped lang="scss">

</style>